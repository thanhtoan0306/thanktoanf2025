import { b as createAstro, c as createComponent, d as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute, r as renderScript } from '../chunks/astro/server_iqrwoL2g.mjs';
import 'piccolore';
import { g as getCurrentLanguage, t, $ as $$PageLayout } from '../chunks/PageLayout_DDKjE1Xs.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://thanktoanf.online");
const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const lang = getCurrentLanguage(Astro2);
  const title = t("login.title", lang);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": title, "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-sgpqyurt> <div data-astro-cid-sgpqyurt> <p class="eyebrow" data-astro-cid-sgpqyurt>${t("login.eyebrow", lang)}</p> <h1 data-astro-cid-sgpqyurt>${t("login.title", lang)}</h1> <p class="lead" data-astro-cid-sgpqyurt>${t("login.description", lang)}</p> </div> </section> <section data-astro-cid-sgpqyurt> <form id="admin-login-form" class="card" data-astro-cid-sgpqyurt> <div class="field-group" data-astro-cid-sgpqyurt> <label for="username" data-astro-cid-sgpqyurt>${t("login.username", lang)}</label> <input id="username" name="username" type="text" required${addAttribute(t("login.usernamePlaceholder", lang), "placeholder")} autocomplete="username" data-astro-cid-sgpqyurt> </div> <div class="field-group" data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>${t("login.password", lang)}</label> <input id="password" name="password" type="password" required${addAttribute(t("login.passwordPlaceholder", lang), "placeholder")} autocomplete="current-password" data-astro-cid-sgpqyurt> </div> <div class="actions" data-astro-cid-sgpqyurt> <button type="submit" class="primary-btn" data-astro-cid-sgpqyurt>${t("login.submit", lang)}</button> <button type="button" id="logout-button" class="secondary-btn" hidden data-astro-cid-sgpqyurt> ${t("login.logout", lang)} </button> </div> <p id="login-message" class="message" aria-live="polite" data-astro-cid-sgpqyurt></p> <p class="hint" data-astro-cid-sgpqyurt> <b data-astro-cid-sgpqyurt>${t("login.demoAccount", lang)}</b>: <code data-astro-cid-sgpqyurt>admin</code> / <code data-astro-cid-sgpqyurt>1</code> </p> </form> </section> ${renderScript($$result2, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/login.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/login.astro", void 0);

const $$file = "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
