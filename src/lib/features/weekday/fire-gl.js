const QUAD_VS = `#version 300 es
in vec2 a_corner;
in vec4 a_rect;
in vec4 a_color;
in vec2 a_sprite;
uniform vec2 u_res;
out vec4 v_color;
out vec2 v_uv;
out float v_alpha;
void main() {
	vec2 p = a_rect.xy + a_corner * a_rect.zw;
	gl_Position = vec4(p.x / u_res.x * 2.0 - 1.0, 1.0 - p.y / u_res.y * 2.0, 0.0, 1.0);
	v_color = vec4(a_color.rgb * a_color.a, a_color.a);
	v_uv = vec2((a_sprite.x + a_corner.x) / 6.0, a_corner.y);
	v_alpha = a_sprite.y;
}`;

const SOLID_FS = `#version 300 es
precision mediump float;
in vec4 v_color;
out vec4 o;
void main() { o = v_color; }`;

const SPRITE_FS = `#version 300 es
precision mediump float;
uniform sampler2D u_tex;
in vec2 v_uv;
in float v_alpha;
out vec4 o;
void main() { o = texture(u_tex, v_uv) * v_alpha; }`;

const BLIT_VS = `#version 300 es
out vec2 v_uv;
void main() {
	vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
	v_uv = p;
	gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const BLIT_FS = `#version 300 es
precision mediump float;
uniform sampler2D u_tex;
uniform float u_alpha;
in vec2 v_uv;
out vec4 o;
void main() { o = texture(u_tex, v_uv) * u_alpha; }`;

export function createFireGL(cv, { atlas: atlasSource, lut32, maxEmbers, maxFlames }) {
	const gl = cv.getContext('webgl2', {
		alpha: true,
		premultipliedAlpha: true,
		antialias: false,
		depth: false,
		stencil: false
	});
	if (!gl) return null;

	function program(vs, fs) {
		const p = gl.createProgram();
		for (const [type, src] of [
			[gl.VERTEX_SHADER, vs],
			[gl.FRAGMENT_SHADER, fs]
		]) {
			const s = gl.createShader(type);
			gl.shaderSource(s, src);
			gl.compileShader(s);
			gl.attachShader(p, s);
		}
		gl.bindAttribLocation(p, 0, 'a_corner');
		gl.bindAttribLocation(p, 1, 'a_rect');
		gl.bindAttribLocation(p, 2, 'a_color');
		gl.bindAttribLocation(p, 3, 'a_sprite');
		gl.linkProgram(p);
		return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
	}
	const solid = program(QUAD_VS, SOLID_FS);
	const sprite = program(QUAD_VS, SPRITE_FS);
	const blit = program(BLIT_VS, BLIT_FS);
	if (!solid || !sprite || !blit) return null;
	const uRes = [gl.getUniformLocation(solid, 'u_res'), gl.getUniformLocation(sprite, 'u_res')];
	const uBlitAlpha = gl.getUniformLocation(blit, 'u_alpha');

	const corner = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, corner);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
		gl.STATIC_DRAW
	);

	function dynamic(bytes) {
		const b = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, b);
		gl.bufferData(gl.ARRAY_BUFFER, bytes, gl.DYNAMIC_DRAW);
		return b;
	}
	function vao(parts) {
		const v = gl.createVertexArray();
		gl.bindVertexArray(v);
		gl.bindBuffer(gl.ARRAY_BUFFER, corner);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		for (const [loc, buffer, size, type, normalized] of parts) {
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc, size, type, normalized, 0, 0);
			gl.vertexAttribDivisor(loc, 1);
		}
		gl.bindVertexArray(null);
		return v;
	}

	const cellRect = gl.createBuffer();
	const cellColor = dynamic(4);
	const cellVao = vao([
		[1, cellRect, 4, gl.FLOAT, false],
		[2, cellColor, 4, gl.UNSIGNED_BYTE, true]
	]);
	const emberRects = new Float32Array(maxEmbers * 4);
	const emberColors = new Uint32Array(maxEmbers);
	const emberRect = dynamic(emberRects.byteLength);
	const emberColor = dynamic(emberColors.byteLength);
	const emberVao = vao([
		[1, emberRect, 4, gl.FLOAT, false],
		[2, emberColor, 4, gl.UNSIGNED_BYTE, true]
	]);
	const flameRects = new Float32Array(maxFlames * 4);
	const flameSprites = new Float32Array(maxFlames * 2);
	const flameRect = dynamic(flameRects.byteLength);
	const flameSprite = dynamic(flameSprites.byteLength);
	const flameVao = vao([
		[1, flameRect, 4, gl.FLOAT, false],
		[3, flameSprite, 2, gl.FLOAT, false]
	]);
	const blitVao = gl.createVertexArray();

	function texture(w, h, source) {
		const t = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, t);
		if (source) {
			gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
			gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
		} else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		return t;
	}
	const atlas = texture(0, 0, atlasSource);

	let targets = [];
	function target(w, h) {
		const tex = texture(w, h);
		const fb = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
		return { tex, fb, w, h };
	}

	let W = 1,
		H = 1,
		cells = 0,
		embers = 0,
		flames = 0,
		scene,
		flameLayer,
		half,
		quarter,
		tenth;

	function draw(fb, w, h) {
		gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
		gl.viewport(0, 0, w, h);
	}
	function copy(from, alpha) {
		gl.useProgram(blit);
		gl.bindVertexArray(blitVao);
		gl.bindTexture(gl.TEXTURE_2D, from.tex);
		gl.uniform1f(uBlitAlpha, alpha);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}

	return {
		dispose() {
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		},
		layout(width, height, dpr, cs, CX, CY, n) {
			W = width;
			H = height;
			cv.width = Math.round(W * dpr);
			cv.height = Math.round(H * dpr);
			for (const t of targets) {
				gl.deleteTexture(t.tex);
				gl.deleteFramebuffer(t.fb);
			}
			scene = target(cv.width, cv.height);
			half = target(Math.max(1, cv.width >> 1), Math.max(1, cv.height >> 1));
			flameLayer = target(half.w, half.h);
			quarter = target(Math.max(1, cv.width >> 2), Math.max(1, cv.height >> 2));
			tenth = target(
				Math.max(1, Math.round(cv.width / 10)),
				Math.max(1, Math.round(cv.height / 10))
			);
			targets = [scene, flameLayer, half, quarter, tenth];
			cells = n;
			const rects = new Float32Array(n * 4);
			for (let i = 0; i < n; i++) {
				rects[i * 4] = CX[i];
				rects[i * 4 + 1] = CY[i];
				rects[i * 4 + 2] = cs - 1;
				rects[i * 4 + 3] = cs - 1;
			}
			gl.bindBuffer(gl.ARRAY_BUFFER, cellRect);
			gl.bufferData(gl.ARRAY_BUFFER, rects, gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, cellColor);
			gl.bufferData(gl.ARRAY_BUFFER, n * 4, gl.DYNAMIC_DRAW);
		},
		begin() {
			embers = 0;
			flames = 0;
		},
		cells(colors) {
			gl.bindBuffer(gl.ARRAY_BUFFER, cellColor);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, colors, 0, cells);
		},
		ember(x, y, size, lut, index, alpha) {
			const color = lut32[lut][index];
			const j = embers++;
			emberRects[j * 4] = x - size / 2;
			emberRects[j * 4 + 1] = y - size / 2;
			emberRects[j * 4 + 2] = size;
			emberRects[j * 4 + 3] = size;
			emberColors[j] = ((color & 0xffffff) | (Math.round(alpha * 255) << 24)) >>> 0;
		},
		flamesBegin() {},
		flame(index, x, y, size, alpha) {
			const j = flames++;
			flameRects[j * 4] = x - size / 2;
			flameRects[j * 4 + 1] = y - size * 0.7;
			flameRects[j * 4 + 2] = size;
			flameRects[j * 4 + 3] = size * 1.35;
			flameSprites[j * 2] = index;
			flameSprites[j * 2 + 1] = alpha;
		},
		end(glowA, glowB) {
			draw(scene.fb, scene.w, scene.h);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.disable(gl.BLEND);
			gl.useProgram(solid);
			gl.uniform2f(uRes[0], W, H);
			gl.bindVertexArray(cellVao);
			gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, cells);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.ONE, gl.ONE);
			if (embers) {
				gl.bindBuffer(gl.ARRAY_BUFFER, emberRect);
				gl.bufferSubData(gl.ARRAY_BUFFER, 0, emberRects, 0, embers * 4);
				gl.bindBuffer(gl.ARRAY_BUFFER, emberColor);
				gl.bufferSubData(gl.ARRAY_BUFFER, 0, emberColors, 0, embers);
				gl.bindVertexArray(emberVao);
				gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, embers);
			}
			if (flames) {
				draw(flameLayer.fb, flameLayer.w, flameLayer.h);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.useProgram(sprite);
				gl.uniform2f(uRes[1], W, H);
				gl.bindTexture(gl.TEXTURE_2D, atlas);
				gl.bindBuffer(gl.ARRAY_BUFFER, flameRect);
				gl.bufferSubData(gl.ARRAY_BUFFER, 0, flameRects, 0, flames * 4);
				gl.bindBuffer(gl.ARRAY_BUFFER, flameSprite);
				gl.bufferSubData(gl.ARRAY_BUFFER, 0, flameSprites, 0, flames * 2);
				gl.bindVertexArray(flameVao);
				gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, flames);
				draw(scene.fb, scene.w, scene.h);
				copy(flameLayer, 1);
			}
			gl.disable(gl.BLEND);
			draw(half.fb, half.w, half.h);
			copy(scene, 1);
			draw(quarter.fb, quarter.w, quarter.h);
			copy(half, 1);
			draw(tenth.fb, tenth.w, tenth.h);
			copy(quarter, 1);
			draw(null, cv.width, cv.height);
			copy(scene, 1);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.ONE, gl.ONE);
			copy(quarter, glowA);
			copy(tenth, glowB);
			gl.bindVertexArray(null);
		}
	};
}
