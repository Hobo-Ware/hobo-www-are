<script lang="ts">
	import './weekday.css';
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import HoboLogo from '$lib/components/icons/HoboLogo.svelte';
	import IconGitHub from '$lib/components/icons/IconGitHub.svelte';
	import IconLinkedIn from '$lib/components/icons/IconLinkedIn.svelte';
	import ModeSwitch from '$lib/features/site/ModeSwitch.svelte';
	import ProjectLinks from '$lib/features/site/ProjectLinks.svelte';
	import { FOUNDERS, GITHUB_URL, LEVELS, check, hype } from '$lib/features/site/content';
	import { PRERENDER_SKILLS, clock, tallestHype } from '$lib/features/site/copy';
	import WeekdayStats from './WeekdayStats.svelte';

	const entries = hype();
	const opening = entries[tallestHype(entries)];
	const year = new Date().getFullYear();
</script>

<div id="wd-root" class="mode-weekday">
	<canvas id="paint" aria-hidden="true"></canvas>
	<div class="grain" id="grain" aria-hidden="true"></div>

	<div class="stage">
		<div class="scene">
			<header class="topbar">
				<a
					class="icon-btn"
					href={GITHUB_URL}
					target="_blank"
					rel="noopener"
					aria-label={m.github_description()}
				>
					<IconGitHub />
					<span class="lbl">GitHub</span>
				</a>
				<div class="top-right">
					<ModeSwitch />
					<button class="icon-btn" id="theme" type="button" aria-label={m.theme_toggle()}>
						<span class="lbl"
							><span class="lbl-night">{m.wd_theme_night()}</span><span class="lbl-day"
								>{m.wd_theme_dawn()}</span
							></span
						>
						<span class="moon" aria-hidden="true"></span>
					</button>
				</div>
			</header>

			<section class="hero">
				<div class="kicker intro-in">{m.wd_kicker()} &middot; <b>{m.wd_kicker_hot()}</b></div>
				<div class="logo-wrap intro-in" style="animation-delay:.15s">
					<HoboLogo />
					<div class="logo-note">
						<span class="note-hover">{m.wd_logo_note()}</span><span class="note-touch"
							>{m.wd_logo_note_touch()}</span
						>
						<b>{m.wd_logo_note_hot()}</b>
					</div>
				</div>
				<h1 class="tagline intro-in" style="animation-delay:.3s">
					<span class="sr">Hoboware. </span>{m.wd_tagline()} <em>{m.wd_tagline_em()}</em>
				</h1>
			</section>
		</div>

		<aside class="monologue" aria-label={m.inner_monologue()}>
			<span class="mono-bg" aria-hidden="true"></span><span class="mono-char" aria-hidden="true"
			></span><span class="mono-rim" aria-hidden="true"></span>
			<div class="mono-head">
				<div>
					<div class="kicker">{m.inner_monologue()}</div>
					<h2>{m.wd_log_title()}</h2>
				</div>
				<span class="clock" id="clock">{clock(new Date())}</span>
			</div>
			<button type="button" class="earlier empty" id="earlier" aria-expanded="false"
				>{m.wd_earlier({ count: 0 })}</button
			>
			<div class="log-window" id="log-window">
				<ol class="log" id="log" aria-live="polite">
					<li class="line narr past">{m.wd_narration_1()}</li>
					<li class="line narr past">{m.wd_narration_2()}</li>
					<li class="line sep" aria-hidden="true">· · ·</li>
					<li class="line hype-slot" id="hype-slot">
						<ol class="hype-group">
							{#each opening.messages as message, n (n)}
								{@const [speaker, attr] = PRERENDER_SKILLS[(n * 3 + 1) % PRERENDER_SKILLS.length]}
								<li class="line past">
									<span class="speaker" data-attr={attr}>{speaker}</span><span class="check"
										><span>{check(LEVELS[(n * 2 + 1) % 6])}</span></span
									>
									<span class="said">{message}</span>
								</li>
							{/each}
							<li class="line slogan">
								<span class="speaker" data-attr="hobo">Hoboware</span><span class="check"
									><span>{check('legendary')}</span></span
								>
								<span class="said">{opening.slogan.trim()}</span>
							</li>
						</ol>
					</li>
				</ol>
			</div>
			<ol class="options">
				<li>
					<button type="button" data-act="roll"><span class="n">1.</span>{m.option_roll()}</button>
				</li>
				<li>
					<button type="button" data-act="vlad"
						><span class="n">2.</span>{m.wd_option_vlad()}</button
					>
				</li>
				<li>
					<button type="button" data-act="sefer"
						><span class="n">3.</span>{m.wd_option_sefer()}</button
					>
				</li>
				<li>
					<a href={GITHUB_URL} target="_blank" rel="noopener"
						><span class="n">4.</span>{m.option_code()} <span class="n">{m.option_leave()}</span></a
					>
				</li>
			</ol>
		</aside>

		<section class="founders" id="founders">
			<div class="sheets-head">
				<h2>{m.wd_sheets_title()}</h2>
				<p>{m.wd_sheets_sub()}</p>
			</div>
			<div class="sheets">
				{#each FOUNDERS as founder (founder.id)}
					{@const photo = `${base}/${founder.id}/${founder.id}_600.webp`}
					<article class="sheet" id="sheet-{founder.id}" data-founder={founder.id}>
						<div
							class="portrait"
							role="button"
							tabindex="0"
							aria-label={m.wd_portrait_label({ name: founder.name })}
						>
							<img
								class="frame"
								src="{base}/{founder.id}/frame_{founder.id}_600.webp"
								alt=""
								draggable="false"
								width="600"
								height="600"
							/>
							<div class="photo" style="position:absolute;inset:0">
								<img
									class="mono"
									src={photo}
									alt={m.portrait_alt({ name: founder.name })}
									draggable="false"
									width="600"
									height="600"
								/>
								<img class="color" src={photo} alt="" draggable="false" width="600" height="600" />
								<img class="loupe" src={photo} alt="" width="600" height="600" draggable="false" />
							</div>
							<span class="lens"></span>
						</div>
						<div class="card">
							<span class="paper" aria-hidden="true"></span>
							<div class="card-top">
								<h3>{founder.name}</h3>
								<a
									class="li"
									href={founder.linkedin}
									target="_blank"
									rel="noopener"
									aria-label={m.linkedin_open({ name: founder.name })}
									><IconLinkedIn /><span>LinkedIn</span></a
								>
							</div>
							<p class="title">{founder.title()}</p>
							<p class="desc">{founder.description()}</p>
							<div class="attr-head"><span>{m.wd_attributes()}</span></div>
							<WeekdayStats stats={founder.stats} />
						</div>
					</article>
				{/each}
			</div>
		</section>
	</div>

	<div class="burn" aria-hidden="true"></div>
	<section class="pit" aria-label={m.footer_label()}>
		<canvas id="embers" aria-hidden="true"></canvas>
		<p class="pit-hint" id="pit-hint">{m.wd_fan_hint()}</p>
		<footer class="foot" id="foot">
			<div class="work">
				<span class="work-lbl">{m.projects_label()}</span>
				<ProjectLinks iconSize={30} />
			</div>
			<span class="copy">&copy; <span id="year">{year}</span> Hoboware</span>
		</footer>
	</section>
</div>
