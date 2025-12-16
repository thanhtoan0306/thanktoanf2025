import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderScript, a as renderTemplate, b as createAstro, d as renderComponent, e as addAttribute } from '../chunks/astro/server_iqrwoL2g.mjs';
import 'piccolore';
import { _ as __ASTRO_IMAGE_IMPORT_Z1Yq4sn } from '../chunks/blog-placeholder-about_CkQeGsZP.mjs';
import { g as getCurrentLanguage, t, $ as $$PageLayout } from '../chunks/PageLayout_DDKjE1Xs.mjs';
import { S as SITE_AUTHOR, a as SITE_DESCRIPTION } from '../chunks/consts_Y9_NTkRK.mjs';
import 'clsx';
import { readFileSync } from 'fs';
import { join } from 'path';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$CVPreview = createComponent(($$result, $$props, $$slots) => {
  let cvContent = "";
  try {
    const cvPath = join(process.cwd(), "src/content/cv/cv.md");
    console.log("[CVPreview] Reading CV from:", cvPath);
    cvContent = readFileSync(cvPath, "utf-8");
    console.log("[CVPreview] Successfully read CV, length:", cvContent.length);
  } catch (e) {
    console.error("[CVPreview] Error reading CV file:", e);
    cvContent = "CV content not available";
  }
  function markdownToHtml(md) {
    let html = md;
    const lines = html.split("\n");
    const result = [];
    let inList = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        continue;
      }
      if (line.startsWith("### ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h3>${line.substring(4)}</h3>`);
      } else if (line.startsWith("## ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h2>${line.substring(3)}</h2>`);
      } else if (line.startsWith("# ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h1>${line.substring(2)}</h1>`);
      } else if (line.startsWith("- ")) {
        if (!inList) {
          result.push("<ul>");
          inList = true;
        }
        let listItem = line.substring(2);
        listItem = listItem.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        listItem = listItem.replace(/<https?:\/\/[^>]+>/g, (match) => {
          const url = match.slice(1, -1);
          return `<a href="${url}" target="_blank" rel="noreferrer">${url}</a>`;
        });
        result.push(`<li>${listItem}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        let para = line;
        para = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        para = para.replace(/<https?:\/\/[^>]+>/g, (match) => {
          const url = match.slice(1, -1);
          return `<a href="${url}" target="_blank" rel="noreferrer">${url}</a>`;
        });
        result.push(`<p>${para}</p>`);
      }
    }
    if (inList) {
      result.push("</ul>");
    }
    return result.join("\n");
  }
  const cvHtml = markdownToHtml(cvContent);
  return renderTemplate`${maybeRenderHead()}<div id="cv-modal" class="cv-modal" role="dialog" aria-modal="true" aria-labelledby="cv-modal-title" aria-hidden="true" data-astro-cid-6omnsfnj> <div class="cv-modal-overlay" id="cv-modal-overlay" data-astro-cid-6omnsfnj></div> <div class="cv-modal-content" data-astro-cid-6omnsfnj> <div class="cv-modal-header" data-astro-cid-6omnsfnj> <h2 id="cv-modal-title" data-astro-cid-6omnsfnj>CV Preview</h2> <button class="cv-modal-close" id="cv-modal-close" aria-label="Close CV preview" data-astro-cid-6omnsfnj> <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-6omnsfnj> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-6omnsfnj></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-6omnsfnj></line> </svg> </button> </div> <div class="cv-modal-body" data-astro-cid-6omnsfnj> <div class="cv-content" data-astro-cid-6omnsfnj>${unescapeHTML(cvHtml)}</div> </div> </div> </div> ${renderScript($$result, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/CVPreview.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/CVPreview.astro", void 0);

const $$Astro = createAstro("http://thanktoanf.online");
const prerender = false;
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const lang = getCurrentLanguage(Astro2);
  const philosophyItems = t("about.philosophy.items", lang);
  const currentWorkItems = t("about.currentWork.items", lang);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": `V\u1EC1 t\xF4i | ${SITE_AUTHOR}`, "description": SITE_DESCRIPTION, "image": __ASTRO_IMAGE_IMPORT_Z1Yq4sn, "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="about" data-astro-cid-kh7btl4r> <div class="about__intro" data-astro-cid-kh7btl4r> <p class="eyebrow" data-astro-cid-kh7btl4r>${t("about.eyebrow", lang)}</p> <h1 data-astro-cid-kh7btl4r>${t("about.title", lang)} ${SITE_AUTHOR}</h1> <p class="lead" data-astro-cid-kh7btl4r> ${t("about.description", lang)} </p> <div class="pill-group" data-astro-cid-kh7btl4r> <span class="pill" data-astro-cid-kh7btl4r>${t("about.pills.tech", lang)}</span> <span class="pill" data-astro-cid-kh7btl4r>${t("about.pills.design", lang)}</span> <span class="pill" data-astro-cid-kh7btl4r>${t("about.pills.dx", lang)}</span> <span class="pill" data-astro-cid-kh7btl4r>${t("about.pills.fundamentals", lang)}</span> </div> <div class="cv-button-wrapper" data-astro-cid-kh7btl4r> <a href="https://docs.google.com/document/d/1n1hOc4GJMTRVARpyqjtM6gbWcEyiSmVx/edit?usp=sharing&ouid=110303296683149389854&rtpof=true&sd=true" target="_blank" rel="noreferrer" class="cv-button" data-astro-cid-kh7btl4r> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kh7btl4r> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-kh7btl4r></path> <polyline points="14 2 14 8 20 8" data-astro-cid-kh7btl4r></polyline> <line x1="16" y1="13" x2="8" y2="13" data-astro-cid-kh7btl4r></line> <line x1="16" y1="17" x2="8" y2="17" data-astro-cid-kh7btl4r></line> <polyline points="10 9 9 9 8 9" data-astro-cid-kh7btl4r></polyline> </svg> ${t("about.viewCv", lang)} </a> <button type="button" class="cv-button cv-button-preview" onclick="window.openCVPreview?.()" data-astro-cid-kh7btl4r> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kh7btl4r> <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-astro-cid-kh7btl4r></path> <circle cx="12" cy="12" r="3" data-astro-cid-kh7btl4r></circle> </svg> ${t("about.previewCv", lang)} </button> </div> </div> <div class="about__card" data-astro-cid-kh7btl4r> <img${addAttribute(__ASTRO_IMAGE_IMPORT_Z1Yq4sn.src, "src")}${addAttribute(t("common.imageAlt", lang), "alt")} loading="lazy" data-astro-cid-kh7btl4r> <ul data-astro-cid-kh7btl4r> <li data-astro-cid-kh7btl4r><strong data-astro-cid-kh7btl4r>${t("about.card.role", lang)}</strong> ${t("about.card.roleValue", lang)}</li> <li data-astro-cid-kh7btl4r><strong data-astro-cid-kh7btl4r>${t("about.card.current", lang)}</strong> ${t("about.card.currentValue", lang)}</li> <li data-astro-cid-kh7btl4r><strong data-astro-cid-kh7btl4r>${t("about.card.interests", lang)}</strong> ${t("about.card.interestsValue", lang)}</li> </ul> </div> </section> <section class="section" data-astro-cid-kh7btl4r> <h2 data-astro-cid-kh7btl4r>${t("about.philosophy.title", lang)}</h2> <p data-astro-cid-kh7btl4r> ${t("about.philosophy.description", lang)} </p> <ul class="list" data-astro-cid-kh7btl4r> ${philosophyItems.map((item) => renderTemplate`<li data-astro-cid-kh7btl4r>${item}</li>`)} </ul> </section> <section class="section" data-astro-cid-kh7btl4r> <h2 data-astro-cid-kh7btl4r>${t("about.currentWork.title", lang)}</h2> <ul class="list" data-astro-cid-kh7btl4r> ${currentWorkItems.map((item) => renderTemplate`<li data-astro-cid-kh7btl4r>${item}</li>`)} </ul> </section> ${renderComponent($$result2, "CVPreview", $$CVPreview, { "data-astro-cid-kh7btl4r": true })} ` })} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/about.astro", void 0);

const $$file = "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
