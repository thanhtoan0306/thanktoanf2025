import { b as createAstro, c as createComponent, d as renderComponent, a as renderTemplate, m as maybeRenderHead, f as renderSlot } from '../../chunks/astro/server_iqrwoL2g.mjs';
import 'piccolore';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_L9UfzTxb.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_BmtHjVoY.mjs';
import { $ as $$FormattedDate } from '../../chunks/FormattedDate_BRgYJJUP.mjs';
import { $ as $$PageLayout } from '../../chunks/PageLayout_DDKjE1Xs.mjs';
import { b as SITE_TITLE } from '../../chunks/consts_Y9_NTkRK.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("http://thanktoanf.online");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage } = Astro2.props;
  const pageTitle = `${title} | ${SITE_TITLE}`;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": pageTitle, "description": description, "image": heroImage, "data-astro-cid-bvzihdzo": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="post" data-astro-cid-bvzihdzo> <div class="hero-image" data-astro-cid-bvzihdzo> ${heroImage && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "width": 1020, "height": 510, "src": heroImage, "alt": "", "data-astro-cid-bvzihdzo": true })}`} </div> <header class="title" data-astro-cid-bvzihdzo> <div class="date" data-astro-cid-bvzihdzo> ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": pubDate, "data-astro-cid-bvzihdzo": true })} ${updatedDate && renderTemplate`<div class="last-updated-on" data-astro-cid-bvzihdzo>
Cập nhật: ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": updatedDate, "data-astro-cid-bvzihdzo": true })} </div>`} </div> <h1 data-astro-cid-bvzihdzo>${title}</h1> <hr data-astro-cid-bvzihdzo> </header> <div class="prose" data-astro-cid-bvzihdzo> ${renderSlot($$result2, $$slots["default"])} </div> </article> ` })} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/layouts/BlogPost.astro", void 0);

const $$Astro = createAstro("http://thanktoanf.online");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/blog/[...slug].astro", void 0);

const $$file = "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
