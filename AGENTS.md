# Agent guide

## What this repo is

The website for [hoboware.dev](https://hoboware.dev), built with SvelteKit and `adapter-static`.

- Everything is prerendered to static HTML. There is no server and no data fetching at build time.
- The site has two editions of the same content, picked by the day of the week: **weekday** (Embers, `src/lib/features/weekday/`) and **weekend** (`src/lib/features/weekend/`). Both are in every page's HTML; CSS shows one of them.
- Copy is translated to English, Dutch and Romanian with Paraglide. The messages live in `paraglide/messages/{en,nl,ro}.json`.
- The package manager is bun.
- A push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/gh_pages.yml`).

Run the gate before every PR:

```sh
bun run lint
bun run check
bun run test
bun run build
```

Preview the production build with `bun run preview`. Add `#weekday` or `#weekend` to the URL to see a specific edition.

## Add a project

Projects are hand-written. Nothing is read from GitHub (a repo's topics are not used), so a project entry never needs maintenance after it is added.

1. **Add the entry** to `PROJECTS` in `src/lib/features/site/content.ts`. The order of the list is the order on the site.

   ```ts
   {
   	id: 'example',
   	name: 'example',
   	href: 'https://example.hoboware.dev',
   	host: 'example.hoboware.dev',
   	icon: 'projects/example-128.webp',
   	schemaType: 'SoftwareApplication',
   	line: m.project_example_line,
   	story: m.inv_example
   }
   ```

   - `id`: lowercase, also used in the message keys.
   - `href` and `host`: the link out, and the host shown on the card.
   - `icon`: the path under `static/`. Use `null` only for a project with its own SVG icon component (like Trakt).
   - `schemaType`: `SoftwareApplication` for an app people install, `WebApplication` for a web app.
   - `rank`: optional, the card's rank in its weekend suit (see below). Leave it out for an Ace.

2. **Add two messages per language** to `paraglide/messages/en.json`, `nl.json` and `ro.json`:
   - `project_<id>_line`: the short line for the footer's "Proudly working on" row. Example: "A git client so light it forgets it's running."
   - `inv_<id>`: the card text for the "What we make" section. One or two warm, abstract sentences about the project's scope and purpose. No feature lists, no tech jargon. Match the current three:
     - Trakt: "A memory for everything you watch. We build the web side of it, so the shows you swore you'd finish don't quietly slip away."
     - kelp: "Version control with the noise turned down. A small, quiet git client for macOS that stays out of your way, and off your battery."
     - stdusk: "A terminal that drops from the top of the screen when you call it, and talks back when the machines start talking."

   Write the Dutch and Romanian versions as natural copy in the same tone, not word-for-word translations. Use plain hyphens, never em-dashes.

   Then add three more messages per language for the weekend tarot card:
   - `we_minor_<id>`: the card's title, rank plus suit. The suit is a plural noun for what the project lives in or works on: Trakt is the Ace of Screens, kelp the Ace of Branches, stdusk the Ace of Terminals. Translate the whole title naturally (`Aas van Schermen`, `Asul de Ecrane`).
   - `we_<id>_upright` and `we_<id>_reversed`: the reading on the card's back, a short lowercase clause ending in a full stop, in the Disco Elysium voice. Upright is what the project does well, reversed is the same habit gone sideways. Example, kelp: "commits with intent." / "amends in secret."

   **Picking the suit and rank:** a project whose noun has no suit yet starts a new suit as its Ace (no `rank` needed). If the noun is already taken, for example a second terminal app, it joins that suit at the next free rank: set `rank: 2` and title it "Two of Terminals", then 3 for "Three of ...", and so on. The rank sets the numeral in the card's cartouche.

3. **Add the icon** as `static/projects/<id>-128.webp`: the app icon at 128x128, as a compressed WebP. The current icons are 2 to 3 kB. From a large PNG:

   ```sh
   magick icon.png -resize 128x128 -strip -quality 80 static/projects/example-128.webp
   ```

   Check the result by eye before committing.

That is all the code needed. Everything else reads the same `PROJECTS` list:

- **Footer:** the "Proudly working on" row in both editions (`src/lib/features/site/ProjectLinks.svelte`) shows the icon, name and `project_<id>_line`.
- **Weekday:** the "What we make" section (`src/lib/features/weekday/WeekdayInventory.svelte`) renders a charred inventory item with the icon, name, `inv_<id>` and the link out.
- **Weekend:** the same section (`src/lib/features/weekend/WeekendInventory.svelte`) renders the project as a minor arcana tarot card, a smaller sibling of the founder cards. The front shows the icon in the arch, the numeral from `rank` and the `we_minor_<id>` title. The back shows `inv_<id>`, the upright and reversed reading and the link out. The weekend engine wires the flip, tilt and foil for every `.tarot` card automatically.
- **Structured data:** `structuredData` in `src/lib/features/site/seo.ts` adds the project to the `ItemList` in the page's JSON-LD automatically, with `inv_<id>` as its description in each language.

4. **Check it:**
   - Run the gate above.
   - Open the preview in all three languages (`/`, `/nl`, `/ro`) with `#weekday` and `#weekend`, on a desktop and a phone-sized window, in both themes.
   - Make sure the new card has no layout shift, no errors in the console, and that the link opens the right site.

5. **Open a PR** against `main`. The site deploys when it is merged.
