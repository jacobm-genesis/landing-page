import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:3000';
const response = await fetch(base);
assert.equal(response.status, 200, 'The landing page must load');
const html = await response.text();
const form = html.match(/<form\b[^>]*name=["']offer["'][^>]*>[\s\S]*?<\/form>/)?.[0];
assert.ok(form, 'The offer form must be present in rendered HTML');
assert.match(form, /method=["']POST["']/);
// Netlify strips detection attributes and prettifies .html action URLs.
assert.match(form, /action=["']\/__forms(?:\.html)?["']/);
const definition = await readFile(new URL('../public/__forms.html', import.meta.url), 'utf8');
assert.match(definition, /data-netlify="true"/);
assert.match(definition, /data-netlify-honeypot="bot-field"/);
assert.match(form, /name="bot-field"/);
const blueprint = await fetch(new URL('/__forms.html', base));
assert.equal(blueprint.status, 200, 'The static Netlify definition must load');
const staticForm = await blueprint.text();
const inputs = [...form.matchAll(/<input\b[^>]*>/g)].map(([tag]) => tag);
for (const [name, type, autocomplete] of [
  ['name', 'text', 'name'], ['email', 'email', 'email'],
  ['phone', 'tel', 'tel'], ['address', 'text', 'street-address'],
]) {
  const tag = inputs.find(tag => tag.includes(`name="${name}"`));
  assert.ok(tag, `Missing ${name}`);
  assert.match(tag, /\brequired(?:="")?(?:\s|\/?>)/, `${name} must be required`);
  assert.ok(tag.includes(`type="${type}"`), `${name} has the wrong input type`);
  assert.match(tag, new RegExp(`autocomplete="${autocomplete}"`, 'i'), `${name} needs autocomplete`);
  assert.ok(staticForm.includes(`name="${name}"`), `Netlify must capture ${name}`);
}
assert.match(form, /name="form-name" value="offer"/);
for (const id of ['offer', 'how-it-works', 'why-us', 'our-team']) {
  assert.ok(html.includes(`id="${id}"`), `Missing anchor ${id}`);
  assert.ok(html.includes(`href="#${id}"`), `Missing navigation to ${id}`);
}
assert.match(html, /<button\b[^>]*popovertarget="mobile-navigation"[^>]*>/i, 'Mobile menu must have an accessible native trigger');
assert.match(html, /<nav\b[^>]*id="mobile-navigation"[^>]*popover="auto"[^>]*>/i, 'Mobile menu must support native Escape and outside-click dismissal');
const processSection = html.match(/<section\b[^>]*id="how-it-works"[^>]*>[\s\S]*?<\/section>/)?.[0];
assert.ok(processSection, 'The three-step process must render');
assert.equal((processSection.match(/<li\b/g) || []).length, 3, 'The process must have three steps');
assert.match(processSection, /<a\b[^>]*href="#offer"[^>]*>/, 'Get Started must lead to the offer form');
const comparison = html.match(/<section\b[^>]*id="cash-offer-comparison"[^>]*>[\s\S]*?<\/section>/)?.[0];
assert.ok(comparison, 'The cash-offer comparison must render');
assert.equal((comparison.match(/<li\b/g) || []).length, 22, 'Both process cards need eight points and the difference box six');
assert.match(comparison, /We pay closing costs/, 'The comparison must state that Genesis pays closing costs');
assert.match(comparison, /Prorated property taxes/, 'Listing costs must include prorated property taxes');
assert.match(comparison, /\$242,900/, 'The traditional payout must show the net after costs');
assert.match(comparison, /\$230,000/, 'The Genesis payout must show the example offer');
assert.match(comparison, /<a\b[^>]*href="#offer"[^>]*>/, 'The comparison CTA must lead to the offer form');
const theme = await readFile(new URL('../styles/theme.css', import.meta.url), 'utf8');
for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
  assert.match(theme, new RegExp(`--color-accent-${shade}:\\s*var\\(--color-green-${shade}\\)`));
}
console.log('Passed: rendered fields, Netlify definition, navigation anchors, native mobile menu, three-step process, cash-offer comparison, and all 11 green accent tokens.');
