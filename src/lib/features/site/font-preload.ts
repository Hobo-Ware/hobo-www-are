import caslon from '@fontsource/libre-caslon-display/files/libre-caslon-display-latin-400-normal.woff2?url';
import crimson from '@fontsource/crimson-pro/files/crimson-pro-latin-400-normal.woff2?url';
import sofiaBold from '@fontsource/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-700-normal.woff2?url';
import sofiaHeavy from '@fontsource/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-800-normal.woff2?url';
import unicase from '@fontsource/cormorant-unicase/files/cormorant-unicase-latin-600-normal.woff2?url';
import alegreya from '@fontsource/alegreya-sans/files/alegreya-sans-latin-400-normal.woff2?url';
import alegreyaItalic from '@fontsource/alegreya-sans/files/alegreya-sans-latin-400-italic.woff2?url';
import alegreyaBold from '@fontsource/alegreya-sans/files/alegreya-sans-latin-700-normal.woff2?url';
import syne from '@fontsource/syne-mono/files/syne-mono-latin-400-normal.woff2?url';

const CRITICAL_FONTS = {
	weekday: [caslon, crimson, sofiaBold, sofiaHeavy],
	weekend: [unicase, alegreya, alegreyaItalic, alegreyaBold, syne]
};

export const fontPreloadScript = `<script>(function () {
	var fonts = ${JSON.stringify(CRITICAL_FONTS)}[document.documentElement.dataset.mode] || [];
	fonts.forEach(function (href) {
		var link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'font';
		link.type = 'font/woff2';
		link.crossOrigin = '';
		link.href = href;
		document.head.appendChild(link);
	});
})();</script>`;
