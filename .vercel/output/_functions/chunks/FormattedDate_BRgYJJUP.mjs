import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_iqrwoL2g.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("http://thanktoanf.online");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/FormattedDate.astro", void 0);

export { $$FormattedDate as $ };
