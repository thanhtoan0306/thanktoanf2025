import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, d as renderComponent } from '../chunks/astro/server_IeWSpHbH.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_akn7pkr_.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$PostCard } from '../chunks/PostCard_DpfxV3Gf.mjs';
import { S as SITE_AUTHOR, a as SITE_DESCRIPTION, b as SITE_TITLE } from '../chunks/consts_Y9_NTkRK.mjs';
import { g as getCurrentLanguage, t, $ as $$PageLayout } from '../chunks/PageLayout_DBu0Vi69.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("http://thanktoanf.online");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  const {
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    eyebrow = "Personal dev blog"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero" data-astro-cid-bbe6dxrz> <p class="eyebrow" data-astro-cid-bbe6dxrz>${eyebrow}</p> <h1 data-astro-cid-bbe6dxrz>${title}</h1> <p class="subtitle" data-astro-cid-bbe6dxrz>${subtitle}</p> <div class="actions" data-astro-cid-bbe6dxrz> ${primaryCta && renderTemplate`<a class="btn primary"${addAttribute(primaryCta.href, "href")} data-astro-cid-bbe6dxrz>${primaryCta.label}</a>`} ${secondaryCta && renderTemplate`<a class="btn ghost"${addAttribute(secondaryCta.href, "href")} data-astro-cid-bbe6dxrz>${secondaryCta.label}</a>`} </div> </section> `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/Hero.astro", void 0);

const $$Astro = createAstro("http://thanktoanf.online");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const featured = posts.slice(0, 3);
  const lang = getCurrentLanguage(Astro2);
  console.log("[Home Page] Server-side - Language:", lang);
  console.log("[Home Page] Server-side - Translation test - title:", t("home.title", lang));
  const highlightItems = t("home.highlights.items", lang);
  console.log("[Home Page] Server-side - Highlight items:", highlightItems);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "eyebrow": t("home.eyebrow", lang), "title": `${t("home.title", lang)} ${SITE_AUTHOR}`, "subtitle": t("home.subtitle", lang), "primaryCta": { href: "/blog", label: t("home.primaryCta", lang) }, "secondaryCta": { href: "/about", label: t("home.secondaryCta", lang) }, "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<section class="section" data-astro-cid-j7pv25f6> <div class="section__header" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="eyebrow" data-astro-cid-j7pv25f6>${t("home.latestPosts.eyebrow", lang)}</p> <h2 data-astro-cid-j7pv25f6>${t("home.latestPosts.title", lang)}</h2> </div> <a class="section__link" href="/blog" data-astro-cid-j7pv25f6>${t("home.latestPosts.viewAll", lang)}</a> </div> <div class="post-grid" data-astro-cid-j7pv25f6> ${featured.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "data-astro-cid-j7pv25f6": true })}`)} </div> </section> <section class="section highlights" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="eyebrow" data-astro-cid-j7pv25f6>${t("home.highlights.eyebrow", lang)}</p> <h2 data-astro-cid-j7pv25f6>${t("home.highlights.title", lang)}</h2> <p class="lead" data-astro-cid-j7pv25f6> ${t("home.highlights.description", lang)} </p> </div> <ul class="pill-list" data-astro-cid-j7pv25f6> ${highlightItems.map((item) => renderTemplate`<li data-astro-cid-j7pv25f6>${item}</li>`)} </ul> </section> ` })} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/index.astro", void 0);

const $$file = "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
