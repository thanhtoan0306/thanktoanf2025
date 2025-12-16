import { b as createAstro, c as createComponent, d as renderComponent, a as renderTemplate, m as maybeRenderHead, r as renderScript } from '../chunks/astro/server_iqrwoL2g.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_BXbhZXpm.mjs';
import { $ as $$PostCard } from '../chunks/PostCard_YaudqFZ8.mjs';
import { a as SITE_DESCRIPTION, b as SITE_TITLE } from '../chunks/consts_Y9_NTkRK.mjs';
import { g as getCurrentLanguage, $ as $$PageLayout, t } from '../chunks/PageLayout_DDKjE1Xs.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://thanktoanf.online");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const lang = getCurrentLanguage(Astro2);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": `Blog | ${SITE_TITLE}`, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-5tznm7mj> <div data-astro-cid-5tznm7mj> <p class="eyebrow" data-astro-cid-5tznm7mj>${t("blog.eyebrow", lang)}</p> <h1 data-astro-cid-5tznm7mj>${t("blog.title", lang)}</h1> <p class="lead" data-astro-cid-5tznm7mj> ${t("blog.description", lang)} </p> </div> <button id="add-blog-button" class="add-blog-button" hidden data-astro-cid-5tznm7mj> ${t("blog.addBlog", lang)} </button> </section> <section data-astro-cid-5tznm7mj> <div class="post-grid" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "data-astro-cid-5tznm7mj": true })}`)} </div> </section> ${renderScript($$result2, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts")} ` })} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/blog/index.astro", void 0);

const $$file = "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
