<script>
	import { browser } from '$app/environment';
	import { Theme } from '$lib/features/theme/models/Theme';

	/**
	 * TODO: implement questionnaire easter-egg
	 *
	 * "404: Page not found. Would you like to:
	 * [ ] Panic
	 * [ ] Question the fabric of reality
	 * [ ] Blame the algorithm
	 * [ ] Go back to the home page"
	 *  */

	const theme = $state(browser ? THEME_SEED : Theme.Auto);
	const messages = [
		"This page went wandering off. Maybe it's looking for spare change?",
		'Reality is a fragile construct. This page seems to have succumbed to the entropy.',
		'Existence is pain. And sometimes, that pain manifests as a missing web page.',
		'File not found. Guess it hopped a train to another server.',
		'The void stares back. This content has ceased to be.',
		'Error not found. Please try again later, or question the nature of your reality.',
		'This page is as lost as you are in the grand scheme of things.',
		'You have reached the limits of your perception. Or maybe just the end of our website.'
	];

	const message = messages[Math.floor(Math.random() * messages.length)];
</script>

<div class="hobo-death-404">
	{#if theme === Theme.Light}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600">
			<path
				fill="none"
				d="M0 1600h1600V0H0v1600M920 235c4 2 7 6 10 9l4 3 40 38 3 2c9 7 16 15 24 23l4 3 11 10 3 2c7 3 18 1 25 1h51l30-1h68c5-1 8 3 11 6l5 6 8 11 18 22 4 6c6 6 12 13 16 20 13 15 27 31 38 48v1c9 6 15 18 21 26l13 16c15 18-2 28-17 37l-38 23c-4 4-12 8-17 11l-11 6-2 1c-7 12-34 22-46 29-5 3-9 4-14 1-8-4-17-15-22-23l-1-2-10-11-12-15-14-18-2-2-5-6-20-26-7-8-1-1-9-10c-22-9-54-8-78-10l-7-1h-7l-36-4h-4c-8 0-16-2-23-3l-11-1-16-1-31-3c-10-1-16 2-25 4-4 3-7 10-12 12-3 5-7 8-11 12l-32 36-5 6-22 24c-10 15-25 31-38 43-8 8-27 7-38 8l-11 1h-13l-13 1-20 2h-8c-11 1-20 5-30 9l-13 4-24 9-8 3-15 5c-23 6-25-29-31-45l-19-60-3-8-1-5-1-4a20 20 0 0 1 5-19l16-24 17-26 6-9c6-11 18-37 32-39 19-2 42-2 61 0 3-2 8-2 10-5l3-6c4-17-9-56 1-70v-1c2-9 15-18 22-24l8-7c6-6 10-13 19-15l13-2 126-17h7c13-1 25-4 38-4l8-1h1c2-2 5-1 8-1l21-3h7c6-1 12-2 18 1m104 255c3 0 10-1 12 1l13 1 12 1c2 0 6-1 7 3l5 5 4 4c13 14 31 27 41 43l1 1c5 3 14 13 17 18v1c9 11-14 4-17 2-22-9-41-28-63-35l-10-1-29-1h-65l-10-1h-13l42 22c8 3 11 8 15 16l5 7c2 4 7 8 7 12l-2 5c-4 4-9 1-12-2h-1l-27-14-6-3c-8-3-15-7-23-9l-13-4-7-2c-29-5-37-8-66 1l-4 1-17 6-13 5c-8 4-17 8-26 10l-6 2c-4 2-10 4-11-2s10-13 14-17c8-8 17-21 27-27l2-1 24-24c28-24 41-42 80-34s74 7 113 10M623 636c3 3 1 7 1 11v14l-1 11h3c9-4 26-2 36-2 31 0 62-2 92-4l18-1 24-1 17-1h4l10-1 16-1h17l24-1 16-1h7l15-1h1c13 1 31-1 43-2l8-1a375 375 0 0 1 39-1l15-1h4l13-1h10l17-1h4l17-1h8l13-1h5l21-1 17-1c23-1 27 1 34 20l5 5 7 7 22 23 7 7 12 13c5 3 9 9 13 13l20 21c2 3 7 6 6 9v2c2 4-5 5-8 5l-19 1h-10c-7 2-3 10-1 14 4 8 9 17 12 26l6 13 1 2 3 7c4 7 22 37 18 44l-1 2c-3 5-10 2-14 2l-11 3c-3 2-3 5-2 8l2 4c11 7 19 30 26 41l7 12 3 4 8 13 4 7c3 5 4 7 4 12-1 15-5 30-7 45l-5 38-4 24c0 8-4 31-15 17l-5-9-5-3c-7 0-9 11-11 16-1 3-2 7-4 9l-4 11-3 8-8 19-8 19-5 13-6 16c-3 6-8 30-15 32-21 6-58-27-72-4l-8 11-11 15c-4 5-6 12-12 16v1c-3 10-18 31-27 37v1c-1 4-5 7-7 10l-3 4c-3 5-7 12-12 16v1c-2 3-6 12-10 12h-1c-5 4-9-7-11-10-3-4-7-8-9-13v-1l-6-8c-2-3-5-10-9-11h-1c-5 4-15 5-21 7l-13 4-10 4h-1c-7 6-21 7-30 10l-14 5h-2l-9 3-35 11-8 3c-18 8-18 1-16-15 2-13-39-4-49-4-12 1-21 5-21-11 0-19 2-39 0-58-2-18 5-41 0-59l-3-4c-26 2-55 1-80-1h-62c-3-1-5-3-5-6-4-43 8-91 1-132-1-3-2-3-5-4-23-4-49 4-72 0s-51 7-72-1c-3-1-6-4-5-8 1-3 7-12 10-14 1-5 6-12 10-16 2-3 9-20 14-19 11-2 29-1 40 0 2 0 7 0 8-2l1-2c8-32 0-78 0-111 0-17 7-53-1-68l-4-3c-23 2-58 4-80-1l-3-1c-10-6 10-21 15-25l15-14 18-16c5-4 17-14 16-21l-2-5-2-4-1-3-1-3-3-10-2-4-8-24-1-3-3-7c-3-12 19-18 28-21l9-4 6-2 4-2 3-1 6-3 4-2c9-3 45-23 52-16m-189 96c-1 4-5 8-9 8h-2c-12 5-43 3-56 1-5-1-10-6-11-11-3-16-3-43 1-58 1-4 2-6 6-8l4-1h57c15 0 13 57 10 69m-129 96c6 2 8 4 9 10 3 16 3 41 0 57-1 6-3 9-10 10-14 2-48 5-61-1-12-5-7-54-6-66 0-4 2-7 6-8v-1l4-1c16-3 42-4 58 0m166 81c2 13 6 60-6 66l-3 1h-1c-5 3-19 1-25 1l-28-1c-8 0-12-2-14-10-3-14-4-44 0-57l5-8c5-5 30-2 39-2h23c5 0 9 5 10 10m-113 133c1 1 3 3 3 5 3 12 5 60-6 67l-8 2h-7c-14 0-34 3-47-1-5-2-8-4-9-9-4-13-4-46 0-59 1-3 1-4 4-6 2-2 2-3 5-3 17-2 36 0 53 0h6c2 0 5 2 6 4m194 218-4 4c-4 3-6 4-11 4-24 4-57 3-81 0-9 0-16-6-17-15-4-23-5-61 0-84 1-6 4-11 10-14l3-1c24-6 61-3 86-1 20 1 19 30 16 46s6 46-2 61m164 20c6 0 10 5 11 10 4 22-3 46 0 68h-10c-18 0-43 4-59-1-4-1-8-4-9-8-3-12-5-59 5-67l3-2 4-1h29c9 0 18-1 26 1Z"
			/>
			<path
				fill="none"
				stroke="#FCEDE3"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m902 234 14 1h4c-6-3-12-2-18-1Z"
			/>
			<path
				fill="none"
				stroke="#F8623B"
				stroke-width=".3"
				d="m874 237-8 1h-1c-2 2-5 1-8 1-13 0-25 3-38 4h-7l-126 17-8 4-20 11-4 2-8 7-22 24v1c0 20 6 51-1 70l-3 6c-2 3-6 7-10 6-20 2-42-2-61-1-14 2-26 28-32 39l-6 9-17 26c-5 8-10 17-16 24-3 3-4 5-5 9v10l1 4c0 1 2 2 1 3 32 8 70 4 96-14-3-11 0-28 12-32l1-1 6-2h1c2-2 11-2 13 0h1l4 1 4 1 4 1c24 1 57-18 80-25 24-6 51-19 71-34 5-5 7-11 11-17 15-26 30-65 49-88s37-61 67-70l-21 3Z"
			/>
			<path
				fill="none"
				stroke="#FA1B13"
				stroke-width=".3"
				d="m779 392-4 11c30-2 66-10 95-15s56-18 80-30 39-44 61-38l-6-7-4-3c-9-7-16-16-24-23l-3-2c-15-11-27-25-40-38l-4-3c-4-4-9-8-14-9l-14-1h-7c-30 9-48 47-67 70s-34 62-49 88Z"
			/>
			<path
				fill="none"
				stroke="#F9685C"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M930 244c-3-3-6-7-10-9h-4c5 1 10 5 14 9Z"
			/>
			<path
				fill="none"
				stroke="#FA5432"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m866 238 8-1c-3 0-6-1-8 1Z"
			/>
			<path
				fill="none"
				stroke="#F94F2E"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M857 239c3 0 6 1 8-1l-8 1Z"
			/>
			<path fill="none" stroke="#FEB7AE" stroke-opacity=".2" stroke-width=".3" d="M819 243h-7 7Z" />
			<path
				fill="none"
				stroke="#F74A3F"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m974 285-40-38c13 13 25 27 40 38Z"
			/>
			<path
				fill="none"
				stroke="#FDF2EB"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m673 262-4 3 9-1 8-4-13 2Z"
			/>
			<path
				fill="none"
				stroke="#FFD6C9"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m654 277 4-2 11-10 4-3c-9 2-13 9-19 15Z"
			/>
			<path fill="none" stroke="#FBCEBB" stroke-width=".3" d="m669 265-11 10 20-11-9 1Z" />
			<path
				fill="none"
				stroke="#FE6238"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m624 308 22-24c-7 6-20 15-22 24Z"
			/>
			<path
				fill="none"
				stroke="#FECDB8"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1001 310c-8-8-15-16-24-23 8 7 15 16 24 23Z"
			/>
			<path
				fill="none"
				stroke="#FA5E35"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M623 379c7-19 1-50 1-70-10 14 3 53-1 70Z"
			/>
			<path
				fill="none"
				stroke="#F38585"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M1011 320c2 2 5 6 8 7l-3-4-11-10 6 7Z"
			/>
			<path
				fill="none"
				stroke="#B81F23"
				stroke-width=".3"
				d="M779 392c-4 6-6 12-11 17-17 17 0 58-4 77 7 1 9 9 14 11-3 3-2 7-7 6 3 4 2 5 4 10 5-6 9-10 16-15 7 0-3 8 2 6l17-19 14-14 4-5 2-3c3-4 11-15 16-16h6l19 2 26 3 18 2 10 1 18 1 10 2c12 0 23 2 34 4h7l7 1c24 2 56 1 78 10 2 1 9 7 9 10l1 1 7 8a265 265 0 0 0 27 34c6 5 11 13 16 19l19 22 9 11c4 5 10 14 15 17 5 2 10 1 14-2 9-9 33-25 45-28 6-6 22-18 31-19 8-10 29-18 40-25 12-8 21-19 15-34l-13-16-21-26v-1c-14-10-29-33-38-48-4-7-10-14-16-20l-6-7-16-21-8-11c-2-2-5-3-6-6l-10-5h-58l-22 1h-1c-5 4-22 1-29 1h-36c-8 0-21 2-28-1-3-1-6-5-8-7-22-6-37 26-61 38s-51 25-80 30-65 13-95 15l4-11Z"
			/>
			<path
				fill="none"
				stroke="#EAB9B1"
				stroke-width=".3"
				d="M1019 327c7 3 20 1 28 1h36c7 0 24 3 29-1h-68c-8 0-19 2-25-2l-3-2 3 4Z"
			/>
			<path
				fill="none"
				stroke="#FDECE1"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M1044 327v-1c-7 0-18 2-25-1 6 4 17 2 25 2Z"
			/>
			<path
				fill="none"
				stroke="#FFF1E9"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M1095 326h18l12-1-30 1Z"
			/>
			<path
				fill="none"
				stroke="#F1B0A8"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1113 326v1l22-1v-1h-10l-12 1Z"
			/>
			<path
				fill="none"
				stroke="#D02329"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1135 326h25v-1h-25v1Z"
			/>
			<path
				fill="none"
				stroke="#CE1A22"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1160 326h14v-1h-14v1Z"
			/>
			<path
				fill="none"
				stroke="#D41B22"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M1174 326h19v-1h-19v1Z"
			/>
			<path
				fill="none"
				stroke="#FCCDCB"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m1193 326 10 5h1c-3-3-6-7-11-6v1Z"
			/>
			<path
				fill="none"
				stroke="#FCEFE3"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1044 327h17v-1h-17v1Z"
			/>
			<path
				fill="none"
				stroke="#FEF2E7"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1061 327h17v-1h-17v1Z"
			/>
			<path fill="none" stroke="#FDEEE3" stroke-width=".3" d="M1078 327h35v-1h-35v1Z" />
			<path fill="none" stroke="#C85358" stroke-width=".3" d="M1083 328h-36 36Z" />
			<path
				fill="none"
				stroke="#DB373E"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1209 337-5-6h-1c1 3 4 4 6 6Z"
			/>
			<path
				fill="none"
				stroke="#D20C19"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m1233 369 2 1-18-22 16 21Z"
			/>
			<path
				fill="none"
				stroke="#CF0E20"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m1239 376-4-6-2-1 6 7Z"
			/>
			<path
				fill="none"
				stroke="#FDEFE6"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M610 390v1c4 1 8-3 10-6-2 3-7 3-10 5Z"
			/>
			<path
				fill="none"
				stroke="#F5BCA8"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M610 391v-1c-19-2-42-2-61 0 19-1 41 3 61 1Z"
			/>
			<path
				fill="none"
				stroke="#D21521"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1293 444c-11-17-25-33-38-48 9 15 24 38 38 48Z"
			/>
			<path
				fill="none"
				stroke="#EA1617"
				stroke-width=".3"
				d="M617 468c3 2 6 6 7 10v2c3 7 3 24-2 30-4 4-10 7-15 7v1c0 2 11 2 13 0 1 6 13 12 10 17 7-1 11 9 11 14 3-1 8 3 9 6 3-3 3 0 6 2-2 1-5-1-6 2 4 3-1 7-1 12-7 0-15 4-18 9-6-4-9 6-14 6 6-9-7 2-10 3-16 21-59 23-79 40l15-5 10-5c17-7 37-19 56-20h17l20-2 13-1h13l9-3c12-2 26-2 38-6-1-6 15-15 18-21 2-7 13-15 18-21l19-20 12-13 7-8c-5 2 5-6-2-6-7 5-11 9-16 15-2-5-1-6-4-10 5 1 4-3 7-6-5-2-7-10-14-11 4-19-13-60 4-77-20 15-47 28-71 34-23 7-56 26-80 25Z"
			/>
			<path
				fill="none"
				stroke="#FD6C3B"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m511 438 6-9-6 9Z"
			/>
			<path
				fill="none"
				stroke="#C21224"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1314 471c-6-8-12-20-21-26l21 26Z"
			/>
			<path
				fill="none"
				stroke="#8B5A6B"
				stroke-width=".3"
				d="m830 463 10-9 6-7c-5 1-13 12-16 16Z"
			/>
			<path
				fill="none"
				stroke="#3A92BA"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M840 454h1c9-2 15-5 25-4v-1l-14-2h-6l-6 7Z"
			/>
			<path fill="none" stroke="#85445C" stroke-width=".3" d="M866 449h5l-19-2 14 2Z" />
			<path
				fill="none"
				stroke="#4084B3"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m866 450 31 3v-1l-26-3h-5v1Z"
			/>
			<path
				fill="none"
				stroke="#4A72A4"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m897 453 16 1h2l-18-2v1Z"
			/>
			<path
				fill="none"
				stroke="#8EAED1"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m830 463-2 3h1c5-2 8-9 12-12h-1l-10 9Z"
			/>
			<path
				fill="none"
				stroke="#3B90BC"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M924 455h1l-10-1h-2l11 1Z"
			/>
			<path
				fill="none"
				stroke="#2A9ACE"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m947 458-4-2-18-1h-1c7 1 15 3 23 3Z"
			/>
			<path
				fill="none"
				stroke="#497BA9"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M947 458h6l-10-2 4 2Z"
			/>
			<path
				fill="none"
				stroke="#5281AC"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M987 462c-11-2-22-4-34-4h-2l36 4Z"
			/>
			<path
				fill="none"
				stroke="#855564"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1001 463-7-1 7 1Z"
			/>
			<path
				fill="none"
				stroke="#FB5337"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M478 488c6-7 11-16 16-24l-16 24Z"
			/>
			<path fill="none" stroke="#A15A59" stroke-width=".3" d="M591 465h13c-2-2-11-2-13 0Z" />
			<path
				fill="none"
				stroke="#192E4C"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M584 467c7 1 18-1 25-1l-4-1c-2 2-13 2-15 0l-6 2Z"
			/>
			<path fill="none" stroke="#0D2C49" stroke-width=".3" d="M605 465h-15c2 2 13 2 15 0Z" />
			<path
				fill="none"
				d="m584 467-1 1c-3 4-6 6-8 11v28c1 5 6 7 10 9 7 1 15 2 22 1 5 0 11-3 15-7 5-7 2-21 2-30v-2c-2-4-7-9-11-11l-4-1c-7 0-18 2-25 1Z"
			/>
			<path
				fill="none"
				stroke="#90B5DB"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m824 471-6 7c4-4 8-7 11-12h-1l-4 5Z"
			/>
			<path
				fill="none"
				stroke="#FA2A23"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M624 478c-1-4-4-8-7-10l-4-1c4 2 9 7 11 11Z"
			/>
			<path
				fill="none"
				stroke="#293550"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m571 500 2 6 2 1v-1c-3-5-1-22 0-27 2-5 5-7 8-11-12 4-15 21-12 32Z"
			/>
			<path
				fill="none"
				stroke="#A58A97"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m810 485 8-7 6-7-14 14Z"
			/>
			<path
				fill="none"
				stroke="#BE1721"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m1079 473 9 10c0-3-7-9-9-10Z"
			/>
			<path
				fill="none"
				stroke="#210E22"
				stroke-width=".3"
				d="M831 514c-7 7-15 18-24 24l-2 1c-9 9-17 19-27 27-4 4-15 11-14 17l15-3c17-7 35-17 54-20 37-14 59-9 94 6 8 2 15 6 23 9l6 2 27 11 13 6 2-5c-2-8-22-28-27-35l-42-22c2-2 4-1 6-1l14-2h38c20 0 40 2 59 5l10 1c-3-8 20-34 11-39l-31-4-12-2c-39-3-74-2-113-10s-52 10-80 34Z"
			/>
			<path
				fill="none"
				stroke="#9DB3C4"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m810 485-17 19-7 8v2l32-36-8 7Z"
			/>
			<path
				fill="none"
				stroke="#044566"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M575 506v-27c-1 5-3 22 0 27Z"
			/>
			<path
				fill="none"
				stroke="#DF251C"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M622 510c5-6 5-23 2-30 0 9 3 23-2 30Z"
			/>
			<path
				fill="none"
				stroke="#AD161C"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1096 492-7-8 7 8Z"
			/>
			<path
				fill="none"
				stroke="#FAF1EE"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m1312 521-2 3c15-9 32-19 17-37 6 15-3 26-15 34Z"
			/>
			<path
				fill="none"
				stroke="#28739F"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1036 492v-1c-2-2-9-1-12-1l12 2Z"
			/>
			<path
				fill="none"
				stroke="#228AB9"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m1036 492 31 4h1c-1-4-5-3-7-3l-12-1-13-1v1Z"
			/>
			<path
				fill="none"
				stroke="#119DCB"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m1061 493-12-1 12 1Z"
			/>
			<path
				fill="none"
				stroke="#030411"
				stroke-width=".3"
				d="M1056 535c22 7 41 26 63 35l15 5 2-7v-1c-6-4-14-12-17-18l-1-1c-7-5-13-12-18-18-9-9-20-18-27-29l-5-5h-1c9 5-14 31-11 39Z"
			/>
			<path
				fill="none"
				stroke="#F85026"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M473 507v-10 10Z"
			/>
			<path
				fill="none"
				stroke="#F83B20"
				stroke-width=".3"
				d="m474 511 1 5 3 8 19 60c6 16 8 51 31 45 20-17 63-19 79-40 3-1 16-12 10-3 5 0 8-10 14-6 3-5 11-9 18-9 0-5 5-9 1-12 1-3 4-1 6-2-3-2-3-5-6-2-1-3-6-7-9-6 0-5-4-15-11-14 3-5-9-11-10-17-2 2-13 2-13 0h-2c-4 2-11 1-15 0l-5-1c-5-2-10-6-12-11l-2-6c-26 18-64 22-96 14 1-1-1-2-1-3Z"
			/>
			<path
				fill="none"
				stroke="#011B39"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m1100 530-23-25-4-4c7 11 18 20 27 29Z"
			/>
			<path
				fill="none"
				stroke="#012245"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1100 530c5 6 11 13 18 18-10-16-28-29-41-43l23 25Z"
			/>
			<path
				fill="none"
				stroke="#732E2A"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M585 517v-1c-4-2-9-4-10-9l-2-1c2 5 7 9 12 11Z"
			/>
			<path
				fill="none"
				stroke="#A1B7C7"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m774 525-19 20c-5 6-16 14-18 21-3 6-19 15-18 21h2c13-12 28-28 38-43 6-9 14-16 22-24l5-6v-2l-12 13Z"
			/>
			<path
				fill="none"
				stroke="#0E0814"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M807 538c9-6 17-17 24-24l-24 24Z"
			/>
			<path
				fill="none"
				stroke="#FE4019"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m478 524-3-8 3 8Z"
			/>
			<path
				fill="none"
				stroke="#242D44"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m585 517 5 1h17v-1c-7 1-15 0-22-1v1Z"
			/>
			<path fill="none" stroke="#5B3542" stroke-width=".3" d="M605 518h-15c4 1 11 2 15 0Z" />
			<path
				fill="none"
				stroke="#CC1E1C"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1121 524-5-6 5 6Z"
			/>
			<path
				fill="none"
				stroke="#94AABC"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m759 544 22-24c-8 8-16 15-22 24Z"
			/>
			<path
				fill="none"
				stroke="#F2CBB8"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1272 546v1l38-23 2-3c-11 7-32 15-40 25Z"
			/>
			<path fill="none" stroke="#C9ACAF" stroke-width=".3" d="m755 545 19-20-19 20Z" />
			<path
				fill="none"
				stroke="#C52E37"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1137 544 2 1c-5-6-10-14-16-19l14 18Z"
			/>
			<path fill="none" stroke="#582633" stroke-width=".3" d="M949 529h38-38Z" />
			<path
				fill="none"
				stroke="#D6422E"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m935 531 7 1 10 1 44-1 21 1 29 1c-19-3-39-5-59-5h-38l-14 2Z"
			/>
			<path
				fill="none"
				stroke="#D75436"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M929 532h13l-7-1c-2 0-4-1-6 1Z"
			/>
			<path
				fill="none"
				stroke="#DE402A"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M952 533h44v-1l-44 1Z"
			/>
			<path
				fill="none"
				stroke="#D73C24"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M996 533h21l-21-1v1Z"
			/>
			<path
				fill="none"
				stroke="#120711"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M778 566c10-8 18-18 27-27-10 6-19 19-27 27Z"
			/>
			<path
				fill="none"
				stroke="#892343"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m1149 559 6 6 3 2-19-22-2-1 12 15Z"
			/>
			<path
				fill="none"
				stroke="#EFC7B9"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1241 565h1l2-1c3-3 8-5 11-6 5-3 13-7 17-11v-1c-9 1-25 13-31 19Z"
			/>
			<path
				fill="none"
				stroke="#EACEBB"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M833 560c-17 7-36 15-54 20l-15 3c1 6 7 4 11 2l6-2c9-2 18-6 26-10l13-5 17-6 4-1c29-9 37-6 66-1l7 2 13 4c-35-15-57-20-94-6Z"
			/>
			<path
				fill="none"
				stroke="#031C38"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1136 567c-3-5-12-15-17-18 3 6 11 14 17 18Z"
			/>
			<path
				fill="none"
				stroke="#DF462A"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M998 589c0-4-5-8-7-12l-5-7c-4-8-7-13-15-16 5 7 25 27 27 35Z"
			/>
			<path
				fill="none"
				stroke="#FEE0C8"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1244 564 11-6c-3 1-8 3-11 6Z"
			/>
			<path
				fill="none"
				stroke="#1A0D32"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m1159 570-4-5-6-6 10 11Z"
			/>
			<path
				fill="none"
				stroke="#1D151B"
				stroke-width=".3"
				d="M779 580c18-5 37-13 54-20-19 3-37 13-54 20Z"
			/>
			<path
				fill="none"
				stroke="#F2CDB6"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m837 562 4-1-4 1Z"
			/>
			<path
				fill="none"
				stroke="#F1D5C2"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m914 562-7-2 7 2Z"
			/>
			<path
				fill="none"
				stroke="#51142C"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m1159 570 1 2 7 6-9-11-3-2 4 5Z"
			/>
			<path
				fill="none"
				stroke="#A0B9C7"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1196 593v1c12-7 39-17 46-29h-1c-12 3-36 19-45 28Z"
			/>
			<path
				fill="none"
				stroke="#FAC1AC"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m807 573 13-5-13 5Z"
			/>
			<path
				fill="none"
				stroke="#061D3D"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M1119 570c3 2 26 9 17-2l-2 7-15-5Z"
			/>
			<path
				fill="none"
				stroke="#EB3B1D"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m991 577-5-7 5 7Z"
			/>
			<path
				fill="none"
				stroke="#11030D"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M1182 595c-5-3-11-12-15-17l-7-6c5 8 14 19 22 23Z"
			/>
			<path
				fill="none"
				stroke="#E4D7B4"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M956 578v-1l-6-2 6 3Z"
			/>
			<path
				fill="none"
				stroke="#E7C5B1"
				stroke-opacity=".7"
				stroke-width=".3"
				d="m956 578 27 14v-4l-27-11v1Z"
			/>
			<path
				fill="none"
				stroke="#FBE4CA"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m775 585 6-2-6 2Z"
			/>
			<path
				fill="none"
				stroke="#F8D6C7"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m681 593 2 2c11-1 30 0 38-8h-2c-12 4-26 4-38 6Z"
			/>
			<path fill="none" stroke="#D94435" stroke-width=".3" d="M983 592h1c4 1 8 5 12 2l-13-6v4Z" />
			<path
				fill="none"
				stroke="#E43720"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M996 594c-4 3-8-1-12-2 3 3 8 6 12 2Z"
			/>
			<path
				fill="none"
				stroke="#F9B9A7"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m672 596 11-1-2-2-9 3Z"
			/>
			<path
				fill="none"
				stroke="#901322"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M1182 595c5 3 9 2 14-1v-1c-4 3-9 4-14 2Z"
			/>
			<path
				fill="none"
				stroke="#E4201E"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m646 597 13-1-13 1Z"
			/>
			<path
				fill="none"
				stroke="#F9B7AF"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M609 599h17-17Z"
			/>
			<path
				fill="none"
				stroke="#FDD7CE"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m553 619-2 2 24-9 13-4c10-4 19-8 30-9h-9c-19 1-39 13-56 20Z"
			/>
			<path
				fill="none"
				stroke="#FEE4E2"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m575 612 13-4-13 4Z"
			/>
			<path
				fill="none"
				stroke="#FDC2B3"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m543 624 8-3 2-2-10 5Z"
			/>
			<path
				fill="none"
				stroke="#01020C"
				stroke-width=".3"
				d="M571 652c-1 1-1 2-3 2l-7 3-3 1-4 2 17 5c-1 3-2 8-6 6 0 1-3 4 0 4a360 360 0 0 0 40-27c-7 15-11 31-15 47v3c9-5 18-11 25-19 7 25-22 36-40 46l-7 14c9-8 20-15 31-19 1 20-22 24-33 37 1 3 4 3 6 4 1 0 2-2 3-1 0 24 23 40 18 65-7 3-15 2-22 2v2c2 5 1 13 1 19v20l1 21v9c25-7 10 10 26 20 8-10 0-32 2-45s0-34 1-47v-90c-1-13-2-20 13-23 2 4 0 10 3 14 5 6 8 11 11 18 15 22 27 48 42 69 10 8 36 7 49 6l19-1c23 0 53-11 75-6 5-1 11-7 14-11 14-18 23-39 34-59 13 0 15-19 20-29 3-4 7-3 11-4l5-2c10-2 27-1 36 1l5 1c-8 11-24 20-17 37l4 16 3 30 1 3c-1-13 4-25 9-36 7 12 13 27 23 36l-1-8h6v-14c0-5-2-8-3-13v-1c-1-1-2-5 0-6l3 6c6 0 16 18 22 31 6 14 22 29 40 20 8-2 17-1 26-1h16l22-1 49-1 22-3h1c7-1 12 9 15 14l5 8c11 25-2 61 4 88l-34-38-3 2-1 2-5 8c-3 17 3 35 2 51l-22-22c-12 12-9 29-11 44v26l2 28c-36-56-110-79-155-116 0-10-2-18-3-27h-16c-8 10-30 26-42 26v1c11 3 22 3 33 1l1 3c2-7 12-16 13-4l9 79c34 9 55 26 90 34s38 46 45 78l2 9c-3-1-6-2-7-5-8-4-14-8-21-14l-5-5-2-1c-10-4-19-14-27-21l-3-2c-26-19-28-23-58-8-8 4-18 12-27 14h-1c-2 4-9 6-13 8l-7 3-3 2c14 7 4 18 17 29 30 26 66 51 88 85-20-10-40-19-62-23 0 9 5 16 8 23l-15-15c-9-8-22-17-25-29-2 3-1 7-2 10 6 27 32 49 43 74l-54 1v11l-5 6-6 1h-52l-9-1-4-4-9-4-12-6c16 18 43 31 62 49-3 9-10 16-12 26 16 12 29 31 43 45h4c4-3 9-4 14-6l5-2-3-2c61-32 126-59 189-89l11-12c14-23 51 10 72 4 9-18 13-44 24-60 11-17 10-46 25-59l2-7 9-21c-25-15-62-10-88-22 10-12 10-23 5-37 5 0 8 5 13 4 0-7-2-13-3-20 0-5 5 4 6 7l3-2 7-13c10-16 1-47 4-65 1-9-6-46 1-52 6-6 29-6 38-8l7-1 11-3c4-1 11 0 14-2l1-2c0-15-18-28-20-43s-18-30-21-43c-3 23-35-3-22-20h28l7-2c6-1 22 0 26-4v-2c-4-13-27-28-36-38-11-11-28-23-36-36l-1-2-8-8-6-9-5-5c-2-3-3-7-5-1-9-28-44-11-67-17h-5l-13 1h-8l-17 1h-4l-17 1h-10l-13 1h-4l-15 1-16 1-18 1c-3 0-13 5-15 3-20 14-13 38-42 32s-41 6-63-12c-11-7-17-13-31-14l-11-2h-4l-17 1-24 1-18 1c-30 2-61 4-92 4-12 2-28 2-40 6l-4 2c2-14 1-29 5-42-7-7-43 13-52 16m429 94c0-1-2-3-1-4 12 2 24 4 36 3l-17-2c-15 0-29-8-45-7l4-3 8-6c2-2 4-5 7-5l2 6c5 11 14 13 25 14l2-1c11-5 21-16 21-29 10 2 19 8 26 15-6 9-19 11-29 15v2c17-5 34-10 50-18-31-28-83-46-118-14 19-15 36-41 62-37s56 13 81 23c-16-15-37-25-56-34 27-7 57 3 85 3s25 50 16 67c-8 17-11 55-31 62s-68 5-89 4-26-43-39-54m-284-38-14 14c-7 5-13 8-21 11h-1c-2 1-4 3-7 3 1 2 3 1 5 1h1c3-2 13-2 17-3h3l3-2c6-5 10-14 17-18 8-4 17-6 26-8l2-1c19-11 45-2 62 6 9 4 17 5 23 13 5 3 2-21-6-25-7-4-15-18-26-16 18-1 40 16 43 35l1 3c2 11-4 22-8 32l-4 13-4 10c-6 11-13 23-25 28l-10 2-31 2-14 1h-3c-7 2-17 1-24 0l-14-1c-32 0-46-26-54-50s-25-64 8-72l12-2h1c11-4 25-3 37-4l9-1 21-1c-7 10-18 19-25 30m151-15c-7 2-9-3-9-9 3 2 8 6 9 9m331 15v69l-43 4c16-22 11-70 43-73m-187 6c11 15-15 8 0 0m-6 266c-14-8-33-15-41-30 13 12 29 17 41 30m35 2c-16-9-33-17-46-31 16 8 34 17 46 31m-2 188c-12-47-65-52-75-100 50 10 65 56 75 100Z"
			/>
			<path
				fill="none"
				stroke="#F0DED3"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m622 676 4-4h-3l1-11v-14c0-4 2-8-1-11-4 13-3 28-5 42l4-2Z"
			/>
			<path
				fill="none"
				stroke="#02112F"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m1157 647-17 1-21 1c23 6 58-11 67 17 2-6 3-2 5 1-7-19-11-21-34-20Z"
			/>
			<path
				fill="none"
				stroke="#F7DCCF"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M624 661v-14 14Z"
			/>
			<path fill="none" stroke="#031F44" stroke-opacity=".5" stroke-width=".3" d="M1140 648Z" />
			<path
				fill="none"
				stroke="#163652"
				stroke-width=".3"
				d="M596 655c-9 11-39 36-33 52l27-12c4-16 8-32 15-47l-9 7Z"
			/>
			<path
				fill="none"
				stroke="#020308"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m1101 650 13-1-13 1Z"
			/>
			<path fill="none" stroke="#000107" stroke-opacity=".5" stroke-width=".3" d="M1076 651Z" />
			<path fill="none" stroke="#000008" stroke-opacity=".5" stroke-width=".3" d="M1055 652Z" />
			<path
				fill="none"
				stroke="#A6A5A4"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M567 654h1c2 0 2-1 3-2l-4 2Z"
			/>
			<path
				fill="none"
				stroke="#000008"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1032 653 13-1-13 1Z"
			/>
			<path
				fill="none"
				stroke="#000005"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m1013 654 15-1-15 1Z"
			/>
			<path
				fill="none"
				stroke="#697677"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m561 657 7-3h-1l-6 3Z"
			/>
			<path
				fill="none"
				stroke="#07314C"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m974 655 5 1 18-1h-23Z"
			/>
			<path
				fill="none"
				stroke="#1C506A"
				stroke-width=".3"
				d="M565 675c-10 6-20 14-29 22 9 2 18 6 27 10-6-16 24-41 33-52l-31 20Z"
			/>
			<path
				fill="none"
				stroke="#F4DACF"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m923 658 2 1h1c13 0 25-2 38-1l2-2c-12 1-30 3-43 2Z"
			/>
			<path
				fill="none"
				stroke="#0B2E4B"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m966 656-2 2v1c2 2 12-3 15-3l-5-1-8 1Z"
			/>
			<path
				fill="none"
				stroke="#505A66"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m554 660 4-2-4 2Z"
			/>
			<path
				fill="none"
				stroke="#FBDED3"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M907 659c4 0 12 1 15-1l-15 1Z"
			/>
			<path
				fill="none"
				stroke="#DC9281"
				stroke-width=".3"
				d="M907 659h-3v1c5 0 17 2 21-1l-2-1h-1c-3 2-11 1-15 1Z"
			/>
			<path
				fill="none"
				stroke="#991C28"
				stroke-width=".3"
				d="M926 659c-4 9 1 22-1 31-7 0-14-2-21-1 1-10-3-20 0-29v-1h-1s-2 2-3 1c4 15-14 17-18 23l-1-22c-6 4-9 16-15 23l-7-5c22 18 34 6 63 12s22-18 42-32v-1c-13-1-25 1-38 1Z"
			/>
			<path
				fill="none"
				stroke="#F3C3B1"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m884 660 16-1-16 1Z"
			/>
			<path
				fill="none"
				stroke="#D13025"
				stroke-width=".3"
				d="m884 660-24 1h-17l-16 1-4 2c2 0 4-1 5 1 14 1 20 7 31 14l7 5c6-7 9-19 15-23l1 22c4-6 22-8 18-23 1 1 3-1 3-1h-3l-16 1Z"
			/>
			<path
				fill="none"
				stroke="#E34124"
				stroke-width=".3"
				d="M904 660c-3 9 1 19 0 29 7-1 14 1 21 1 2-9-3-22 1-31h-1c-4 3-16 1-21 1Z"
			/>
			<path
				fill="none"
				stroke="#03182C"
				stroke-width=".3"
				d="m548 662-9 4c-9 3-31 9-28 21 1 2 3 1 3 5l1 5 8 24c4 3 11-11 17-10s15 7 22 7l28-20v-3l-27 12c-9-4-18-8-27-10 9-8 19-16 29-22-3 0 0-3 0-4 4 2 5-3 6-6l-17-5-6 2Z"
			/>
			<path
				fill="none"
				stroke="#CD211C"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M860 661h-17 17Z"
			/>
			<path
				fill="none"
				stroke="#2C575B"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m539 666 9-4-9 4Z"
			/>
			<path
				fill="none"
				stroke="#8C222D"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m817 663 11 2c-1-2-3-1-5-1l4-2-10 1Z"
			/>
			<path
				fill="none"
				stroke="#0B3352"
				stroke-width=".3"
				d="M1039 744c-9 3-29 8-39 2 13 11 18 53 39 54s69 3 89-4 23-45 31-62c9-17 12-67-16-67s-58-10-85-3c19 9 40 19 56 34-25-10-55-19-81-23s-43 22-62 37c35-32 87-14 118 14-16 8-33 13-50 18Z"
			/>
			<path
				fill="none"
				stroke="#059FD0"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m363 664 4-1-4 1Z"
			/>
			<path
				fill="none"
				stroke="#0FA7D6"
				stroke-width=".3"
				d="M363 664c-4 2-5 4-6 8-2 18-2 41-1 58 1 5 6 10 11 11 17 1 38-1 56-1h2c3-2 4-5 5-8 3-16 3-43 0-59-1-4-7-7-8-10h-55l-4 1Z"
			/>
			<path
				fill="none"
				stroke="#F6DAC2"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M430 673c4 13 4 46 0 59-1 3-2 6-5 8 4 0 8-4 9-8 2-14 4-64-10-69h-2c1 3 7 6 8 10Z"
			/>
			<path
				fill="none"
				stroke="#FBD4BA"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M434 732c3-12 5-69-10-69 14 5 12 55 10 69Z"
			/>
			<path fill="none" stroke="#0D1F3D" stroke-opacity=".4" stroke-width=".3" d="M796 664Z" />
			<path
				fill="none"
				stroke="#000006"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m754 666 18-1-18 1Z"
			/>
			<path
				fill="none"
				stroke="#1E2C42"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m626 672-4 4c12-4 28-4 40-6-10 0-27-2-36 2Z"
			/>
			<path fill="none" stroke="#04A4D5" stroke-opacity=".7" stroke-width=".3" d="M356 730Z" />
			<path
				fill="none"
				stroke="#92BFCC"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m1202 681 8 8 1 2 32 31-11-13-7-7-22-23-7-7 6 9Z"
			/>
			<path fill="none" stroke="#A5D2E3" stroke-width=".3" d="M430 732Z" />
			<path
				fill="none"
				stroke="#D52B2A"
				stroke-width=".3"
				d="M720 679c-15 7-28 41-39 54 8-3 14-6 21-11l14-14c7-11 18-20 25-30l-21 1Z"
			/>
			<path
				fill="none"
				stroke="#123E5C"
				stroke-width=".3"
				d="m590 698-28 20c-7 0-16-6-22-7s-13 13-17 10l2 4 3 10 1 3 3 4 1 3c1 4 4 7 4 10 1 25 8 48 15 71h1l18 1c7 0 15 1 22-2 5-25-18-41-18-65-1-1-2 1-3 1-4 1-7 6-12 6-1-4 3-8 6-10 11-13 34-17 33-37a192 192 0 0 0-60 47c-3-19 23-31 36-42 18-10 47-21 40-46-7 8-16 14-25 19Z"
			/>
			<path
				fill="none"
				stroke="#EC4A2D"
				stroke-width=".3"
				d="M711 680c-9 2-23 4-31 10-5 4-14 4-13 10-2 0-6-2-6-5 6-2 5-8 10-10l-10 1c-33 8-16 48-8 72s22 50 54 50l32 1h5v-2l-3-3c-6-6-14-11-21-16-8-5-14-14-20-20-3-3-15-11-15-15 1-7 16-11 17-17 1-3-1-2-3-2h-3c-5 2-10 3-17 3h-1l-10 2c3-4 8-4 12-6h1c11-13 24-47 39-54l-9 1Z"
			/>
			<path
				fill="none"
				stroke="#88B7BD"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1225 702-22-23 22 23Z"
			/>
			<path
				fill="none"
				stroke="#E5A46D"
				stroke-width=".3"
				d="m674 684 5 2c-1 1-2 6 1 4 8-6 22-8 31-10-12 1-26 0-37 4Z"
			/>
			<path fill="none" stroke="#466478" stroke-width=".3" d="m1210 689-8-8 8 8Z" />
			<path
				fill="none"
				stroke="#101C35"
				stroke-width=".3"
				d="M832 724v3c4-2 6-7 11-9-3-19-25-36-43-35 11-2 19 12 26 16 8 4 11 28 6 25Z"
			/>
			<path fill="none" stroke="#973A40" stroke-width=".3" d="m661 686 10-1 2-1-12 2Z" />
			<path
				fill="none"
				stroke="#F58A59"
				stroke-width=".3"
				d="M671 685c-5 2-4 8-10 10 0 3 4 5 6 5-1-6 8-6 13-10-3 2-2-3-1-4l-5-2h-1l-2 1Z"
			/>
			<path
				fill="none"
				stroke="#180215"
				stroke-width=".3"
				d="M867 693c-1-3-6-7-9-9 0 6 2 11 9 9Z"
			/>
			<path
				fill="none"
				stroke="#CEC3BB"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M514 694v-2c0-4-2-3-3-5l3 7Z"
			/>
			<path
				fill="none"
				stroke="#17232C"
				stroke-width=".3"
				d="m1247 727-4-5-32-31c8 13 25 25 36 36Z"
			/>
			<path
				fill="none"
				stroke="#979494"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m514 694 1 3-1-5v2Z"
			/>
			<path
				fill="none"
				stroke="#0B2640"
				stroke-width=".3"
				d="m747 705 11 2c18 2 36 2 51 12 1 0 1-3 3-2 0-2-2-7-4-3l1-3c-17-8-43-17-62-6Z"
			/>
			<path fill="none" stroke="#724158" stroke-width=".3" d="m745 706 10 3 3-2-11-2-2 1Z" />
			<path
				fill="none"
				stroke="#C23C2C"
				stroke-width=".3"
				d="M719 714c-7 4-10 14-17 18l-3 2c2 0 4-1 3 2 15-12 36-20 53-27l-10-3c-9 2-18 4-26 8Z"
			/>
			<path
				fill="none"
				stroke="#020513"
				stroke-width=".3"
				d="M755 709c-17 7-38 15-53 27l-11 12c12-9 25-8 37-2h3c-12-6-8-13 3-18 1 6 7 10 11 15l5 3c5 2 9 1 15 1 7-2 16-10 17-19 2-8 24 2 21 8 4-3 12 0 13 5l-4-1c2 2 5 3 5-1 3 0 10 6 10-1v-1c-4-6-12-14-18-18-15-10-33-10-51-12l-3 2m-4 14c1 8 12 12 11 21-15 7-33-20-11-21Z"
			/>
			<path fill="none" stroke="#451D23" stroke-width=".3" d="m702 722 14-14-14 14Z" />
			<path
				fill="none"
				d="m893 710-2 1-1 1c-3 4-6 6-7 11l-1 6c-3 30 8 79-31 82l-34 3-3-1c-22-5-52 6-75 6l-19 2h-9l-13 1-2 1c-4 1-10 0-13-1-6-1-9-3-12-8-15-21-27-47-42-69l-9-14-4 59-1 16c0 13-3 27 3 38l12 17v1c9 6 17 23 23 32l4 6 5 8c9 10 22 26 27 39 5 12-4 35-6 48l-5 30-1 5c0 4 1 7 3 11l11 16 10 15 8 13 6 9c4 6 10 19 18 16l6-3 11-8 7-4 15-10 24-15 6-5 3-1 4-3 4-2 17-12c7-4 16-14 24-15h6l7 4 1 1 21 13 12 7 4 3 3 1c10 5 12 9 23 3l12-6h1c7-7 19-9 27-14 24-13 33-19 54 3l12 10a164 164 0 0 1 24 19l5 5c7 6 13 10 21 14 2 0 5-2 5-4-7-32-10-70-45-78s-56-25-90-34l-9-79c-5-8-11 3-12 7l-2 11-6 29-2 11-1 2-1 9c-1 4-4 5-8 6-14 5-29 8-44 12l-5 1-32 9-5 1-12 3-4 1-7 2-5 1c-14 5-18 24-30 32v1c-2 5-7 9-10 13-4 6-10 16-16 19l-1 1c-8-1-10-12-13-18l-13-28c-12-23-2-39 5-63l4-11c6-30 18-34 46-40l5-2 13-4 12-3 1-1 8-2 5-1 20-6 6-2h1l7-2 6-2c10-2 20-7 30-8l8-1h13c19 0 24-7 38-18l1-1-1-8-12-33-3-8c-3-5-4-9-4-16v-1c-3-3-2-11-2-16l-2-13-2-16c-7-17 9-26 17-37l-5-1c-10-1-27-2-36-1l-5 2Z"
			/>
			<path fill="none" stroke="#040207" stroke-opacity=".1" stroke-width=".3" d="M934 709Z" />
			<path
				fill="none"
				stroke="#03213F"
				stroke-width=".3"
				d="M1198 708c-32 3-27 51-43 73l43-4v-69Z"
			/>
			<path
				fill="none"
				stroke="#9FCCCF"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M1243 722h1l-12-13 11 13Z"
			/>
			<path
				fill="none"
				stroke="#B2372F"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M882 714c2-2 4-2 6-2-2 3-6 8-5 11 1-5 4-7 7-11-2 0 1-1 1-1l2-1c-4 1-8 0-11 4Z"
			/>
			<path
				fill="none"
				stroke="#07344D"
				stroke-width=".3"
				d="M809 719c6 4 14 12 18 18 0 0 14-22 17-16l-1-3c-5 2-7 7-11 9v-3c-6-8-14-9-23-13l-1 3c2-4 4 1 4 3-2-1-2 2-3 2Z"
			/>
			<path
				fill="none"
				stroke="#E74D3B"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m890 712 1-1s-3 1-1 1Z"
			/>
			<path
				fill="none"
				stroke="#EA472D"
				stroke-width=".3"
				d="M882 714c-5 10-7 29-20 29-11 20-20 41-34 59-2 2-8 11-11 12l34-3c9-5 23-6 23-17v-22c0-15 8-28 4-43h4l1-6c-1-3 3-8 5-11-2 0-4 0-6 2Z"
			/>
			<path
				fill="none"
				stroke="#597D91"
				stroke-width=".3"
				d="m1021 741 14 1h4c10-4 23-6 29-15-7-7-16-13-26-15 0 13-10 24-21 29Z"
			/>
			<path
				fill="none"
				stroke="#DD2C2C"
				stroke-width=".3"
				d="M602 736c1-4 13-9 16-9-3-4-1-10-3-14-15 3-14 10-13 23Z"
			/>
			<path
				fill="none"
				stroke="#431317"
				stroke-width=".3"
				d="M702 732c7-4 10-14 17-18-7 4-11 13-17 18Z"
			/>
			<path fill="none" stroke="#19292F" stroke-width=".3" d="M1011 714c-15 8 11 15 0 0Z" />
			<path
				fill="none"
				stroke="#245C76"
				stroke-width=".3"
				d="M827 737v1c2 3-19 19-26 23s-24 15-31 21-23 16-26 25v2h4l14-1 31-2 11-7 17-18c4-5 8-9 10-15l5-13c4-10 10-21 8-32-3-6-17 16-17 16Z"
			/>
			<path
				fill="none"
				stroke="#2E5B7B"
				stroke-width=".3"
				d="m985 727 2 3c3-1 5 0 7-2l-2-6c-3 0-5 3-7 5Z"
			/>
			<path
				fill="none"
				stroke="#E7DBCB"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M1247 727c9 10 32 25 36 38 1-3-4-6-6-9l-20-21c-4-4-8-10-13-13h-1l4 5Z"
			/>
			<path
				fill="none"
				stroke="#021623"
				stroke-width=".3"
				d="M751 723c-22 1-4 28 11 21 1-9-10-13-11-21Z"
			/>
			<path
				fill="none"
				stroke="#5D7C94"
				stroke-width=".3"
				d="m765 747 2 1h2l8-1c9-2 16-5 24-10l2-1c3-6-19-16-21-8-1 9-10 17-17 19Z"
			/>
			<path
				fill="none"
				stroke="#0D3865"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m528 735-3-10 3 10Z"
			/>
			<path
				fill="none"
				stroke="#010F25"
				stroke-width=".3"
				d="m568 739 7-14c-13 11-39 23-36 42 8-10 19-20 29-28Z"
			/>
			<path
				fill="none"
				stroke="#F3DED4"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M602 736v82l3 8c17 45 57 83 84 121-5-13-18-29-27-39l-5-8-4-6-23-32v-1c-5-3-9-12-12-17-6-11-3-25-3-38l1-16 4-59 9 14c-3-7-6-12-11-18-3 0-15 5-16 9Z"
			/>
			<path fill="none" stroke="#1D1E3A" stroke-width=".3" d="m977 733 10-3-2-3-8 6Z" />
			<path
				fill="none"
				stroke="#EECEBD"
				stroke-width=".3"
				d="M731 746h2l7 1c1 0 3-4 5-4-4-5-10-9-11-15-11 5-15 12-3 18Z"
			/>
			<path
				fill="none"
				stroke="#C38E84"
				stroke-width=".3"
				d="m987 730-10 3-4 3c16-1 30 7 45 7h4l-3-1c-11-1-20-3-25-14-2 2-4 1-7 2Z"
			/>
			<path
				fill="none"
				stroke="#F9E2D9"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M874 772v22c0 11-14 12-23 17 39-3 28-52 31-82h-4c4 15-4 28-4 43Z"
			/>
			<path
				fill="none"
				stroke="#5D1F1C"
				stroke-width=".3"
				d="M678 737c-2 0-4 1-5-1 3 0 5-2 7-3-4 2-9 2-12 6l10-2Z"
			/>
			<path
				fill="none"
				stroke="#721B25"
				stroke-width=".3"
				d="M679 737c7 0 12-1 17-3-4 1-14 1-17 3Z"
			/>
			<path
				fill="none"
				stroke="#922729"
				stroke-width=".3"
				d="m803 736-2 3c3 1 8-1 10 1h1l4 1c-1-5-9-8-13-5Z"
			/>
			<path
				fill="none"
				stroke="#F6D8C6"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m1277 756-20-21 20 21Z"
			/>
			<path
				fill="none"
				stroke="#612F33"
				stroke-width=".3"
				d="m685 753 6-5 11-12c-1 6-16 10-17 17Z"
			/>
			<path
				fill="none"
				stroke="#531B24"
				stroke-width=".3"
				d="m801 737-2 3h12c-2-2-7 0-10-1l2-3-2 1Z"
			/>
			<path
				fill="none"
				stroke="#040E26"
				stroke-width=".3"
				d="M777 747c2 0 4 1 5 4h-5c5 1 10 4 14 7-4 6-12 7-16 12-4 4-4 8-5 12 7-6 24-17 31-21s28-20 26-23c0 7-7 1-10 1 0 4-3 3-5 1h-13l2-3c-8 5-15 8-24 10Z"
			/>
			<path
				fill="none"
				stroke="#98D2E5"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m530 741 2 1-3-4 1 3Z"
			/>
			<path
				fill="none"
				stroke="#0A9ACD"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M367 741c13 2 44 4 56-1-18 0-39 2-56 1Z"
			/>
			<path
				fill="none"
				stroke="#CFE4ED"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M532 745h1l-1-3-2-1 2 4Z"
			/>
			<path
				fill="none"
				stroke="#2D6988"
				stroke-width=".3"
				d="m691 748-6 5c0 4 12 12 15 15l20 20c7 5 15 10 21 16-1-10 27-28 34-34 4-5 12-6 16-12-4-3-9-6-14-7h-4l-27-1h-4c-5 0-10-2-14-4-12-6-25-7-37 2m84 20c-2 2-5 1-8 1 2 5-26 2-35-2 13-2 30-2 43 1Z"
			/>
			<path fill="none" stroke="#8F9396" stroke-width=".3" d="m1019 742 3 1 13-1-14-1-2 1Z" />
			<path
				fill="none"
				stroke="#061127"
				stroke-width=".3"
				d="M1000 746c10 6 30 1 39-2l-4 1c-12 1-24-1-36-3-1 1 1 3 1 4Z"
			/>
			<path fill="none" stroke="#422820" stroke-width=".3" d="M1022 743h-4l17 2 4-1v-2h-4l-13 1Z" />
			<path fill="none" stroke="#F2B951" stroke-width=".3" d="m740 747 9 2 1-3-5-3c-2 0-4 4-5 4Z" />
			<path
				fill="none"
				stroke="#D6EAF1"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M534 750c1 4 0 7-3 10l6-5c0-3-3-6-4-10h-1l2 5Z"
			/>
			<path fill="none" stroke="#1F3A5A" stroke-width=".3" d="m742 750-9-4h-5c4 2 9 4 14 4Z" />
			<path fill="none" stroke="#6D3134" stroke-width=".3" d="M742 750h7v-1l-9-2-7-1 9 4Z" />
			<path
				fill="none"
				stroke="#CCA37C"
				stroke-width=".3"
				d="M749 749v1l18-2-2-1c-6 0-10 1-15-1l-1 3Z"
			/>
			<path fill="none" stroke="#03050E" stroke-width=".3" d="m769 748 4 3h9c-1-3-3-4-5-4l-8 1Z" />
			<path
				fill="none"
				stroke="#772524"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M924 763h2l-4-16 2 16Z"
			/>
			<path fill="none" stroke="#2C2225" stroke-width=".3" d="M749 750h-3l27 1-4-3h-2l-18 2Z" />
			<path
				fill="none"
				stroke="#E8F4FB"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m518 771 13-11c3-3 4-6 3-10 1 7-11 17-16 21Z"
			/>
			<path fill="none" stroke="#0E254B" stroke-width=".3" d="M831 766h1l4-13-5 13Z" />
			<path
				fill="none"
				d="M964 760c0-1-1-4 1-4 2 4 4 8 3 13l-1 5v14l-1 13 2 4 6 7 5 6c8 10 34 29 36 42 1 9-10 16-9 24 6 7 16 11 25 14l6 2 4 2 11 5c14 5 36 9 42 23l7 13 2 4 2 5 2 4 8 6c2-15-1-32 11-44v-1l4-6 8-13 11-16 8-11 5-8c4-10 13-20 19-28l4-8-5-8c-5-5-11-8-15-14h-1c-4 5-16 3-22 3l-49 1-22 1h-16l-26 1c-18 9-34-6-40-20-6-13-16-31-22-31l-3-6c-2 1-1 5 0 6Z"
			/>
			<path
				fill="none"
				stroke="#14A6D6"
				stroke-width=".3"
				d="m531 760-13 11-18 16-15 14c-5 4-25 19-15 25 21 8 59 0 82 0-7-23-14-46-15-71l-6 5Z"
			/>
			<path
				fill="none"
				stroke="#D63734"
				stroke-width=".3"
				d="M964 760v1l4 8c1-5-1-9-3-13-2 0-1 3-1 4Z"
			/>
			<path
				fill="none"
				stroke="#021032"
				stroke-width=".3"
				d="M572 761c-2-1-5-1-6-4-3 2-7 6-6 10 5 0 8-5 12-6Z"
			/>
			<path
				fill="none"
				stroke="#092E4F"
				stroke-width=".3"
				d="m930 796 2 13 3 8c6 9 8 13 11 23v-12c23-1 22 24 25 40h-5c17 3 3 27-4 32 45 37 119 60 155 116l-2-28c-2-13-2-20-8-32l-2-4c-7-9-15-26-24-31l-43-19-7-4c-9-3-19-7-25-14-5-7 12-20 2-28-9-9-11-17-20-26-5-5-10-10-13-16l-7-9-2-4-2-2-2-3c-10-9-16-24-23-36-5 11-10 23-9 36Z"
			/>
			<path
				fill="none"
				stroke="#6F1E1E"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m967 774 1-5-4-8c1 5 3 8 3 13Z"
			/>
			<path
				fill="none"
				stroke="#9E2427"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m926 776 2 16v1h1l-3-30h-2l2 13Z"
			/>
			<path
				fill="none"
				stroke="#0E3354"
				stroke-width=".3"
				d="M775 768c-13-3-30-3-43-1 9 4 37 7 35 2 3 0 6 1 8-1Z"
			/>
			<path
				fill="none"
				stroke="#A48666"
				stroke-width=".3"
				d="m821 781 7-5 4-10h-1c-2 6-6 10-10 15Z"
			/>
			<path
				fill="none"
				stroke="#EAD1BC"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M1257 771v1h18c3 0 10-1 8-5-4 4-20 3-26 4Z"
			/>
			<path fill="none" stroke="#976661" stroke-width=".3" d="m720 788-20-20c6 6 12 15 20 20Z" />
			<path
				fill="none"
				stroke="#092E4B"
				stroke-width=".3"
				d="m741 804 3 3c3-9 19-19 26-25 1-4 1-8 5-12-7 6-35 24-34 34Z"
			/>
			<path
				fill="none"
				stroke="#C3BAB2"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1250 773h6l1-1v-1l-7 2Z"
			/>
			<path fill="none" stroke="#EDB9AE" stroke-width=".3" d="M874 794v-22 22Z" />
			<path
				fill="none"
				stroke="#F3D5BE"
				stroke-opacity=".1"
				stroke-width=".3"
				d="m1256 773 19-1h-18l-1 1Z"
			/>
			<path
				fill="none"
				stroke="#043A5F"
				stroke-width=".3"
				d="m1244 793 1-6c-2-4-6-12 1-14h-24c-13 17 19 43 22 20Z"
			/>
			<path
				fill="none"
				stroke="#D55541"
				stroke-width=".3"
				d="m821 781-17 18c-2 1-3 4-5 4 0 3 2 1 4 1 12-5 19-17 25-28l-7 5Z"
			/>
			<path
				fill="none"
				stroke="#D41F23"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m928 792-2-16c0 5-1 13 2 16Z"
			/>
			<path fill="none" stroke="#40383D" stroke-width=".3" d="M602 798v-15 15Z" />
			<path
				fill="none"
				stroke="#71C3E2"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m485 801 15-14-15 14Z"
			/>
			<path
				fill="none"
				stroke="#E7D1BE"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M1244 793c3 13 19 28 21 43s20 28 20 43c4-7-14-37-18-44-2-2-2-4-3-7l-1-2c-3-4-4-8-6-13-3-9-8-18-12-26l-1 6Z"
			/>
			<path fill="none" stroke="#A92327" stroke-width=".3" d="m962 796 2 3 2-11h-5l1 8Z" />
			<path
				fill="none"
				stroke="#9E1722"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m964 799 2 2 1-13h-1l-2 11Z"
			/>
			<path
				fill="none"
				stroke="#F2E0D5"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m615 806 1-16-1 16Z"
			/>
			<path
				fill="none"
				stroke="#932F2E"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m932 809-2-13-1-3h-1c0 7 1 11 4 16Z"
			/>
			<path
				fill="none"
				stroke="#854D58"
				stroke-width=".3"
				d="m793 806 10-2c-2 0-4 2-4-1 2 0 3-3 5-4l-11 7Z"
			/>
			<path
				fill="none"
				stroke="#491613"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m814 813 3 1c3-1 9-10 11-12-3 4-9 10-14 11Z"
			/>
			<path
				fill="none"
				stroke="#101937"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m975 814-1-2-6-7 7 9Z"
			/>
			<path
				fill="none"
				stroke="#611B29"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M1142 808c6 0 18 2 22-3l-22 3Z"
			/>
			<path
				fill="none"
				stroke="#6D1825"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1180 819c-3-5-8-15-15-14 4 6 10 9 15 14Z"
			/>
			<path fill="none" stroke="#A13F33" stroke-width=".3" d="M721 809h18l-32-1 14 1Z" />
			<path fill="none" stroke="#173A4B" stroke-width=".3" d="m748 809 14-1-14 1Z" />
			<path fill="none" stroke="#261816" stroke-width=".3" d="M745 809h-24c7 1 17 2 24 0Z" />
			<path fill="none" stroke="#050304" stroke-opacity=".4" stroke-width=".3" d="M1071 810Z" />
			<path
				fill="none"
				stroke="#060307"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m1029 811 26-1c-9 0-18-1-26 1Z"
			/>
			<path
				fill="none"
				stroke="#601D2E"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M975 814c3 6 8 11 13 16l-9-12-5-6 1 2Z"
			/>
			<path
				fill="none"
				stroke="#F9D9C1"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1263 826-6-13c2 5 3 9 6 13Z"
			/>
			<path
				fill="none"
				stroke="#EFDCD4"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m683 822 13 1 2-1c3-2 9-1 13-1h9v-1c-13 1-39 2-49-6 3 5 6 7 12 8Z"
			/>
			<path
				fill="none"
				stroke="#AE2F35"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m947 850-1-10c-3-10-5-14-11-23l12 33Z"
			/>
			<path
				fill="none"
				stroke="#133854"
				stroke-width=".3"
				d="M602 826c0 34-3 66 28 86 12-35-18-58-25-86l-3-8v8Z"
			/>
			<path
				fill="none"
				stroke="#D6141F"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M988 830c7 7 25 21 27 30-2-13-28-32-36-42l9 12Z"
			/>
			<path
				fill="none"
				stroke="#782028"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M720 820v1l19-2-19 1Z"
			/>
			<path
				fill="none"
				stroke="#F8E7DF"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m698 822 13-1c-4 0-10-1-13 1Z"
			/>
			<path
				fill="none"
				stroke="#F6E4D6"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m696 823-13-1c3 1 9 2 13 1Z"
			/>
			<path
				fill="none"
				stroke="#CAE7E0"
				stroke-width=".3"
				d="M473 827c25 2 55 2 80 0v-1h-1c-23 0-61 8-82 0l3 1Z"
			/>
			<path
				fill="none"
				stroke="#EFD0C2"
				stroke-width=".3"
				d="M553 827v1l4 3c9 12 2 51 2 67h14v-9l-1-21v-20l-1-19v-2l-18-1v1Z"
			/>
			<path
				fill="none"
				stroke="#0E1D2F"
				stroke-width=".3"
				d="M599 918v1c8 6 16 15 22 23-9 3-14 13-22 17 13 7 20 15 8 29 10 6-3 35-18 40 16-31 8-65 8-99v-5c-8 6-18 9-24 16-5-1-10-6-14-9 0 12 2 28 0 40s5 30-1 39l-1 2v3h-8c-11 0-31-4-41 1l-23 34c-2 3-9 10-10 13-1 4 2 7 5 8 45 11 101-13 144 1 3 1 4 1 5 4 11 41-9 90 0 132l1 2c2 2 4 4 6 4h51c8-4 0-29 2-38s-1-30 0-40c-16-22-8-39 10-59-2 20-2 42-9 59 17 24 55 46 80 61-7-11 3-29 0-42s2-31 0-44c-1 0-2 3-3 1 3-3-2-5 4-4-2-3-5-6-1-10-13 2-32 20-43 17-24-28-70-82-45-120-3-16 9-32 7-48-27-38-67-76-84-121 7 28 37 51 25 86-31-20-28-52-28-86-1 13 1 34-1 47s6 35-2 45m71 9c-3 9-12 16-19 21l-1-45c9 5 12 17 20 24m-13 64c-4 14-14 26-18 40 6-5 13-11 21-12 9 28-16 37-30 52-13-12-22-30-35-43 22-9 42-23 62-37Z"
			/>
			<path
				fill="none"
				stroke="#FDE0C9"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M247 828h58c-16-4-42-3-58 0Z"
			/>
			<path
				fill="none"
				stroke="#F6E0CE"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M553 828v-1a486 486 0 0 1 0 1Z"
			/>
			<path
				fill="none"
				stroke="#06223C"
				stroke-width=".3"
				d="m1181 835-19 29c-1 4-5 10-7 13l34 38c-6-27 7-63-4-88l-4 8Z"
			/>
			<path
				fill="none"
				stroke="#D2BEB3"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M243 829h27v-1h-23l-4 1Z"
			/>
			<path fill="none" stroke="#A59C9B" stroke-width=".3" d="M270 829h27v-1h-27v1Z" />
			<path
				fill="none"
				stroke="#F8D9C1"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M297 829c7 0 10 4 12 10 3 12 1 29 1 42 0 7 2 21-6 24 7-1 9-4 10-10 2-18 2-39 0-57-1-6-3-8-9-10h-8v1Z"
			/>
			<path
				fill="none"
				stroke="#124260"
				stroke-width=".3"
				d="m946 840 1 10 1 8v11l18-1h5c-3-16-2-41-25-40v12Z"
			/>
			<path
				fill="none"
				stroke="#FFC3A7"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m1267 835-3-7c1 3 1 5 3 7Z"
			/>
			<path fill="none" stroke="#051C31" stroke-width=".3" d="M243 830c7 1 16 0 22-1h-22v1Z" />
			<path
				fill="none"
				stroke="#16405D"
				stroke-width=".3"
				d="M243 830c-4 1-6 4-6 8 0 11-5 60 6 66 13 6 47 3 61 1 8-3 6-17 6-24-1-13 1-28-1-42-2-6-5-10-12-10h-32c-6 1-15 2-22 1Z"
			/>
			<path fill="none" stroke="#908983" stroke-width=".3" d="M572 848c0-6 1-14-1-19l1 19Z" />
			<path
				fill="none"
				stroke="#9F1F31"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M1006 884c-1-8 10-15 9-24-2-9-20-23-27-30 9 9 11 17 20 26 10 8-7 21-2 28Z"
			/>
			<path
				fill="none"
				stroke="#EFD0C1"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M558 899h1v-1c0-16 7-55-2-67 8 15 1 51 1 68Z"
			/>
			<path
				fill="none"
				stroke="#40253E"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M1162 863v1l19-29c-6 8-15 18-19 28Z"
			/>
			<path
				fill="none"
				stroke="#15425D"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M243 904c-11-6-6-55-6-66-1 12-6 61 6 66Z"
			/>
			<path fill="none" stroke="#FED4B6" stroke-opacity=".2" stroke-width=".3" d="M314 895Z" />
			<path
				fill="none"
				stroke="#4E586F"
				stroke-width=".3"
				d="M310 881c0-13 2-30-1-42 2 14 0 29 1 42Z"
			/>
			<path
				fill="none"
				stroke="#FEEFE5"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m630 861-12-17c3 5 7 14 12 17Z"
			/>
			<path
				fill="none"
				stroke="#72324E"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m947 859-1 9c0 3 0 1 2 1v-11l-1 1Z"
			/>
			<path
				fill="none"
				stroke="#BD332F"
				stroke-width=".3"
				d="m909 877-13 1c-2 2-1 3-1 5s2 6-3 6l1 4c2 3 5 4 8 6 12 0 34-16 42-26l3-5 1-9c-14 11-19 18-38 18Z"
			/>
			<path
				fill="none"
				stroke="#FAEDE3"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M653 894c-6-9-14-26-23-32l23 32Z"
			/>
			<path
				fill="none"
				stroke="#5A243A"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m1157 871-5 8 3-2c2-3 6-9 7-13v-1l-5 8Z"
			/>
			<path fill="none" stroke="#91928D" stroke-width=".3" d="M573 889Z" />
			<path
				fill="none"
				stroke="#912C33"
				stroke-width=".3"
				d="M943 873h16c1 9 3 17 3 27 7-5 21-29 4-32l-18 1c-2 0-2 2-2-1l-3 5Z"
			/>
			<path
				fill="none"
				stroke="#822D3D"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1149 882 2-1 1-2 5-8-8 11Z"
			/>
			<path
				fill="none"
				stroke="#E86D64"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m888 878 4 3 3 2c0-2-1-3 1-5v-1l-8 1Z"
			/>
			<path
				fill="none"
				stroke="#C82C2C"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m896 878 13-1h-13v1Z"
			/>
			<path
				fill="none"
				stroke="#02010D"
				stroke-width=".3"
				d="m858 886-2 5h20c3 0 6 0 8 2l2 2c2-2-1-3-1-4 1-2 4-2 6-2 5-2 5-5 1-8l-4-3c-10 1-20 6-30 8Z"
			/>
			<path
				fill="none"
				stroke="#511618"
				stroke-width=".3"
				d="M891 889c-1 2 1 3 2 4l-1-4c5 0 3-4 3-6l-3-2c4 3 4 6-1 8Z"
			/>
			<path
				fill="none"
				stroke="#591E2B"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m1149 882-11 16 8-9 5-8-2 1Z"
			/>
			<path
				fill="none"
				stroke="#D6CCC2"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1270 883c4 0 11 3 14-2-3 2-10 1-14 2Z"
			/>
			<path
				fill="none"
				stroke="#B43934"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m852 888-7 2h-1v2l12-1 2-5-6 2Z"
			/>
			<path
				fill="none"
				stroke="#EBC2A2"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M1252 887c1 3 3 8 6 10l-1-3c-1-3-1-6 2-8l-7 1Z"
			/>
			<path
				fill="none"
				stroke="#E05629"
				stroke-width=".3"
				d="M1214 895c-1 17 1 37-1 52-3 19 8 50-4 65l-7 13c-1 1-1 4-3 4-1-3-4-9-6-9 1 7 3 13 3 20-5 1-8-4-13-4 5 14 5 25-5 37 26 12 63 7 88 22l4 4 5 3c3 3 4 7 5 9 11 14 15-9 15-17s2-17 4-24l5-38c1-27 6-53-10-75s-27-35-36-59v-1c-3-2-5-7-6-10-9 2-32 2-38 8Z"
			/>
			<path
				fill="none"
				stroke="#EA5435"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m845 890 7-2-7 2Z"
			/>
			<path
				fill="none"
				stroke="#0B0B24"
				stroke-width=".3"
				d="m886 895 15 5v-1c-3-2-6-3-8-6-1-1-3-2-2-4-2 0-5 0-6 2 0 1 3 2 1 4Z"
			/>
			<path
				fill="none"
				stroke="#061A34"
				stroke-width=".3"
				d="m1138 898-8 13-4 6v1l22 22c1-16-5-34-2-51l-8 9Z"
			/>
			<path
				fill="none"
				stroke="#DDEDF0"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M838 892h6v-2l-6 2Z"
			/>
			<path
				fill="none"
				stroke="#1CA1D1"
				stroke-width=".3"
				d="M844 892h-6l-20 6-5 2c-3 1-5 2-8 1l-1 1c-3 3-9 2-12 3l-13 4-5 2c-28 6-40 10-46 40l-4 11c-7 24-17 40-5 63 1-23 38-52 51-67s26-13 37-23c12-9 31-13 38-21 8-7 41-14 39-21-2-2-5-2-8-2-5 0-15 3-19 0h-1l-12 1Z"
			/>
			<path fill="none" stroke="#17435F" stroke-width=".3" d="M876 891h-19c4 3 14 0 19 0Z" />
			<path
				fill="none"
				stroke="#092C49"
				stroke-width=".3"
				d="m719 1025 13 28c1 2 4 5 4 8-1-38 47-53 77-63l2-1 17-8c10-6 19-13 31-15 7-2 14-4 22-4l14-1c20-8 20-60-8-44 13-13 26-10 39 2l5-23-1-3c-11 2-22 2-33-1l-15-5-2-2c2 7-31 14-39 21-7 8-26 12-38 21-11 10-24 8-37 23s-50 44-51 67m127-73c-31 22-64 48-96 70 25-29 64-48 96-70Z"
			/>
			<path
				fill="none"
				stroke="#0C2D46"
				stroke-width=".3"
				d="m573 898-12 1c-4 8-2 22-2 32 4 3 9 8 14 9 6-7 16-10 24-16v5l2-10v-1c-16-10-1-27-26-20Z"
			/>
			<path
				fill="none"
				stroke="#93CCD9"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m935 904-5 23c-3 16-5 33-14 47v1c4-1 7-2 8-6 1-2-1-6 1-9l1-2 2-11 6-29 2-11c1-4 7-15 12-7-1-12-11-3-13 4Z"
			/>
			<path
				fill="none"
				stroke="#FEDFC7"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1258 897v1h1l-2-4 1 3Z"
			/>
			<path
				fill="none"
				stroke="#9E4727"
				stroke-width=".3"
				d="M1213 947c2-15 0-35 1-52-7 6 0 43-1 52Z"
			/>
			<path fill="none" stroke="#B9A8A9" stroke-width=".3" d="M559 899h2l12-1h-14v1Z" />
			<path
				fill="none"
				stroke="#0D93D1"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M813 899v1l5-2-5 1Z"
			/>
			<path
				fill="none"
				stroke="#7C2543"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m1038 902-1-2-6-2 7 4Z"
			/>
			<path
				fill="none"
				stroke="#FCCDAD"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M1304 1032c2-15 6-30 7-45 0-5-2-8-4-12l-4-7-8-13-3-4-7-12c-7-11-15-34-26-41h-1c9 24 20 37 36 59s11 48 10 75Z"
			/>
			<path
				fill="none"
				stroke="#B2A292"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M399 901c9-5 29-1 39-1v-1c-9 0-34-3-39 2Z"
			/>
			<path
				fill="none"
				stroke="#CDC9C6"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M438 900h23v-1h-23v1Z"
			/>
			<path
				fill="none"
				stroke="#F9F9F7"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m461 900 6 8c5 13 4 47 0 60l-5 8 3-1c11-8 6-54 6-66-1-5-5-10-10-10v1Z"
			/>
			<path
				fill="none"
				stroke="#0D1825"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M558 1010c6-9-1-27 1-39s0-28 0-40c0-10-2-24 2-32h-3c0 33 8 79 0 111Z"
			/>
			<path
				fill="none"
				stroke="#0E87C9"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M805 901c3 1 5 0 8-1v-1l-8 2Z"
			/>
			<path
				fill="none"
				stroke="#040612"
				stroke-width=".3"
				d="m399 901-5 8c-3 16-2 41 0 57 2 8 6 10 14 10h54l5-8c3-16 3-44 0-60l-6-8h-23c-10 0-30-4-39 1Z"
			/>
			<path
				fill="none"
				stroke="#EDD9BE"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m662 908-5-8 5 8Z"
			/>
			<path
				fill="none"
				stroke="#7C1D2E"
				stroke-opacity=".8"
				stroke-width=".3"
				d="m1038 902 43 19c9 4 17 18 22 26l-2-4-7-13c-6-14-28-18-42-23l-11-5-4-2 1 2Z"
			/>
			<path
				fill="none"
				stroke="#0A92D3"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M792 905c3-1 9 0 12-3l-12 3Z"
			/>
			<path
				fill="none"
				stroke="#BF242C"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1052 907-11-5 11 5Z"
			/>
			<path
				fill="none"
				stroke="#0F3655"
				stroke-width=".3"
				d="M670 927c-8-7-11-19-20-24l1 45c7-5 16-12 19-21Z"
			/>
			<path
				fill="none"
				stroke="#A5DEE7"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m934 918 2-11-2 11Z"
			/>
			<path
				fill="none"
				stroke="#676B72"
				stroke-width=".3"
				d="M467 968c4-13 5-47 0-60 3 16 3 44 0 60Z"
			/>
			<path fill="none" stroke="#04050B" stroke-opacity=".4" stroke-width=".3" d="M394 966Z" />
			<path
				fill="none"
				stroke="#FEFDF9"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M465 975c12-6 8-53 6-66 0 12 5 58-6 66Z"
			/>
			<path
				fill="none"
				stroke="#038FB8"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m774 911 5-2-5 2Z"
			/>
			<path
				fill="none"
				stroke="#061033"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1126 917 4-6-4 6Z"
			/>
			<path
				fill="none"
				stroke="#010410"
				stroke-width=".3"
				d="M899 969c5 0 10-1 14 2l3 3c9-14 11-31 14-47-13-12-26-15-39-2 28-16 28 36 8 44Z"
			/>
			<path
				fill="none"
				stroke="#14415B"
				stroke-width=".3"
				d="M597 929c0 34 8 68-8 99 15-5 28-34 18-40 12-14 5-22-8-29 8-4 13-14 22-17-6-8-14-17-22-23l-2 10Z"
			/>
			<path
				fill="none"
				stroke="#24193D"
				stroke-width=".3"
				d="m1105 952-2-5c-5-8-13-22-22-26 9 5 17 22 24 31Z"
			/>
			<path fill="none" stroke="#761926" stroke-opacity=".3" stroke-width=".3" d="M1101 943Z" />
			<path
				fill="none"
				stroke="#FFDEC0"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1292 951-7-12 7 12Z"
			/>
			<path
				fill="none"
				stroke="#E0D7D9"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M682 995h1c2-13 11-36 6-48 2 16-10 32-7 48Z"
			/>
			<path
				fill="none"
				stroke="#8BDAE8"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m926 958 2-11-2 11Z"
			/>
			<path
				fill="none"
				stroke="#2A1311"
				stroke-width=".3"
				d="M1209 1012c12-15 1-46 4-65-3 18 6 49-4 65Z"
			/>
			<path
				fill="none"
				stroke="#01132F"
				stroke-width=".3"
				d="M1005 980c-12-13-28-18-41-30 8 15 27 22 41 30Z"
			/>
			<path
				fill="none"
				stroke="#1095C6"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m724 962 4-11-4 11Z"
			/>
			<path
				fill="none"
				stroke="#01162B"
				stroke-width=".3"
				d="M1040 982c-12-14-30-23-46-31 13 14 30 22 46 31Z"
			/>
			<path
				fill="none"
				stroke="#000A1B"
				stroke-width=".3"
				d="M846 952c-32 22-71 41-96 70 32-22 65-48 96-70Z"
			/>
			<path
				fill="none"
				stroke="#FFDEC5"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1303 968-8-13 8 13Z"
			/>
			<path
				fill="none"
				stroke="#0E152E"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M1115 988v-26l-8-6c6 12 6 19 8 32Z"
			/>
			<path
				fill="none"
				stroke="#81CBE1"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m924 969 1-9c-2 3 0 7-1 9Z"
			/>
			<path
				fill="none"
				stroke="#390D1E"
				stroke-width=".3"
				d="M885 970h13c4 0 11-1 15 1-4-3-9-2-14-2l-14 1Z"
			/>
			<path fill="none" stroke="#69293C" stroke-width=".3" d="m863 974 23-4h-1c-8 0-15 2-22 4Z" />
			<path
				fill="none"
				stroke="#DC4D42"
				stroke-width=".3"
				d="M863 974c-12 2-21 9-31 15 16-2 46-15 66-19h-12l-23 4Z"
			/>
			<path
				fill="none"
				stroke="#BF222D"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m832 989-17 8-6 5h5l4-1 12-3 5-1 32-9 5-1c15-4 30-7 44-12v-1l-3-3c-4-2-11-1-15-1-20 4-50 17-66 19Z"
			/>
			<path
				fill="none"
				stroke="#FFD0B2"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M1311 987c0-5-1-7-4-12 2 4 4 7 4 12Z"
			/>
			<path
				fill="none"
				stroke="#766459"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M436 977v-1h-28l28 1Z"
			/>
			<path
				fill="none"
				stroke="#1E151D"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M436 977c6 0 20 2 25-1h-25v1Z"
			/>
			<path
				fill="none"
				stroke="#DD1E27"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m867 988 5-1-5 1Z"
			/>
			<path
				fill="none"
				stroke="#1F4D6D"
				stroke-width=".3"
				d="M657 991c-20 14-40 28-62 37 13 13 22 31 35 43 14-15 39-24 30-52-8 1-15 7-21 12 4-14 14-26 18-40Z"
			/>
			<path
				fill="none"
				stroke="#E8E7E6"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m727 1115 3-3c-7 1-13-13-15-18l-6-9-8-13-10-15-11-16c-2-4-3-7-3-11l1-5 5-30h-1c-25 38 21 92 45 120Z"
			/>
			<path
				fill="none"
				stroke="#AD172F"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m830 998 5-1-5 1Z"
			/>
			<path fill="none" stroke="#5C2738" stroke-width=".3" d="m813 998-10 5h3l3-1 6-5-2 1Z" />
			<path
				fill="none"
				stroke="#010313"
				stroke-width=".3"
				d="M732 1053c3 6 5 17 13 18-1-6 17-23 21-27l1-2 7-9 3-4c7-9 13-26 26-26l10-5c-30 10-78 25-77 63 0-3-3-6-4-8Z"
			/>
			<path
				fill="none"
				stroke="#E1838E"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m814 1002 4-1-4 1Z"
			/>
			<path
				fill="none"
				stroke="#F2C9BE"
				stroke-opacity=".7"
				stroke-width=".3"
				d="m806 1003 1 1 7-2h-5l-3 1Z"
			/>
			<path
				fill="none"
				stroke="#DFD9D7"
				stroke-width=".3"
				d="M777 1029c8-8 14-22 25-24l5-1-1-1h-3c-13 0-19 17-26 26Z"
			/>
			<path
				fill="none"
				stroke="#F8F8F5"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m777 1029-3 4-2 4c12-8 16-27 30-32-11 2-17 16-25 24Z"
			/>
			<path
				fill="none"
				stroke="#CDCDCB"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M549 1014v1h8v-3c-1 2-6 2-8 2Z"
			/>
			<path
				fill="none"
				stroke="#FDFCFA"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M495 1033c5-5 8-14 13-18l1-1c-5-1-12 16-14 19Z"
			/>
			<path
				fill="none"
				stroke="#5D5959"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M508 1015v1c10-5 30-1 41-1v-1c-11-1-29-2-40 0l-1 1Z"
			/>
			<path
				fill="none"
				stroke="#E6E5E4"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M495 1033c-4 4-9 11-10 16v1l23-34v-1c-5 4-8 13-13 18Z"
			/>
			<path
				fill="none"
				stroke="#4E1910"
				stroke-width=".3"
				d="M1193 1020c2 0 5 6 6 9 2 0 2-3 3-4l-3 2c-1-3-6-12-6-7Z"
			/>
			<path
				fill="none"
				stroke="#F4F3F3"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m677 1030 1-5-1 5Z"
			/>
			<path
				fill="none"
				stroke="#7DADC2"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M971 1044c30-15 32-11 58 8l-4-5c-21-22-30-16-54-3Z"
			/>
			<path
				fill="none"
				stroke="#CBCDCF"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m830 1047-3 4c8-5 18-16 27-19-8 1-17 11-24 15Z"
			/>
			<path
				fill="none"
				stroke="#090E22"
				stroke-width=".3"
				d="m827 1051-14 8-4 2-4 3-3 1-6 5-24 15-15 10-7 4-11 8-6 3-3 2-3 3c11 3 30-15 43-17-4 4-1 7 1 10-6-1-1 1-4 4 1 2 2-1 3-1 9 3 21 15 28 21 3-24-5-53 20-37s33 14 27 46c15-11 35-18 51-7-8 5 1 12 0 19 3-1 7 1 8-4l-3 3c-3-7 1-13 1-20-5 0-9-3-14-3-1-3 3-4 5-4l12-1 8 1 9 1c-1 4-6 6-8 10 2-2 6-4 7-7 3 1 5 3 8 2 0 6-3 14 0 20 1-3 0-7 2-10 3 12 16 21 25 29-21-21-28-39-22-71 1-1 2 1 3 1-13-11-3-22-17-29-6 2-29-19-35-23l-16-9-11-7h-4c-9 3-19 14-27 19Z"
			/>
			<path
				fill="none"
				stroke="#6CB2CC"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m869 1039-1-2-1-1c-3 1-4-2-7-4h-2l11 7Z"
			/>
			<path
				fill="none"
				stroke="#76D1E2"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m867 1036-7-4c3 2 4 5 7 4Z"
			/>
			<path
				fill="none"
				stroke="#C6C5C4"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m767 1042 5-4v-1l2-4-7 9Z"
			/>
			<path
				fill="none"
				stroke="#71C8D5"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m869 1039 16 9 4 2-21-13 1 2Z"
			/>
			<path
				fill="none"
				stroke="#251415"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m288 1041 5-2v-1c-3 0-3 1-5 3Z"
			/>
			<path
				fill="none"
				stroke="#B4A497"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M293 1039c17 2 36 2 53 0v-1c-17 0-36-2-53 0v1Z"
			/>
			<path
				fill="none"
				stroke="#F5D4BC"
				stroke-width=".3"
				d="M346 1039c14 5 18 73 1 77l8-2c10-7 7-56 6-67 0-2-2-4-3-5l-6-4h-6v1Z"
			/>
			<path
				fill="none"
				stroke="#F6CCB5"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M358 1042c-1-2-4-4-6-4l6 4Z"
			/>
			<path
				fill="none"
				stroke="#F8F9F7"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m767 1042-1 2-6 8 2-1c3-4 8-8 10-13l-5 4Z"
			/>
			<path
				fill="none"
				stroke="#050713"
				stroke-width=".3"
				d="M288 1041c-3 2-3 3-4 6-3 16-3 43 0 59 1 5 4 7 9 9 15 3 33 0 47 1h7c17-4 13-72-1-77-17 2-36 2-53 0l-5 2Z"
			/>
			<path
				fill="none"
				stroke="#F7F5EF"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m691 1057-11-16 11 16Z"
			/>
			<path
				fill="none"
				stroke="#D2D2D1"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m745 1071 1-1 14-18 6-8c-4 4-22 21-21 27Z"
			/>
			<path
				fill="none"
				stroke="#5C92B1"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M944 1058c9-2 19-10 27-14-8 5-20 7-27 14Z"
			/>
			<path fill="none" stroke="#010209" stroke-opacity=".8" stroke-width=".3" d="M284 1106Z" />
			<path
				fill="none"
				stroke="#F8CFB2"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M355 1114c11-7 9-55 6-67 1 11 4 60-6 67Z"
			/>
			<path
				fill="none"
				stroke="#C7C9CB"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m813 1059 14-8 3-4-17 12Z"
			/>
			<path
				fill="none"
				stroke="#8BB8C5"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m1029 1052 3 2 5 3-12-10 4 5Z"
			/>
			<path
				fill="none"
				stroke="#6EBACE"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m920 1071 3-2c-6 0-11-5-15-8l-3-1-4-3-12-7-4-2c6 4 29 25 35 23Z"
			/>
			<path
				fill="none"
				stroke="#DDDCD9"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M475 1063c1-3 8-10 10-13v-1c-3 2-9 11-10 14Z"
			/>
			<path
				fill="none"
				stroke="#F4F8F3"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m760 1052-14 18c6-3 12-13 16-19l-2 1Z"
			/>
			<path
				fill="none"
				stroke="#77A2B4"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M1059 1075c-7-6-14-13-22-18l-5-3c8 7 17 17 27 21Z"
			/>
			<path
				fill="none"
				stroke="#6BC0CF"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m905 1060-4-3 4 3Z"
			/>
			<path
				fill="none"
				stroke="#4A829E"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m931 1064-1 2c4-2 11-4 13-8l-12 6Z"
			/>
			<path
				fill="none"
				stroke="#ACADAF"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m805 1064 4-3-4 3Z"
			/>
			<path
				fill="none"
				stroke="#6EB8CC"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m923 1069 7-3 1-2c-11 6-13 2-23-3 4 3 9 8 15 8Z"
			/>
			<path
				fill="none"
				stroke="#757780"
				stroke-opacity=".1"
				stroke-width=".3"
				d="m796 1070 6-5-6 5Z"
			/>
			<path
				fill="none"
				stroke="#031F3C"
				stroke-width=".3"
				d="M1038 1170c-10-44-25-90-75-100 10 48 63 53 75 100Z"
			/>
			<path
				fill="none"
				stroke="#D9471D"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1295 1094 4-24c-2 7-4 16-4 24Z"
			/>
			<path
				fill="none"
				stroke="#050B12"
				stroke-opacity=".4"
				stroke-width=".3"
				d="M624 1072c-43-14-99 10-144-1 21 8 49-3 72 1s49-4 72 0Z"
			/>
			<path
				fill="none"
				stroke="#FAF9EE"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m709 1085-8-13 8 13Z"
			/>
			<path
				fill="none"
				stroke="#070D15"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M628 1208h1c-9-42 11-91 0-132 7 41-5 89-1 132Z"
			/>
			<path
				fill="none"
				stroke="#556D81"
				stroke-opacity=".2"
				stroke-width=".3"
				d="m1066 1081-5-5 5 5Z"
			/>
			<path
				fill="none"
				stroke="#0F3F5C"
				stroke-width=".3"
				d="M689 1136h1c7-17 7-39 9-59-18 20-26 37-10 59Z"
			/>
			<path
				fill="none"
				stroke="#697584"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m757 1095 15-10-15 10Z"
			/>
			<path
				fill="none"
				stroke="#0A2540"
				stroke-width=".3"
				d="M798 1132c15 13 27 22 30 40 3 17-5 53 5 63l9 4c-3-10-5-57 1-65l1-1 4-4 1-1c3-5 55-5 60-1l1 1 2 1c3 1 4 2 5 5 5 14 1 37 1 52l54-1c-11-25-37-47-43-74-3-6 0-14 0-20-3 1-5-1-8-2-1 3-5 5-7 7l-10 13c-1 5-5 3-8 4 1-7-8-14 0-19-16-11-36-4-51 7 6-32-2-30-27-46s-17 13-20 37Z"
			/>
			<path
				fill="none"
				stroke="#021C30"
				stroke-width=".3"
				d="M1087 1095c1 3 4 4 7 5l-2-9c0 2-3 4-5 4Z"
			/>
			<path
				fill="none"
				stroke="#F1F1F2"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m730 1112 3-2c-8 3-14-10-18-16 2 5 8 19 15 18Z"
			/>
			<path
				fill="none"
				stroke="#E4E0E0"
				stroke-opacity=".7"
				stroke-width=".3"
				d="m1257 1116 2-1c2-5 4-16 11-16l-4-4-9 21Z"
			/>
			<path
				fill="none"
				stroke="#96A1B1"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m739 1107 11-8-11 8Z"
			/>
			<path
				fill="none"
				stroke="#052039"
				stroke-width=".3"
				d="m956 1170 15 15c-3-7-8-14-8-23 22 4 42 13 62 23-22-34-58-59-88-85-1 0-2-2-3-1-6 32 1 50 22 71Z"
			/>
			<path
				fill="none"
				stroke="#EB4D25"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1280 1111c-1-2-2-6-5-9l5 9Z"
			/>
			<path
				fill="none"
				stroke="#193E59"
				stroke-width=".3"
				d="m770 1197 8 6 20 13 23 13 12 6c-10-10-2-46-5-63-3-18-15-27-30-40-7-6-19-18-28-21 2 13-3 31 0 44s-7 31 0 42Z"
			/>
			<path
				fill="none"
				stroke="#B49B91"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M340 1116c-14-1-32 2-47-1 13 4 33 1 47 1Z"
			/>
			<path
				fill="none"
				stroke="#F2F0EE"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m1257 1116-2 7v1c2-2 3-6 4-9l-2 1Z"
			/>
			<path
				fill="none"
				stroke="#E5E7E8"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M1206 1242c7-2 12-26 15-32l6-16 5-13 8-19 8-19 3-8 4-11v-1c-15 13-14 42-25 59-11 16-15 42-24 60Z"
			/>
			<path
				fill="none"
				stroke="#370B2A"
				stroke-width=".3"
				d="m893 1125-3 3 12 3c-1-3 3-4 3-7l-12 1Z"
			/>
			<path
				fill="none"
				stroke="#211231"
				stroke-width=".3"
				d="M893 1125c-2 0-6 1-5 4 5 0 9 3 14 3 0 7-4 13-1 20l3-3 10-13c-3 3-7 7-11 8 0-7 4-12 3-19h7l-8-1c0 3-4 4-3 7l-12-3 3-3Z"
			/>
			<path
				fill="none"
				stroke="#371029"
				stroke-width=".3"
				d="M914 1136c2-4 7-6 8-10l-9-1h-7c1 7-3 12-3 19 4-1 8-5 11-8Z"
			/>
			<path fill="none" stroke="#FEFEFE" stroke-opacity=".2" stroke-width=".3" d="M1248 1143Z" />
			<path
				fill="none"
				stroke="#00010F"
				stroke-width=".3"
				d="M687 1214h91v-11l-8-6c-25-15-63-37-80-61h-1c-1 10 2 31 0 40s6 34-2 38Z"
			/>
			<path
				fill="none"
				stroke="#F7D7C2"
				stroke-opacity=".8"
				stroke-width=".3"
				d="M452 1154c28-2 56 3 84 0l2-1c-25-2-62-5-86 1Z"
			/>
			<path
				fill="none"
				stroke="#FBD3BA"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M536 1154v1c6 2 12 5 14 12 4 11 2 33 1 45s5 36-1 45v1c0 3 2 3 2 2 8-15-1-45 2-61s4-45-16-46l-2 1Z"
			/>
			<path
				fill="none"
				stroke="#CFD9DD"
				stroke-width=".3"
				d="M449 1155c27-6 59 2 87 0v-1c-28 3-56-2-84 0l-3 1Z"
			/>
			<path
				fill="none"
				stroke="#11A3D1"
				stroke-width=".3"
				d="M439 1169c-2 27-2 57 0 84 1 9 8 15 17 15h81c5 0 7-1 11-4l2-6v-1c0-28 6-63 0-90-2-7-8-10-14-12-28 2-60-6-87 0-6 3-9 8-10 14Z"
			/>
			<path fill="none" stroke="#FCFDFD" stroke-opacity=".3" stroke-width=".3" d="M1232 1181Z" />
			<path
				fill="none"
				stroke="#592932"
				stroke-width=".3"
				d="M849 1168h1c8-6 48-3 59-1-5-4-57-4-60 1Z"
			/>
			<path
				fill="none"
				stroke="#D4D3CD"
				stroke-width=".3"
				d="M550 1257c6-9 0-33 1-45s3-34-1-45c6 27 0 62 0 90Z"
			/>
			<path
				fill="none"
				stroke="#D1342D"
				stroke-width=".3"
				d="M850 1168c19 0 41-2 60 0l-1-1c-11-2-51-5-59 1Z"
			/>
			<path
				fill="none"
				stroke="#DB231E"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M848 1169c7 2 25 1 32 0s27 4 32 0l-2-1c-19-2-41 0-60 0h-1l-1 1Z"
			/>
			<path fill="none" stroke="#09A3D8" stroke-opacity=".1" stroke-width=".3" d="M439 1253Z" />
			<path
				fill="none"
				d="M844 1173c6 18-10 57 5 69 20-4 45 3 64 1l5-6c2-16 3-47-1-63-1-3-2-4-5-5-5 4-25-1-32 0s-25 2-32 0l-4 4Z"
			/>
			<path
				fill="none"
				stroke="#E32420"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M843 1174v37c0 9-4 29 5 32l1-1c-15-12 1-51-5-69l-1 1Z"
			/>
			<path
				fill="none"
				stroke="#AE323C"
				stroke-width=".3"
				d="m842 1239 4 4h2c-9-3-5-23-5-32v-37c-6 8-4 55-1 65Z"
			/>
			<path
				fill="none"
				stroke="#532D3C"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M918 1237v-11c0-15 4-38-1-52 4 16 3 47 1 63Z"
			/>
			<path
				fill="none"
				stroke="#FCFDFD"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1221 1210 6-16-6 16Z"
			/>
			<path
				fill="none"
				stroke="#3A0D25"
				stroke-width=".3"
				d="M778 1214c2-2 0-5 2-7 6 4 10 11 15 15l-5-8c3 2 7 8 8 2l-20-13v11Z"
			/>
			<path
				fill="none"
				stroke="#6B1A2F"
				stroke-width=".3"
				d="m778 1214-3 1 3 4c7 15-1 40 1 58s2 41 0 59c1 11 11 11 20 11 10 0 51-9 49 4 7-15 15-31 21-47v-2c-7-10-18-18-26-27-15-18-33-34-48-53-5-4-9-11-15-15-2 2 0 5-2 7Z"
			/>
			<path
				fill="none"
				stroke="#EEDBC1"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m633 1214-3-4-1-2h-1c0 3 2 5 5 6Z"
			/>
			<path
				fill="none"
				stroke="#6B564F"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M633 1214h3c-2 0-4-2-6-4l3 4Z"
			/>
			<path
				fill="none"
				stroke="#262B3C"
				stroke-opacity=".1"
				stroke-width=".3"
				d="m775 1215 3-1h-83c25 2 54 3 80 1Z"
			/>
			<path
				fill="none"
				stroke="#080B20"
				stroke-width=".3"
				d="M795 1222c15 19 33 35 48 53 7 7 23 18 26 27v2h2c2-10 9-17 12-26-19-18-46-31-62-49l-23-13c-1 6-5 0-8-2l5 8Z"
			/>
			<path
				fill="none"
				stroke="#7A243D"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M778 1336h1c2-18 2-41 0-59s6-43-1-58c5 18-2 41 0 59 2 19 0 39 0 58Z"
			/>
			<path
				fill="none"
				stroke="#C8CCD0"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m1123 1250-1 2 4-3 8-11-11 12Z"
			/>
			<path
				fill="none"
				stroke="#A21F1D"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M848 1243h-2l9 1c17-2 36-1 52 0l6-1c-19 2-44-5-64-1l-1 1Z"
			/>
			<path fill="none" stroke="#1D0208" stroke-width=".3" d="M855 1244h52c-16-1-35-2-52 0Z" />
			<path
				fill="none"
				stroke="#E0E6EA"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M1122 1252c-12 18-30 35-40 54s-33 36-39 56h1c3-4 6-10 10-12v-1l12-16 3-4c2-3 3-8 7-10v-1c6-10 17-30 27-37v-1l12-16 11-15-4 3Z"
			/>
			<path
				fill="none"
				stroke="#093255"
				stroke-width=".3"
				d="m937 1341 19-6 10-4h2c4-2 39-16 40-12 4 1 7 8 9 11l6 8v1c4 3 7 9 9 13 2 3 6 14 11 10 6-20 29-37 39-56s28-36 40-54l1-2c-63 30-128 57-189 89l3 2Z"
			/>
			<path
				fill="none"
				stroke="#D7E2DC"
				stroke-opacity=".6"
				stroke-width=".3"
				d="m548 1264 4-4c0 1-2 1-2-2l-2 6Z"
			/>
			<path
				fill="none"
				stroke="#F7F9FA"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M1103 1280c6-4 8-11 12-16l-12 16Z"
			/>
			<path fill="none" stroke="#07A4D5" stroke-opacity=".1" stroke-width=".3" d="M537 1268Z" />
			<path
				fill="none"
				stroke="#351223"
				stroke-width=".3"
				d="M869 1302c-3-9-19-20-26-27 8 9 19 17 26 27Z"
			/>
			<path
				fill="none"
				stroke="#B3A59E"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M657 1280c8-2 23 1 32 1v-1l-28-1-4 1Z"
			/>
			<path fill="none" d="M689 1280h1v-1h-29l28 1Zm1 0h26c-8-2-17-1-26-1v1Z" />
			<path
				fill="none"
				stroke="#0E3A5A"
				stroke-width=".3"
				d="M654 1282c-9 8-7 55-5 67 1 4 5 7 9 8 15 3 48-8 59 1h1l4-5c6-14 3-47 1-62-1-4-7-7-10-10h-24c-9 0-24-3-32-1l-3 2Z"
			/>
			<path fill="none" stroke="#848594" stroke-width=".3" d="M689 1281h25v-1h-25v1Z" />
			<path
				fill="none"
				stroke="#FAFAF9"
				stroke-width=".3"
				d="M714 1281c5 0 8 6 9 10 2 15 5 48-1 62-2 5-3 4 4 4 1-22-1-46 1-67-1-5-5-10-11-10h-2v1Z"
			/>
			<path
				fill="none"
				stroke="#1B2034"
				stroke-width=".3"
				d="M723 1291c-1-4-4-10-9-10h-1c3 3 9 6 10 10Z"
			/>
			<path
				fill="none"
				stroke="#F9FAFB"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1076 1318c9-6 24-27 27-37-10 7-21 27-27 37Z"
			/>
			<path
				fill="none"
				stroke="#062F51"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M649 1349c-2-12-4-59 5-67-10 8-8 55-5 67Z"
			/>
			<path
				fill="none"
				stroke="#FAF9F6"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m722 1353-4 5h9c-3-22 4-46 0-68-2 21 0 45-1 67-7 0-6 1-4-4Z"
			/>
			<path
				fill="none"
				stroke="#093255"
				stroke-width=".3"
				d="M848 1351c-2 16-2 23 16 15l8-3 35-11c2-1 4-3 7-3-14-14-27-33-43-45h-2c-6 16-14 32-21 47Z"
			/>
			<path
				fill="none"
				stroke="#DFE0E2"
				stroke-opacity=".9"
				stroke-width=".3"
				d="m968 1331 5-1 13-4c6-2 14-7 21-7h1c-1-4-36 10-40 12Z"
			/>
			<path
				fill="none"
				stroke="#F4F6F5"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M986 1326c6-2 16-3 21-7-7 0-15 5-21 7Z"
			/>
			<path
				fill="none"
				stroke="#FAFDFD"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M1069 1329c2-3 6-6 7-10-4 2-5 7-7 10Z"
			/>
			<path
				fill="none"
				stroke="#F9FAF9"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M968 1331h-2l-3 3 10-4-5 1Z"
			/>
			<path
				fill="none"
				stroke="#012B54"
				stroke-opacity=".3"
				stroke-width=".3"
				d="m1023 1338-6-8 6 8Z"
			/>
			<path
				fill="none"
				stroke="#B7B7B9"
				stroke-opacity=".9"
				stroke-width=".3"
				d="M956 1335a47 47 0 0 1 7-1l3-3-10 4Z"
			/>
			<path
				fill="none"
				stroke="#F8FDFD"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1054 1349c5-4 9-11 12-16l-12 16Z"
			/>
			<path
				fill="none"
				stroke="#D9DADE"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m956 1335-19 6-5 2v1c9-3 23-4 30-10l-6 1Z"
			/>
			<path
				fill="none"
				stroke="#EFE7E8"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M799 1347c-9 0-19 0-20-11h-1c0 16 9 12 21 11Z"
			/>
			<path
				fill="none"
				stroke="#052345"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1032 1352c-2-4-5-10-9-13 2 5 6 9 9 13Z"
			/>
			<path
				fill="none"
				stroke="#A2ADBA"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m918 1349 14-5v-1c-5 2-10 3-14 6Z"
			/>
			<path
				fill="none"
				stroke="#AAB5C2"
				stroke-opacity=".4"
				stroke-width=".3"
				d="m907 1352 9-3h-2c-3 0-5 2-7 3Z"
			/>
			<path
				fill="none"
				stroke="#FBFDFD"
				stroke-opacity=".3"
				stroke-width=".3"
				d="M1044 1362c4 0 8-9 10-12-4 2-7 8-10 12Z"
			/>
			<path
				fill="none"
				stroke="#043658"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M717 1358c-11-9-44 2-59-1 16 5 41 1 59 1Z"
			/>
			<path
				fill="none"
				stroke="#0C2245"
				stroke-opacity=".5"
				stroke-width=".3"
				d="m864 1366 8-3-8 3Z"
			/>
			<path
				fill="none"
				stroke="None"
				d="M0 1600h1600V0H0v1600M920 235c4 2 7 6 10 9l4 3 40 38 3 2c9 7 16 15 24 23l4 3 11 10 3 2c7 3 18 1 25 1h51l30-1h68c5-1 8 3 11 6l5 6 8 11 18 22 4 6c6 6 12 13 16 20 13 15 27 31 38 48v1c9 6 15 18 21 26l13 16c15 18-2 28-17 37l-38 23c-4 4-12 8-17 11l-11 6-2 1c-7 12-34 22-46 29-5 3-9 4-14 1-8-4-17-15-22-23l-1-2-10-11-12-15-14-18-2-2-5-6-20-26-7-8-1-1-9-10c-22-9-54-8-78-10l-7-1h-7l-36-4h-4c-8 0-16-2-23-3l-11-1-16-1-31-3c-10-1-16 2-25 4-4 3-7 10-12 12-3 5-7 8-11 12l-32 36-5 6-22 24c-10 15-25 31-38 43-8 8-27 7-38 8l-11 1h-13l-13 1-20 2h-8c-11 1-20 5-30 9l-13 4-24 9-8 3-15 5c-23 6-25-29-31-45l-19-60-3-8-1-5-1-4a20 20 0 0 1 5-19l16-24 17-26 6-9c6-11 18-37 32-39 19-2 42-2 61 0 3-2 8-2 10-5l3-6c4-17-9-56 1-70v-1c2-9 15-18 22-24l8-7c6-6 10-13 19-15l13-2 126-17h7c13-1 25-4 38-4l8-1h1c2-2 5-1 8-1l21-3h7c6-1 12-2 18 1m104 255c3 0 10-1 12 1l13 1 12 1c2 0 6-1 7 3l5 5 4 4c13 14 31 27 41 43l1 1c5 3 14 13 17 18v1c9 11-14 4-17 2-22-9-41-28-63-35l-10-1-29-1h-65l-10-1h-13l42 22c8 3 11 8 15 16l5 7c2 4 7 8 7 12l-2 5c-4 4-9 1-12-2h-1l-27-14-6-3c-8-3-15-7-23-9l-13-4-7-2c-29-5-37-8-66 1l-4 1-17 6-13 5c-8 4-17 8-26 10l-6 2c-4 2-10 4-11-2s10-13 14-17c8-8 17-21 27-27l2-1 24-24c28-24 41-42 80-34s74 7 113 10M623 636c3 3 1 7 1 11v14l-1 11h3c9-4 26-2 36-2 31 0 62-2 92-4l18-1 24-1 17-1h4l10-1 16-1h17l24-1 16-1h7l15-1h1c13 1 31-1 43-2l8-1a375 375 0 0 1 39-1l15-1h4l13-1h10l17-1h4l17-1h8l13-1h5l21-1 17-1c23-1 27 1 34 20l5 5 7 7 22 23 7 7 12 13c5 3 9 9 13 13l20 21c2 3 7 6 6 9v2c2 4-5 5-8 5l-19 1h-10c-7 2-3 10-1 14 4 8 9 17 12 26l6 13 1 2 3 7c4 7 22 37 18 44l-1 2c-3 5-10 2-14 2l-11 3c-3 2-3 5-2 8l2 4c11 7 19 30 26 41l7 12 3 4 8 13 4 7c3 5 4 7 4 12-1 15-5 30-7 45l-5 38-4 24c0 8-4 31-15 17l-5-9-5-3c-7 0-9 11-11 16-1 3-2 7-4 9l-4 11-3 8-8 19-8 19-5 13-6 16c-3 6-8 30-15 32-21 6-58-27-72-4l-8 11-11 15c-4 5-6 12-12 16v1c-3 10-18 31-27 37v1c-1 4-5 7-7 10l-3 4c-3 5-7 12-12 16v1c-2 3-6 12-10 12h-1c-5 4-9-7-11-10-3-4-7-8-9-13v-1l-6-8c-2-3-5-10-9-11h-1c-5 4-15 5-21 7l-13 4-10 4h-1c-7 6-21 7-30 10l-14 5h-2l-9 3-35 11-8 3c-18 8-18 1-16-15 2-13-39-4-49-4-12 1-21 5-21-11 0-19 2-39 0-58-2-18 5-41 0-59l-3-4c-26 2-55 1-80-1h-62c-3-1-5-3-5-6-4-43 8-91 1-132-1-3-2-3-5-4-23-4-49 4-72 0s-51 7-72-1c-3-1-6-4-5-8 1-3 7-12 10-14 1-5 6-12 10-16 2-3 9-20 14-19 11-2 29-1 40 0 2 0 7 0 8-2l1-2c8-32 0-78 0-111 0-17 7-53-1-68l-4-3c-23 2-58 4-80-1l-3-1c-10-6 10-21 15-25l15-14 18-16c5-4 17-14 16-21l-2-5-2-4-1-3-1-3-3-10-2-4-8-24-1-3-3-7c-3-12 19-18 28-21l9-4 6-2 4-2 3-1 6-3 4-2c9-3 45-23 52-16m-189 96c-1 4-5 8-9 8h-2c-12 5-43 3-56 1-5-1-10-6-11-11-3-16-3-43 1-58 1-4 2-6 6-8l4-1h57c15 0 13 57 10 69m-129 96c6 2 8 4 9 10 3 16 3 41 0 57-1 6-3 9-10 10-14 2-48 5-61-1-12-5-7-54-6-66 0-4 2-7 6-8v-1l4-1c16-3 42-4 58 0m166 81c2 13 6 60-6 66l-3 1h-1c-5 3-19 1-25 1l-28-1c-8 0-12-2-14-10-3-14-4-44 0-57l5-8c5-5 30-2 39-2h23c5 0 9 5 10 10m-113 133c1 1 3 3 3 5 3 12 5 60-6 67l-8 2h-7c-14 0-34 3-47-1-5-2-8-4-9-9-4-13-4-46 0-59 1-3 1-4 4-6 2-2 2-3 5-3 17-2 36 0 53 0h6c2 0 5 2 6 4m194 218-4 4c-4 3-6 4-11 4-24 4-57 3-81 0-9 0-16-6-17-15-4-23-5-61 0-84 1-6 4-11 10-14l3-1c24-6 61-3 86-1 20 1 19 30 16 46s6 46-2 61m164 20c6 0 10 5 11 10 4 22-3 46 0 68h-10c-18 0-43 4-59-1-4-1-8-4-9-8-3-12-5-59 5-67l3-2 4-1h29c9 0 18-1 26 1Z"
			/>
			<path fill="#FCEDE3" fill-opacity=".8" stroke="None" d="m902 234 14 1h4c-6-3-12-2-18-1Z" />
			<path
				fill="#F8623B"
				stroke="None"
				d="m874 237-8 1h-1c-2 2-5 1-8 1-13 0-25 3-38 4h-7l-126 17-8 4-20 11-4 2-8 7-22 24v1c0 20 6 51-1 70l-3 6c-2 3-6 7-10 6-20 2-42-2-61-1-14 2-26 28-32 39l-6 9-17 26c-5 8-10 17-16 24-3 3-4 5-5 9v10l1 4c0 1 2 2 1 3 32 8 70 4 96-14-3-11 0-28 12-32l1-1 6-2h1c2-2 11-2 13 0h1l4 1 4 1 4 1c24 1 57-18 80-25 24-6 51-19 71-34 5-5 7-11 11-17 15-26 30-65 49-88s37-61 67-70l-21 3Z"
			/>
			<path
				fill="#FA1B13"
				stroke="None"
				d="m779 392-4 11c30-2 66-10 95-15s56-18 80-30 39-44 61-38l-6-7-4-3c-9-7-16-16-24-23l-3-2c-15-11-27-25-40-38l-4-3c-4-4-9-8-14-9l-14-1h-7c-30 9-48 47-67 70s-34 62-49 88Z"
			/>
			<path
				fill="#F9685C"
				fill-opacity=".5"
				stroke="None"
				d="M930 244c-3-3-6-7-10-9h-4c5 1 10 5 14 9Z"
			/>
			<path fill="#FA5432" fill-opacity=".5" stroke="None" d="m866 238 8-1c-3 0-6-1-8 1Z" />
			<path fill="#F94F2E" fill-opacity=".4" stroke="None" d="M857 239c3 0 6 1 8-1l-8 1Z" />
			<path fill="#FEB7AE" fill-opacity=".2" stroke="None" d="M819 243h-7 7Z" />
			<path fill="#F74A3F" fill-opacity=".3" stroke="None" d="m974 285-40-38c13 13 25 27 40 38Z" />
			<path fill="#FDF2EB" fill-opacity=".8" stroke="None" d="m673 262-4 3 9-1 8-4-13 2Z" />
			<path
				fill="#FFD6C9"
				fill-opacity=".4"
				stroke="None"
				d="m654 277 4-2 11-10 4-3c-9 2-13 9-19 15Z"
			/>
			<path fill="#FBCEBB" stroke="None" d="m669 265-11 10 20-11-9 1Z" />
			<path fill="#FE6238" fill-opacity=".3" stroke="None" d="m624 308 22-24c-7 6-20 15-22 24Z" />
			<path
				fill="#FECDB8"
				fill-opacity=".3"
				stroke="None"
				d="M1001 310c-8-8-15-16-24-23 8 7 15 16 24 23Z"
			/>
			<path
				fill="#FA5E35"
				fill-opacity=".3"
				stroke="None"
				d="M623 379c7-19 1-50 1-70-10 14 3 53-1 70Z"
			/>
			<path
				fill="#F38585"
				fill-opacity=".4"
				stroke="None"
				d="M1011 320c2 2 5 6 8 7l-3-4-11-10 6 7Z"
			/>
			<path
				fill="#B81F23"
				stroke="None"
				d="M779 392c-4 6-6 12-11 17-17 17 0 58-4 77 7 1 9 9 14 11-3 3-2 7-7 6 3 4 2 5 4 10 5-6 9-10 16-15 7 0-3 8 2 6l17-19 14-14 4-5 2-3c3-4 11-15 16-16h6l19 2 26 3 18 2 10 1 18 1 10 2c12 0 23 2 34 4h7l7 1c24 2 56 1 78 10 2 1 9 7 9 10l1 1 7 8a265 265 0 0 0 27 34c6 5 11 13 16 19l19 22 9 11c4 5 10 14 15 17 5 2 10 1 14-2 9-9 33-25 45-28 6-6 22-18 31-19 8-10 29-18 40-25 12-8 21-19 15-34l-13-16-21-26v-1c-14-10-29-33-38-48-4-7-10-14-16-20l-6-7-16-21-8-11c-2-2-5-3-6-6l-10-5h-58l-22 1h-1c-5 4-22 1-29 1h-36c-8 0-21 2-28-1-3-1-6-5-8-7-22-6-37 26-61 38s-51 25-80 30-65 13-95 15l4-11Z"
			/>
			<path
				fill="#EAB9B1"
				stroke="None"
				d="M1019 327c7 3 20 1 28 1h36c7 0 24 3 29-1h-68c-8 0-19 2-25-2l-3-2 3 4Z"
			/>
			<path
				fill="#FDECE1"
				fill-opacity=".4"
				stroke="None"
				d="M1044 327v-1c-7 0-18 2-25-1 6 4 17 2 25 2Z"
			/>
			<path fill="#FFF1E9" fill-opacity=".1" stroke="None" d="M1095 326h18l12-1-30 1Z" />
			<path fill="#F1B0A8" fill-opacity=".7" stroke="None" d="M1113 326v1l22-1v-1h-10l-12 1Z" />
			<path fill="#D02329" fill-opacity=".5" stroke="None" d="M1135 326h25v-1h-25v1Z" />
			<path fill="#CE1A22" fill-opacity=".7" stroke="None" d="M1160 326h14v-1h-14v1Z" />
			<path fill="#D41B22" fill-opacity=".8" stroke="None" d="M1174 326h19v-1h-19v1Z" />
			<path fill="#FCCDCB" fill-opacity=".6" stroke="None" d="m1193 326 10 5h1c-3-3-6-7-11-6v1Z" />
			<path fill="#FCEFE3" fill-opacity=".5" stroke="None" d="M1044 327h17v-1h-17v1Z" />
			<path fill="#FEF2E7" fill-opacity=".7" stroke="None" d="M1061 327h17v-1h-17v1Z" />
			<path fill="#FDEEE3" stroke="None" d="M1078 327h35v-1h-35v1Z" />
			<path fill="#C85358" stroke="None" d="M1083 328h-36 36Z" />
			<path fill="#DB373E" fill-opacity=".3" stroke="None" d="m1209 337-5-6h-1c1 3 4 4 6 6Z" />
			<path fill="#D20C19" fill-opacity=".2" stroke="None" d="m1233 369 2 1-18-22 16 21Z" />
			<path fill="#CF0E20" fill-opacity=".4" stroke="None" d="m1239 376-4-6-2-1 6 7Z" />
			<path
				fill="#FDEFE6"
				fill-opacity=".6"
				stroke="None"
				d="M610 390v1c4 1 8-3 10-6-2 3-7 3-10 5Z"
			/>
			<path
				fill="#F5BCA8"
				fill-opacity=".7"
				stroke="None"
				d="M610 391v-1c-19-2-42-2-61 0 19-1 41 3 61 1Z"
			/>
			<path
				fill="#D21521"
				fill-opacity=".3"
				stroke="None"
				d="M1293 444c-11-17-25-33-38-48 9 15 24 38 38 48Z"
			/>
			<path
				fill="#EA1617"
				stroke="None"
				d="M617 468c3 2 6 6 7 10v2c3 7 3 24-2 30-4 4-10 7-15 7v1c0 2 11 2 13 0 1 6 13 12 10 17 7-1 11 9 11 14 3-1 8 3 9 6 3-3 3 0 6 2-2 1-5-1-6 2 4 3-1 7-1 12-7 0-15 4-18 9-6-4-9 6-14 6 6-9-7 2-10 3-16 21-59 23-79 40l15-5 10-5c17-7 37-19 56-20h17l20-2 13-1h13l9-3c12-2 26-2 38-6-1-6 15-15 18-21 2-7 13-15 18-21l19-20 12-13 7-8c-5 2 5-6-2-6-7 5-11 9-16 15-2-5-1-6-4-10 5 1 4-3 7-6-5-2-7-10-14-11 4-19-13-60 4-77-20 15-47 28-71 34-23 7-56 26-80 25Z"
			/>
			<path fill="#FD6C3B" fill-opacity=".3" stroke="None" d="m511 438 6-9-6 9Z" />
			<path fill="#C21224" fill-opacity=".3" stroke="None" d="M1314 471c-6-8-12-20-21-26l21 26Z" />
			<path fill="#8B5A6B" stroke="None" d="m830 463 10-9 6-7c-5 1-13 12-16 16Z" />
			<path
				fill="#3A92BA"
				fill-opacity=".8"
				stroke="None"
				d="M840 454h1c9-2 15-5 25-4v-1l-14-2h-6l-6 7Z"
			/>
			<path fill="#85445C" stroke="None" d="M866 449h5l-19-2 14 2Z" />
			<path fill="#4084B3" fill-opacity=".6" stroke="None" d="m866 450 31 3v-1l-26-3h-5v1Z" />
			<path fill="#4A72A4" fill-opacity=".8" stroke="None" d="m897 453 16 1h2l-18-2v1Z" />
			<path
				fill="#8EAED1"
				fill-opacity=".4"
				stroke="None"
				d="m830 463-2 3h1c5-2 8-9 12-12h-1l-10 9Z"
			/>
			<path fill="#3B90BC" fill-opacity=".7" stroke="None" d="M924 455h1l-10-1h-2l11 1Z" />
			<path
				fill="#2A9ACE"
				fill-opacity=".4"
				stroke="None"
				d="m947 458-4-2-18-1h-1c7 1 15 3 23 3Z"
			/>
			<path fill="#497BA9" fill-opacity=".8" stroke="None" d="M947 458h6l-10-2 4 2Z" />
			<path fill="#5281AC" fill-opacity=".4" stroke="None" d="M987 462c-11-2-22-4-34-4h-2l36 4Z" />
			<path fill="#855564" fill-opacity=".3" stroke="None" d="m1001 463-7-1 7 1Z" />
			<path fill="#FB5337" fill-opacity=".2" stroke="None" d="M478 488c6-7 11-16 16-24l-16 24Z" />
			<path fill="#A15A59" stroke="None" d="M591 465h13c-2-2-11-2-13 0Z" />
			<path
				fill="#192E4C"
				fill-opacity=".8"
				stroke="None"
				d="M584 467c7 1 18-1 25-1l-4-1c-2 2-13 2-15 0l-6 2Z"
			/>
			<path fill="#0D2C49" stroke="None" d="M605 465h-15c2 2 13 2 15 0Z" />
			<path
				fill="none"
				stroke="None"
				d="m584 467-1 1c-3 4-6 6-8 11v28c1 5 6 7 10 9 7 1 15 2 22 1 5 0 11-3 15-7 5-7 2-21 2-30v-2c-2-4-7-9-11-11l-4-1c-7 0-18 2-25 1Z"
			/>
			<path
				fill="#90B5DB"
				fill-opacity=".2"
				stroke="None"
				d="m824 471-6 7c4-4 8-7 11-12h-1l-4 5Z"
			/>
			<path
				fill="#FA2A23"
				fill-opacity=".3"
				stroke="None"
				d="M624 478c-1-4-4-8-7-10l-4-1c4 2 9 7 11 11Z"
			/>
			<path
				fill="#293550"
				fill-opacity=".9"
				stroke="None"
				d="m571 500 2 6 2 1v-1c-3-5-1-22 0-27 2-5 5-7 8-11-12 4-15 21-12 32Z"
			/>
			<path fill="#A58A97" fill-opacity=".9" stroke="None" d="m810 485 8-7 6-7-14 14Z" />
			<path fill="#BE1721" fill-opacity=".4" stroke="None" d="m1079 473 9 10c0-3-7-9-9-10Z" />
			<path
				fill="#210E22"
				stroke="None"
				d="M831 514c-7 7-15 18-24 24l-2 1c-9 9-17 19-27 27-4 4-15 11-14 17l15-3c17-7 35-17 54-20 37-14 59-9 94 6 8 2 15 6 23 9l6 2 27 11 13 6 2-5c-2-8-22-28-27-35l-42-22c2-2 4-1 6-1l14-2h38c20 0 40 2 59 5l10 1c-3-8 20-34 11-39l-31-4-12-2c-39-3-74-2-113-10s-52 10-80 34Z"
			/>
			<path fill="#9DB3C4" fill-opacity=".6" stroke="None" d="m810 485-17 19-7 8v2l32-36-8 7Z" />
			<path fill="#044566" fill-opacity=".1" stroke="None" d="M575 506v-27c-1 5-3 22 0 27Z" />
			<path
				fill="#DF251C"
				fill-opacity=".5"
				stroke="None"
				d="M622 510c5-6 5-23 2-30 0 9 3 23-2 30Z"
			/>
			<path fill="#AD161C" fill-opacity=".3" stroke="None" d="m1096 492-7-8 7 8Z" />
			<path
				fill="#FAF1EE"
				fill-opacity=".8"
				stroke="None"
				d="m1312 521-2 3c15-9 32-19 17-37 6 15-3 26-15 34Z"
			/>
			<path fill="#28739F" fill-opacity=".5" stroke="None" d="M1036 492v-1c-2-2-9-1-12-1l12 2Z" />
			<path
				fill="#228AB9"
				fill-opacity=".8"
				stroke="None"
				d="m1036 492 31 4h1c-1-4-5-3-7-3l-12-1-13-1v1Z"
			/>
			<path fill="#119DCB" fill-opacity=".2" stroke="None" d="m1061 493-12-1 12 1Z" />
			<path
				fill="#030411"
				stroke="None"
				d="M1056 535c22 7 41 26 63 35l15 5 2-7v-1c-6-4-14-12-17-18l-1-1c-7-5-13-12-18-18-9-9-20-18-27-29l-5-5h-1c9 5-14 31-11 39Z"
			/>
			<path fill="#F85026" fill-opacity=".5" stroke="None" d="M473 507v-10 10Z" />
			<path
				fill="#F83B20"
				stroke="None"
				d="m474 511 1 5 3 8 19 60c6 16 8 51 31 45 20-17 63-19 79-40 3-1 16-12 10-3 5 0 8-10 14-6 3-5 11-9 18-9 0-5 5-9 1-12 1-3 4-1 6-2-3-2-3-5-6-2-1-3-6-7-9-6 0-5-4-15-11-14 3-5-9-11-10-17-2 2-13 2-13 0h-2c-4 2-11 1-15 0l-5-1c-5-2-10-6-12-11l-2-6c-26 18-64 22-96 14 1-1-1-2-1-3Z"
			/>
			<path
				fill="#011B39"
				fill-opacity=".9"
				stroke="None"
				d="m1100 530-23-25-4-4c7 11 18 20 27 29Z"
			/>
			<path
				fill="#012245"
				fill-opacity=".3"
				stroke="None"
				d="M1100 530c5 6 11 13 18 18-10-16-28-29-41-43l23 25Z"
			/>
			<path
				fill="#732E2A"
				fill-opacity=".6"
				stroke="None"
				d="M585 517v-1c-4-2-9-4-10-9l-2-1c2 5 7 9 12 11Z"
			/>
			<path
				fill="#A1B7C7"
				fill-opacity=".8"
				stroke="None"
				d="m774 525-19 20c-5 6-16 14-18 21-3 6-19 15-18 21h2c13-12 28-28 38-43 6-9 14-16 22-24l5-6v-2l-12 13Z"
			/>
			<path fill="#0E0814" fill-opacity=".5" stroke="None" d="M807 538c9-6 17-17 24-24l-24 24Z" />
			<path fill="#FE4019" fill-opacity=".3" stroke="None" d="m478 524-3-8 3 8Z" />
			<path
				fill="#242D44"
				fill-opacity=".8"
				stroke="None"
				d="m585 517 5 1h17v-1c-7 1-15 0-22-1v1Z"
			/>
			<path fill="#5B3542" stroke="None" d="M605 518h-15c4 1 11 2 15 0Z" />
			<path fill="#CC1E1C" fill-opacity=".3" stroke="None" d="m1121 524-5-6 5 6Z" />
			<path fill="#94AABC" fill-opacity=".2" stroke="None" d="m759 544 22-24c-8 8-16 15-22 24Z" />
			<path
				fill="#F2CBB8"
				fill-opacity=".5"
				stroke="None"
				d="M1272 546v1l38-23 2-3c-11 7-32 15-40 25Z"
			/>
			<path fill="#C9ACAF" stroke="None" d="m755 545 19-20-19 20Z" />
			<path
				fill="#C52E37"
				fill-opacity=".3"
				stroke="None"
				d="m1137 544 2 1c-5-6-10-14-16-19l14 18Z"
			/>
			<path fill="#582633" stroke="None" d="M949 529h38-38Z" />
			<path
				fill="#D6422E"
				fill-opacity=".9"
				stroke="None"
				d="m935 531 7 1 10 1 44-1 21 1 29 1c-19-3-39-5-59-5h-38l-14 2Z"
			/>
			<path fill="#D75436" fill-opacity=".7" stroke="None" d="M929 532h13l-7-1c-2 0-4-1-6 1Z" />
			<path fill="#DE402A" fill-opacity=".1" stroke="None" d="M952 533h44v-1l-44 1Z" />
			<path fill="#D73C24" fill-opacity=".5" stroke="None" d="M996 533h21l-21-1v1Z" />
			<path
				fill="#120711"
				fill-opacity=".5"
				stroke="None"
				d="M778 566c10-8 18-18 27-27-10 6-19 19-27 27Z"
			/>
			<path fill="#892343" fill-opacity=".5" stroke="None" d="m1149 559 6 6 3 2-19-22-2-1 12 15Z" />
			<path
				fill="#EFC7B9"
				fill-opacity=".7"
				stroke="None"
				d="M1241 565h1l2-1c3-3 8-5 11-6 5-3 13-7 17-11v-1c-9 1-25 13-31 19Z"
			/>
			<path
				fill="#EACEBB"
				fill-opacity=".8"
				stroke="None"
				d="M833 560c-17 7-36 15-54 20l-15 3c1 6 7 4 11 2l6-2c9-2 18-6 26-10l13-5 17-6 4-1c29-9 37-6 66-1l7 2 13 4c-35-15-57-20-94-6Z"
			/>
			<path
				fill="#031C38"
				fill-opacity=".3"
				stroke="None"
				d="M1136 567c-3-5-12-15-17-18 3 6 11 14 17 18Z"
			/>
			<path
				fill="#DF462A"
				fill-opacity=".8"
				stroke="None"
				d="M998 589c0-4-5-8-7-12l-5-7c-4-8-7-13-15-16 5 7 25 27 27 35Z"
			/>
			<path fill="#FEE0C8" fill-opacity=".3" stroke="None" d="m1244 564 11-6c-3 1-8 3-11 6Z" />
			<path fill="#1A0D32" fill-opacity=".2" stroke="None" d="m1159 570-4-5-6-6 10 11Z" />
			<path fill="#1D151B" stroke="None" d="M779 580c18-5 37-13 54-20-19 3-37 13-54 20Z" />
			<path fill="#F2CDB6" fill-opacity=".4" stroke="None" d="m837 562 4-1-4 1Z" />
			<path fill="#F1D5C2" fill-opacity=".3" stroke="None" d="m914 562-7-2 7 2Z" />
			<path fill="#51142C" fill-opacity=".9" stroke="None" d="m1159 570 1 2 7 6-9-11-3-2 4 5Z" />
			<path
				fill="#A0B9C7"
				fill-opacity=".7"
				stroke="None"
				d="M1196 593v1c12-7 39-17 46-29h-1c-12 3-36 19-45 28Z"
			/>
			<path fill="#FAC1AC" fill-opacity=".2" stroke="None" d="m807 573 13-5-13 5Z" />
			<path fill="#061D3D" fill-opacity=".6" stroke="None" d="M1119 570c3 2 26 9 17-2l-2 7-15-5Z" />
			<path fill="#EB3B1D" fill-opacity=".3" stroke="None" d="m991 577-5-7 5 7Z" />
			<path
				fill="#11030D"
				fill-opacity=".9"
				stroke="None"
				d="M1182 595c-5-3-11-12-15-17l-7-6c5 8 14 19 22 23Z"
			/>
			<path fill="#E4D7B4" fill-opacity=".1" stroke="None" d="M956 578v-1l-6-2 6 3Z" />
			<path fill="#E7C5B1" fill-opacity=".7" stroke="None" d="m956 578 27 14v-4l-27-11v1Z" />
			<path fill="#FBE4CA" fill-opacity=".3" stroke="None" d="m775 585 6-2-6 2Z" />
			<path
				fill="#F8D6C7"
				fill-opacity=".8"
				stroke="None"
				d="m681 593 2 2c11-1 30 0 38-8h-2c-12 4-26 4-38 6Z"
			/>
			<path fill="#D94435" stroke="None" d="M983 592h1c4 1 8 5 12 2l-13-6v4Z" />
			<path
				fill="#E43720"
				fill-opacity=".2"
				stroke="None"
				d="M996 594c-4 3-8-1-12-2 3 3 8 6 12 2Z"
			/>
			<path fill="#F9B9A7" fill-opacity=".4" stroke="None" d="m672 596 11-1-2-2-9 3Z" />
			<path
				fill="#901322"
				fill-opacity=".2"
				stroke="None"
				d="M1182 595c5 3 9 2 14-1v-1c-4 3-9 4-14 2Z"
			/>
			<path fill="#E4201E" fill-opacity=".3" stroke="None" d="m646 597 13-1-13 1Z" />
			<path fill="#F9B7AF" fill-opacity=".9" stroke="None" d="M609 599h17-17Z" />
			<path
				fill="#FDD7CE"
				fill-opacity=".8"
				stroke="None"
				d="m553 619-2 2 24-9 13-4c10-4 19-8 30-9h-9c-19 1-39 13-56 20Z"
			/>
			<path fill="#FEE4E2" fill-opacity=".3" stroke="None" d="m575 612 13-4-13 4Z" />
			<path fill="#FDC2B3" fill-opacity=".5" stroke="None" d="m543 624 8-3 2-2-10 5Z" />
			<path
				fill="#01020C"
				stroke="None"
				d="M571 652c-1 1-1 2-3 2l-7 3-3 1-4 2 17 5c-1 3-2 8-6 6 0 1-3 4 0 4a360 360 0 0 0 40-27c-7 15-11 31-15 47v3c9-5 18-11 25-19 7 25-22 36-40 46l-7 14c9-8 20-15 31-19 1 20-22 24-33 37 1 3 4 3 6 4 1 0 2-2 3-1 0 24 23 40 18 65-7 3-15 2-22 2v2c2 5 1 13 1 19v20l1 21v9c25-7 10 10 26 20 8-10 0-32 2-45s0-34 1-47v-90c-1-13-2-20 13-23 2 4 0 10 3 14 5 6 8 11 11 18 15 22 27 48 42 69 10 8 36 7 49 6l19-1c23 0 53-11 75-6 5-1 11-7 14-11 14-18 23-39 34-59 13 0 15-19 20-29 3-4 7-3 11-4l5-2c10-2 27-1 36 1l5 1c-8 11-24 20-17 37l4 16 3 30 1 3c-1-13 4-25 9-36 7 12 13 27 23 36l-1-8h6v-14c0-5-2-8-3-13v-1c-1-1-2-5 0-6l3 6c6 0 16 18 22 31 6 14 22 29 40 20 8-2 17-1 26-1h16l22-1 49-1 22-3h1c7-1 12 9 15 14l5 8c11 25-2 61 4 88l-34-38-3 2-1 2-5 8c-3 17 3 35 2 51l-22-22c-12 12-9 29-11 44v26l2 28c-36-56-110-79-155-116 0-10-2-18-3-27h-16c-8 10-30 26-42 26v1c11 3 22 3 33 1l1 3c2-7 12-16 13-4l9 79c34 9 55 26 90 34s38 46 45 78l2 9c-3-1-6-2-7-5-8-4-14-8-21-14l-5-5-2-1c-10-4-19-14-27-21l-3-2c-26-19-28-23-58-8-8 4-18 12-27 14h-1c-2 4-9 6-13 8l-7 3-3 2c14 7 4 18 17 29 30 26 66 51 88 85-20-10-40-19-62-23 0 9 5 16 8 23l-15-15c-9-8-22-17-25-29-2 3-1 7-2 10 6 27 32 49 43 74l-54 1v11l-5 6-6 1h-52l-9-1-4-4-9-4-12-6c16 18 43 31 62 49-3 9-10 16-12 26 16 12 29 31 43 45h4c4-3 9-4 14-6l5-2-3-2c61-32 126-59 189-89l11-12c14-23 51 10 72 4 9-18 13-44 24-60 11-17 10-46 25-59l2-7 9-21c-25-15-62-10-88-22 10-12 10-23 5-37 5 0 8 5 13 4 0-7-2-13-3-20 0-5 5 4 6 7l3-2 7-13c10-16 1-47 4-65 1-9-6-46 1-52 6-6 29-6 38-8l7-1 11-3c4-1 11 0 14-2l1-2c0-15-18-28-20-43s-18-30-21-43c-3 23-35-3-22-20h28l7-2c6-1 22 0 26-4v-2c-4-13-27-28-36-38-11-11-28-23-36-36l-1-2-8-8-6-9-5-5c-2-3-3-7-5-1-9-28-44-11-67-17h-5l-13 1h-8l-17 1h-4l-17 1h-10l-13 1h-4l-15 1-16 1-18 1c-3 0-13 5-15 3-20 14-13 38-42 32s-41 6-63-12c-11-7-17-13-31-14l-11-2h-4l-17 1-24 1-18 1c-30 2-61 4-92 4-12 2-28 2-40 6l-4 2c2-14 1-29 5-42-7-7-43 13-52 16m429 94c0-1-2-3-1-4 12 2 24 4 36 3l-17-2c-15 0-29-8-45-7l4-3 8-6c2-2 4-5 7-5l2 6c5 11 14 13 25 14l2-1c11-5 21-16 21-29 10 2 19 8 26 15-6 9-19 11-29 15v2c17-5 34-10 50-18-31-28-83-46-118-14 19-15 36-41 62-37s56 13 81 23c-16-15-37-25-56-34 27-7 57 3 85 3s25 50 16 67c-8 17-11 55-31 62s-68 5-89 4-26-43-39-54m-284-38-14 14c-7 5-13 8-21 11h-1c-2 1-4 3-7 3 1 2 3 1 5 1h1c3-2 13-2 17-3h3l3-2c6-5 10-14 17-18 8-4 17-6 26-8l2-1c19-11 45-2 62 6 9 4 17 5 23 13 5 3 2-21-6-25-7-4-15-18-26-16 18-1 40 16 43 35l1 3c2 11-4 22-8 32l-4 13-4 10c-6 11-13 23-25 28l-10 2-31 2-14 1h-3c-7 2-17 1-24 0l-14-1c-32 0-46-26-54-50s-25-64 8-72l12-2h1c11-4 25-3 37-4l9-1 21-1c-7 10-18 19-25 30m151-15c-7 2-9-3-9-9 3 2 8 6 9 9m331 15v69l-43 4c16-22 11-70 43-73m-187 6c11 15-15 8 0 0m-6 266c-14-8-33-15-41-30 13 12 29 17 41 30m35 2c-16-9-33-17-46-31 16 8 34 17 46 31m-2 188c-12-47-65-52-75-100 50 10 65 56 75 100Z"
			/>
			<path
				fill="#F0DED3"
				fill-opacity=".9"
				stroke="None"
				d="m622 676 4-4h-3l1-11v-14c0-4 2-8-1-11-4 13-3 28-5 42l4-2Z"
			/>
			<path
				fill="#02112F"
				fill-opacity=".9"
				stroke="None"
				d="m1157 647-17 1-21 1c23 6 58-11 67 17 2-6 3-2 5 1-7-19-11-21-34-20Z"
			/>
			<path fill="#F7DCCF" fill-opacity=".4" stroke="None" d="M624 661v-14 14Z" />
			<path fill="#031F44" fill-opacity=".5" stroke="None" d="M1140 648Z" />
			<path
				fill="#163652"
				stroke="None"
				d="M596 655c-9 11-39 36-33 52l27-12c4-16 8-32 15-47l-9 7Z"
			/>
			<path fill="#020308" fill-opacity=".6" stroke="None" d="m1101 650 13-1-13 1Z" />
			<path fill="#000107" fill-opacity=".5" stroke="None" d="M1076 651Z" />
			<path fill="#000008" fill-opacity=".5" stroke="None" d="M1055 652Z" />
			<path fill="#A6A5A4" fill-opacity=".2" stroke="None" d="M567 654h1c2 0 2-1 3-2l-4 2Z" />
			<path fill="#000008" fill-opacity=".3" stroke="None" d="m1032 653 13-1-13 1Z" />
			<path fill="#000005" fill-opacity=".4" stroke="None" d="m1013 654 15-1-15 1Z" />
			<path fill="#697677" fill-opacity=".4" stroke="None" d="m561 657 7-3h-1l-6 3Z" />
			<path fill="#07314C" fill-opacity=".5" stroke="None" d="m974 655 5 1 18-1h-23Z" />
			<path
				fill="#1C506A"
				stroke="None"
				d="M565 675c-10 6-20 14-29 22 9 2 18 6 27 10-6-16 24-41 33-52l-31 20Z"
			/>
			<path
				fill="#F4DACF"
				fill-opacity=".8"
				stroke="None"
				d="m923 658 2 1h1c13 0 25-2 38-1l2-2c-12 1-30 3-43 2Z"
			/>
			<path
				fill="#0B2E4B"
				fill-opacity=".8"
				stroke="None"
				d="m966 656-2 2v1c2 2 12-3 15-3l-5-1-8 1Z"
			/>
			<path fill="#505A66" fill-opacity=".4" stroke="None" d="m554 660 4-2-4 2Z" />
			<path fill="#FBDED3" fill-opacity=".5" stroke="None" d="M907 659c4 0 12 1 15-1l-15 1Z" />
			<path fill="#DC9281" stroke="None" d="M907 659h-3v1c5 0 17 2 21-1l-2-1h-1c-3 2-11 1-15 1Z" />
			<path
				fill="#991C28"
				stroke="None"
				d="M926 659c-4 9 1 22-1 31-7 0-14-2-21-1 1-10-3-20 0-29v-1h-1s-2 2-3 1c4 15-14 17-18 23l-1-22c-6 4-9 16-15 23l-7-5c22 18 34 6 63 12s22-18 42-32v-1c-13-1-25 1-38 1Z"
			/>
			<path fill="#F3C3B1" fill-opacity=".5" stroke="None" d="m884 660 16-1-16 1Z" />
			<path
				fill="#D13025"
				stroke="None"
				d="m884 660-24 1h-17l-16 1-4 2c2 0 4-1 5 1 14 1 20 7 31 14l7 5c6-7 9-19 15-23l1 22c4-6 22-8 18-23 1 1 3-1 3-1h-3l-16 1Z"
			/>
			<path
				fill="#E34124"
				stroke="None"
				d="M904 660c-3 9 1 19 0 29 7-1 14 1 21 1 2-9-3-22 1-31h-1c-4 3-16 1-21 1Z"
			/>
			<path
				fill="#03182C"
				stroke="None"
				d="m548 662-9 4c-9 3-31 9-28 21 1 2 3 1 3 5l1 5 8 24c4 3 11-11 17-10s15 7 22 7l28-20v-3l-27 12c-9-4-18-8-27-10 9-8 19-16 29-22-3 0 0-3 0-4 4 2 5-3 6-6l-17-5-6 2Z"
			/>
			<path fill="#CD211C" fill-opacity=".6" stroke="None" d="M860 661h-17 17Z" />
			<path fill="#2C575B" fill-opacity=".3" stroke="None" d="m539 666 9-4-9 4Z" />
			<path
				fill="#8C222D"
				fill-opacity=".6"
				stroke="None"
				d="m817 663 11 2c-1-2-3-1-5-1l4-2-10 1Z"
			/>
			<path
				fill="#0B3352"
				stroke="None"
				d="M1039 744c-9 3-29 8-39 2 13 11 18 53 39 54s69 3 89-4 23-45 31-62c9-17 12-67-16-67s-58-10-85-3c19 9 40 19 56 34-25-10-55-19-81-23s-43 22-62 37c35-32 87-14 118 14-16 8-33 13-50 18Z"
			/>
			<path fill="#059FD0" fill-opacity=".4" stroke="None" d="m363 664 4-1-4 1Z" />
			<path
				fill="#0FA7D6"
				stroke="None"
				d="M363 664c-4 2-5 4-6 8-2 18-2 41-1 58 1 5 6 10 11 11 17 1 38-1 56-1h2c3-2 4-5 5-8 3-16 3-43 0-59-1-4-7-7-8-10h-55l-4 1Z"
			/>
			<path
				fill="#F6DAC2"
				fill-opacity=".9"
				stroke="None"
				d="M430 673c4 13 4 46 0 59-1 3-2 6-5 8 4 0 8-4 9-8 2-14 4-64-10-69h-2c1 3 7 6 8 10Z"
			/>
			<path
				fill="#FBD4BA"
				fill-opacity=".3"
				stroke="None"
				d="M434 732c3-12 5-69-10-69 14 5 12 55 10 69Z"
			/>
			<path fill="#0D1F3D" fill-opacity=".4" stroke="None" d="M796 664Z" />
			<path fill="#000006" fill-opacity=".4" stroke="None" d="m754 666 18-1-18 1Z" />
			<path
				fill="#1E2C42"
				fill-opacity=".8"
				stroke="None"
				d="m626 672-4 4c12-4 28-4 40-6-10 0-27-2-36 2Z"
			/>
			<path fill="#04A4D5" fill-opacity=".7" stroke="None" d="M356 730Z" />
			<path
				fill="#92BFCC"
				fill-opacity=".9"
				stroke="None"
				d="m1202 681 8 8 1 2 32 31-11-13-7-7-22-23-7-7 6 9Z"
			/>
			<path fill="#A5D2E3" stroke="None" d="M430 732Z" />
			<path
				fill="#D52B2A"
				stroke="None"
				d="M720 679c-15 7-28 41-39 54 8-3 14-6 21-11l14-14c7-11 18-20 25-30l-21 1Z"
			/>
			<path
				fill="#123E5C"
				stroke="None"
				d="m590 698-28 20c-7 0-16-6-22-7s-13 13-17 10l2 4 3 10 1 3 3 4 1 3c1 4 4 7 4 10 1 25 8 48 15 71h1l18 1c7 0 15 1 22-2 5-25-18-41-18-65-1-1-2 1-3 1-4 1-7 6-12 6-1-4 3-8 6-10 11-13 34-17 33-37a192 192 0 0 0-60 47c-3-19 23-31 36-42 18-10 47-21 40-46-7 8-16 14-25 19Z"
			/>
			<path
				fill="#EC4A2D"
				stroke="None"
				d="M711 680c-9 2-23 4-31 10-5 4-14 4-13 10-2 0-6-2-6-5 6-2 5-8 10-10l-10 1c-33 8-16 48-8 72s22 50 54 50l32 1h5v-2l-3-3c-6-6-14-11-21-16-8-5-14-14-20-20-3-3-15-11-15-15 1-7 16-11 17-17 1-3-1-2-3-2h-3c-5 2-10 3-17 3h-1l-10 2c3-4 8-4 12-6h1c11-13 24-47 39-54l-9 1Z"
			/>
			<path fill="#88B7BD" fill-opacity=".3" stroke="None" d="m1225 702-22-23 22 23Z" />
			<path
				fill="#E5A46D"
				stroke="None"
				d="m674 684 5 2c-1 1-2 6 1 4 8-6 22-8 31-10-12 1-26 0-37 4Z"
			/>
			<path fill="#466478" stroke="None" d="m1210 689-8-8 8 8Z" />
			<path
				fill="#101C35"
				stroke="None"
				d="M832 724v3c4-2 6-7 11-9-3-19-25-36-43-35 11-2 19 12 26 16 8 4 11 28 6 25Z"
			/>
			<path fill="#973A40" stroke="None" d="m661 686 10-1 2-1-12 2Z" />
			<path
				fill="#F58A59"
				stroke="None"
				d="M671 685c-5 2-4 8-10 10 0 3 4 5 6 5-1-6 8-6 13-10-3 2-2-3-1-4l-5-2h-1l-2 1Z"
			/>
			<path fill="#180215" stroke="None" d="M867 693c-1-3-6-7-9-9 0 6 2 11 9 9Z" />
			<path fill="#CEC3BB" fill-opacity=".6" stroke="None" d="M514 694v-2c0-4-2-3-3-5l3 7Z" />
			<path fill="#17232C" stroke="None" d="m1247 727-4-5-32-31c8 13 25 25 36 36Z" />
			<path fill="#979494" fill-opacity=".6" stroke="None" d="m514 694 1 3-1-5v2Z" />
			<path
				fill="#0B2640"
				stroke="None"
				d="m747 705 11 2c18 2 36 2 51 12 1 0 1-3 3-2 0-2-2-7-4-3l1-3c-17-8-43-17-62-6Z"
			/>
			<path fill="#724158" stroke="None" d="m745 706 10 3 3-2-11-2-2 1Z" />
			<path
				fill="#C23C2C"
				stroke="None"
				d="M719 714c-7 4-10 14-17 18l-3 2c2 0 4-1 3 2 15-12 36-20 53-27l-10-3c-9 2-18 4-26 8Z"
			/>
			<path
				fill="#020513"
				stroke="None"
				d="M755 709c-17 7-38 15-53 27l-11 12c12-9 25-8 37-2h3c-12-6-8-13 3-18 1 6 7 10 11 15l5 3c5 2 9 1 15 1 7-2 16-10 17-19 2-8 24 2 21 8 4-3 12 0 13 5l-4-1c2 2 5 3 5-1 3 0 10 6 10-1v-1c-4-6-12-14-18-18-15-10-33-10-51-12l-3 2m-4 14c1 8 12 12 11 21-15 7-33-20-11-21Z"
			/>
			<path fill="#451D23" stroke="None" d="m702 722 14-14-14 14Z" />
			<path
				fill="none"
				stroke="None"
				d="m893 710-2 1-1 1c-3 4-6 6-7 11l-1 6c-3 30 8 79-31 82l-34 3-3-1c-22-5-52 6-75 6l-19 2h-9l-13 1-2 1c-4 1-10 0-13-1-6-1-9-3-12-8-15-21-27-47-42-69l-9-14-4 59-1 16c0 13-3 27 3 38l12 17v1c9 6 17 23 23 32l4 6 5 8c9 10 22 26 27 39 5 12-4 35-6 48l-5 30-1 5c0 4 1 7 3 11l11 16 10 15 8 13 6 9c4 6 10 19 18 16l6-3 11-8 7-4 15-10 24-15 6-5 3-1 4-3 4-2 17-12c7-4 16-14 24-15h6l7 4 1 1 21 13 12 7 4 3 3 1c10 5 12 9 23 3l12-6h1c7-7 19-9 27-14 24-13 33-19 54 3l12 10a164 164 0 0 1 24 19l5 5c7 6 13 10 21 14 2 0 5-2 5-4-7-32-10-70-45-78s-56-25-90-34l-9-79c-5-8-11 3-12 7l-2 11-6 29-2 11-1 2-1 9c-1 4-4 5-8 6-14 5-29 8-44 12l-5 1-32 9-5 1-12 3-4 1-7 2-5 1c-14 5-18 24-30 32v1c-2 5-7 9-10 13-4 6-10 16-16 19l-1 1c-8-1-10-12-13-18l-13-28c-12-23-2-39 5-63l4-11c6-30 18-34 46-40l5-2 13-4 12-3 1-1 8-2 5-1 20-6 6-2h1l7-2 6-2c10-2 20-7 30-8l8-1h13c19 0 24-7 38-18l1-1-1-8-12-33-3-8c-3-5-4-9-4-16v-1c-3-3-2-11-2-16l-2-13-2-16c-7-17 9-26 17-37l-5-1c-10-1-27-2-36-1l-5 2Z"
			/>
			<path fill="#040207" fill-opacity=".1" stroke="None" d="M934 709Z" />
			<path fill="#03213F" stroke="None" d="M1198 708c-32 3-27 51-43 73l43-4v-69Z" />
			<path fill="#9FCCCF" fill-opacity=".4" stroke="None" d="M1243 722h1l-12-13 11 13Z" />
			<path
				fill="#B2372F"
				fill-opacity=".6"
				stroke="None"
				d="M882 714c2-2 4-2 6-2-2 3-6 8-5 11 1-5 4-7 7-11-2 0 1-1 1-1l2-1c-4 1-8 0-11 4Z"
			/>
			<path
				fill="#07344D"
				stroke="None"
				d="M809 719c6 4 14 12 18 18 0 0 14-22 17-16l-1-3c-5 2-7 7-11 9v-3c-6-8-14-9-23-13l-1 3c2-4 4 1 4 3-2-1-2 2-3 2Z"
			/>
			<path fill="#E74D3B" fill-opacity=".6" stroke="None" d="m890 712 1-1s-3 1-1 1Z" />
			<path
				fill="#EA472D"
				stroke="None"
				d="M882 714c-5 10-7 29-20 29-11 20-20 41-34 59-2 2-8 11-11 12l34-3c9-5 23-6 23-17v-22c0-15 8-28 4-43h4l1-6c-1-3 3-8 5-11-2 0-4 0-6 2Z"
			/>
			<path
				fill="#597D91"
				stroke="None"
				d="m1021 741 14 1h4c10-4 23-6 29-15-7-7-16-13-26-15 0 13-10 24-21 29Z"
			/>
			<path
				fill="#DD2C2C"
				stroke="None"
				d="M602 736c1-4 13-9 16-9-3-4-1-10-3-14-15 3-14 10-13 23Z"
			/>
			<path fill="#431317" stroke="None" d="M702 732c7-4 10-14 17-18-7 4-11 13-17 18Z" />
			<path fill="#19292F" stroke="None" d="M1011 714c-15 8 11 15 0 0Z" />
			<path
				fill="#245C76"
				stroke="None"
				d="M827 737v1c2 3-19 19-26 23s-24 15-31 21-23 16-26 25v2h4l14-1 31-2 11-7 17-18c4-5 8-9 10-15l5-13c4-10 10-21 8-32-3-6-17 16-17 16Z"
			/>
			<path fill="#2E5B7B" stroke="None" d="m985 727 2 3c3-1 5 0 7-2l-2-6c-3 0-5 3-7 5Z" />
			<path
				fill="#E7DBCB"
				fill-opacity=".8"
				stroke="None"
				d="M1247 727c9 10 32 25 36 38 1-3-4-6-6-9l-20-21c-4-4-8-10-13-13h-1l4 5Z"
			/>
			<path fill="#021623" stroke="None" d="M751 723c-22 1-4 28 11 21 1-9-10-13-11-21Z" />
			<path
				fill="#5D7C94"
				stroke="None"
				d="m765 747 2 1h2l8-1c9-2 16-5 24-10l2-1c3-6-19-16-21-8-1 9-10 17-17 19Z"
			/>
			<path fill="#0D3865" fill-opacity=".4" stroke="None" d="m528 735-3-10 3 10Z" />
			<path fill="#010F25" stroke="None" d="m568 739 7-14c-13 11-39 23-36 42 8-10 19-20 29-28Z" />
			<path
				fill="#F3DED4"
				fill-opacity=".9"
				stroke="None"
				d="M602 736v82l3 8c17 45 57 83 84 121-5-13-18-29-27-39l-5-8-4-6-23-32v-1c-5-3-9-12-12-17-6-11-3-25-3-38l1-16 4-59 9 14c-3-7-6-12-11-18-3 0-15 5-16 9Z"
			/>
			<path fill="#1D1E3A" stroke="None" d="m977 733 10-3-2-3-8 6Z" />
			<path
				fill="#EECEBD"
				stroke="None"
				d="M731 746h2l7 1c1 0 3-4 5-4-4-5-10-9-11-15-11 5-15 12-3 18Z"
			/>
			<path
				fill="#C38E84"
				stroke="None"
				d="m987 730-10 3-4 3c16-1 30 7 45 7h4l-3-1c-11-1-20-3-25-14-2 2-4 1-7 2Z"
			/>
			<path
				fill="#F9E2D9"
				fill-opacity=".8"
				stroke="None"
				d="M874 772v22c0 11-14 12-23 17 39-3 28-52 31-82h-4c4 15-4 28-4 43Z"
			/>
			<path fill="#5D1F1C" stroke="None" d="M678 737c-2 0-4 1-5-1 3 0 5-2 7-3-4 2-9 2-12 6l10-2Z" />
			<path fill="#721B25" stroke="None" d="M679 737c7 0 12-1 17-3-4 1-14 1-17 3Z" />
			<path fill="#922729" stroke="None" d="m803 736-2 3c3 1 8-1 10 1h1l4 1c-1-5-9-8-13-5Z" />
			<path fill="#F6D8C6" fill-opacity=".2" stroke="None" d="m1277 756-20-21 20 21Z" />
			<path fill="#612F33" stroke="None" d="m685 753 6-5 11-12c-1 6-16 10-17 17Z" />
			<path fill="#531B24" stroke="None" d="m801 737-2 3h12c-2-2-7 0-10-1l2-3-2 1Z" />
			<path
				fill="#040E26"
				stroke="None"
				d="M777 747c2 0 4 1 5 4h-5c5 1 10 4 14 7-4 6-12 7-16 12-4 4-4 8-5 12 7-6 24-17 31-21s28-20 26-23c0 7-7 1-10 1 0 4-3 3-5 1h-13l2-3c-8 5-15 8-24 10Z"
			/>
			<path fill="#98D2E5" fill-opacity=".3" stroke="None" d="m530 741 2 1-3-4 1 3Z" />
			<path
				fill="#0A9ACD"
				fill-opacity=".1"
				stroke="None"
				d="M367 741c13 2 44 4 56-1-18 0-39 2-56 1Z"
			/>
			<path fill="#CFE4ED" fill-opacity=".5" stroke="None" d="M532 745h1l-1-3-2-1 2 4Z" />
			<path
				fill="#2D6988"
				stroke="None"
				d="m691 748-6 5c0 4 12 12 15 15l20 20c7 5 15 10 21 16-1-10 27-28 34-34 4-5 12-6 16-12-4-3-9-6-14-7h-4l-27-1h-4c-5 0-10-2-14-4-12-6-25-7-37 2m84 20c-2 2-5 1-8 1 2 5-26 2-35-2 13-2 30-2 43 1Z"
			/>
			<path fill="#8F9396" stroke="None" d="m1019 742 3 1 13-1-14-1-2 1Z" />
			<path
				fill="#061127"
				stroke="None"
				d="M1000 746c10 6 30 1 39-2l-4 1c-12 1-24-1-36-3-1 1 1 3 1 4Z"
			/>
			<path fill="#422820" stroke="None" d="M1022 743h-4l17 2 4-1v-2h-4l-13 1Z" />
			<path fill="#F2B951" stroke="None" d="m740 747 9 2 1-3-5-3c-2 0-4 4-5 4Z" />
			<path
				fill="#D6EAF1"
				fill-opacity=".9"
				stroke="None"
				d="M534 750c1 4 0 7-3 10l6-5c0-3-3-6-4-10h-1l2 5Z"
			/>
			<path fill="#1F3A5A" stroke="None" d="m742 750-9-4h-5c4 2 9 4 14 4Z" />
			<path fill="#6D3134" stroke="None" d="M742 750h7v-1l-9-2-7-1 9 4Z" />
			<path fill="#CCA37C" stroke="None" d="M749 749v1l18-2-2-1c-6 0-10 1-15-1l-1 3Z" />
			<path fill="#03050E" stroke="None" d="m769 748 4 3h9c-1-3-3-4-5-4l-8 1Z" />
			<path fill="#772524" fill-opacity=".7" stroke="None" d="M924 763h2l-4-16 2 16Z" />
			<path fill="#2C2225" stroke="None" d="M749 750h-3l27 1-4-3h-2l-18 2Z" />
			<path
				fill="#E8F4FB"
				fill-opacity=".3"
				stroke="None"
				d="m518 771 13-11c3-3 4-6 3-10 1 7-11 17-16 21Z"
			/>
			<path fill="#0E254B" stroke="None" d="M831 766h1l4-13-5 13Z" />
			<path
				fill="none"
				stroke="None"
				d="M964 760c0-1-1-4 1-4 2 4 4 8 3 13l-1 5v14l-1 13 2 4 6 7 5 6c8 10 34 29 36 42 1 9-10 16-9 24 6 7 16 11 25 14l6 2 4 2 11 5c14 5 36 9 42 23l7 13 2 4 2 5 2 4 8 6c2-15-1-32 11-44v-1l4-6 8-13 11-16 8-11 5-8c4-10 13-20 19-28l4-8-5-8c-5-5-11-8-15-14h-1c-4 5-16 3-22 3l-49 1-22 1h-16l-26 1c-18 9-34-6-40-20-6-13-16-31-22-31l-3-6c-2 1-1 5 0 6Z"
			/>
			<path
				fill="#14A6D6"
				stroke="None"
				d="m531 760-13 11-18 16-15 14c-5 4-25 19-15 25 21 8 59 0 82 0-7-23-14-46-15-71l-6 5Z"
			/>
			<path fill="#D63734" stroke="None" d="M964 760v1l4 8c1-5-1-9-3-13-2 0-1 3-1 4Z" />
			<path fill="#021032" stroke="None" d="M572 761c-2-1-5-1-6-4-3 2-7 6-6 10 5 0 8-5 12-6Z" />
			<path
				fill="#092E4F"
				stroke="None"
				d="m930 796 2 13 3 8c6 9 8 13 11 23v-12c23-1 22 24 25 40h-5c17 3 3 27-4 32 45 37 119 60 155 116l-2-28c-2-13-2-20-8-32l-2-4c-7-9-15-26-24-31l-43-19-7-4c-9-3-19-7-25-14-5-7 12-20 2-28-9-9-11-17-20-26-5-5-10-10-13-16l-7-9-2-4-2-2-2-3c-10-9-16-24-23-36-5 11-10 23-9 36Z"
			/>
			<path fill="#6F1E1E" fill-opacity=".9" stroke="None" d="m967 774 1-5-4-8c1 5 3 8 3 13Z" />
			<path fill="#9E2427" fill-opacity=".9" stroke="None" d="m926 776 2 16v1h1l-3-30h-2l2 13Z" />
			<path fill="#0E3354" stroke="None" d="M775 768c-13-3-30-3-43-1 9 4 37 7 35 2 3 0 6 1 8-1Z" />
			<path fill="#A48666" stroke="None" d="m821 781 7-5 4-10h-1c-2 6-6 10-10 15Z" />
			<path
				fill="#EAD1BC"
				fill-opacity=".9"
				stroke="None"
				d="M1257 771v1h18c3 0 10-1 8-5-4 4-20 3-26 4Z"
			/>
			<path fill="#976661" stroke="None" d="m720 788-20-20c6 6 12 15 20 20Z" />
			<path
				fill="#092E4B"
				stroke="None"
				d="m741 804 3 3c3-9 19-19 26-25 1-4 1-8 5-12-7 6-35 24-34 34Z"
			/>
			<path fill="#C3BAB2" fill-opacity=".5" stroke="None" d="M1250 773h6l1-1v-1l-7 2Z" />
			<path fill="#EDB9AE" stroke="None" d="M874 794v-22 22Z" />
			<path fill="#F3D5BE" fill-opacity=".1" stroke="None" d="m1256 773 19-1h-18l-1 1Z" />
			<path fill="#043A5F" stroke="None" d="m1244 793 1-6c-2-4-6-12 1-14h-24c-13 17 19 43 22 20Z" />
			<path
				fill="#D55541"
				stroke="None"
				d="m821 781-17 18c-2 1-3 4-5 4 0 3 2 1 4 1 12-5 19-17 25-28l-7 5Z"
			/>
			<path fill="#D41F23" fill-opacity=".3" stroke="None" d="m928 792-2-16c0 5-1 13 2 16Z" />
			<path fill="#40383D" stroke="None" d="M602 798v-15 15Z" />
			<path fill="#71C3E2" fill-opacity=".2" stroke="None" d="m485 801 15-14-15 14Z" />
			<path
				fill="#E7D1BE"
				fill-opacity=".8"
				stroke="None"
				d="M1244 793c3 13 19 28 21 43s20 28 20 43c4-7-14-37-18-44-2-2-2-4-3-7l-1-2c-3-4-4-8-6-13-3-9-8-18-12-26l-1 6Z"
			/>
			<path fill="#A92327" stroke="None" d="m962 796 2 3 2-11h-5l1 8Z" />
			<path fill="#9E1722" fill-opacity=".5" stroke="None" d="m964 799 2 2 1-13h-1l-2 11Z" />
			<path fill="#F2E0D5" fill-opacity=".6" stroke="None" d="m615 806 1-16-1 16Z" />
			<path
				fill="#932F2E"
				fill-opacity=".6"
				stroke="None"
				d="m932 809-2-13-1-3h-1c0 7 1 11 4 16Z"
			/>
			<path fill="#854D58" stroke="None" d="m793 806 10-2c-2 0-4 2-4-1 2 0 3-3 5-4l-11 7Z" />
			<path
				fill="#491613"
				fill-opacity=".8"
				stroke="None"
				d="m814 813 3 1c3-1 9-10 11-12-3 4-9 10-14 11Z"
			/>
			<path fill="#101937" fill-opacity=".5" stroke="None" d="m975 814-1-2-6-7 7 9Z" />
			<path fill="#611B29" fill-opacity=".6" stroke="None" d="M1142 808c6 0 18 2 22-3l-22 3Z" />
			<path
				fill="#6D1825"
				fill-opacity=".7"
				stroke="None"
				d="M1180 819c-3-5-8-15-15-14 4 6 10 9 15 14Z"
			/>
			<path fill="#A13F33" stroke="None" d="M721 809h18l-32-1 14 1Z" />
			<path fill="#173A4B" stroke="None" d="m748 809 14-1-14 1Z" />
			<path fill="#261816" stroke="None" d="M745 809h-24c7 1 17 2 24 0Z" />
			<path fill="#050304" fill-opacity=".4" stroke="None" d="M1071 810Z" />
			<path fill="#060307" fill-opacity=".5" stroke="None" d="m1029 811 26-1c-9 0-18-1-26 1Z" />
			<path
				fill="#601D2E"
				fill-opacity=".8"
				stroke="None"
				d="M975 814c3 6 8 11 13 16l-9-12-5-6 1 2Z"
			/>
			<path fill="#F9D9C1" fill-opacity=".3" stroke="None" d="m1263 826-6-13c2 5 3 9 6 13Z" />
			<path
				fill="#EFDCD4"
				fill-opacity=".9"
				stroke="None"
				d="m683 822 13 1 2-1c3-2 9-1 13-1h9v-1c-13 1-39 2-49-6 3 5 6 7 12 8Z"
			/>
			<path
				fill="#AE2F35"
				fill-opacity=".8"
				stroke="None"
				d="m947 850-1-10c-3-10-5-14-11-23l12 33Z"
			/>
			<path fill="#133854" stroke="None" d="M602 826c0 34-3 66 28 86 12-35-18-58-25-86l-3-8v8Z" />
			<path
				fill="#D6141F"
				fill-opacity=".3"
				stroke="None"
				d="M988 830c7 7 25 21 27 30-2-13-28-32-36-42l9 12Z"
			/>
			<path fill="#782028" fill-opacity=".4" stroke="None" d="M720 820v1l19-2-19 1Z" />
			<path fill="#F8E7DF" fill-opacity=".3" stroke="None" d="m698 822 13-1c-4 0-10-1-13 1Z" />
			<path fill="#F6E4D6" fill-opacity=".2" stroke="None" d="m696 823-13-1c3 1 9 2 13 1Z" />
			<path fill="#CAE7E0" stroke="None" d="M473 827c25 2 55 2 80 0v-1h-1c-23 0-61 8-82 0l3 1Z" />
			<path
				fill="#EFD0C2"
				stroke="None"
				d="M553 827v1l4 3c9 12 2 51 2 67h14v-9l-1-21v-20l-1-19v-2l-18-1v1Z"
			/>
			<path
				fill="#0E1D2F"
				stroke="None"
				d="M599 918v1c8 6 16 15 22 23-9 3-14 13-22 17 13 7 20 15 8 29 10 6-3 35-18 40 16-31 8-65 8-99v-5c-8 6-18 9-24 16-5-1-10-6-14-9 0 12 2 28 0 40s5 30-1 39l-1 2v3h-8c-11 0-31-4-41 1l-23 34c-2 3-9 10-10 13-1 4 2 7 5 8 45 11 101-13 144 1 3 1 4 1 5 4 11 41-9 90 0 132l1 2c2 2 4 4 6 4h51c8-4 0-29 2-38s-1-30 0-40c-16-22-8-39 10-59-2 20-2 42-9 59 17 24 55 46 80 61-7-11 3-29 0-42s2-31 0-44c-1 0-2 3-3 1 3-3-2-5 4-4-2-3-5-6-1-10-13 2-32 20-43 17-24-28-70-82-45-120-3-16 9-32 7-48-27-38-67-76-84-121 7 28 37 51 25 86-31-20-28-52-28-86-1 13 1 34-1 47s6 35-2 45m71 9c-3 9-12 16-19 21l-1-45c9 5 12 17 20 24m-13 64c-4 14-14 26-18 40 6-5 13-11 21-12 9 28-16 37-30 52-13-12-22-30-35-43 22-9 42-23 62-37Z"
			/>
			<path fill="#FDE0C9" fill-opacity=".1" stroke="None" d="M247 828h58c-16-4-42-3-58 0Z" />
			<path fill="#F6E0CE" fill-opacity=".1" stroke="None" d="M553 828v-1a486 486 0 0 1 0 1Z" />
			<path
				fill="#06223C"
				stroke="None"
				d="m1181 835-19 29c-1 4-5 10-7 13l34 38c-6-27 7-63-4-88l-4 8Z"
			/>
			<path fill="#D2BEB3" fill-opacity=".9" stroke="None" d="M243 829h27v-1h-23l-4 1Z" />
			<path fill="#A59C9B" stroke="None" d="M270 829h27v-1h-27v1Z" />
			<path
				fill="#F8D9C1"
				fill-opacity=".9"
				stroke="None"
				d="M297 829c7 0 10 4 12 10 3 12 1 29 1 42 0 7 2 21-6 24 7-1 9-4 10-10 2-18 2-39 0-57-1-6-3-8-9-10h-8v1Z"
			/>
			<path fill="#124260" stroke="None" d="m946 840 1 10 1 8v11l18-1h5c-3-16-2-41-25-40v12Z" />
			<path fill="#FFC3A7" fill-opacity=".4" stroke="None" d="m1267 835-3-7c1 3 1 5 3 7Z" />
			<path fill="#051C31" stroke="None" d="M243 830c7 1 16 0 22-1h-22v1Z" />
			<path
				fill="#16405D"
				stroke="None"
				d="M243 830c-4 1-6 4-6 8 0 11-5 60 6 66 13 6 47 3 61 1 8-3 6-17 6-24-1-13 1-28-1-42-2-6-5-10-12-10h-32c-6 1-15 2-22 1Z"
			/>
			<path fill="#908983" stroke="None" d="M572 848c0-6 1-14-1-19l1 19Z" />
			<path
				fill="#9F1F31"
				fill-opacity=".9"
				stroke="None"
				d="M1006 884c-1-8 10-15 9-24-2-9-20-23-27-30 9 9 11 17 20 26 10 8-7 21-2 28Z"
			/>
			<path
				fill="#EFD0C1"
				fill-opacity=".9"
				stroke="None"
				d="M558 899h1v-1c0-16 7-55-2-67 8 15 1 51 1 68Z"
			/>
			<path
				fill="#40253E"
				fill-opacity=".4"
				stroke="None"
				d="M1162 863v1l19-29c-6 8-15 18-19 28Z"
			/>
			<path
				fill="#15425D"
				fill-opacity=".8"
				stroke="None"
				d="M243 904c-11-6-6-55-6-66-1 12-6 61 6 66Z"
			/>
			<path fill="#FED4B6" fill-opacity=".2" stroke="None" d="M314 895Z" />
			<path fill="#4E586F" stroke="None" d="M310 881c0-13 2-30-1-42 2 14 0 29 1 42Z" />
			<path fill="#FEEFE5" fill-opacity=".3" stroke="None" d="m630 861-12-17c3 5 7 14 12 17Z" />
			<path fill="#72324E" fill-opacity=".9" stroke="None" d="m947 859-1 9c0 3 0 1 2 1v-11l-1 1Z" />
			<path
				fill="#BD332F"
				stroke="None"
				d="m909 877-13 1c-2 2-1 3-1 5s2 6-3 6l1 4c2 3 5 4 8 6 12 0 34-16 42-26l3-5 1-9c-14 11-19 18-38 18Z"
			/>
			<path fill="#FAEDE3" fill-opacity=".3" stroke="None" d="M653 894c-6-9-14-26-23-32l23 32Z" />
			<path
				fill="#5A243A"
				fill-opacity=".8"
				stroke="None"
				d="m1157 871-5 8 3-2c2-3 6-9 7-13v-1l-5 8Z"
			/>
			<path fill="#91928D" stroke="None" d="M573 889Z" />
			<path
				fill="#912C33"
				stroke="None"
				d="M943 873h16c1 9 3 17 3 27 7-5 21-29 4-32l-18 1c-2 0-2 2-2-1l-3 5Z"
			/>
			<path fill="#822D3D" fill-opacity=".3" stroke="None" d="m1149 882 2-1 1-2 5-8-8 11Z" />
			<path
				fill="#E86D64"
				fill-opacity=".9"
				stroke="None"
				d="m888 878 4 3 3 2c0-2-1-3 1-5v-1l-8 1Z"
			/>
			<path fill="#C82C2C" fill-opacity=".2" stroke="None" d="m896 878 13-1h-13v1Z" />
			<path
				fill="#02010D"
				stroke="None"
				d="m858 886-2 5h20c3 0 6 0 8 2l2 2c2-2-1-3-1-4 1-2 4-2 6-2 5-2 5-5 1-8l-4-3c-10 1-20 6-30 8Z"
			/>
			<path
				fill="#511618"
				stroke="None"
				d="M891 889c-1 2 1 3 2 4l-1-4c5 0 3-4 3-6l-3-2c4 3 4 6-1 8Z"
			/>
			<path fill="#591E2B" fill-opacity=".5" stroke="None" d="m1149 882-11 16 8-9 5-8-2 1Z" />
			<path
				fill="#D6CCC2"
				fill-opacity=".5"
				stroke="None"
				d="M1270 883c4 0 11 3 14-2-3 2-10 1-14 2Z"
			/>
			<path fill="#B43934" fill-opacity=".9" stroke="None" d="m852 888-7 2h-1v2l12-1 2-5-6 2Z" />
			<path
				fill="#EBC2A2"
				fill-opacity=".8"
				stroke="None"
				d="M1252 887c1 3 3 8 6 10l-1-3c-1-3-1-6 2-8l-7 1Z"
			/>
			<path
				fill="#E05629"
				stroke="None"
				d="M1214 895c-1 17 1 37-1 52-3 19 8 50-4 65l-7 13c-1 1-1 4-3 4-1-3-4-9-6-9 1 7 3 13 3 20-5 1-8-4-13-4 5 14 5 25-5 37 26 12 63 7 88 22l4 4 5 3c3 3 4 7 5 9 11 14 15-9 15-17s2-17 4-24l5-38c1-27 6-53-10-75s-27-35-36-59v-1c-3-2-5-7-6-10-9 2-32 2-38 8Z"
			/>
			<path fill="#EA5435" fill-opacity=".3" stroke="None" d="m845 890 7-2-7 2Z" />
			<path
				fill="#0B0B24"
				stroke="None"
				d="m886 895 15 5v-1c-3-2-6-3-8-6-1-1-3-2-2-4-2 0-5 0-6 2 0 1 3 2 1 4Z"
			/>
			<path fill="#061A34" stroke="None" d="m1138 898-8 13-4 6v1l22 22c1-16-5-34-2-51l-8 9Z" />
			<path fill="#DDEDF0" fill-opacity=".4" stroke="None" d="M838 892h6v-2l-6 2Z" />
			<path
				fill="#1CA1D1"
				stroke="None"
				d="M844 892h-6l-20 6-5 2c-3 1-5 2-8 1l-1 1c-3 3-9 2-12 3l-13 4-5 2c-28 6-40 10-46 40l-4 11c-7 24-17 40-5 63 1-23 38-52 51-67s26-13 37-23c12-9 31-13 38-21 8-7 41-14 39-21-2-2-5-2-8-2-5 0-15 3-19 0h-1l-12 1Z"
			/>
			<path fill="#17435F" stroke="None" d="M876 891h-19c4 3 14 0 19 0Z" />
			<path
				fill="#092C49"
				stroke="None"
				d="m719 1025 13 28c1 2 4 5 4 8-1-38 47-53 77-63l2-1 17-8c10-6 19-13 31-15 7-2 14-4 22-4l14-1c20-8 20-60-8-44 13-13 26-10 39 2l5-23-1-3c-11 2-22 2-33-1l-15-5-2-2c2 7-31 14-39 21-7 8-26 12-38 21-11 10-24 8-37 23s-50 44-51 67m127-73c-31 22-64 48-96 70 25-29 64-48 96-70Z"
			/>
			<path
				fill="#0C2D46"
				stroke="None"
				d="m573 898-12 1c-4 8-2 22-2 32 4 3 9 8 14 9 6-7 16-10 24-16v5l2-10v-1c-16-10-1-27-26-20Z"
			/>
			<path
				fill="#93CCD9"
				fill-opacity=".8"
				stroke="None"
				d="m935 904-5 23c-3 16-5 33-14 47v1c4-1 7-2 8-6 1-2-1-6 1-9l1-2 2-11 6-29 2-11c1-4 7-15 12-7-1-12-11-3-13 4Z"
			/>
			<path fill="#FEDFC7" fill-opacity=".3" stroke="None" d="M1258 897v1h1l-2-4 1 3Z" />
			<path fill="#9E4727" stroke="None" d="M1213 947c2-15 0-35 1-52-7 6 0 43-1 52Z" />
			<path fill="#B9A8A9" stroke="None" d="M559 899h2l12-1h-14v1Z" />
			<path fill="#0D93D1" fill-opacity=".5" stroke="None" d="M813 899v1l5-2-5 1Z" />
			<path fill="#7C2543" fill-opacity=".5" stroke="None" d="m1038 902-1-2-6-2 7 4Z" />
			<path
				fill="#FCCDAD"
				fill-opacity=".7"
				stroke="None"
				d="M1304 1032c2-15 6-30 7-45 0-5-2-8-4-12l-4-7-8-13-3-4-7-12c-7-11-15-34-26-41h-1c9 24 20 37 36 59s11 48 10 75Z"
			/>
			<path
				fill="#B2A292"
				fill-opacity=".8"
				stroke="None"
				d="M399 901c9-5 29-1 39-1v-1c-9 0-34-3-39 2Z"
			/>
			<path fill="#CDC9C6" fill-opacity=".9" stroke="None" d="M438 900h23v-1h-23v1Z" />
			<path
				fill="#F9F9F7"
				fill-opacity=".9"
				stroke="None"
				d="m461 900 6 8c5 13 4 47 0 60l-5 8 3-1c11-8 6-54 6-66-1-5-5-10-10-10v1Z"
			/>
			<path
				fill="#0D1825"
				fill-opacity=".9"
				stroke="None"
				d="M558 1010c6-9-1-27 1-39s0-28 0-40c0-10-2-24 2-32h-3c0 33 8 79 0 111Z"
			/>
			<path fill="#0E87C9" fill-opacity=".3" stroke="None" d="M805 901c3 1 5 0 8-1v-1l-8 2Z" />
			<path
				fill="#040612"
				stroke="None"
				d="m399 901-5 8c-3 16-2 41 0 57 2 8 6 10 14 10h54l5-8c3-16 3-44 0-60l-6-8h-23c-10 0-30-4-39 1Z"
			/>
			<path fill="#EDD9BE" fill-opacity=".3" stroke="None" d="m662 908-5-8 5 8Z" />
			<path
				fill="#7C1D2E"
				fill-opacity=".8"
				stroke="None"
				d="m1038 902 43 19c9 4 17 18 22 26l-2-4-7-13c-6-14-28-18-42-23l-11-5-4-2 1 2Z"
			/>
			<path fill="#0A92D3" fill-opacity=".3" stroke="None" d="M792 905c3-1 9 0 12-3l-12 3Z" />
			<path fill="#BF242C" fill-opacity=".3" stroke="None" d="m1052 907-11-5 11 5Z" />
			<path fill="#0F3655" stroke="None" d="M670 927c-8-7-11-19-20-24l1 45c7-5 16-12 19-21Z" />
			<path fill="#A5DEE7" fill-opacity=".3" stroke="None" d="m934 918 2-11-2 11Z" />
			<path fill="#676B72" stroke="None" d="M467 968c4-13 5-47 0-60 3 16 3 44 0 60Z" />
			<path fill="#04050B" fill-opacity=".4" stroke="None" d="M394 966Z" />
			<path
				fill="#FEFDF9"
				fill-opacity=".5"
				stroke="None"
				d="M465 975c12-6 8-53 6-66 0 12 5 58-6 66Z"
			/>
			<path fill="#038FB8" fill-opacity=".3" stroke="None" d="m774 911 5-2-5 2Z" />
			<path fill="#061033" fill-opacity=".3" stroke="None" d="m1126 917 4-6-4 6Z" />
			<path
				fill="#010410"
				stroke="None"
				d="M899 969c5 0 10-1 14 2l3 3c9-14 11-31 14-47-13-12-26-15-39-2 28-16 28 36 8 44Z"
			/>
			<path
				fill="#14415B"
				stroke="None"
				d="M597 929c0 34 8 68-8 99 15-5 28-34 18-40 12-14 5-22-8-29 8-4 13-14 22-17-6-8-14-17-22-23l-2 10Z"
			/>
			<path fill="#24193D" stroke="None" d="m1105 952-2-5c-5-8-13-22-22-26 9 5 17 22 24 31Z" />
			<path fill="#761926" fill-opacity=".3" stroke="None" d="M1101 943Z" />
			<path fill="#FFDEC0" fill-opacity=".3" stroke="None" d="m1292 951-7-12 7 12Z" />
			<path
				fill="#E0D7D9"
				fill-opacity=".7"
				stroke="None"
				d="M682 995h1c2-13 11-36 6-48 2 16-10 32-7 48Z"
			/>
			<path fill="#8BDAE8" fill-opacity=".4" stroke="None" d="m926 958 2-11-2 11Z" />
			<path fill="#2A1311" stroke="None" d="M1209 1012c12-15 1-46 4-65-3 18 6 49-4 65Z" />
			<path fill="#01132F" stroke="None" d="M1005 980c-12-13-28-18-41-30 8 15 27 22 41 30Z" />
			<path fill="#1095C6" fill-opacity=".3" stroke="None" d="m724 962 4-11-4 11Z" />
			<path fill="#01162B" stroke="None" d="M1040 982c-12-14-30-23-46-31 13 14 30 22 46 31Z" />
			<path fill="#000A1B" stroke="None" d="M846 952c-32 22-71 41-96 70 32-22 65-48 96-70Z" />
			<path fill="#FFDEC5" fill-opacity=".3" stroke="None" d="m1303 968-8-13 8 13Z" />
			<path fill="#0E152E" fill-opacity=".9" stroke="None" d="M1115 988v-26l-8-6c6 12 6 19 8 32Z" />
			<path fill="#81CBE1" fill-opacity=".4" stroke="None" d="m924 969 1-9c-2 3 0 7-1 9Z" />
			<path fill="#390D1E" stroke="None" d="M885 970h13c4 0 11-1 15 1-4-3-9-2-14-2l-14 1Z" />
			<path fill="#69293C" stroke="None" d="m863 974 23-4h-1c-8 0-15 2-22 4Z" />
			<path
				fill="#DC4D42"
				stroke="None"
				d="M863 974c-12 2-21 9-31 15 16-2 46-15 66-19h-12l-23 4Z"
			/>
			<path
				fill="#BF222D"
				fill-opacity=".9"
				stroke="None"
				d="m832 989-17 8-6 5h5l4-1 12-3 5-1 32-9 5-1c15-4 30-7 44-12v-1l-3-3c-4-2-11-1-15-1-20 4-50 17-66 19Z"
			/>
			<path
				fill="#FFD0B2"
				fill-opacity=".2"
				stroke="None"
				d="M1311 987c0-5-1-7-4-12 2 4 4 7 4 12Z"
			/>
			<path fill="#766459" fill-opacity=".2" stroke="None" d="M436 977v-1h-28l28 1Z" />
			<path fill="#1E151D" fill-opacity=".1" stroke="None" d="M436 977c6 0 20 2 25-1h-25v1Z" />
			<path fill="#DD1E27" fill-opacity=".4" stroke="None" d="m867 988 5-1-5 1Z" />
			<path
				fill="#1F4D6D"
				stroke="None"
				d="M657 991c-20 14-40 28-62 37 13 13 22 31 35 43 14-15 39-24 30-52-8 1-15 7-21 12 4-14 14-26 18-40Z"
			/>
			<path
				fill="#E8E7E6"
				fill-opacity=".9"
				stroke="None"
				d="m727 1115 3-3c-7 1-13-13-15-18l-6-9-8-13-10-15-11-16c-2-4-3-7-3-11l1-5 5-30h-1c-25 38 21 92 45 120Z"
			/>
			<path fill="#AD172F" fill-opacity=".4" stroke="None" d="m830 998 5-1-5 1Z" />
			<path fill="#5C2738" stroke="None" d="m813 998-10 5h3l3-1 6-5-2 1Z" />
			<path
				fill="#010313"
				stroke="None"
				d="M732 1053c3 6 5 17 13 18-1-6 17-23 21-27l1-2 7-9 3-4c7-9 13-26 26-26l10-5c-30 10-78 25-77 63 0-3-3-6-4-8Z"
			/>
			<path fill="#E1838E" fill-opacity=".4" stroke="None" d="m814 1002 4-1-4 1Z" />
			<path fill="#F2C9BE" fill-opacity=".7" stroke="None" d="m806 1003 1 1 7-2h-5l-3 1Z" />
			<path
				fill="#DFD9D7"
				stroke="None"
				d="M777 1029c8-8 14-22 25-24l5-1-1-1h-3c-13 0-19 17-26 26Z"
			/>
			<path
				fill="#F8F8F5"
				fill-opacity=".3"
				stroke="None"
				d="m777 1029-3 4-2 4c12-8 16-27 30-32-11 2-17 16-25 24Z"
			/>
			<path fill="#CDCDCB" fill-opacity=".6" stroke="None" d="M549 1014v1h8v-3c-1 2-6 2-8 2Z" />
			<path
				fill="#FDFCFA"
				fill-opacity=".3"
				stroke="None"
				d="M495 1033c5-5 8-14 13-18l1-1c-5-1-12 16-14 19Z"
			/>
			<path
				fill="#5D5959"
				fill-opacity=".5"
				stroke="None"
				d="M508 1015v1c10-5 30-1 41-1v-1c-11-1-29-2-40 0l-1 1Z"
			/>
			<path
				fill="#E6E5E4"
				fill-opacity=".8"
				stroke="None"
				d="M495 1033c-4 4-9 11-10 16v1l23-34v-1c-5 4-8 13-13 18Z"
			/>
			<path
				fill="#4E1910"
				stroke="None"
				d="M1193 1020c2 0 5 6 6 9 2 0 2-3 3-4l-3 2c-1-3-6-12-6-7Z"
			/>
			<path fill="#F4F3F3" fill-opacity=".5" stroke="None" d="m677 1030 1-5-1 5Z" />
			<path
				fill="#7DADC2"
				fill-opacity=".6"
				stroke="None"
				d="M971 1044c30-15 32-11 58 8l-4-5c-21-22-30-16-54-3Z"
			/>
			<path
				fill="#CBCDCF"
				fill-opacity=".6"
				stroke="None"
				d="m830 1047-3 4c8-5 18-16 27-19-8 1-17 11-24 15Z"
			/>
			<path
				fill="#090E22"
				stroke="None"
				d="m827 1051-14 8-4 2-4 3-3 1-6 5-24 15-15 10-7 4-11 8-6 3-3 2-3 3c11 3 30-15 43-17-4 4-1 7 1 10-6-1-1 1-4 4 1 2 2-1 3-1 9 3 21 15 28 21 3-24-5-53 20-37s33 14 27 46c15-11 35-18 51-7-8 5 1 12 0 19 3-1 7 1 8-4l-3 3c-3-7 1-13 1-20-5 0-9-3-14-3-1-3 3-4 5-4l12-1 8 1 9 1c-1 4-6 6-8 10 2-2 6-4 7-7 3 1 5 3 8 2 0 6-3 14 0 20 1-3 0-7 2-10 3 12 16 21 25 29-21-21-28-39-22-71 1-1 2 1 3 1-13-11-3-22-17-29-6 2-29-19-35-23l-16-9-11-7h-4c-9 3-19 14-27 19Z"
			/>
			<path
				fill="#6CB2CC"
				fill-opacity=".9"
				stroke="None"
				d="m869 1039-1-2-1-1c-3 1-4-2-7-4h-2l11 7Z"
			/>
			<path fill="#76D1E2" fill-opacity=".4" stroke="None" d="m867 1036-7-4c3 2 4 5 7 4Z" />
			<path fill="#C6C5C4" fill-opacity=".9" stroke="None" d="m767 1042 5-4v-1l2-4-7 9Z" />
			<path fill="#71C8D5" fill-opacity=".5" stroke="None" d="m869 1039 16 9 4 2-21-13 1 2Z" />
			<path fill="#251415" fill-opacity=".4" stroke="None" d="m288 1041 5-2v-1c-3 0-3 1-5 3Z" />
			<path
				fill="#B4A497"
				fill-opacity=".8"
				stroke="None"
				d="M293 1039c17 2 36 2 53 0v-1c-17 0-36-2-53 0v1Z"
			/>
			<path
				fill="#F5D4BC"
				stroke="None"
				d="M346 1039c14 5 18 73 1 77l8-2c10-7 7-56 6-67 0-2-2-4-3-5l-6-4h-6v1Z"
			/>
			<path fill="#F6CCB5" fill-opacity=".3" stroke="None" d="M358 1042c-1-2-4-4-6-4l6 4Z" />
			<path
				fill="#F8F9F7"
				fill-opacity=".4"
				stroke="None"
				d="m767 1042-1 2-6 8 2-1c3-4 8-8 10-13l-5 4Z"
			/>
			<path
				fill="#050713"
				stroke="None"
				d="M288 1041c-3 2-3 3-4 6-3 16-3 43 0 59 1 5 4 7 9 9 15 3 33 0 47 1h7c17-4 13-72-1-77-17 2-36 2-53 0l-5 2Z"
			/>
			<path fill="#F7F5EF" fill-opacity=".3" stroke="None" d="m691 1057-11-16 11 16Z" />
			<path
				fill="#D2D2D1"
				fill-opacity=".9"
				stroke="None"
				d="m745 1071 1-1 14-18 6-8c-4 4-22 21-21 27Z"
			/>
			<path
				fill="#5C92B1"
				fill-opacity=".3"
				stroke="None"
				d="M944 1058c9-2 19-10 27-14-8 5-20 7-27 14Z"
			/>
			<path fill="#010209" fill-opacity=".8" stroke="None" d="M284 1106Z" />
			<path
				fill="#F8CFB2"
				fill-opacity=".3"
				stroke="None"
				d="M355 1114c11-7 9-55 6-67 1 11 4 60-6 67Z"
			/>
			<path fill="#C7C9CB" fill-opacity=".4" stroke="None" d="m813 1059 14-8 3-4-17 12Z" />
			<path fill="#8BB8C5" fill-opacity=".4" stroke="None" d="m1029 1052 3 2 5 3-12-10 4 5Z" />
			<path
				fill="#6EBACE"
				fill-opacity=".9"
				stroke="None"
				d="m920 1071 3-2c-6 0-11-5-15-8l-3-1-4-3-12-7-4-2c6 4 29 25 35 23Z"
			/>
			<path
				fill="#DDDCD9"
				fill-opacity=".5"
				stroke="None"
				d="M475 1063c1-3 8-10 10-13v-1c-3 2-9 11-10 14Z"
			/>
			<path
				fill="#F4F8F3"
				fill-opacity=".3"
				stroke="None"
				d="m760 1052-14 18c6-3 12-13 16-19l-2 1Z"
			/>
			<path
				fill="#77A2B4"
				fill-opacity=".5"
				stroke="None"
				d="M1059 1075c-7-6-14-13-22-18l-5-3c8 7 17 17 27 21Z"
			/>
			<path fill="#6BC0CF" fill-opacity=".4" stroke="None" d="m905 1060-4-3 4 3Z" />
			<path fill="#4A829E" fill-opacity=".4" stroke="None" d="m931 1064-1 2c4-2 11-4 13-8l-12 6Z" />
			<path fill="#ACADAF" fill-opacity=".3" stroke="None" d="m805 1064 4-3-4 3Z" />
			<path
				fill="#6EB8CC"
				fill-opacity=".3"
				stroke="None"
				d="m923 1069 7-3 1-2c-11 6-13 2-23-3 4 3 9 8 15 8Z"
			/>
			<path fill="#757780" fill-opacity=".1" stroke="None" d="m796 1070 6-5-6 5Z" />
			<path fill="#031F3C" stroke="None" d="M1038 1170c-10-44-25-90-75-100 10 48 63 53 75 100Z" />
			<path fill="#D9471D" fill-opacity=".3" stroke="None" d="m1295 1094 4-24c-2 7-4 16-4 24Z" />
			<path
				fill="#050B12"
				fill-opacity=".4"
				stroke="None"
				d="M624 1072c-43-14-99 10-144-1 21 8 49-3 72 1s49-4 72 0Z"
			/>
			<path fill="#FAF9EE" fill-opacity=".3" stroke="None" d="m709 1085-8-13 8 13Z" />
			<path
				fill="#070D15"
				fill-opacity=".1"
				stroke="None"
				d="M628 1208h1c-9-42 11-91 0-132 7 41-5 89-1 132Z"
			/>
			<path fill="#556D81" fill-opacity=".2" stroke="None" d="m1066 1081-5-5 5 5Z" />
			<path fill="#0F3F5C" stroke="None" d="M689 1136h1c7-17 7-39 9-59-18 20-26 37-10 59Z" />
			<path fill="#697584" fill-opacity=".3" stroke="None" d="m757 1095 15-10-15 10Z" />
			<path
				fill="#0A2540"
				stroke="None"
				d="M798 1132c15 13 27 22 30 40 3 17-5 53 5 63l9 4c-3-10-5-57 1-65l1-1 4-4 1-1c3-5 55-5 60-1l1 1 2 1c3 1 4 2 5 5 5 14 1 37 1 52l54-1c-11-25-37-47-43-74-3-6 0-14 0-20-3 1-5-1-8-2-1 3-5 5-7 7l-10 13c-1 5-5 3-8 4 1-7-8-14 0-19-16-11-36-4-51 7 6-32-2-30-27-46s-17 13-20 37Z"
			/>
			<path fill="#021C30" stroke="None" d="M1087 1095c1 3 4 4 7 5l-2-9c0 2-3 4-5 4Z" />
			<path
				fill="#F1F1F2"
				fill-opacity=".3"
				stroke="None"
				d="m730 1112 3-2c-8 3-14-10-18-16 2 5 8 19 15 18Z"
			/>
			<path
				fill="#E4E0E0"
				fill-opacity=".7"
				stroke="None"
				d="m1257 1116 2-1c2-5 4-16 11-16l-4-4-9 21Z"
			/>
			<path fill="#96A1B1" fill-opacity=".3" stroke="None" d="m739 1107 11-8-11 8Z" />
			<path
				fill="#052039"
				stroke="None"
				d="m956 1170 15 15c-3-7-8-14-8-23 22 4 42 13 62 23-22-34-58-59-88-85-1 0-2-2-3-1-6 32 1 50 22 71Z"
			/>
			<path fill="#EB4D25" fill-opacity=".3" stroke="None" d="M1280 1111c-1-2-2-6-5-9l5 9Z" />
			<path
				fill="#193E59"
				stroke="None"
				d="m770 1197 8 6 20 13 23 13 12 6c-10-10-2-46-5-63-3-18-15-27-30-40-7-6-19-18-28-21 2 13-3 31 0 44s-7 31 0 42Z"
			/>
			<path
				fill="#B49B91"
				fill-opacity=".3"
				stroke="None"
				d="M340 1116c-14-1-32 2-47-1 13 4 33 1 47 1Z"
			/>
			<path fill="#F2F0EE" fill-opacity=".5" stroke="None" d="m1257 1116-2 7v1c2-2 3-6 4-9l-2 1Z" />
			<path
				fill="#E5E7E8"
				fill-opacity=".8"
				stroke="None"
				d="M1206 1242c7-2 12-26 15-32l6-16 5-13 8-19 8-19 3-8 4-11v-1c-15 13-14 42-25 59-11 16-15 42-24 60Z"
			/>
			<path fill="#370B2A" stroke="None" d="m893 1125-3 3 12 3c-1-3 3-4 3-7l-12 1Z" />
			<path
				fill="#211231"
				stroke="None"
				d="M893 1125c-2 0-6 1-5 4 5 0 9 3 14 3 0 7-4 13-1 20l3-3 10-13c-3 3-7 7-11 8 0-7 4-12 3-19h7l-8-1c0 3-4 4-3 7l-12-3 3-3Z"
			/>
			<path
				fill="#371029"
				stroke="None"
				d="M914 1136c2-4 7-6 8-10l-9-1h-7c1 7-3 12-3 19 4-1 8-5 11-8Z"
			/>
			<path fill="#FEFEFE" fill-opacity=".2" stroke="None" d="M1248 1143Z" />
			<path
				fill="#00010F"
				stroke="None"
				d="M687 1214h91v-11l-8-6c-25-15-63-37-80-61h-1c-1 10 2 31 0 40s6 34-2 38Z"
			/>
			<path
				fill="#F7D7C2"
				fill-opacity=".8"
				stroke="None"
				d="M452 1154c28-2 56 3 84 0l2-1c-25-2-62-5-86 1Z"
			/>
			<path
				fill="#FBD3BA"
				fill-opacity=".9"
				stroke="None"
				d="M536 1154v1c6 2 12 5 14 12 4 11 2 33 1 45s5 36-1 45v1c0 3 2 3 2 2 8-15-1-45 2-61s4-45-16-46l-2 1Z"
			/>
			<path fill="#CFD9DD" stroke="None" d="M449 1155c27-6 59 2 87 0v-1c-28 3-56-2-84 0l-3 1Z" />
			<path
				fill="#11A3D1"
				stroke="None"
				d="M439 1169c-2 27-2 57 0 84 1 9 8 15 17 15h81c5 0 7-1 11-4l2-6v-1c0-28 6-63 0-90-2-7-8-10-14-12-28 2-60-6-87 0-6 3-9 8-10 14Z"
			/>
			<path fill="#FCFDFD" fill-opacity=".3" stroke="None" d="M1232 1181Z" />
			<path fill="#592932" stroke="None" d="M849 1168h1c8-6 48-3 59-1-5-4-57-4-60 1Z" />
			<path fill="#D4D3CD" stroke="None" d="M550 1257c6-9 0-33 1-45s3-34-1-45c6 27 0 62 0 90Z" />
			<path fill="#D1342D" stroke="None" d="M850 1168c19 0 41-2 60 0l-1-1c-11-2-51-5-59 1Z" />
			<path
				fill="#DB231E"
				fill-opacity=".1"
				stroke="None"
				d="M848 1169c7 2 25 1 32 0s27 4 32 0l-2-1c-19-2-41 0-60 0h-1l-1 1Z"
			/>
			<path fill="#09A3D8" fill-opacity=".1" stroke="None" d="M439 1253Z" />
			<path
				fill="none"
				stroke="None"
				d="M844 1173c6 18-10 57 5 69 20-4 45 3 64 1l5-6c2-16 3-47-1-63-1-3-2-4-5-5-5 4-25-1-32 0s-25 2-32 0l-4 4Z"
			/>
			<path
				fill="#E32420"
				fill-opacity=".1"
				stroke="None"
				d="M843 1174v37c0 9-4 29 5 32l1-1c-15-12 1-51-5-69l-1 1Z"
			/>
			<path fill="#AE323C" stroke="None" d="m842 1239 4 4h2c-9-3-5-23-5-32v-37c-6 8-4 55-1 65Z" />
			<path
				fill="#532D3C"
				fill-opacity=".5"
				stroke="None"
				d="M918 1237v-11c0-15 4-38-1-52 4 16 3 47 1 63Z"
			/>
			<path fill="#FCFDFD" fill-opacity=".3" stroke="None" d="m1221 1210 6-16-6 16Z" />
			<path
				fill="#3A0D25"
				stroke="None"
				d="M778 1214c2-2 0-5 2-7 6 4 10 11 15 15l-5-8c3 2 7 8 8 2l-20-13v11Z"
			/>
			<path
				fill="#6B1A2F"
				stroke="None"
				d="m778 1214-3 1 3 4c7 15-1 40 1 58s2 41 0 59c1 11 11 11 20 11 10 0 51-9 49 4 7-15 15-31 21-47v-2c-7-10-18-18-26-27-15-18-33-34-48-53-5-4-9-11-15-15-2 2 0 5-2 7Z"
			/>
			<path fill="#EEDBC1" fill-opacity=".5" stroke="None" d="m633 1214-3-4-1-2h-1c0 3 2 5 5 6Z" />
			<path fill="#6B564F" fill-opacity=".7" stroke="None" d="M633 1214h3c-2 0-4-2-6-4l3 4Z" />
			<path fill="#262B3C" fill-opacity=".1" stroke="None" d="m775 1215 3-1h-83c25 2 54 3 80 1Z" />
			<path
				fill="#080B20"
				stroke="None"
				d="M795 1222c15 19 33 35 48 53 7 7 23 18 26 27v2h2c2-10 9-17 12-26-19-18-46-31-62-49l-23-13c-1 6-5 0-8-2l5 8Z"
			/>
			<path
				fill="#7A243D"
				fill-opacity=".5"
				stroke="None"
				d="M778 1336h1c2-18 2-41 0-59s6-43-1-58c5 18-2 41 0 59 2 19 0 39 0 58Z"
			/>
			<path fill="#C8CCD0" fill-opacity=".5" stroke="None" d="m1123 1250-1 2 4-3 8-11-11 12Z" />
			<path
				fill="#A21F1D"
				fill-opacity=".5"
				stroke="None"
				d="M848 1243h-2l9 1c17-2 36-1 52 0l6-1c-19 2-44-5-64-1l-1 1Z"
			/>
			<path fill="#1D0208" stroke="None" d="M855 1244h52c-16-1-35-2-52 0Z" />
			<path
				fill="#E0E6EA"
				fill-opacity=".9"
				stroke="None"
				d="M1122 1252c-12 18-30 35-40 54s-33 36-39 56h1c3-4 6-10 10-12v-1l12-16 3-4c2-3 3-8 7-10v-1c6-10 17-30 27-37v-1l12-16 11-15-4 3Z"
			/>
			<path
				fill="#093255"
				stroke="None"
				d="m937 1341 19-6 10-4h2c4-2 39-16 40-12 4 1 7 8 9 11l6 8v1c4 3 7 9 9 13 2 3 6 14 11 10 6-20 29-37 39-56s28-36 40-54l1-2c-63 30-128 57-189 89l3 2Z"
			/>
			<path fill="#D7E2DC" fill-opacity=".6" stroke="None" d="m548 1264 4-4c0 1-2 1-2-2l-2 6Z" />
			<path fill="#F7F9FA" fill-opacity=".2" stroke="None" d="M1103 1280c6-4 8-11 12-16l-12 16Z" />
			<path fill="#07A4D5" fill-opacity=".1" stroke="None" d="M537 1268Z" />
			<path fill="#351223" stroke="None" d="M869 1302c-3-9-19-20-26-27 8 9 19 17 26 27Z" />
			<path
				fill="#B3A59E"
				fill-opacity=".9"
				stroke="None"
				d="M657 1280c8-2 23 1 32 1v-1l-28-1-4 1Z"
			/>
			<path fill="none" stroke="None" d="M689 1280h1v-1h-29l28 1Zm1 0h26c-8-2-17-1-26-1v1Z" />
			<path
				fill="#0E3A5A"
				stroke="None"
				d="M654 1282c-9 8-7 55-5 67 1 4 5 7 9 8 15 3 48-8 59 1h1l4-5c6-14 3-47 1-62-1-4-7-7-10-10h-24c-9 0-24-3-32-1l-3 2Z"
			/>
			<path fill="#848594" stroke="None" d="M689 1281h25v-1h-25v1Z" />
			<path
				fill="#FAFAF9"
				stroke="None"
				d="M714 1281c5 0 8 6 9 10 2 15 5 48-1 62-2 5-3 4 4 4 1-22-1-46 1-67-1-5-5-10-11-10h-2v1Z"
			/>
			<path fill="#1B2034" stroke="None" d="M723 1291c-1-4-4-10-9-10h-1c3 3 9 6 10 10Z" />
			<path
				fill="#F9FAFB"
				fill-opacity=".3"
				stroke="None"
				d="M1076 1318c9-6 24-27 27-37-10 7-21 27-27 37Z"
			/>
			<path
				fill="#062F51"
				fill-opacity=".6"
				stroke="None"
				d="M649 1349c-2-12-4-59 5-67-10 8-8 55-5 67Z"
			/>
			<path
				fill="#FAF9F6"
				fill-opacity=".4"
				stroke="None"
				d="m722 1353-4 5h9c-3-22 4-46 0-68-2 21 0 45-1 67-7 0-6 1-4-4Z"
			/>
			<path
				fill="#093255"
				stroke="None"
				d="M848 1351c-2 16-2 23 16 15l8-3 35-11c2-1 4-3 7-3-14-14-27-33-43-45h-2c-6 16-14 32-21 47Z"
			/>
			<path
				fill="#DFE0E2"
				fill-opacity=".9"
				stroke="None"
				d="m968 1331 5-1 13-4c6-2 14-7 21-7h1c-1-4-36 10-40 12Z"
			/>
			<path
				fill="#F4F6F5"
				fill-opacity=".3"
				stroke="None"
				d="M986 1326c6-2 16-3 21-7-7 0-15 5-21 7Z"
			/>
			<path
				fill="#FAFDFD"
				fill-opacity=".2"
				stroke="None"
				d="M1069 1329c2-3 6-6 7-10-4 2-5 7-7 10Z"
			/>
			<path fill="#F9FAF9" fill-opacity=".3" stroke="None" d="M968 1331h-2l-3 3 10-4-5 1Z" />
			<path fill="#012B54" fill-opacity=".3" stroke="None" d="m1023 1338-6-8 6 8Z" />
			<path
				fill="#B7B7B9"
				fill-opacity=".9"
				stroke="None"
				d="M956 1335a47 47 0 0 1 7-1l3-3-10 4Z"
			/>
			<path fill="#F8FDFD" fill-opacity=".3" stroke="None" d="M1054 1349c5-4 9-11 12-16l-12 16Z" />
			<path
				fill="#D9DADE"
				fill-opacity=".5"
				stroke="None"
				d="m956 1335-19 6-5 2v1c9-3 23-4 30-10l-6 1Z"
			/>
			<path
				fill="#EFE7E8"
				fill-opacity=".7"
				stroke="None"
				d="M799 1347c-9 0-19 0-20-11h-1c0 16 9 12 21 11Z"
			/>
			<path
				fill="#052345"
				fill-opacity=".3"
				stroke="None"
				d="M1032 1352c-2-4-5-10-9-13 2 5 6 9 9 13Z"
			/>
			<path fill="#A2ADBA" fill-opacity=".4" stroke="None" d="m918 1349 14-5v-1c-5 2-10 3-14 6Z" />
			<path fill="#AAB5C2" fill-opacity=".4" stroke="None" d="m907 1352 9-3h-2c-3 0-5 2-7 3Z" />
			<path
				fill="#FBFDFD"
				fill-opacity=".3"
				stroke="None"
				d="M1044 1362c4 0 8-9 10-12-4 2-7 8-10 12Z"
			/>
			<path
				fill="#043658"
				fill-opacity=".1"
				stroke="None"
				d="M717 1358c-11-9-44 2-59-1 16 5 41 1 59 1Z"
			/>
			<path fill="#0C2245" fill-opacity=".5" stroke="None" d="m864 1366 8-3-8 3Z" />
		</svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600">
			<path
				fill="none"
				d="M0 1600h1600V0H0v1600M917 234c10 3 18 15 26 22l25 23 12 11c11 11 23 24 35 33l3 2c6 3 19 1 26 1h21l85-1h26c8 0 17-2 24 2 8 5 12 15 18 22l8 10 24 30 24 30c8 10 15 21 24 30 8 10 14 22 23 31 10 9 18 26 4 34l-34 21-13 8-41 26-41 26c-16 8-29-14-38-25l-30-38-5-6-2-3-5-6c-11-13-19-21-29-36-11-14-33-13-50-15l-60-5-53-6c-19-3-37-1-56-5s-31 7-43 21l-10 11-27 30c-9 11-18 19-27 31-9 11-18 17-27 30-9 12-21 21-38 20s-35 5-52 5-36 1-51 7l-42 16c-9 3-21 10-30 8-15-3-16-22-20-34l-6-20c-6-18-10-35-18-52-8-18-3-36 10-50 13-13 16-30 28-42s15-34 31-40l3-1c20-2 40 3 60 0 4-1 10-3 12-6 7-9 0-24 2-35s-2-27 0-38c2-19 23-23 35-38 11-15 38-14 57-17l65-9 67-7 19-2 27-3c8-1 16-3 24-1m11 299c9 3 18 8 27 13s19 5 25 15c7 9 10 12 16 24s-11 12-19 4c-8-7-18-7-27-13-8-6-19-8-29-11l-30-10c-10-4-22-6-32-1s-18 7-29 11-18 8-29 11c-12 3-16 9-29 11s-6-15 3-20 13-14 21-19c8-6 12-14 20-20l20-20c7-7 14-11 21-20 7-8 16-13 28-10s25 1 37 3c12 3 25 1 37 3s26 2 38 3l37 3c11 1 25 0 34 6 9 5 13 13 20 20 8 6 12 15 20 21 9 6 10 15 19 21 10 5 12 22-1 17-12-5-15-10-26-14-10-5-16-11-26-15s-16-12-28-12-26-2-39-1h-40c-13 1-27-3-39 0m-233 682h-45c-11 1-24 0-22-13s-1-22 0-34v-70c0-10 4-25-8-26H516c-12-1-23 2-35 0s-3-14 2-20 8-15 13-22c6-6 7-17 19-16h34c12 0 9-16 9-26V850c1-12 1-24-13-22s-22-1-35 0h-34c-13 0-8-13-1-18 8-5 11-12 18-17l18-16c7-6 10-11 18-17s3-15 0-24c-4-8-6-17-9-26-4-9-8-15-10-25s12-12 19-15l25-10 24-11 24-10c7-3 21-11 23 0s-3 22-2 33l33-2 34-2 34-1 34-2 34-1 34-2 34-1 34-2 35-1 33-2 34-2 33-2 35-1 33-2 35-1 34-2c10-1 21 2 24 11 2 9 6 16 14 22l17 18 18 18 16 19 18 18c6 5 17 15 7 20s-25-3-34 2c-10 5 2 16 4 24l11 24 12 24 11 24c4 9-3 17-15 15s-14 9-7 16c7 8 8 15 13 23 6 7 9 14 14 22l14 21c5 8 11 16 8 26s-2 20-5 30c-2 10-2 21-5 31s0 21-4 31 2 22-7 29-11-13-18-15c-8-1-12 14-15 21l-10 26-10 25-11 25c-2 9-6 17-10 25-3 8-5 22-15 21s-19-6-29-6-21-7-30-6-10 15-16 20-9 14-15 20l-15 21-14 21c-5 7-11 13-15 21-5 7-11 11-15 20s-14 13-19 3c-4-10-9-13-13-22-5-8-9-17-19-13-9 5-18 5-27 9l-26 9-27 9c-9 3-18 5-26 9s-21 4-28 8c-6 4-25 8-22-3s4-20-8-18l-33 3c-10 0-24 7-26-5s1-24 0-36v-71c1-12 0-22-13-20s-24-1-36 0h-34M427 663c11 3 8 22 7 32s3 28-1 38-21 9-31 8-27 3-38-1-9-20-8-31-2-27 1-38 21-9 31-8 29-3 39 0M314 838c3 16 3 39 1 55-2 17-26 12-39 12s-38 6-39-12v-51c-1-18 22-16 36-15s37-6 41 11m150 61c11 3 7 27 7 37s5 33-6 39-29 0-42 2-30 1-30-15 2-28 0-44 11-22 26-19c15 4 30-4 45 0m-105 143c1 11 3 28 2 40s4 30-11 34c-15 3-30-3-45 0s-25-8-22-23-3-30 0-45 23-10 35-10 30-3 41 4m183 111c15 4 12 22 12 34v46c0 12 3 32-12 35s-30 1-45 1-31 2-46-1-13-21-13-33v-46c0-12-2-32 12-35s30-2 45-1 33-3 47 0m174 127c15 4 11 19 11 33v45h-42c-11-1-30 5-35-7s1-29-1-41-2-29 12-31h28c9 0 19-1 27 1Z"
			/>
			<path
				fill="none"
				stroke="#CA450A"
				stroke-width=".3"
				d="M893 235c-2 2-3 9-7 9-4 1-4 9-8 10-4 2-4 7-8 10-4 2-2 8 3 9-2 8-18 12-13 21 11-6 20-18 31-25 12 14 28 25 37 41-10 6-16 14-25 23-8 9-12 18-21 27-9 10 5 17 13 25s20 13 26 23l-8-5c2 3 4 5 2 8 3-1 4 2 5 4-3-1-5 0-6-3 1 4-1 7-1 10 9 0 15 1 24 3 8 3 18-1 25 4 8 4 17-1 23 5 6-4 10 1 15 3 0-6-7-8-10-7 5-7 12-11 17-17 0-3-4-3-3-6-8 5-15 14-21 21-4-1-6-4-9-1-10-7-17-18-27-25 12-15 26-29 40-42 7 9 16 18 25 25-3-6 1-2 4-1-4-7 4-2-1-8 5 2 8 8 13 11 7-4-7-17-10-13-1-6-7-12-12-16 5-8 14-15 21-22l-7-8c-5 2-6 9-11 9 1 4-7 11-11 10 3-4 8-7 9-11s12-4 11-11l-3-2c-4 0-8 9-12 11-4 3-7 10-11 13-13-9-23-24-36-33 7-8 14-21 24-24l-12-11c-3 0-5 7-8 9s-8 6-8 10c-3-3-8 3-6 6-7-3-11-11-17-16l-17-17c-5-6-15-13-6-18 8-6 12-11 11-19-8-2-16 0-24 1m76 115c-11 18-32 31-45 47-10-10-23-21-31-32 2 2 4-1 7 0 3-6 9-13 14-18s15-11 7-17c3-3 8-6 10-10 3-1 0 3 3 4 1-2 4-3 4-6 9 11 20 22 31 32Z"
			/>
			<path
				fill="none"
				stroke="#B32817"
				stroke-width=".3"
				d="m968 279-25-23c-8-7-16-19-26-22 1 8-3 13-11 19-9 5 1 12 6 18l17 17c6 5 10 13 17 16-2-3 3-9 6-6 0-4 5-8 8-10s5-9 8-9Z"
			/>
			<path
				fill="none"
				stroke="#B42415"
				stroke-width=".3"
				d="M866 238c2 1-5 8-7 11-2 2-6 10-10 10-5-4-5-10-7-14 1-2 7-3 5-5l-67 7-65 9c-19 3-46 2-57 17-12 15-33 19-35 38 0 5 2 12 1 17l27-27c8 5 16 19 26 19 1-7 11-16 17-22 5-7 12-21 21-14-3 8-10 16-17 21-7 6-11 14-19 19 11 14 25 27 39 37 7-14 21-23 32-32-10-10-19-22-30-31 5-7 13-15 20-21 8-5 13-17 21-20 9-3 20 10 25 16s17 15 16 23l26-27c4 0 5 5 8 6l-12 14c-5 3-9 10-15 9-2 10-16 18-24 25 3 6 11 12 14 18 3 5 14 11 9 15 4 1 5 6 7 9-6-2-10-8-16-12 3 6 10 14 15 18 6 4 11 12 17 13 0 3 3 5 4 7 9-12 21-23 31-34-14-11-27-25-39-38 5-2 9-8 12-12 16 14 30 31 46 45-3 5-5 9-10 13s-3 11-7 15c-5-2-11 8-17 12s-11 13-17 17c-7 4-12 11-18 16-6 6-9 13-16 18 5 11 21 18 22 30l3-2c12-14 24-25 43-21s37 2 56 5l53 6 60 5c17 2 39 1 50 15 10 15 18 23 29 36 1-4 11-8 12-12 2-4 13-8 11-13-3-4-9-7-12-12-3-4-8-8-13-11l-12-12c-4-4-11-8-17-7 0-3 4-3 3-6-25 15-41-20-60-32 7-4 5-14-3-14 0-4 5-9 8-5 2-9 12-13 17-20l19-18c-5-8-14-15-21-22 0-3 3-4 4-6l-8-1c-7 0-20 2-26-1 1 7-10 7-11 11s-6 7-9 11c4 1 12-6 11-10 5 0 6-7 11-9l7 8c-7 7-16 14-21 22 5 4 11 10 12 16 3-4 17 9 10 13-5-3-8-9-13-11 5 6-3 1 1 8-3-1-7-5-4 1-9-7-18-16-25-25-14 13-28 27-40 42 10 7 17 18 27 25 3-3 5 0 9 1 6-7 13-16 21-21-1 3 3 3 3 6-5 6-12 10-17 17 3-1 10 1 10 7-5-2-9-7-15-3-6-6-15-1-23-5-7-5-17-1-25-4-9-2-15-3-24-3 0-3 2-6 1-10 1 3 3 2 6 3-1-2-2-5-5-4 2-3 0-5-2-8l8 5c-6-10-18-15-26-23s-22-15-13-25c9-9 13-18 21-27 9-9 15-17 25-23-9-16-25-27-37-41-11 7-20 19-31 25-5-9 11-13 13-21-5-1-7-7-3-9 4-3 4-8 8-10 4-1 4-9 8-10 4 0 5-7 7-9l-27 3m-28 37c-3-3-7-6-6-11-9 4-20-22-10-14 9 9 23 14 16 25m21 114c3 6 9 11 13 15 4 5 14 9 8 14 3-1 7-2 10 1-16-1-41 6-49-15 6-5 11-11 18-15Z"
			/>
			<path
				fill="none"
				stroke="#C03D0A"
				stroke-width=".3"
				d="M847 240c2 2-4 3-5 5 2 4 2 10 7 14 4 0 8-8 10-10 2-3 9-10 7-11l-19 2Z"
			/>
			<path
				fill="none"
				stroke="#BF3F0B"
				stroke-width=".3"
				d="M838 275c7-11-7-16-16-25-10-8 1 18 10 14-1 5 3 8 6 11Z"
			/>
			<path
				fill="none"
				stroke="#CB4609"
				stroke-width=".3"
				d="M623 311c-2 11 2 27 0 38s5 26-2 35c11-1 18 21 28 23-16 13-31 31-46 45-10-9-25-22-30-33-24 18-45 42-66 61 1 5 3 11 7 17s9 9 14 14c4 6 10 9 14 14 5 5 17 9 11-2 2-1 5 3 6 1-9-11-21-20-30-31 16-11 31-26 43-40 6 3 11 9 13 15 14-5 33-3 39 12l1 3c3 7 15 12 20 18-15 20-29 38-49 52l8-9c0-3-3-4-4-6-4 2-8 14-12 6 7 4 13-11 4-14 9-3-2-10-3-13l-4-1c1 3-5 5-2 8-5 2-10 7-12 12 6 3 9 10 14 14 6 3 10 12 16 8-3 3-1 7 3 9 20-17 38-39 55-59l25 25 9-7-24-26c15-11 27-29 43-39-6 6 2 10 6 15s11 7 14 13c-6 2-8 9-14 12-5 3-9 8-13 13-4 4-7 14 2 6l27-25c-2 7-12 12-15 17s-16 11-13 17 12-5 16-10l16-17c5-4 10-12 15-17 6-4 11-11 16-16 6-5 11-13 18-15 7 11 20 18 28 28l10-11-3 2c-1-12-17-19-22-30 7-5 10-12 16-18 6-5 11-12 18-16 6-4 11-13 17-17s12-14 17-12c4-4 2-11 7-15s7-8 10-13c-16-14-30-31-46-45-3 4-7 10-12 12 12 13 25 27 39 38-10 11-22 22-31 34-1-2-4-4-4-7-6-1-11-9-17-13-5-4-12-12-15-18 6 4 10 10 16 12-2-3-3-8-7-9 5-4-6-10-9-15-3-6-11-12-14-18 8-7 22-15 24-25 6 1 10-6 15-9l12-14c-3-1-4-6-8-6l-26 27c1-8-11-17-16-23s-16-19-25-16c-8 3-13 15-21 20-7 6-15 14-20 21 11 9 20 21 30 31-11 9-25 18-32 32-14-10-28-23-39-37 8-5 12-13 19-19 7-5 14-13 17-21-9-7-16 7-21 14-6 6-16 15-17 22-10 0-18-14-26-19l-27 27c1-5-1-12-1-17m177-10c-10 4-15 18-22 24 1-10-7 2-10-5s-12-3-12-12c-3 4-6-5-9-7-4-2-3-8-10-8 7-10 20-18 28-28 11 11 25 23 35 36m-150 20c-6 10-16 20-26 27v-10c5 8 7-2 12-5 4-3 9-10 14-12m47 41c-10 13-24 22-34 35-15-7-24-24-39-32-2-9 7-12 11-18 5-6 11-7 16-14s11-7 16-1c5 7 10 9 15 15l15 15m78-35c7 5 5 11 13 15 9 4 3 9-3 13-5 4-13 10-7 16 3-4 9-7 12-12 13 8 24 21 34 33-5 3-11 8-15 13s-14 8-12 15c-5-3-7 6-12 8 0 3 4 4 4 7-2-1-3-4-6-4l-28 32-6-9c-7 5-11 13-19 16 0-7-19-19-11-6-3 0-3-4-6-3 11-14 26-26 39-39-5 0-2-3 1-5-2-2-3-4-2-7-6 3-9 10-15 13 5-6 9-13 16-16 3-7-6-12-10-17-5-5-10-11-16-14 4-7 12-13 17-20 5-6 17-11 14-19 8 5 11-9 18-10m-37 23c0 4-4 7-8 10-4 4-4 9-5 13 0-9-11 3-5 8l-5-4c-6 6 5 10 9 16l16 15c-11 14-28 25-39 39-8-13-25-20-31-34l15-12 13-14c5-3 10-14 14-8 1-4 7-5 4-9 5-1 5-5 4-9 3 3 6 3 9-1 0-3-4-3-3-6l5 4c1-3 4-6 7-8m-75 69 31 30c-14 14-26 33-42 44 2-2 2-4 2-7-6 0 0-2 0-5-4-2-6-9-11-10-4 0-4-11-10-5 3-5-2-8-5-11 12-11 23-26 35-36m111 33c-3 7-12 12-17 18-4 7-14 12-12 19-7-7 6-13 11-19l18-18Z"
			/>
			<path
				fill="none"
				stroke="#B92616"
				stroke-width=".3"
				d="M800 301c-10-13-24-25-35-36-8 10-21 18-28 28 7 0 6 6 10 8 3 2 6 11 9 7 0 9 9 5 12 12s11-5 10 5c7-6 12-20 22-24Z"
			/>
			<path
				fill="none"
				stroke="#B52715"
				stroke-width=".3"
				d="M1015 323c-12-9-24-22-35-33-10 3-17 16-24 24 13 9 23 24 36 33 4-3 7-10 11-13 4-2 8-11 12-11Z"
			/>
			<path
				fill="none"
				stroke="#B72314"
				stroke-width=".3"
				d="M969 350c-11-10-22-21-31-32 0 3-3 4-4 6-3-1 0-5-3-4-2 4-7 7-10 10 8 6-2 12-7 17s-11 12-14 18c-3-1-5 2-7 0 8 11 21 22 31 32 13-16 34-29 45-47Z"
			/>
			<path
				fill="none"
				stroke="#B92E12"
				stroke-width=".3"
				d="M650 321c-5 2-10 9-14 12-5 3-7 13-12 5v10c10-7 20-17 26-27Z"
			/>
			<path
				fill="none"
				stroke="#B12417"
				stroke-width=".3"
				d="m1065 326-1 1c1 5 9 10 13 14 3 5 10 9 14 13s10 10 13 8c1 8 11 10 15 17 13-11 23-26 37-35-1-2-3-3 0-5-2-2-4-5-7-5 0-3 2-6 5-7 0-2-4 0-4-2l-85 1Z"
			/>
			<path
				fill="none"
				stroke="#C94509"
				stroke-width=".3"
				d="M1064 327h-12c-1 2-4 3-4 6 7 7 16 14 21 22l-19 18c-5 7-15 11-17 20-3-4-8 1-8 5 8 0 10 10 3 14 19 12 35 47 60 32 1 3-3 3-3 6 6-1 13 3 17 7l12 12c5 3 10 7 13 11 3 5 9 8 12 12 2 5-9 9-11 13-1 4-11 8-12 12l5 6c0-4 9-8 12-12 2-4 9-10 13-12 8 7-9 10-7 18-2-1-5 1-7-2 4 4-2 10-3 3v7c-2-1-5-2-6 1l5 6c0-4 9-8 11-12 3-4 10-7 12-12l20 18c5 7 14 13 19 19 4 7 11 24 15 9 3 1 3 3 3 6 3 0 7-3 7-6-5-2-8-12-13-8 1-2 0-3 3-4 3 5 14-5 8-7 6-2 21-21 17-5-5-2-11 3-13 7 2 2 4 3 4 5-7-7-15 7-5 12 13-10 24-24 37-35-1-3-3-5-6-7-3 3-5 2-7 5-1 3-7 10-9 4 7-5 17-13 18-21-4 2-7-3-12-5-4-3-7-9-10-13-4-3-9-7-11-12 7 0 13 8 18 13 5 6 13 10 18 16l37-36c-6-5-10-13-15-18s-11-14-19-13c-1-10-8 2-14 7-7 4-12 9-18 16s-12-2-17-8c-5-7-12-11-17-17-9 3-4 9 0 15-3-2-7-2-8-7-3 8 0 1-5 2 4-3-2-4 1-6-4 0-6 2-5 6-6-4-12-10-17-16-3 1-4 5-7 6 3 5 9 7 12 11-8 1-16 13-21 19 4 5 8-1 12-5l12-12c7 5 12 13 19 18l-11 12c-4 3-7 12-12 8-3 3 3 3 2 6-7-3-3 2-3 6 6-4 12-13 18-17s11-18 18-13c6 5 11 13 17 19l19 16c6 7-6 13-11 18s-14 12-18 18c-10-7-20-17-29-26-10-8-18-20-27-28-8-8-16-32-27-17-9-4-14-16-22-20 8-15 24-26 35-40-1-3-5-4-5-7 2 1 3 4 6 4 4-8 18-12 15-23 2 0 2 5 5 3 2-3 4-4 2-7 4 1 6-3 6-6 4 4 5-3 9-6 3-4-4-10-5-13 3 2 6 5 7 8 11-7 22-18 29-29-7-4-16-2-24-2h-26c0 2 4 0 4 2-3 1-5 4-5 7 3 0 5 3 7 5-3 2-1 3 0 5-14 9-24 24-37 35-4-7-14-9-15-17-3 2-9-4-13-8s-11-8-14-13c-4-4-12-9-13-14m21 27c2 4-9 7-1 12 8 4 15 13 22 20l11 10c-8 12-22 22-32 33-2-2-5-3-5-6-3 4 3 8 4 12-9 0-15-11-23-17s-15-14-23-19l47-45m170 79c7 7 7 13 16 19 8 6 8 14 0 20-8 7-10 12-17 19l-23-23c3-5-1-6-4-6 8-11 19-19 28-29Z"
			/>
			<path
				fill="none"
				stroke="#BB2617"
				stroke-width=".3"
				d="m697 362-15-15c-5-6-10-8-15-15-5-6-11-6-16 1s-11 8-16 14c-4 6-13 9-11 18 15 8 24 25 39 32 10-13 24-22 34-35Z"
			/>
			<path
				fill="none"
				stroke="#BC3E10"
				stroke-opacity=".6"
				stroke-width=".3"
				d="M1052 327h12l1-1h-21l8 1Z"
			/>
			<path
				fill="none"
				stroke="#BC2613"
				stroke-width=".3"
				d="M775 327c-7 1-10 15-18 10 3 8-9 13-14 19-5 7-13 13-17 20 6 3 11 9 16 14 4 5 13 10 10 17-7 3-11 10-16 16 6-3 9-10 15-13-1 3 0 5 2 7-3 2-6 5-1 5-13 13-28 25-39 39 3-1 3 3 6 3-8-13 11-1 11 6 8-3 12-11 19-16l6 9 28-32c3 0 4 3 6 4 0-3-4-4-4-7 5-2 7-11 12-8-2-7 8-10 12-15s10-10 15-13c-10-12-21-25-34-33-3 5-9 8-12 12-6-6 2-12 7-16 6-4 12-9 3-13-8-4-6-10-13-15Z"
			/>
			<path
				fill="none"
				stroke="#B52615"
				stroke-width=".3"
				d="m1128 532 30 38c9 11 22 33 38 25l41-26 41-26c-5-1-8-9-12-12-5-2-8-9-11-13 6-9 13-7 18 0l18 17 34-21c14-8 6-25-4-34-9-9-15-21-23-31-9-9-16-20-24-30l-24-30-24-30c0 5-7 8-10 11-2 4-8 8-11 10 3 6 17 12 12 19l-18 17c-5 7-13 12-17 19l-12-14 29-29c4 0 5 7 10 6-9-9-20-18-28-29 2-6 9-6 11-11 4 1 8 4 10 8 7-3 11-10 18-14-1-1-3-1-2-3-6-7-10-17-18-22-7 11-18 22-29 29-1-3-4-6-7-8 1 3 8 9 5 13-4 3-5 10-9 6 0 3-2 7-6 6 2 3 0 4-2 7-3 2-3-3-5-3 3 11-11 15-15 23-3 0-4-3-6-4 0 3 4 4 5 7-11 14-27 25-35 40 8 4 13 16 22 20 11-15 19 9 27 17 9 8 17 20 27 28 9 9 19 19 29 26 4-6 13-13 18-18s17-11 11-18l-19-16c-6-6-11-14-17-19-7-5-12 9-18 13s-12 13-18 17c0-4-4-9 3-6 1-3-5-3-2-6 5 4 8-5 12-8l11-12c-7-5-12-13-19-18l-12 12c-4 4-8 10-12 5 5-6 13-18 21-19-3-4-9-6-12-11 3-1 4-5 7-6 5 6 11 12 17 16-1-4 1-6 5-6-3 2 3 3-1 6 5-1 2 6 5-2 1 5 5 5 8 7-4-6-9-12 0-15 5 6 12 10 17 17 5 6 11 15 17 8s11-12 18-16c6-5 13-17 14-7 8-1 14 8 19 13s9 13 15 18l-37 36c-5-6-13-10-18-16-5-5-11-13-18-13 2 5 7 9 11 12 3 4 6 10 10 13 5 2 8 7 12 5-1 8-11 16-18 21 2 6 8-1 9-4 2-3 4-2 7-5 3 2 5 4 6 7-13 11-24 25-37 35-10-5-2-19 5-12 0-2-2-3-4-5 2-4 8-9 13-7 4-16-11 3-17 5 6 2-5 12-8 7-3 1-2 2-3 4 5-4 8 6 13 8 0 3-4 6-7 6 0-3 0-5-3-6-4 15-11-2-15-9-5-6-14-12-19-19l-20-18c-2 5-9 8-12 12-2 4-11 8-11 12m120-113c6-2 10-3 14-7 4 12-16 13-16 22-4-2-4 2-7 3-4-8-25-20-9-25 1 6 6 5 9 0 4-5 8 3 9 7Z"
			/>
			<path
				fill="none"
				stroke="#CA4908"
				stroke-width=".3"
				d="m1226 359-8-10c-1 2 1 2 2 3-7 4-11 11-18 14-2-4-6-7-10-8-2 5-9 5-11 11 8 11 19 20 28 29-5 1-6-6-10-6l-29 29 12 14c4-7 12-12 17-19l18-17c5-7-9-13-12-19 3-2 9-6 11-10 3-3 10-6 10-11Z"
			/>
			<path
				fill="none"
				stroke="#BE2614"
				stroke-width=".3"
				d="M738 350c-3 2-6 5-7 8l-5-4c-1 3 3 3 3 6-3 4-6 4-9 1 1 4 1 8-4 9 3 4-3 5-4 9-4-6-9 5-14 8l-13 14-15 12c6 14 23 21 31 34 11-14 28-25 39-39l-16-15c-4-6-15-10-9-16l5 4c-6-5 5-17 5-8 1-4 1-9 5-13 4-3 8-6 8-10Z"
			/>
			<path
				fill="none"
				stroke="#BB2517"
				stroke-width=".3"
				d="m1085 354-47 45c8 5 15 13 23 19s14 17 23 17c-1-4-7-8-4-12 0 3 3 4 5 6 10-11 24-21 32-33l-11-10c-7-7-14-16-22-20-8-5 3-8 1-12Z"
			/>
			<path
				fill="none"
				stroke="#B12415"
				stroke-width=".3"
				d="M609 390c-13 3-32 1-46 1 7 2 9 16 17 18-2 4-7 6-9 10l-26-24c-1-2 4-3 1-4-16 6-19 28-31 40s-15 29-28 42a45 45 0 0 0-10 50c8 17 12 34 18 52l8 4c-1-2-2-8-5-5 9-15 24-27 36-39-5-5-12-10-16-16s-16-12-7-18c2 1 3 4 5 1 5 12 20 24 33 36-15 20-35 36-48 57 4 12 5 31 20 34 3-1-3-13 1-16-2-2-6-4-4-7 2 2 4 4 7 4l-5-4c1-3 5 1 6-1-3-2-6-7-1-8 2 3 4 6 8 7-6-9 7-7 9-1 2 7 7 8 9 15-5-2 0 1 0 3l42-16c15-6 34-7 51-7s35-6 52-5 29-8 38-20c9-13 18-19 27-30 9-12 18-20 27-31l27-30c-8-10-21-17-28-28-7 2-12 10-18 15-5 5-10 12-16 16-5 5-10 13-15 17l-16 17c-4 5-13 16-16 10s10-12 13-17 13-10 15-17l-27 25c-9 8-6-2-2-6 4-5 8-10 13-13 6-3 8-10 14-12-3-6-10-8-14-13s-12-9-6-15c-16 10-28 28-43 39l24 26-9 7-25-25c-17 20-35 42-55 59-4-2-6-6-3-9-6 4-10-5-16-8-5-4-8-11-14-14 2-5 7-10 12-12-3-3 3-5 2-8-12-3-10-14-10-24s-1-20 10-24c-2-6-7-12-13-15-12 14-27 29-43 40 9 11 21 20 30 31-1 2-4-2-6-1 6 11-6 7-11 2-4-5-10-8-14-14-5-5-10-8-14-14s-6-12-7-17c21-19 42-43 66-61 5 11 20 24 30 33 15-14 30-32 46-45-10-2-17-24-28-23-2 3-8 5-12 6Z"
			/>
			<path
				fill="none"
				stroke="#CA4509"
				stroke-width=".3"
				d="M859 389c-7 4-12 10-18 15 8 21 33 14 49 15-3-3-7-2-10-1 6-5-4-9-8-14-4-4-10-9-13-15Z"
			/>
			<path
				fill="none"
				stroke="#C1420C"
				stroke-width=".3"
				d="M546 391c3 1-2 2-1 4l26 24c2-4 7-6 9-10-8-2-10-16-17-18l-14-1-3 1Z"
			/>
			<path
				fill="none"
				stroke="#B52917"
				stroke-opacity=".7"
				stroke-width=".3"
				d="M563 391c14 0 33 2 46-1-20 3-40-2-60 0l14 1Z"
			/>
			<path
				fill="none"
				stroke="#C53E0B"
				stroke-width=".3"
				d="M1248 419c-1-4-5-12-9-7-3 5-8 6-9 0-16 5 5 17 9 25 3-1 3-5 7-3 0-9 20-10 16-22-4 4-8 5-14 7Z"
			/>
			<path
				fill="none"
				stroke="#B82215"
				stroke-width=".3"
				d="M663 419c-12 10-23 25-35 36 3 3 8 6 5 11 6-6 6 5 10 5 5 1 7 8 11 10 0 3-6 5 0 5 0 3 0 5-2 7 16-11 28-30 42-44l-31-30Z"
			/>
			<path
				fill="none"
				stroke="#B42315"
				stroke-width=".3"
				d="M1255 433c-9 10-20 18-28 29 3 0 7 1 4 6l23 23c7-7 9-12 17-19 8-6 8-14 0-20-9-6-9-12-16-19Z"
			/>
			<path
				fill="none"
				stroke="#B62C0A"
				stroke-width=".3"
				d="m774 452-18 18c-5 6-18 12-11 19-2-7 8-12 12-19 5-6 14-11 17-18Z"
			/>
			<path
				fill="none"
				d="M585 468c-11 4-10 14-10 24s-2 21 10 24l4 1c13 2 31 1 35-13v-24c-6-15-25-17-39-12Z"
			/>
			<path
				fill="none"
				stroke="#E6D1C0"
				stroke-width=".3"
				d="M928 533c12-3 26 1 39 0h40c13-1 27 1 39 1s18 8 28 12 16 10 26 15c11 4 14 9 26 14 13 5 11-12 1-17-9-6-10-15-19-21-8-6-12-15-20-21-7-7-11-15-20-20-9-6-23-5-34-6l-37-3c-12-1-26-1-38-3s-25 0-37-3c-12-2-25 0-37-3s-21 2-28 10c-7 9-14 13-21 20l-20 20c-8 6-12 14-20 20-8 5-12 14-21 19s-16 22-3 20 17-8 29-11c11-3 18-7 29-11s19-6 29-11 22-3 32 1l30 10c10 3 21 5 29 11 9 6 19 6 27 13 8 8 25 8 19-4s-9-15-16-24c-6-10-16-10-25-15s-18-10-27-13Z"
			/>
			<path
				fill="none"
				stroke="#B92614"
				stroke-opacity=".5"
				stroke-width=".3"
				d="M624 504c2-6 2-14 1-21l-1-3v24Z"
			/>
			<path
				fill="none"
				stroke="#BA2813"
				stroke-width=".3"
				d="M624 504c-4 14-22 15-35 13 1 3 12 10 3 13 9 3 3 18-4 14 4 8 8-4 12-6 1 2 4 3 4 6l-8 9c20-14 34-32 49-52-5-6-17-11-20-18 1 7 1 15-1 21Z"
			/>
			<path
				fill="none"
				stroke="#B72E0D"
				stroke-width=".3"
				d="m1121 523 2 3c1-3 4-2 6-1v-7c1 7 7 1 3-3 2 3 5 1 7 2-2-8 15-11 7-18-4 2-11 8-13 12-3 4-12 8-12 12Z"
			/>
			<path
				fill="none"
				stroke="#C24409"
				stroke-width=".3"
				d="m495 575 6 20c13-21 33-37 48-57-13-12-28-24-33-36-2 3-3 0-5-1-9 6 3 12 7 18s11 11 16 16c-12 12-27 24-36 39 3-3 4 3 5 5l-8-4Z"
			/>
			<path
				fill="none"
				stroke="#C4460A"
				stroke-width=".3"
				d="m1278 543 13-8-18-17c-5-7-12-9-18 0 3 4 6 11 11 13 4 3 7 11 12 12Z"
			/>
			<path
				fill="none"
				stroke="#B03708"
				stroke-width=".3"
				d="M521 629c9 2 21-5 30-8 0-2-5-5 0-3-2-7-7-8-9-15-2-6-15-8-9 1-4-1-6-4-8-7-5 1-2 6 1 8-1 2-5-2-6 1l5 4c-3 0-5-2-7-4-2 3 2 5 4 7-4 3 2 15-1 16Z"
			/>
			<path
				fill="none"
				stroke="#ECDDCD"
				stroke-width=".3"
				d="M682 1215h47c12-1 23 2 36 0s14 8 13 20v71c1 12-2 24 0 36s16 5 26 5l33-3c12-2 11 7 8 18s16 7 22 3c7-4 20-4 28-8s17-6 26-9l27-9 26-9c9-4 18-4 27-9 10-4 14 5 19 13 4 9 9 12 13 22 5 10 15 6 19-3s10-13 15-20c4-8 10-14 15-21l14-21 15-21c6-6 9-15 15-20s7-19 16-20 20 6 30 6 19 5 29 6 12-13 15-21c4-8 8-16 10-25l11-25 10-25 10-26c3-7 7-22 15-21 7 2 9 22 18 15s3-19 7-29 1-21 4-31 3-21 5-31c3-10 2-20 5-30s-3-18-8-26l-14-21c-5-8-8-15-14-22-5-8-6-15-13-23-7-7-5-18 7-16s19-6 15-15l-11-24-12-24-11-24c-2-8-14-19-4-24 9-5 24 3 34-2s-1-15-7-20l-18-18-16-19-18-18-17-18c-8-6-12-13-14-22-3-9-14-12-24-11l-34 2-35 1-33 2-35 1-33 2-34 2-33 2-35 1-34 2-34 1-34 2-34 1-34 2-34 1-34 2-33 2c-1-11 4-22 2-33s-16-3-23 0l-24 10-24 11-25 10c-7 3-21 5-19 15s6 16 10 25c3 9 5 18 9 26 3 9 8 18 0 24s-11 11-18 17l-18 16c-7 5-10 12-18 17-7 5-12 18 1 18h34c13-1 21 2 35 0s14 10 13 22v138c0 10 3 26-9 26h-34c-12-1-13 10-19 16-5 7-8 16-13 22s-14 18-2 20 23-1 35 0h104c12 1 8 16 8 26v70c-1 12 2 21 0 34s11 14 22 13h32m347-508c0 12 11 9 17 15-8 1-15 6-10 15-4 0-6-4-9-5-3 1-5 4-7 6 0-4 2-7 3-11-5-1-7-6-11-7 9 0 15-5 17-13m-91 3c-5 10-19 15-17 28l5 40c1 13 3 27 8 38l12 33c5 11-7 19-17 25-9 6-29 2-41 4s-24 7-36 10l-35 10-36 10c-12 4-22 8-35 10-12 3-13 18-17 29l-11 34c-4 11-9 26-4 36 6 10 10 22 14 31 5 9 11 28 20 20 10-8 12-16 20-25l20-26c6-10 18-13 30-15l36-10c11-4 25-5 35-10s28-2 34-12c7-10 3-26 8-37s2-26 10-36c11 5 9 19 10 31s4 25 4 38 9 17 21 20c11 4 19 9 30 12s19 8 30 12l30 11c11 4 11 15 15 27s4 20 8 34c5 14-7 13-15 4s-15-11-23-19l-23-18c-8-6-14-14-23-19-9-4-21 8-29 11-9 2-18 12-27 14s-19 15-29 13-17-11-26-16c-9-4-17-9-26-15-9-7-20-3-28 4s-17 9-25 16l-26 16c-8 7-16 10-25 17-9 6-15 8-25 16-9 9-17 0-22-10s-10-16-17-25c-6-9-8-16-16-25s-7-21-4-32 5-24 6-35 7-26 1-35c-5-10-11-16-17-25-5-9-11-15-17-24-5-9-10-17-17-25l-17-25c-7-9-5-23-4-35l2-40 3-39 22 36c7 14 15 21 22 36s20 23 38 19 36-1 54-4 36-1 54-4 36 1 55-4c18-6 10-30 14-44s-2-37 8-50c9-13 37-5 51-6m227 95c5 7 11 10 17 17 6 6-4 15-7 22l-14 20-14 21-14 20c-5 8-7 13-14 21s1 16-1 27-14 0-16-7c-2-8-6-17-11-23s-17-7-24-11l-24-10-25-10c-9-3-15-9-8-18 7-8 5-17-2-23-7-7-9-12-16-18-6-7-9-13-16-19-7-7-11-13-9-23s-1-23 2-33l23 41c9 17 31 13 50 12l62-2c19-1 43 3 61-4m-283 363c9 1 22-2 31 1 9 4 2 20 4 29s-2 21 0 33-10 11-21 11-22-2-33 0-22-2-19-14-2-23 0-32-5-26 6-27 22-2 32-1Z"
			/>
			<path
				fill="none"
				stroke="#E1D1C3"
				stroke-width=".3"
				d="M427 663c-10-3-29 1-39 0s-28-3-31 8 0 27-1 38-3 27 8 31 28 0 38 1 27 2 31-8 0-28 1-38 4-29-7-32Z"
			/>
			<path
				fill="none"
				stroke="#D13D27"
				stroke-width=".3"
				d="M1029 707c-2 8-8 13-17 13 4 1 6 6 11 7-1 4-3 7-3 11 2-2 4-5 7-6 3 1 5 5 9 5-5-9 2-14 10-15-6-6-17-3-17-15Z"
			/>
			<path
				fill="none"
				d="M938 710c-14 1-42-7-51 6-10 13-4 36-8 50s4 38-14 44c-19 5-37 1-55 4s-36 1-54 4-36 0-54 4-31-4-38-19-15-22-22-36l-22-36-3 39-2 40c-1 12-3 26 4 35l17 25c7 8 12 16 17 25 6 9 12 15 17 24 6 9 12 15 17 25 6 9 0 24-1 35s-3 24-6 35-4 23 4 32 10 16 16 25c7 9 12 15 17 25s13 19 22 10c10-8 16-10 25-16 9-7 17-10 25-17l26-16c8-7 17-9 25-16s19-11 28-4c9 6 17 11 26 15 9 5 16 14 26 16s20-11 29-13 18-12 27-14c8-3 20-15 29-11 9 5 15 13 23 19l23 18c8 8 15 10 23 19s20 10 15-4c-4-14-4-22-8-34s-4-23-15-27l-30-11c-11-4-19-9-30-12s-19-8-30-12c-12-3-21-7-21-20s-3-26-4-38 1-26-10-31c-8 10-5 25-10 36s-1 27-8 37c-6 10-24 7-34 12s-24 6-35 10l-36 10c-12 2-24 5-30 15l-20 26c-8 9-10 17-20 25-9 8-15-11-20-20-4-9-8-21-14-31-5-10 0-25 4-36l11-34c4-11 5-26 17-29 13-2 23-6 35-10l36-10 35-10c12-3 24-8 36-10s32 2 41-4c10-6 22-14 17-25l-12-33c-5-11-7-25-8-38l-5-40c-2-13 12-18 17-28Z"
			/>
			<path
				fill="none"
				d="M1165 805c-18 7-42 3-61 4l-62 2c-19 1-41 5-50-12l-23-41c-3 10 0 23-2 33s2 16 9 23c7 6 10 12 16 19 7 6 9 11 16 18 7 6 9 15 2 23-7 9-1 15 8 18l25 10 24 10c7 4 19 5 24 11s9 15 11 23c2 7 14 18 16 7s-6-19 1-27 9-13 14-21l14-20 14-21 14-20c3-7 13-16 7-22-6-7-12-10-17-17Z"
			/>
			<path
				fill="none"
				stroke="#DD8806"
				stroke-width=".3"
				d="M315 893c0-17 1-37-1-55-4-17-27-10-41-11s-37-3-36 15v51c1 18 26 12 39 12s37 5 39-12Z"
			/>
			<path
				fill="none"
				stroke="#E59C23"
				stroke-opacity=".2"
				stroke-width=".3"
				d="M315 893c2-16 2-39-1-55 2 18 1 38 1 55Z"
			/>
			<path
				fill="none"
				stroke="#E2D3C6"
				stroke-width=".3"
				d="M464 899c-15-4-30 4-45 0-15-3-28 3-26 19s0 28 0 44 17 17 30 15 31 4 42-2 6-29 6-39 4-34-7-37Z"
			/>
			<path
				fill="none"
				stroke="#DE8A06"
				stroke-width=".3"
				d="M359 1042c-11-7-29-4-41-4s-32-5-35 10 3 30 0 45 7 26 22 23 30 3 45 0c15-4 10-22 11-34s-1-29-2-40Z"
			/>
			<path
				fill="none"
				stroke="#E6D8CB"
				stroke-width=".3"
				d="M542 1153c-14-3-32 1-47 0s-31-2-45 1-12 23-12 35v46c0 12-2 30 13 33s31 1 46 1 30 2 45-1 12-23 12-35v-46c0-12 3-30-12-34Z"
			/>
			<path
				fill="none"
				d="M882 1168c-10-1-21 0-32 1s-4 18-6 27 3 20 0 32 8 16 19 14 22 0 33 0 23 1 21-11 2-24 0-33 5-25-4-29c-9-3-22 0-31-1Z"
			/>
			<path
				fill="none"
				stroke="#A78D74"
				stroke-opacity=".1"
				stroke-width=".3"
				d="M682 1215h13-13Z"
			/>
			<path
				fill="none"
				stroke="#E4D6C9"
				stroke-width=".3"
				d="M716 1280h-28l-27-1c-14 2-14 19-12 31s-4 29 1 41 24 6 35 7h42v-45c0-14 4-29-11-33Z"
			/>
			<path fill="none" d="M716 1280c-8-2-18-1-27-1h-28l27 1h28Z" />
			<path
				fill="none"
				stroke="None"
				d="M0 1600h1600V0H0v1600M917 234c10 3 18 15 26 22l25 23 12 11c11 11 23 24 35 33l3 2c6 3 19 1 26 1h21l85-1h26c8 0 17-2 24 2 8 5 12 15 18 22l8 10 24 30 24 30c8 10 15 21 24 30 8 10 14 22 23 31 10 9 18 26 4 34l-34 21-13 8-41 26-41 26c-16 8-29-14-38-25l-30-38-5-6-2-3-5-6c-11-13-19-21-29-36-11-14-33-13-50-15l-60-5-53-6c-19-3-37-1-56-5s-31 7-43 21l-10 11-27 30c-9 11-18 19-27 31-9 11-18 17-27 30-9 12-21 21-38 20s-35 5-52 5-36 1-51 7l-42 16c-9 3-21 10-30 8-15-3-16-22-20-34l-6-20c-6-18-10-35-18-52-8-18-3-36 10-50 13-13 16-30 28-42s15-34 31-40l3-1c20-2 40 3 60 0 4-1 10-3 12-6 7-9 0-24 2-35s-2-27 0-38c2-19 23-23 35-38 11-15 38-14 57-17l65-9 67-7 19-2 27-3c8-1 16-3 24-1m11 299c9 3 18 8 27 13s19 5 25 15c7 9 10 12 16 24s-11 12-19 4c-8-7-18-7-27-13-8-6-19-8-29-11l-30-10c-10-4-22-6-32-1s-18 7-29 11-18 8-29 11c-12 3-16 9-29 11s-6-15 3-20 13-14 21-19c8-6 12-14 20-20l20-20c7-7 14-11 21-20 7-8 16-13 28-10s25 1 37 3c12 3 25 1 37 3s26 2 38 3l37 3c11 1 25 0 34 6 9 5 13 13 20 20 8 6 12 15 20 21 9 6 10 15 19 21 10 5 12 22-1 17-12-5-15-10-26-14-10-5-16-11-26-15s-16-12-28-12-26-2-39-1h-40c-13 1-27-3-39 0m-233 682h-45c-11 1-24 0-22-13s-1-22 0-34v-70c0-10 4-25-8-26H516c-12-1-23 2-35 0s-3-14 2-20 8-15 13-22c6-6 7-17 19-16h34c12 0 9-16 9-26V850c1-12 1-24-13-22s-22-1-35 0h-34c-13 0-8-13-1-18 8-5 11-12 18-17l18-16c7-6 10-11 18-17s3-15 0-24c-4-8-6-17-9-26-4-9-8-15-10-25s12-12 19-15l25-10 24-11 24-10c7-3 21-11 23 0s-3 22-2 33l33-2 34-2 34-1 34-2 34-1 34-2 34-1 34-2 35-1 33-2 34-2 33-2 35-1 33-2 35-1 34-2c10-1 21 2 24 11 2 9 6 16 14 22l17 18 18 18 16 19 18 18c6 5 17 15 7 20s-25-3-34 2c-10 5 2 16 4 24l11 24 12 24 11 24c4 9-3 17-15 15s-14 9-7 16c7 8 8 15 13 23 6 7 9 14 14 22l14 21c5 8 11 16 8 26s-2 20-5 30c-2 10-2 21-5 31s0 21-4 31 2 22-7 29-11-13-18-15c-8-1-12 14-15 21l-10 26-10 25-11 25c-2 9-6 17-10 25-3 8-5 22-15 21s-19-6-29-6-21-7-30-6-10 15-16 20-9 14-15 20l-15 21-14 21c-5 7-11 13-15 21-5 7-11 11-15 20s-14 13-19 3c-4-10-9-13-13-22-5-8-9-17-19-13-9 5-18 5-27 9l-26 9-27 9c-9 3-18 5-26 9s-21 4-28 8c-6 4-25 8-22-3s4-20-8-18l-33 3c-10 0-24 7-26-5s1-24 0-36v-71c1-12 0-22-13-20s-24-1-36 0h-34M427 663c11 3 8 22 7 32s3 28-1 38-21 9-31 8-27 3-38-1-9-20-8-31-2-27 1-38 21-9 31-8 29-3 39 0M314 838c3 16 3 39 1 55-2 17-26 12-39 12s-38 6-39-12v-51c-1-18 22-16 36-15s37-6 41 11m150 61c11 3 7 27 7 37s5 33-6 39-29 0-42 2-30 1-30-15 2-28 0-44 11-22 26-19c15 4 30-4 45 0m-105 143c1 11 3 28 2 40s4 30-11 34c-15 3-30-3-45 0s-25-8-22-23-3-30 0-45 23-10 35-10 30-3 41 4m183 111c15 4 12 22 12 34v46c0 12 3 32-12 35s-30 1-45 1-31 2-46-1-13-21-13-33v-46c0-12-2-32 12-35s30-2 45-1 33-3 47 0m174 127c15 4 11 19 11 33v45h-42c-11-1-30 5-35-7s1-29-1-41-2-29 12-31h28c9 0 19-1 27 1Z"
			/>
			<path
				fill="#CA450A"
				stroke="None"
				d="M893 235c-2 2-3 9-7 9-4 1-4 9-8 10-4 2-4 7-8 10-4 2-2 8 3 9-2 8-18 12-13 21 11-6 20-18 31-25 12 14 28 25 37 41-10 6-16 14-25 23-8 9-12 18-21 27-9 10 5 17 13 25s20 13 26 23l-8-5c2 3 4 5 2 8 3-1 4 2 5 4-3-1-5 0-6-3 1 4-1 7-1 10 9 0 15 1 24 3 8 3 18-1 25 4 8 4 17-1 23 5 6-4 10 1 15 3 0-6-7-8-10-7 5-7 12-11 17-17 0-3-4-3-3-6-8 5-15 14-21 21-4-1-6-4-9-1-10-7-17-18-27-25 12-15 26-29 40-42 7 9 16 18 25 25-3-6 1-2 4-1-4-7 4-2-1-8 5 2 8 8 13 11 7-4-7-17-10-13-1-6-7-12-12-16 5-8 14-15 21-22l-7-8c-5 2-6 9-11 9 1 4-7 11-11 10 3-4 8-7 9-11s12-4 11-11l-3-2c-4 0-8 9-12 11-4 3-7 10-11 13-13-9-23-24-36-33 7-8 14-21 24-24l-12-11c-3 0-5 7-8 9s-8 6-8 10c-3-3-8 3-6 6-7-3-11-11-17-16l-17-17c-5-6-15-13-6-18 8-6 12-11 11-19-8-2-16 0-24 1m76 115c-11 18-32 31-45 47-10-10-23-21-31-32 2 2 4-1 7 0 3-6 9-13 14-18s15-11 7-17c3-3 8-6 10-10 3-1 0 3 3 4 1-2 4-3 4-6 9 11 20 22 31 32Z"
			/>
			<path
				fill="#B32817"
				stroke="None"
				d="m968 279-25-23c-8-7-16-19-26-22 1 8-3 13-11 19-9 5 1 12 6 18l17 17c6 5 10 13 17 16-2-3 3-9 6-6 0-4 5-8 8-10s5-9 8-9Z"
			/>
			<path
				fill="#B42415"
				stroke="None"
				d="M866 238c2 1-5 8-7 11-2 2-6 10-10 10-5-4-5-10-7-14 1-2 7-3 5-5l-67 7-65 9c-19 3-46 2-57 17-12 15-33 19-35 38 0 5 2 12 1 17l27-27c8 5 16 19 26 19 1-7 11-16 17-22 5-7 12-21 21-14-3 8-10 16-17 21-7 6-11 14-19 19 11 14 25 27 39 37 7-14 21-23 32-32-10-10-19-22-30-31 5-7 13-15 20-21 8-5 13-17 21-20 9-3 20 10 25 16s17 15 16 23l26-27c4 0 5 5 8 6l-12 14c-5 3-9 10-15 9-2 10-16 18-24 25 3 6 11 12 14 18 3 5 14 11 9 15 4 1 5 6 7 9-6-2-10-8-16-12 3 6 10 14 15 18 6 4 11 12 17 13 0 3 3 5 4 7 9-12 21-23 31-34-14-11-27-25-39-38 5-2 9-8 12-12 16 14 30 31 46 45-3 5-5 9-10 13s-3 11-7 15c-5-2-11 8-17 12s-11 13-17 17c-7 4-12 11-18 16-6 6-9 13-16 18 5 11 21 18 22 30l3-2c12-14 24-25 43-21s37 2 56 5l53 6 60 5c17 2 39 1 50 15 10 15 18 23 29 36 1-4 11-8 12-12 2-4 13-8 11-13-3-4-9-7-12-12-3-4-8-8-13-11l-12-12c-4-4-11-8-17-7 0-3 4-3 3-6-25 15-41-20-60-32 7-4 5-14-3-14 0-4 5-9 8-5 2-9 12-13 17-20l19-18c-5-8-14-15-21-22 0-3 3-4 4-6l-8-1c-7 0-20 2-26-1 1 7-10 7-11 11s-6 7-9 11c4 1 12-6 11-10 5 0 6-7 11-9l7 8c-7 7-16 14-21 22 5 4 11 10 12 16 3-4 17 9 10 13-5-3-8-9-13-11 5 6-3 1 1 8-3-1-7-5-4 1-9-7-18-16-25-25-14 13-28 27-40 42 10 7 17 18 27 25 3-3 5 0 9 1 6-7 13-16 21-21-1 3 3 3 3 6-5 6-12 10-17 17 3-1 10 1 10 7-5-2-9-7-15-3-6-6-15-1-23-5-7-5-17-1-25-4-9-2-15-3-24-3 0-3 2-6 1-10 1 3 3 2 6 3-1-2-2-5-5-4 2-3 0-5-2-8l8 5c-6-10-18-15-26-23s-22-15-13-25c9-9 13-18 21-27 9-9 15-17 25-23-9-16-25-27-37-41-11 7-20 19-31 25-5-9 11-13 13-21-5-1-7-7-3-9 4-3 4-8 8-10 4-1 4-9 8-10 4 0 5-7 7-9l-27 3m-28 37c-3-3-7-6-6-11-9 4-20-22-10-14 9 9 23 14 16 25m21 114c3 6 9 11 13 15 4 5 14 9 8 14 3-1 7-2 10 1-16-1-41 6-49-15 6-5 11-11 18-15Z"
			/>
			<path
				fill="#C03D0A"
				stroke="None"
				d="M847 240c2 2-4 3-5 5 2 4 2 10 7 14 4 0 8-8 10-10 2-3 9-10 7-11l-19 2Z"
			/>
			<path
				fill="#BF3F0B"
				stroke="None"
				d="M838 275c7-11-7-16-16-25-10-8 1 18 10 14-1 5 3 8 6 11Z"
			/>
			<path
				fill="#CB4609"
				stroke="None"
				d="M623 311c-2 11 2 27 0 38s5 26-2 35c11-1 18 21 28 23-16 13-31 31-46 45-10-9-25-22-30-33-24 18-45 42-66 61 1 5 3 11 7 17s9 9 14 14c4 6 10 9 14 14 5 5 17 9 11-2 2-1 5 3 6 1-9-11-21-20-30-31 16-11 31-26 43-40 6 3 11 9 13 15 14-5 33-3 39 12l1 3c3 7 15 12 20 18-15 20-29 38-49 52l8-9c0-3-3-4-4-6-4 2-8 14-12 6 7 4 13-11 4-14 9-3-2-10-3-13l-4-1c1 3-5 5-2 8-5 2-10 7-12 12 6 3 9 10 14 14 6 3 10 12 16 8-3 3-1 7 3 9 20-17 38-39 55-59l25 25 9-7-24-26c15-11 27-29 43-39-6 6 2 10 6 15s11 7 14 13c-6 2-8 9-14 12-5 3-9 8-13 13-4 4-7 14 2 6l27-25c-2 7-12 12-15 17s-16 11-13 17 12-5 16-10l16-17c5-4 10-12 15-17 6-4 11-11 16-16 6-5 11-13 18-15 7 11 20 18 28 28l10-11-3 2c-1-12-17-19-22-30 7-5 10-12 16-18 6-5 11-12 18-16 6-4 11-13 17-17s12-14 17-12c4-4 2-11 7-15s7-8 10-13c-16-14-30-31-46-45-3 4-7 10-12 12 12 13 25 27 39 38-10 11-22 22-31 34-1-2-4-4-4-7-6-1-11-9-17-13-5-4-12-12-15-18 6 4 10 10 16 12-2-3-3-8-7-9 5-4-6-10-9-15-3-6-11-12-14-18 8-7 22-15 24-25 6 1 10-6 15-9l12-14c-3-1-4-6-8-6l-26 27c1-8-11-17-16-23s-16-19-25-16c-8 3-13 15-21 20-7 6-15 14-20 21 11 9 20 21 30 31-11 9-25 18-32 32-14-10-28-23-39-37 8-5 12-13 19-19 7-5 14-13 17-21-9-7-16 7-21 14-6 6-16 15-17 22-10 0-18-14-26-19l-27 27c1-5-1-12-1-17m177-10c-10 4-15 18-22 24 1-10-7 2-10-5s-12-3-12-12c-3 4-6-5-9-7-4-2-3-8-10-8 7-10 20-18 28-28 11 11 25 23 35 36m-150 20c-6 10-16 20-26 27v-10c5 8 7-2 12-5 4-3 9-10 14-12m47 41c-10 13-24 22-34 35-15-7-24-24-39-32-2-9 7-12 11-18 5-6 11-7 16-14s11-7 16-1c5 7 10 9 15 15l15 15m78-35c7 5 5 11 13 15 9 4 3 9-3 13-5 4-13 10-7 16 3-4 9-7 12-12 13 8 24 21 34 33-5 3-11 8-15 13s-14 8-12 15c-5-3-7 6-12 8 0 3 4 4 4 7-2-1-3-4-6-4l-28 32-6-9c-7 5-11 13-19 16 0-7-19-19-11-6-3 0-3-4-6-3 11-14 26-26 39-39-5 0-2-3 1-5-2-2-3-4-2-7-6 3-9 10-15 13 5-6 9-13 16-16 3-7-6-12-10-17-5-5-10-11-16-14 4-7 12-13 17-20 5-6 17-11 14-19 8 5 11-9 18-10m-37 23c0 4-4 7-8 10-4 4-4 9-5 13 0-9-11 3-5 8l-5-4c-6 6 5 10 9 16l16 15c-11 14-28 25-39 39-8-13-25-20-31-34l15-12 13-14c5-3 10-14 14-8 1-4 7-5 4-9 5-1 5-5 4-9 3 3 6 3 9-1 0-3-4-3-3-6l5 4c1-3 4-6 7-8m-75 69 31 30c-14 14-26 33-42 44 2-2 2-4 2-7-6 0 0-2 0-5-4-2-6-9-11-10-4 0-4-11-10-5 3-5-2-8-5-11 12-11 23-26 35-36m111 33c-3 7-12 12-17 18-4 7-14 12-12 19-7-7 6-13 11-19l18-18Z"
			/>
			<path
				fill="#B92616"
				stroke="None"
				d="M800 301c-10-13-24-25-35-36-8 10-21 18-28 28 7 0 6 6 10 8 3 2 6 11 9 7 0 9 9 5 12 12s11-5 10 5c7-6 12-20 22-24Z"
			/>
			<path
				fill="#B52715"
				stroke="None"
				d="M1015 323c-12-9-24-22-35-33-10 3-17 16-24 24 13 9 23 24 36 33 4-3 7-10 11-13 4-2 8-11 12-11Z"
			/>
			<path
				fill="#B72314"
				stroke="None"
				d="M969 350c-11-10-22-21-31-32 0 3-3 4-4 6-3-1 0-5-3-4-2 4-7 7-10 10 8 6-2 12-7 17s-11 12-14 18c-3-1-5 2-7 0 8 11 21 22 31 32 13-16 34-29 45-47Z"
			/>
			<path
				fill="#B92E12"
				stroke="None"
				d="M650 321c-5 2-10 9-14 12-5 3-7 13-12 5v10c10-7 20-17 26-27Z"
			/>
			<path
				fill="#B12417"
				stroke="None"
				d="m1065 326-1 1c1 5 9 10 13 14 3 5 10 9 14 13s10 10 13 8c1 8 11 10 15 17 13-11 23-26 37-35-1-2-3-3 0-5-2-2-4-5-7-5 0-3 2-6 5-7 0-2-4 0-4-2l-85 1Z"
			/>
			<path
				fill="#C94509"
				stroke="None"
				d="M1064 327h-12c-1 2-4 3-4 6 7 7 16 14 21 22l-19 18c-5 7-15 11-17 20-3-4-8 1-8 5 8 0 10 10 3 14 19 12 35 47 60 32 1 3-3 3-3 6 6-1 13 3 17 7l12 12c5 3 10 7 13 11 3 5 9 8 12 12 2 5-9 9-11 13-1 4-11 8-12 12l5 6c0-4 9-8 12-12 2-4 9-10 13-12 8 7-9 10-7 18-2-1-5 1-7-2 4 4-2 10-3 3v7c-2-1-5-2-6 1l5 6c0-4 9-8 11-12 3-4 10-7 12-12l20 18c5 7 14 13 19 19 4 7 11 24 15 9 3 1 3 3 3 6 3 0 7-3 7-6-5-2-8-12-13-8 1-2 0-3 3-4 3 5 14-5 8-7 6-2 21-21 17-5-5-2-11 3-13 7 2 2 4 3 4 5-7-7-15 7-5 12 13-10 24-24 37-35-1-3-3-5-6-7-3 3-5 2-7 5-1 3-7 10-9 4 7-5 17-13 18-21-4 2-7-3-12-5-4-3-7-9-10-13-4-3-9-7-11-12 7 0 13 8 18 13 5 6 13 10 18 16l37-36c-6-5-10-13-15-18s-11-14-19-13c-1-10-8 2-14 7-7 4-12 9-18 16s-12-2-17-8c-5-7-12-11-17-17-9 3-4 9 0 15-3-2-7-2-8-7-3 8 0 1-5 2 4-3-2-4 1-6-4 0-6 2-5 6-6-4-12-10-17-16-3 1-4 5-7 6 3 5 9 7 12 11-8 1-16 13-21 19 4 5 8-1 12-5l12-12c7 5 12 13 19 18l-11 12c-4 3-7 12-12 8-3 3 3 3 2 6-7-3-3 2-3 6 6-4 12-13 18-17s11-18 18-13c6 5 11 13 17 19l19 16c6 7-6 13-11 18s-14 12-18 18c-10-7-20-17-29-26-10-8-18-20-27-28-8-8-16-32-27-17-9-4-14-16-22-20 8-15 24-26 35-40-1-3-5-4-5-7 2 1 3 4 6 4 4-8 18-12 15-23 2 0 2 5 5 3 2-3 4-4 2-7 4 1 6-3 6-6 4 4 5-3 9-6 3-4-4-10-5-13 3 2 6 5 7 8 11-7 22-18 29-29-7-4-16-2-24-2h-26c0 2 4 0 4 2-3 1-5 4-5 7 3 0 5 3 7 5-3 2-1 3 0 5-14 9-24 24-37 35-4-7-14-9-15-17-3 2-9-4-13-8s-11-8-14-13c-4-4-12-9-13-14m21 27c2 4-9 7-1 12 8 4 15 13 22 20l11 10c-8 12-22 22-32 33-2-2-5-3-5-6-3 4 3 8 4 12-9 0-15-11-23-17s-15-14-23-19l47-45m170 79c7 7 7 13 16 19 8 6 8 14 0 20-8 7-10 12-17 19l-23-23c3-5-1-6-4-6 8-11 19-19 28-29Z"
			/>
			<path
				fill="#BB2617"
				stroke="None"
				d="m697 362-15-15c-5-6-10-8-15-15-5-6-11-6-16 1s-11 8-16 14c-4 6-13 9-11 18 15 8 24 25 39 32 10-13 24-22 34-35Z"
			/>
			<path fill="#BC3E10" fill-opacity=".6" stroke="None" d="M1052 327h12l1-1h-21l8 1Z" />
			<path
				fill="#BC2613"
				stroke="None"
				d="M775 327c-7 1-10 15-18 10 3 8-9 13-14 19-5 7-13 13-17 20 6 3 11 9 16 14 4 5 13 10 10 17-7 3-11 10-16 16 6-3 9-10 15-13-1 3 0 5 2 7-3 2-6 5-1 5-13 13-28 25-39 39 3-1 3 3 6 3-8-13 11-1 11 6 8-3 12-11 19-16l6 9 28-32c3 0 4 3 6 4 0-3-4-4-4-7 5-2 7-11 12-8-2-7 8-10 12-15s10-10 15-13c-10-12-21-25-34-33-3 5-9 8-12 12-6-6 2-12 7-16 6-4 12-9 3-13-8-4-6-10-13-15Z"
			/>
			<path
				fill="#B52615"
				stroke="None"
				d="m1128 532 30 38c9 11 22 33 38 25l41-26 41-26c-5-1-8-9-12-12-5-2-8-9-11-13 6-9 13-7 18 0l18 17 34-21c14-8 6-25-4-34-9-9-15-21-23-31-9-9-16-20-24-30l-24-30-24-30c0 5-7 8-10 11-2 4-8 8-11 10 3 6 17 12 12 19l-18 17c-5 7-13 12-17 19l-12-14 29-29c4 0 5 7 10 6-9-9-20-18-28-29 2-6 9-6 11-11 4 1 8 4 10 8 7-3 11-10 18-14-1-1-3-1-2-3-6-7-10-17-18-22-7 11-18 22-29 29-1-3-4-6-7-8 1 3 8 9 5 13-4 3-5 10-9 6 0 3-2 7-6 6 2 3 0 4-2 7-3 2-3-3-5-3 3 11-11 15-15 23-3 0-4-3-6-4 0 3 4 4 5 7-11 14-27 25-35 40 8 4 13 16 22 20 11-15 19 9 27 17 9 8 17 20 27 28 9 9 19 19 29 26 4-6 13-13 18-18s17-11 11-18l-19-16c-6-6-11-14-17-19-7-5-12 9-18 13s-12 13-18 17c0-4-4-9 3-6 1-3-5-3-2-6 5 4 8-5 12-8l11-12c-7-5-12-13-19-18l-12 12c-4 4-8 10-12 5 5-6 13-18 21-19-3-4-9-6-12-11 3-1 4-5 7-6 5 6 11 12 17 16-1-4 1-6 5-6-3 2 3 3-1 6 5-1 2 6 5-2 1 5 5 5 8 7-4-6-9-12 0-15 5 6 12 10 17 17 5 6 11 15 17 8s11-12 18-16c6-5 13-17 14-7 8-1 14 8 19 13s9 13 15 18l-37 36c-5-6-13-10-18-16-5-5-11-13-18-13 2 5 7 9 11 12 3 4 6 10 10 13 5 2 8 7 12 5-1 8-11 16-18 21 2 6 8-1 9-4 2-3 4-2 7-5 3 2 5 4 6 7-13 11-24 25-37 35-10-5-2-19 5-12 0-2-2-3-4-5 2-4 8-9 13-7 4-16-11 3-17 5 6 2-5 12-8 7-3 1-2 2-3 4 5-4 8 6 13 8 0 3-4 6-7 6 0-3 0-5-3-6-4 15-11-2-15-9-5-6-14-12-19-19l-20-18c-2 5-9 8-12 12-2 4-11 8-11 12m120-113c6-2 10-3 14-7 4 12-16 13-16 22-4-2-4 2-7 3-4-8-25-20-9-25 1 6 6 5 9 0 4-5 8 3 9 7Z"
			/>
			<path
				fill="#CA4908"
				stroke="None"
				d="m1226 359-8-10c-1 2 1 2 2 3-7 4-11 11-18 14-2-4-6-7-10-8-2 5-9 5-11 11 8 11 19 20 28 29-5 1-6-6-10-6l-29 29 12 14c4-7 12-12 17-19l18-17c5-7-9-13-12-19 3-2 9-6 11-10 3-3 10-6 10-11Z"
			/>
			<path
				fill="#BE2614"
				stroke="None"
				d="M738 350c-3 2-6 5-7 8l-5-4c-1 3 3 3 3 6-3 4-6 4-9 1 1 4 1 8-4 9 3 4-3 5-4 9-4-6-9 5-14 8l-13 14-15 12c6 14 23 21 31 34 11-14 28-25 39-39l-16-15c-4-6-15-10-9-16l5 4c-6-5 5-17 5-8 1-4 1-9 5-13 4-3 8-6 8-10Z"
			/>
			<path
				fill="#BB2517"
				stroke="None"
				d="m1085 354-47 45c8 5 15 13 23 19s14 17 23 17c-1-4-7-8-4-12 0 3 3 4 5 6 10-11 24-21 32-33l-11-10c-7-7-14-16-22-20-8-5 3-8 1-12Z"
			/>
			<path
				fill="#B12415"
				stroke="None"
				d="M609 390c-13 3-32 1-46 1 7 2 9 16 17 18-2 4-7 6-9 10l-26-24c-1-2 4-3 1-4-16 6-19 28-31 40s-15 29-28 42a45 45 0 0 0-10 50c8 17 12 34 18 52l8 4c-1-2-2-8-5-5 9-15 24-27 36-39-5-5-12-10-16-16s-16-12-7-18c2 1 3 4 5 1 5 12 20 24 33 36-15 20-35 36-48 57 4 12 5 31 20 34 3-1-3-13 1-16-2-2-6-4-4-7 2 2 4 4 7 4l-5-4c1-3 5 1 6-1-3-2-6-7-1-8 2 3 4 6 8 7-6-9 7-7 9-1 2 7 7 8 9 15-5-2 0 1 0 3l42-16c15-6 34-7 51-7s35-6 52-5 29-8 38-20c9-13 18-19 27-30 9-12 18-20 27-31l27-30c-8-10-21-17-28-28-7 2-12 10-18 15-5 5-10 12-16 16-5 5-10 13-15 17l-16 17c-4 5-13 16-16 10s10-12 13-17 13-10 15-17l-27 25c-9 8-6-2-2-6 4-5 8-10 13-13 6-3 8-10 14-12-3-6-10-8-14-13s-12-9-6-15c-16 10-28 28-43 39l24 26-9 7-25-25c-17 20-35 42-55 59-4-2-6-6-3-9-6 4-10-5-16-8-5-4-8-11-14-14 2-5 7-10 12-12-3-3 3-5 2-8-12-3-10-14-10-24s-1-20 10-24c-2-6-7-12-13-15-12 14-27 29-43 40 9 11 21 20 30 31-1 2-4-2-6-1 6 11-6 7-11 2-4-5-10-8-14-14-5-5-10-8-14-14s-6-12-7-17c21-19 42-43 66-61 5 11 20 24 30 33 15-14 30-32 46-45-10-2-17-24-28-23-2 3-8 5-12 6Z"
			/>
			<path
				fill="#CA4509"
				stroke="None"
				d="M859 389c-7 4-12 10-18 15 8 21 33 14 49 15-3-3-7-2-10-1 6-5-4-9-8-14-4-4-10-9-13-15Z"
			/>
			<path
				fill="#C1420C"
				stroke="None"
				d="M546 391c3 1-2 2-1 4l26 24c2-4 7-6 9-10-8-2-10-16-17-18l-14-1-3 1Z"
			/>
			<path
				fill="#B52917"
				fill-opacity=".7"
				stroke="None"
				d="M563 391c14 0 33 2 46-1-20 3-40-2-60 0l14 1Z"
			/>
			<path
				fill="#C53E0B"
				stroke="None"
				d="M1248 419c-1-4-5-12-9-7-3 5-8 6-9 0-16 5 5 17 9 25 3-1 3-5 7-3 0-9 20-10 16-22-4 4-8 5-14 7Z"
			/>
			<path
				fill="#B82215"
				stroke="None"
				d="M663 419c-12 10-23 25-35 36 3 3 8 6 5 11 6-6 6 5 10 5 5 1 7 8 11 10 0 3-6 5 0 5 0 3 0 5-2 7 16-11 28-30 42-44l-31-30Z"
			/>
			<path
				fill="#B42315"
				stroke="None"
				d="M1255 433c-9 10-20 18-28 29 3 0 7 1 4 6l23 23c7-7 9-12 17-19 8-6 8-14 0-20-9-6-9-12-16-19Z"
			/>
			<path
				fill="#B62C0A"
				stroke="None"
				d="m774 452-18 18c-5 6-18 12-11 19-2-7 8-12 12-19 5-6 14-11 17-18Z"
			/>
			<path
				fill="none"
				stroke="None"
				d="M585 468c-11 4-10 14-10 24s-2 21 10 24l4 1c13 2 31 1 35-13v-24c-6-15-25-17-39-12Z"
			/>
			<path
				fill="#E6D1C0"
				stroke="None"
				d="M928 533c12-3 26 1 39 0h40c13-1 27 1 39 1s18 8 28 12 16 10 26 15c11 4 14 9 26 14 13 5 11-12 1-17-9-6-10-15-19-21-8-6-12-15-20-21-7-7-11-15-20-20-9-6-23-5-34-6l-37-3c-12-1-26-1-38-3s-25 0-37-3c-12-2-25 0-37-3s-21 2-28 10c-7 9-14 13-21 20l-20 20c-8 6-12 14-20 20-8 5-12 14-21 19s-16 22-3 20 17-8 29-11c11-3 18-7 29-11s19-6 29-11 22-3 32 1l30 10c10 3 21 5 29 11 9 6 19 6 27 13 8 8 25 8 19-4s-9-15-16-24c-6-10-16-10-25-15s-18-10-27-13Z"
			/>
			<path fill="#B92614" fill-opacity=".5" stroke="None" d="M624 504c2-6 2-14 1-21l-1-3v24Z" />
			<path
				fill="#BA2813"
				stroke="None"
				d="M624 504c-4 14-22 15-35 13 1 3 12 10 3 13 9 3 3 18-4 14 4 8 8-4 12-6 1 2 4 3 4 6l-8 9c20-14 34-32 49-52-5-6-17-11-20-18 1 7 1 15-1 21Z"
			/>
			<path
				fill="#B72E0D"
				stroke="None"
				d="m1121 523 2 3c1-3 4-2 6-1v-7c1 7 7 1 3-3 2 3 5 1 7 2-2-8 15-11 7-18-4 2-11 8-13 12-3 4-12 8-12 12Z"
			/>
			<path
				fill="#C24409"
				stroke="None"
				d="m495 575 6 20c13-21 33-37 48-57-13-12-28-24-33-36-2 3-3 0-5-1-9 6 3 12 7 18s11 11 16 16c-12 12-27 24-36 39 3-3 4 3 5 5l-8-4Z"
			/>
			<path
				fill="#C4460A"
				stroke="None"
				d="m1278 543 13-8-18-17c-5-7-12-9-18 0 3 4 6 11 11 13 4 3 7 11 12 12Z"
			/>
			<path
				fill="#B03708"
				stroke="None"
				d="M521 629c9 2 21-5 30-8 0-2-5-5 0-3-2-7-7-8-9-15-2-6-15-8-9 1-4-1-6-4-8-7-5 1-2 6 1 8-1 2-5-2-6 1l5 4c-3 0-5-2-7-4-2 3 2 5 4 7-4 3 2 15-1 16Z"
			/>
			<path
				fill="#ECDDCD"
				stroke="None"
				d="M682 1215h47c12-1 23 2 36 0s14 8 13 20v71c1 12-2 24 0 36s16 5 26 5l33-3c12-2 11 7 8 18s16 7 22 3c7-4 20-4 28-8s17-6 26-9l27-9 26-9c9-4 18-4 27-9 10-4 14 5 19 13 4 9 9 12 13 22 5 10 15 6 19-3s10-13 15-20c4-8 10-14 15-21l14-21 15-21c6-6 9-15 15-20s7-19 16-20 20 6 30 6 19 5 29 6 12-13 15-21c4-8 8-16 10-25l11-25 10-25 10-26c3-7 7-22 15-21 7 2 9 22 18 15s3-19 7-29 1-21 4-31 3-21 5-31c3-10 2-20 5-30s-3-18-8-26l-14-21c-5-8-8-15-14-22-5-8-6-15-13-23-7-7-5-18 7-16s19-6 15-15l-11-24-12-24-11-24c-2-8-14-19-4-24 9-5 24 3 34-2s-1-15-7-20l-18-18-16-19-18-18-17-18c-8-6-12-13-14-22-3-9-14-12-24-11l-34 2-35 1-33 2-35 1-33 2-34 2-33 2-35 1-34 2-34 1-34 2-34 1-34 2-34 1-34 2-33 2c-1-11 4-22 2-33s-16-3-23 0l-24 10-24 11-25 10c-7 3-21 5-19 15s6 16 10 25c3 9 5 18 9 26 3 9 8 18 0 24s-11 11-18 17l-18 16c-7 5-10 12-18 17-7 5-12 18 1 18h34c13-1 21 2 35 0s14 10 13 22v138c0 10 3 26-9 26h-34c-12-1-13 10-19 16-5 7-8 16-13 22s-14 18-2 20 23-1 35 0h104c12 1 8 16 8 26v70c-1 12 2 21 0 34s11 14 22 13h32m347-508c0 12 11 9 17 15-8 1-15 6-10 15-4 0-6-4-9-5-3 1-5 4-7 6 0-4 2-7 3-11-5-1-7-6-11-7 9 0 15-5 17-13m-91 3c-5 10-19 15-17 28l5 40c1 13 3 27 8 38l12 33c5 11-7 19-17 25-9 6-29 2-41 4s-24 7-36 10l-35 10-36 10c-12 4-22 8-35 10-12 3-13 18-17 29l-11 34c-4 11-9 26-4 36 6 10 10 22 14 31 5 9 11 28 20 20 10-8 12-16 20-25l20-26c6-10 18-13 30-15l36-10c11-4 25-5 35-10s28-2 34-12c7-10 3-26 8-37s2-26 10-36c11 5 9 19 10 31s4 25 4 38 9 17 21 20c11 4 19 9 30 12s19 8 30 12l30 11c11 4 11 15 15 27s4 20 8 34c5 14-7 13-15 4s-15-11-23-19l-23-18c-8-6-14-14-23-19-9-4-21 8-29 11-9 2-18 12-27 14s-19 15-29 13-17-11-26-16c-9-4-17-9-26-15-9-7-20-3-28 4s-17 9-25 16l-26 16c-8 7-16 10-25 17-9 6-15 8-25 16-9 9-17 0-22-10s-10-16-17-25c-6-9-8-16-16-25s-7-21-4-32 5-24 6-35 7-26 1-35c-5-10-11-16-17-25-5-9-11-15-17-24-5-9-10-17-17-25l-17-25c-7-9-5-23-4-35l2-40 3-39 22 36c7 14 15 21 22 36s20 23 38 19 36-1 54-4 36-1 54-4 36 1 55-4c18-6 10-30 14-44s-2-37 8-50c9-13 37-5 51-6m227 95c5 7 11 10 17 17 6 6-4 15-7 22l-14 20-14 21-14 20c-5 8-7 13-14 21s1 16-1 27-14 0-16-7c-2-8-6-17-11-23s-17-7-24-11l-24-10-25-10c-9-3-15-9-8-18 7-8 5-17-2-23-7-7-9-12-16-18-6-7-9-13-16-19-7-7-11-13-9-23s-1-23 2-33l23 41c9 17 31 13 50 12l62-2c19-1 43 3 61-4m-283 363c9 1 22-2 31 1 9 4 2 20 4 29s-2 21 0 33-10 11-21 11-22-2-33 0-22-2-19-14-2-23 0-32-5-26 6-27 22-2 32-1Z"
			/>
			<path
				fill="#E1D1C3"
				stroke="None"
				d="M427 663c-10-3-29 1-39 0s-28-3-31 8 0 27-1 38-3 27 8 31 28 0 38 1 27 2 31-8 0-28 1-38 4-29-7-32Z"
			/>
			<path
				fill="#D13D27"
				stroke="None"
				d="M1029 707c-2 8-8 13-17 13 4 1 6 6 11 7-1 4-3 7-3 11 2-2 4-5 7-6 3 1 5 5 9 5-5-9 2-14 10-15-6-6-17-3-17-15Z"
			/>
			<path
				fill="none"
				stroke="None"
				d="M938 710c-14 1-42-7-51 6-10 13-4 36-8 50s4 38-14 44c-19 5-37 1-55 4s-36 1-54 4-36 0-54 4-31-4-38-19-15-22-22-36l-22-36-3 39-2 40c-1 12-3 26 4 35l17 25c7 8 12 16 17 25 6 9 12 15 17 24 6 9 12 15 17 25 6 9 0 24-1 35s-3 24-6 35-4 23 4 32 10 16 16 25c7 9 12 15 17 25s13 19 22 10c10-8 16-10 25-16 9-7 17-10 25-17l26-16c8-7 17-9 25-16s19-11 28-4c9 6 17 11 26 15 9 5 16 14 26 16s20-11 29-13 18-12 27-14c8-3 20-15 29-11 9 5 15 13 23 19l23 18c8 8 15 10 23 19s20 10 15-4c-4-14-4-22-8-34s-4-23-15-27l-30-11c-11-4-19-9-30-12s-19-8-30-12c-12-3-21-7-21-20s-3-26-4-38 1-26-10-31c-8 10-5 25-10 36s-1 27-8 37c-6 10-24 7-34 12s-24 6-35 10l-36 10c-12 2-24 5-30 15l-20 26c-8 9-10 17-20 25-9 8-15-11-20-20-4-9-8-21-14-31-5-10 0-25 4-36l11-34c4-11 5-26 17-29 13-2 23-6 35-10l36-10 35-10c12-3 24-8 36-10s32 2 41-4c10-6 22-14 17-25l-12-33c-5-11-7-25-8-38l-5-40c-2-13 12-18 17-28Z"
			/>
			<path
				fill="none"
				stroke="None"
				d="M1165 805c-18 7-42 3-61 4l-62 2c-19 1-41 5-50-12l-23-41c-3 10 0 23-2 33s2 16 9 23c7 6 10 12 16 19 7 6 9 11 16 18 7 6 9 15 2 23-7 9-1 15 8 18l25 10 24 10c7 4 19 5 24 11s9 15 11 23c2 7 14 18 16 7s-6-19 1-27 9-13 14-21l14-20 14-21 14-20c3-7 13-16 7-22-6-7-12-10-17-17Z"
			/>
			<path
				fill="#DD8806"
				stroke="None"
				d="M315 893c0-17 1-37-1-55-4-17-27-10-41-11s-37-3-36 15v51c1 18 26 12 39 12s37 5 39-12Z"
			/>
			<path
				fill="#E59C23"
				fill-opacity=".2"
				stroke="None"
				d="M315 893c2-16 2-39-1-55 2 18 1 38 1 55Z"
			/>
			<path
				fill="#E2D3C6"
				stroke="None"
				d="M464 899c-15-4-30 4-45 0-15-3-28 3-26 19s0 28 0 44 17 17 30 15 31 4 42-2 6-29 6-39 4-34-7-37Z"
			/>
			<path
				fill="#DE8A06"
				stroke="None"
				d="M359 1042c-11-7-29-4-41-4s-32-5-35 10 3 30 0 45 7 26 22 23 30 3 45 0c15-4 10-22 11-34s-1-29-2-40Z"
			/>
			<path
				fill="#E6D8CB"
				stroke="None"
				d="M542 1153c-14-3-32 1-47 0s-31-2-45 1-12 23-12 35v46c0 12-2 30 13 33s31 1 46 1 30 2 45-1 12-23 12-35v-46c0-12 3-30-12-34Z"
			/>
			<path
				fill="none"
				stroke="None"
				d="M882 1168c-10-1-21 0-32 1s-4 18-6 27 3 20 0 32 8 16 19 14 22 0 33 0 23 1 21-11 2-24 0-33 5-25-4-29c-9-3-22 0-31-1Z"
			/>
			<path fill="#A78D74" fill-opacity=".1" stroke="None" d="M682 1215h13-13Z" />
			<path
				fill="#E4D6C9"
				stroke="None"
				d="M716 1280h-28l-27-1c-14 2-14 19-12 31s-4 29 1 41 24 6 35 7h42v-45c0-14 4-29-11-33Z"
			/>
			<path fill="none" stroke="None" d="M716 1280c-8-2-18-1-27-1h-28l27 1h28Z" />
		</svg>
	{/if}
	<h1>404</h1>
	<p>{message}</p>
</div>

<style>
	.hobo-death-404 {
		svg {
			width: max(10rem, 25vw);
		}
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h1 {
			font-size: 5rem;
			margin: 0;
		}

		p {
			font-size: 1.5rem;
			text-align: center;
		}
	}
</style>
