<svg width="0" height="0" style="position:absolute" aria-hidden="true">
	<filter id="we-dream" x="-5%" y="-20%" width="110%" height="140%">
		<feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="4">
			<animate
				id="we-dream-anim"
				attributeName="baseFrequency"
				dur="14s"
				values="0.012 0.03;0.02 0.05;0.012 0.03"
				repeatCount="indefinite"
			/>
		</feTurbulence>
		<feDisplacementMap in="SourceGraphic" scale="4" />
	</filter>
	<filter id="we-emboss" x="-5%" y="-5%" width="110%" height="110%"
		><feDropShadow
			dx="0"
			dy="1"
			stdDeviation=".35"
			flood-color="#000"
			flood-opacity=".75"
		/><feDropShadow
			dx="0"
			dy="-.6"
			stdDeviation=".2"
			flood-color="#fff1c4"
			flood-opacity=".28"
		/></filter
	>
	<filter id="we-duo" color-interpolation-filters="sRGB"
		><feColorMatrix
			type="matrix"
			values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0"
		/><feComponentTransfer
			><feFuncR type="table" tableValues=".07 .42 .95" /><feFuncG
				type="table"
				tableValues=".03 .3 .9"
			/><feFuncB type="table" tableValues=".16 .62 1" /></feComponentTransfer
		></filter
	>
	<filter id="we-duo-light" color-interpolation-filters="sRGB"
		><feColorMatrix
			type="matrix"
			values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0"
		/><feComponentTransfer
			><feFuncR type="table" tableValues=".18 .55 .9" /><feFuncG
				type="table"
				tableValues=".1 .44 .85"
			/><feFuncB type="table" tableValues=".27 .5 .74" /></feComponentTransfer
		></filter
	>
	<clipPath id="we-arch" clipPathUnits="objectBoundingBox"
		><path d="M0 1V.2434Q0 .0582 .5 0Q1 .0582 1 .2434V1Z" /></clipPath
	>
	<symbol id="we-corner" viewBox="0 0 60 60"
		><path fill="none" stroke-width=".9" d="M6 40A34 34 0 0 1 40 6" /><path
			fill="none"
			stroke-width=".45"
			d="M6 31A25 25 0 0 1 31 6M6 22A16 16 0 0 1 22 6"
		/><path fill="none" stroke-width=".45" d="M6 6L20 20" /><circle
			cx="21.5"
			cy="21.5"
			r="1.6"
			stroke="none"
		/></symbol
	>
</svg>
