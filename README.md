# Genesis Home Buyers LLC

Single-page lead-generation site built with Next.js App Router, TypeScript, Tailwind CSS v4, and free BoardUI components.

Live: https://genesis-home-buyers-llc.netlify.app

Hosted in Duval Software. [Netlify project](https://app.netlify.com/projects/genesis-home-buyers-llc).

Source: [Duval-Software/genesis-home-buyers-llc](https://github.com/Duval-Software/genesis-home-buyers-llc) (private).

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. To verify or run the production build:

```sh
npm run lint
npm run build
python3 -m http.server 3001 --directory out
```

With the dev server running, `npm run check` verifies the rendered required fields, matching Netlify definition, anchor targets, and all eleven green accent tokens. Pass a different preview URL with `npm run check -- http://localhost:3001`.

If port 3000 is occupied, use `npm run dev -- --port 3001`.

## Netlify lead capture

The visible form in `app/page.tsx` posts URL-encoded data to `/__forms.html` (Netlify publishes the equivalent clean URL `/__forms`). `public/__forms.html` is the matching static definition. All four lead field names and the hidden `bot-field` honeypot must stay in sync. The form validates required fields and email format, prevents duplicate clicks during submission, shows success only after an accepted response, and retains entered details after a failure.

Form detection is enabled and Netlify has detected the `offer` form with all four lead fields and the honeypot. No test lead was submitted. Leads appear under **Forms → offer** in the Netlify project. Local servers do not collect leads; an attempted submission displays the error state.

## Deploy to Netlify

`next.config.ts` enables static export; `netlify.toml` publishes `out/`. To publish updates using the authenticated Netlify CLI:

```sh
npm run lint
npm run build
npx --yes netlify-cli deploy --site 6d815f86-b3c5-486f-9a71-c9924fce6722 --dir out --no-build --prod --json
npm run check -- https://genesis-home-buyers-llc.netlify.app
```

This is a direct production deployment; Git-triggered automatic deployments are not configured.

Reference: https://docs.netlify.com/manage/forms/troubleshooting-tips/#nextjs-runtime-v5-support

## Content and brand

The three-step reference is implemented in `components/ui/onboarding-setup-steps.tsx`, replacing the existing How It Works section. Its ordered cards explain submitting property information, speaking with Genesis, and receiving a cash offer; the final card is highlighted in forest green. The Get Started link returns to the offer form. This marketing section needs no completion state, progress provider, or additional dependencies.

The "What listing really costs" section lives in `components/ui/comparison-2.tsx`, between Why Us and Our Team. It shows typical listing costs on a $300,000 home (`listingCosts`, ranges confirmed by Genesis), a traditional-vs-Genesis table (`comparisonRows`, including Genesis paying closing costs), and an up-front note that cash offers are usually below list price. Its CTA links to the existing offer form.

TypeScript, Tailwind v4, and the `@/*` import alias are already configured. Shared BoardUI controls live in `components/base/`; `components/ui/` provides the requested shadcn-style import path for the comparison block. Global styles live in `styles/globals.css`. The block reuses installed Badge, ButtonLink, Divider, and Remix icons, so no new packages or providers are needed. For a future full shadcn CLI setup, run `npx shadcn@latest init`, select `styles/globals.css` and the `@/components/ui` alias, and review generated theme changes before keeping them; preserve the existing BoardUI tokens.

The visual design began with the generated [hero design reference](design/hero-design-reference.png), with its [full generation prompt](design/hero-design-prompt.md). It uses live BoardUI controls and text. The updated house photograph fills the hero edge to edge and at least the viewport height, with space below the floating navbar for the headline and form. A layered offer form, benefit tiles, numbered process cards, a green stats panel, and team cards carry the visual direction through the page.

- Page sections, form, and team members: `app/page.tsx`.
- Navigation adapts the floating glass navbar from `hyperattention-landing`: it narrows after scrolling, highlights the current section, and uses a native mobile popover with outside-click and Escape dismissal. Controls remain installed BoardUI components with Genesis semantic colors; motion respects reduced-motion preferences.
- Header and footer use `public/genesis-logo-transparent.png`, a background extraction from the supplied artwork made with the built-in imagegen tool and verified to contain real alpha transparency. Fitted SVG image windows arrange the existing mark beside its original lettering for a compact horizontal logo; neither is redrawn. The unchanged upload remains in `public/genesis-logo.png`. See the [extraction prompt](design/logo-background-extraction-prompt.md).
- Forest-green and cream primitives, including all eleven green accent mappings: `styles/theme.css`.
- Inter is self-hosted through `next/font/google`; Google Fonts must be reachable during the build.
- Team names and headshots for Dustin Fox, Jacob Monoson, and Devon Nicol come from the supplied, named JPEG files. Optimized copies are in `public/team/` and use BoardUI Avatar.
- Business statistics and turnaround claims are the supplied marketing copy.
- No BoardUI Pro components or templates are used.

## Hero photograph

`public/hero.jpg` is the supplied “ChatGPT Image Sep 28, 2026, 09_35_07 AM-2.png”, converted to JPEG at its original 1672 × 941 resolution for the hero and closing CTA backgrounds. The responsive forest-green overlay in `styles/globals.css` preserves copy contrast; on mobile the image fades into the green surface behind the form.

### Previous background generation prompt

Use case: photorealistic-natural
Asset type: 16:9 cinematic website hero background for Genesis Home Buyers LLC, a local cash home buyer with a forest-green and cream identity.
Primary request: Wide cinematic photograph of a charming American suburban house with a neat green lawn at golden hour, warm inviting light, deep forest-green foliage and trees framing the edges, soft haze, slightly desaturated real-estate marketing photography, open sky and lawn leaving clean negative space for text overlay.
Composition: a real-feeling modest, welcoming craftsman-style family home, warm ivory siding, deep green shutters, a front porch, simple landscaping and a curved stone path across the foreground lawn. Wide eye-level three-quarter architectural photograph, not a luxury mansion. House facade spans the middle of the image, its distinctive front porch and roof readable near the center; shady trees and lawn create quiet space on the left. The right quarter may be covered by a white lead form. Leave the bottom foreground spacious and uncluttered. Organic tree branches frame the top corners.
Lighting and mood: low late-afternoon sunlight entering from upper right, subtle sun rays through leaves, amber porch windows, beautifully detailed natural foliage, cinematic depth, restful and optimistic feeling of a fresh start. Credible architectural photography, restrained editorial color grade, filmic warm highlights and rich forest-green shadows.
Constraints: One landscape image, 16:9. No text, no lettering, no logos, no watermarks, no signage, no people, no cars, no UI. Straight architectural lines and natural realistic textures. Do not bake in a dark overlay; that will be added in CSS.

> Wide cinematic photograph of a charming American suburban house with a neat green lawn at golden hour, warm inviting light, deep forest-green foliage and trees framing the edges, soft haze, slightly desaturated real-estate marketing photography, open sky and lawn leaving clean negative space for text overlay, 16:9
