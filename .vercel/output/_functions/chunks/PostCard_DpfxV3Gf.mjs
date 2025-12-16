import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, d as renderComponent, a as renderTemplate } from './astro/server_IeWSpHbH.mjs';
import 'piccolore';
import { $ as $$Image } from './_astro_assets_CIsyz8T2.mjs';
import { $ as $$FormattedDate } from './FormattedDate_1-OJjuuC.mjs';
import { g as getCurrentLanguage, t } from './PageLayout_DBu0Vi69.mjs';
/* empty css                         */

const $$Astro = createAstro("http://thanktoanf.online");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { post } = Astro2.props;
  const { data } = post;
  const link = `/blog/${post.id}/`;
  const lang = getCurrentLanguage(Astro2);
  return renderTemplate`${maybeRenderHead()}<article class="card" data-astro-cid-iyiqi2so> <a${addAttribute(link, "href")} class="card__link"${addAttribute(`${t("common.readMore", lang)}: ${data.title}`, "aria-label")} data-astro-cid-iyiqi2so> ${data.heroImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "card__image", "width": 720, "height": 360, "src": data.heroImage, "alt": "", "data-astro-cid-iyiqi2so": true })}`} <div class="card__body" data-astro-cid-iyiqi2so> <p class="card__date" data-astro-cid-iyiqi2so> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": data.pubDate, "data-astro-cid-iyiqi2so": true })} </p> <h3 class="card__title" data-astro-cid-iyiqi2so>${data.title}</h3> <p class="card__description" data-astro-cid-iyiqi2so>${data.description}</p> </div> </a> </article> `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/PostCard.astro", void 0);

export { $$PostCard as $ };
