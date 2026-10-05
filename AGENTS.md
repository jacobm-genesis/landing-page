<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- boardui:rules:start -->
# BoardUI design rules

This project uses BoardUI (React + Tailwind CSS v4, source-owned components under `components/`). These rules always apply when writing UI code. MCP tools are on demand; these rules are not optional context.

## Components first

- Before hand-building any UI element, check for an installed BoardUI component under `components/base/` and `components/application/`, and prefer it.
- Missing a component? Install it (BoardUI MCP `install_components`, or `npx boardui@latest add <name>`) instead of writing a lookalike.
- Import through the `@/` alias, e.g. `import { Button } from "@/components/base/buttons/button"`.

## Color: semantic tokens only

- Never use raw palette classes (`text-gray-500`, `bg-white`, `border-neutral-200`) or hex/oklch literals. Every color rides a BoardUI semantic token, which also makes dark mode automatic.
- Text: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-text-placeholder`, errors `text-text-error-primary`.
- Surfaces: `bg-background-primary-default`, `bg-background-secondary-default` / `-hover`, `bg-background-tertiary-default`, page ground `bg-background-full`.
- Borders: `border-border-button-default` / `-hover`, hairlines `border-separator-border`, tables `border-border-table`, errors `border-border-error-default`.
- Icons: `text-foreground-icon-primary` through `text-foreground-icon-quaternary`.
- Charts: the `chart-1` … `chart-5` tokens (plus `-active` variants). CTAs and selection states: the `accent-50` … `accent-950` ramp.
- Dark mode flips tokens via the `.dark` class on `<html>`. Do not write `dark:` overrides with raw colors; if a token pair looks wrong in dark mode, pick a different token, not a literal.

## Typography: composite utilities only

- Use BoardUI's composite type utilities: `text-title-1-medium`, `text-title-2-medium`, `text-title-3-semibold`, `text-headline-medium`, `text-body-medium`, `text-body-regular`, `text-body-2-*`, `text-caption-1-semibold`, and friends. Each sets size, weight, line-height, and letter-spacing together.
- Never rebuild type by stacking `text-sm font-medium leading-5`; if a style seems missing, look in `styles/typography.css` before inventing one.

## Spacing and shape

- Stay on Tailwind's spacing scale (`gap-2`, `p-4`, `mt-6`); prefer flex/grid `gap` over per-child margins. Arbitrary values (`p-[13px]`) only when matching an existing BoardUI component exactly.
- Cards and panels: `rounded-3xl` with `border-border-button-default`. Inputs and menu rows: `rounded-md` to `rounded-xl`. Pills: `rounded-full`.

## Mechanics

- Internal vertical scroll regions must soften the top edge with a progressive blur and surface fade once scrolled, rather than sharply clipping content. Keep headers outside the scroll region. Use a stationary, `pointer-events-none`, `aria-hidden` overlay in a relative wrapper: a 24px masked 1px backdrop blur, a 16px masked 4px backdrop blur, and a gradient from the enclosing semantic surface token to transparent. Ramp each layer's opacity from 0 to 1 over the first 24px of scrolling; keep it invisible at scrollTop 0. Apply opacity to the individual layers, never the overlay parent (a translucent parent creates a backdrop root and can break blur at normal browser zoom). Verify top/reset, overflow, light/dark mode, and 100% zoom; preserve keyboard scrolling and do not blur the whole content area.

- Merge classes with `cx()` from `@/utils/cx` (tailwind-merge aware of BoardUI's composite text styles). No string concatenation, no plain `clsx`.
- Icons come from `@remixicon/react`, passed as component references (`leadingIcon={RiAddLine}`), not rendered elements.
- Form components build on `react-aria-components`; extend the installed BoardUI form components rather than raw `<input>`/`<select>`.
- Focus states: `outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring`.

When unsure about a token, a component's API, or working example code, ask the BoardUI MCP server: `get_theme`, `get_component`, `get_usage_examples`.
<!-- boardui:rules:end -->

# SMS / A2P 10DLC compliance (do not break)

The site is the registered opt-in for an A2P 10DLC texting campaign in GoHighLevel. Carrier reviewers compare the live site to the submitted campaign, and any mismatch gets the campaign rejected (error 30896) or suspended after approval. Until the owner says otherwise, these rules override any request to "clean up", reword, or redesign:

- **Offer form consent checkboxes** (`components/ui/home-page.tsx`, fields `sms_consent_transactional` and `sms_consent_marketing`): never change their wording, make them required, pre-check them, merge them, or remove them. Layout and styling changes are fine. The text "Genesis Home Buyers LLC (registered as SXSXSX LLC)" stays until the owner confirms the IRS has recorded the name change and the brand is updated in GoHighLevel.
- **Privacy Policy and Terms** (`app/privacy/page.tsx`, `app/terms/page.tsx`): do not edit the SMS, opt-in, or information-sharing sections. They must keep saying the offer form checkboxes are the only way to opt in, and that text messaging opt-in data and consent are not shared with any third parties. Never add sharing language with a qualifier like "for marketing purposes".
- **No new SMS opt-in paths anywhere on the site:** no "text us" buttons or links, no "by texting us you agree" wording, no texting checkboxes on other forms, no chat widgets. The contact page (`app/text-us/page.tsx`) and the `/jv` page say call or email only.
- **`/jv` deal form** (`components/ui/jv-deal-form.tsx`): keep the note that numbers submitted there are not texted. Keep the form name `jv-deal`, every field name, and the `/jv` URL, because Google Ads and GoHighLevel workflows depend on them.
- **Form plumbing:** never rename the `offer` or `jv-deal` forms or their fields, and keep `public/__forms.html` in sync with any field you add.
- **`public/sms-opt-in.jpg`** is the opt-in screenshot submitted to carriers; if the offer form's consent area changes visually, tell the owner before deploying.

If a requested change would touch any of the above, stop and ask the owner first.
