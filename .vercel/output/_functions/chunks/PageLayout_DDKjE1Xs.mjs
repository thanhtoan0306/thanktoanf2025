import { b as createAstro, c as createComponent, e as addAttribute, a as renderTemplate, m as maybeRenderHead, r as renderScript, d as renderComponent, g as renderHead, f as renderSlot } from './astro/server_iqrwoL2g.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */
import { _ as __ASTRO_IMAGE_IMPORT_Z1F4X4R } from './blog-placeholder-1_DuymYoyI.mjs';
import { b as SITE_TITLE, a as SITE_DESCRIPTION } from './consts_Y9_NTkRK.mjs';
import { $ as $$HeaderLink } from './HeaderLink_CMunVTy2.mjs';

const $$Astro$3 = createAstro("http://thanktoanf.online");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site) : Astro2.url;
  const { title = SITE_TITLE, description, image = __ASTRO_IMAGE_IMPORT_Z1F4X4R } = Astro2.props;
  const imageUrl = new URL(image.src, Astro2.site || Astro2.url);
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(SITE_TITLE, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(imageUrl, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(imageUrl, "content")}>`;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/BaseHead.astro", void 0);

const translations = {
	en: {
		// Navigation
		nav: {
			home: 'Home',
			blog: 'Blog',
			about: 'About',
			login: 'Login',
			cv: 'CV',
		},
		// Home page
		home: {
			eyebrow: 'Developer journal',
			title: 'Hello, I\'m',
			subtitle: 'Frontend engineer, builder and someone who documents what I learn when building real products.',
			primaryCta: 'Read blog',
			secondaryCta: 'About me',
			latestPosts: {
				eyebrow: 'Dev journal',
				title: 'Latest posts',
				viewAll: 'View all',
			},
			highlights: {
				eyebrow: 'You will find',
				title: 'Thinking & techniques',
				description: 'Concise, applicable notes on how I approach front-end, DX and working with product teams.',
				items: [
					'Practicing Astro, React and web fundamentals',
					'Shipping process: from idea to production',
					'UI design systems and componentization',
					'Dev tooling: testing, linting, CI/CD',
					'Soft skills: writing, review, mentoring',
				],
			},
		},
		// Blog page
		blog: {
			eyebrow: 'Thinking & practice',
			title: 'Blog for developers',
			description: 'Collection of articles about front-end, DX and how I build and operate real projects.',
			addBlog: '+ Add blog',
		},
		// About page
		about: {
			eyebrow: 'About',
			title: 'Hello, I\'m',
			description: 'I am a frontend engineer, focused on DX, performance and user experience. This blog is where I document my learning process, experiments and lessons when building real products.',
			viewCv: 'View CV',
			previewCv: 'Preview CV',
			pills: {
				tech: 'Astro / React',
				design: 'UI system design',
				dx: 'DX & Automation',
				fundamentals: 'Web fundamentals',
			},
			card: {
				role: 'Role:',
				roleValue: 'Frontend engineer',
				current: 'Currently:',
				currentValue: 'Building products, mentoring dev team',
				interests: 'Interests:',
				interestsValue: 'Writing blog, reading books and optimizing workflow',
			},
			philosophy: {
				title: 'Work philosophy',
				description: 'I believe good products need solid technical foundations and clear processes. Every article aims to simplify knowledge, with real examples and can be applied immediately in projects.',
				items: [
					'Prioritize clarity over cleverness.',
					'Build component systems to scale quickly but still maintain control.',
					'Automate repetitive tasks so dev teams can focus on core value.',
				],
			},
			currentWork: {
				title: 'What am I working on?',
				items: [
					'Completing Astro starter kit for personal blog.',
					'Writing short series on bundler optimization and DX for frontend.',
					'Mentoring on clear code writing, code review and UI API design.',
				],
			},
		},
		// Footer
		footer: {
			copyright: '©',
			author: 'FE Tony',
			description: 'Sharing for the dev community.',
		},
		// Common
		common: {
			readMore: 'Read more',
			imageAlt: 'Illustration image',
		},
		// Login
		login: {
			eyebrow: 'Welcome back',
			title: 'Login',
			description: 'Login with admin account to manage blog.',
			username: 'Username',
			password: 'Password',
			usernamePlaceholder: 'e.g., admin',
			passwordPlaceholder: 'Enter password',
			submit: 'Login',
			logout: 'Logout',
			loggedIn: 'You are logged in as admin.',
			success: 'Login successful. You are now admin.',
			error: 'Incorrect username or password. Please try again.',
			loggedOut: 'You have logged out.',
			demoAccount: 'Demo account',
		},
	},
	zh: {
		// Navigation
		nav: {
			home: '首页',
			blog: '博客',
			about: '关于',
			login: '登录',
			cv: '简历',
		},
		// Home page
		home: {
			eyebrow: '开发者日志',
			title: '你好，我是',
			subtitle: '前端工程师、构建者和记录我在构建真实产品时所学知识的人。',
			primaryCta: '阅读博客',
			secondaryCta: '关于我',
			latestPosts: {
				eyebrow: '开发日志',
				title: '最新文章',
				viewAll: '查看全部',
			},
			highlights: {
				eyebrow: '您会发现',
				title: '思维与技术',
				description: '关于我如何接近前端、DX和与产品团队合作的简洁、可应用的笔记。',
				items: [
					'实践 Astro、React 和 Web 基础知识',
					'发布流程：从想法到生产',
					'UI 设计系统和组件化',
					'开发工具：测试、代码检查、CI/CD',
					'软技能：写作、审查、指导',
				],
			},
		},
		// Blog page
		blog: {
			eyebrow: '思维与实践',
			title: '开发者博客',
			description: '关于前端、DX 以及我如何构建和运营真实项目的文章集合。',
			addBlog: '+ 添加博客',
		},
		// About page
		about: {
			eyebrow: '关于',
			title: '你好，我是',
			description: '我是一名前端工程师，专注于 DX、性能和用户体验。这个博客是我记录学习过程、实验和在构建真实产品时的经验教训的地方。',
			viewCv: '查看简历',
			previewCv: '预览简历',
			pills: {
				tech: 'Astro / React',
				design: 'UI 系统设计',
				dx: 'DX 与自动化',
				fundamentals: 'Web 基础知识',
			},
			card: {
				role: '角色：',
				roleValue: '前端工程师',
				current: '目前：',
				currentValue: '构建产品，指导开发团队',
				interests: '兴趣：',
				interestsValue: '写博客、读书和优化工作流程',
			},
			philosophy: {
				title: '工作理念',
				description: '我相信好的产品需要坚实的技术基础和清晰的流程。每篇文章都旨在简化知识，提供真实示例，并可以立即在项目中应用。',
				items: [
					'优先考虑清晰度而非聪明。',
					'构建组件系统以快速扩展但仍保持控制。',
					'自动化重复性任务，让开发团队专注于核心价值。',
				],
			},
			currentWork: {
				title: '我正在做什么？',
				items: [
					'完成个人博客的 Astro 入门套件。',
					'撰写关于前端打包器优化和 DX 的短系列。',
					'指导清晰的代码编写、代码审查和 UI API 设计。',
				],
			},
		},
		// Footer
		footer: {
			copyright: '©',
			author: 'FE Tony',
			description: '为开发者社区分享。',
		},
		// Common
		common: {
			readMore: '阅读更多',
			imageAlt: '插图',
		},
		// Login
		login: {
			eyebrow: '欢迎回来',
			title: '登录',
			description: '使用管理员账户登录以管理博客。',
			username: '用户名',
			password: '密码',
			usernamePlaceholder: '例如：admin',
			passwordPlaceholder: '输入密码',
			submit: '登录',
			logout: '登出',
			loggedIn: '您已以管理员身份登录。',
			success: '登录成功。您现在是一名管理员。',
			error: '用户名或密码错误。请重试。',
			loggedOut: '您已登出。',
			demoAccount: '演示账户',
		},
	},
	vi: {
		// Navigation
		nav: {
			home: 'Trang chủ',
			blog: 'Blog',
			about: 'Giới thiệu',
			login: 'Đăng nhập',
			cv: 'CV',
		},
		// Home page
		home: {
			eyebrow: 'Nhật ký dev',
			title: 'Xin chào, mình là',
			subtitle: 'Frontend engineer, builder và người ghi chép lại những điều mình học được khi làm sản phẩm thực tế.',
			primaryCta: 'Đọc blog',
			secondaryCta: 'Giới thiệu',
			latestPosts: {
				eyebrow: 'Nhật ký dev',
				title: 'Bài viết mới nhất',
				viewAll: 'Xem tất cả',
			},
			highlights: {
				eyebrow: 'Bạn sẽ tìm thấy',
				title: 'Tư duy & kỹ thuật',
				description: 'Ghi chú ngắn gọn, dễ áp dụng về cách mình tiếp cận front-end, DX và làm việc với team sản phẩm.',
				items: [
					'Thực hành Astro, React và web fundamentals',
					'Quy trình shipping: từ idea đến production',
					'Hệ thống thiết kế UI và component hóa',
					'Tooling dev: testing, linting, CI/CD',
					'Kỹ năng mềm: viết, review, mentoring',
				],
			},
		},
		// Blog page
		blog: {
			eyebrow: 'Tư duy & thực hành',
			title: 'Blog cho developer',
			description: 'Tổng hợp bài viết về front-end, DX và cách mình xây dựng, vận hành các dự án thực tế.',
			addBlog: '+ Add blog',
		},
		// About page
		about: {
			eyebrow: 'About',
			title: 'Xin chào, mình là',
			description: 'Mình là frontend engineer, tập trung vào DX, hiệu năng và trải nghiệm người dùng. Blog này là nơi mình ghi chép quá trình học, thử nghiệm và những bài học khi làm sản phẩm thực tế.',
			viewCv: 'Xem CV',
			previewCv: 'Xem trước CV',
			pills: {
				tech: 'Astro / React',
				design: 'Thiết kế hệ thống UI',
				dx: 'DX & Automation',
				fundamentals: 'Kiến thức nền tảng Web',
			},
			card: {
				role: 'Vai trò:',
				roleValue: 'Frontend engineer',
				current: 'Hiện tại:',
				currentValue: 'Xây dựng sản phẩm, mentor team dev',
				interests: 'Sở thích:',
				interestsValue: 'Viết blog, đọc sách và tối ưu workflow',
			},
			philosophy: {
				title: 'Triết lý làm việc',
				description: 'Mình tin rằng sản phẩm tốt cần nền tảng kỹ thuật chắc chắn và quy trình rõ ràng. Mọi bài viết đều hướng đến việc đơn giản hóa kiến thức, có ví dụ thực tế và có thể áp dụng ngay trong dự án.',
				items: [
					'Ưu tiên clarity hơn cleverness.',
					'Xây dựng hệ thống component để scale nhanh nhưng vẫn kiểm soát.',
					'Tự động hóa những việc lặp lại để đội dev tập trung vào giá trị chính.',
				],
			},
			currentWork: {
				title: 'Mình đang làm gì?',
				items: [
					'Hoàn thiện bộ starter Astro cho blog cá nhân.',
					'Viết series ngắn về tối ưu bundler và DX cho frontend.',
					'Mentor về viết code rõ ràng, code review và thiết kế API UI.',
				],
			},
		},
		// Footer
		footer: {
			copyright: '©',
			author: 'FE Tony',
			description: 'Chia sẻ cho cộng đồng dev.',
		},
		// Common
		common: {
			readMore: 'Đọc thêm',
			imageAlt: 'Ảnh minh hoạ',
		},
		// Login
		login: {
			eyebrow: 'Welcome back',
			title: 'Đăng nhập',
			description: 'Đăng nhập với tài khoản admin để quản lý blog.',
			username: 'Tài khoản',
			password: 'Mật khẩu',
			usernamePlaceholder: 'Ví dụ: admin',
			passwordPlaceholder: 'Nhập mật khẩu',
			submit: 'Đăng nhập',
			logout: 'Đăng xuất',
			loggedIn: 'Bạn đang đăng nhập với quyền admin.',
			success: 'Đăng nhập thành công. Bạn đang là admin.',
			error: 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.',
			loggedOut: 'Bạn đã đăng xuất.',
			demoAccount: 'Tài khoản demo',
		},
	},
};

const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'selectedLanguage';
const COOKIE_NAME = 'lang';

/**
 * Get current language from cookie (server-side) or localStorage (client-side) or default
 * @param {import('astro').APIContext | import('astro').AstroGlobal} astro - Astro context (optional)
 * @returns {string} Language code ('en', 'zh', 'vi')
 */
function getCurrentLanguage(astro = null) {
	// Server-side: try to read from cookie (may not be available if prerendered)
	if (typeof window === 'undefined' && astro) {
		try {
			const cookieLang = astro.cookies.get(COOKIE_NAME)?.value;
			console.log('[i18n] Server-side - Cookie lang:', cookieLang);
			if (cookieLang && cookieLang in translations) {
				console.log('[i18n] Server-side - Using cookie lang:', cookieLang);
				return cookieLang;
			}
		} catch (e) {
			console.log('[i18n] Server-side - Cannot read cookies (prerendered page):', e.message);
		}
		console.log('[i18n] Server-side - Using default lang:', DEFAULT_LANG);
		return DEFAULT_LANG;
	}
	
	// Client-side: read from localStorage or cookie
	if (typeof window !== 'undefined') {
		// Try cookie first
		const cookieLang = document.cookie
			.split('; ')
			.find(row => row.startsWith('lang='))
			?.split('=')[1];
		
		if (cookieLang && cookieLang in translations) {
			console.log('[i18n] Client-side - Using cookie lang:', cookieLang);
			// Sync with localStorage
			if (localStorage.getItem(STORAGE_KEY) !== cookieLang) {
				localStorage.setItem(STORAGE_KEY, cookieLang);
			}
			return cookieLang;
		}
		
		// Fallback to localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		console.log('[i18n] Client-side - LocalStorage lang:', stored);
		if (stored && stored in translations) {
			console.log('[i18n] Client-side - Using localStorage lang:', stored);
			return stored;
		}
		console.log('[i18n] Client-side - Using default lang:', DEFAULT_LANG);
	}
	
	return DEFAULT_LANG;
}

/**
 * Get translations for current language
 * @param {string | null} [lang=null] - Language code ('en', 'zh', 'vi') or null to use current
 * @returns {object} Translations object for the language
 */
function getTranslations(lang = null) {
	const currentLang = lang || getCurrentLanguage();
	return translations[currentLang] || translations[DEFAULT_LANG];
}

/**
 * Get a nested translation value by path (e.g., 'nav.home' or 'home.title')
 * @param {string} path - Translation key path (e.g., 'nav.home')
 * @param {string | null} [lang=null] - Language code ('en', 'zh', 'vi') or null to use current
 * @returns {any} Translation value
 */
function t(path, lang = null) {
	const translations = getTranslations(lang);
	const keys = path.split('.');
	let value = translations;
	
	for (const key of keys) {
		if (value && typeof value === 'object' && key in value) {
			value = value[key];
		} else {
			console.warn(`Translation key "${path}" not found`);
			return path;
		}
	}
	
	return value;
}

const $$Astro$2 = createAstro("http://thanktoanf.online");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const today = /* @__PURE__ */ new Date();
  const lang = getCurrentLanguage(Astro2);
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> ${t("footer.copyright", lang)} ${today.getFullYear()} ${t("footer.author", lang)} — ${t("footer.description", lang)} <div class="social-links" data-astro-cid-sz7xmlte> <a href="https://www.facebook.com/thanhtoan0306" target="_blank" rel="noreferrer" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>Facebook</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://www.linkedin.com/in/toan-duong-5b7450150/" target="_blank" rel="noreferrer" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>LinkedIn</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8.12h4.2V24H.4V8.12zm7.1 0h4.02v2.16h.06c.56-1.06 1.94-2.18 4-2.18 4.28 0 5.07 2.82 5.07 6.49V24h-4.2v-8.2c0-1.96-.03-4.48-2.73-4.48-2.73 0-3.15 2.13-3.15 4.33V24H7.5V8.12z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://www.tiktok.com/@duothanktoanf" target="_blank" rel="noreferrer" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>TikTok</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://www.instagram.com/thanktoanf/" target="_blank" rel="noreferrer" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>Instagram</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://x.com/thanktoanf" target="_blank" rel="noreferrer" data-astro-cid-sz7xmlte> <span class="sr-only" data-astro-cid-sz7xmlte>X (Twitter)</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" data-astro-cid-sz7xmlte> <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-sz7xmlte></path> </svg> </a> </div> </footer> `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/Footer.astro", void 0);

const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="language-switcher" data-astro-cid-a2mxz4y6> <button class="language-button" id="language-button" aria-label="Select language" aria-expanded="false" data-astro-cid-a2mxz4y6> <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-a2mxz4y6> <circle cx="12" cy="12" r="10" data-astro-cid-a2mxz4y6></circle> <line x1="2" y1="12" x2="22" y2="12" data-astro-cid-a2mxz4y6></line> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-a2mxz4y6></path> </svg> <span class="language-code" id="language-code" data-astro-cid-a2mxz4y6>EN</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="dropdown-arrow" data-astro-cid-a2mxz4y6> <polyline points="6 9 12 15 18 9" data-astro-cid-a2mxz4y6></polyline> </svg> </button> <div class="language-dropdown" id="language-dropdown" role="menu" aria-hidden="true" data-astro-cid-a2mxz4y6> <button class="language-option" data-lang="en" role="menuitem" data-astro-cid-a2mxz4y6> <span class="language-name" data-astro-cid-a2mxz4y6>English</span> <span class="language-native" data-astro-cid-a2mxz4y6>English</span> </button> <button class="language-option" data-lang="zh" role="menuitem" data-astro-cid-a2mxz4y6> <span class="language-name" data-astro-cid-a2mxz4y6>中文</span> <span class="language-native" data-astro-cid-a2mxz4y6>中文</span> </button> <button class="language-option" data-lang="vi" role="menuitem" data-astro-cid-a2mxz4y6> <span class="language-name" data-astro-cid-a2mxz4y6>Tiếng Việt</span> <span class="language-native" data-astro-cid-a2mxz4y6>Tiếng Việt</span> </button> </div> </div> ${renderScript($$result, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/LanguageSwitcher.astro", void 0);

const $$ThemeSwitcher = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="theme-switcher" data-astro-cid-dz5h74bc> <button class="theme-button" id="theme-button" aria-label="Select theme" aria-expanded="false" data-astro-cid-dz5h74bc> <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="theme-icon" id="theme-icon" data-astro-cid-dz5h74bc> <!-- Sun icon (light mode) --> <circle cx="12" cy="12" r="5" class="sun-icon" data-astro-cid-dz5h74bc></circle> <line x1="12" y1="1" x2="12" y2="3" data-astro-cid-dz5h74bc></line> <line x1="12" y1="21" x2="12" y2="23" data-astro-cid-dz5h74bc></line> <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-astro-cid-dz5h74bc></line> <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-astro-cid-dz5h74bc></line> <line x1="1" y1="12" x2="3" y2="12" data-astro-cid-dz5h74bc></line> <line x1="21" y1="12" x2="23" y2="12" data-astro-cid-dz5h74bc></line> <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-astro-cid-dz5h74bc></line> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-astro-cid-dz5h74bc></line> <!-- Moon icon (dark mode) --> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="moon-icon" data-astro-cid-dz5h74bc></path> </svg> </button> <div class="theme-dropdown" id="theme-dropdown" role="menu" aria-hidden="true" data-astro-cid-dz5h74bc> <button class="theme-option" data-theme="light" role="menuitem" data-astro-cid-dz5h74bc> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-dz5h74bc> <circle cx="12" cy="12" r="5" data-astro-cid-dz5h74bc></circle> <line x1="12" y1="1" x2="12" y2="3" data-astro-cid-dz5h74bc></line> <line x1="12" y1="21" x2="12" y2="23" data-astro-cid-dz5h74bc></line> <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-astro-cid-dz5h74bc></line> <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-astro-cid-dz5h74bc></line> <line x1="1" y1="12" x2="3" y2="12" data-astro-cid-dz5h74bc></line> <line x1="21" y1="12" x2="23" y2="12" data-astro-cid-dz5h74bc></line> <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-astro-cid-dz5h74bc></line> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-astro-cid-dz5h74bc></line> </svg> <span data-astro-cid-dz5h74bc>Light</span> </button> <button class="theme-option" data-theme="dark" role="menuitem" data-astro-cid-dz5h74bc> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-dz5h74bc> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" data-astro-cid-dz5h74bc></path> </svg> <span data-astro-cid-dz5h74bc>Dark</span> </button> <button class="theme-option" data-theme="auto" role="menuitem" data-astro-cid-dz5h74bc> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-dz5h74bc> <rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-astro-cid-dz5h74bc></rect> <line x1="8" y1="21" x2="16" y2="21" data-astro-cid-dz5h74bc></line> <line x1="12" y1="17" x2="12" y2="21" data-astro-cid-dz5h74bc></line> </svg> <span data-astro-cid-dz5h74bc>Device</span> </button> </div> </div> ${renderScript($$result, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/ThemeSwitcher.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/ThemeSwitcher.astro", void 0);

const $$Astro$1 = createAstro("http://thanktoanf.online");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const lang = getCurrentLanguage(Astro2);
  console.log("[Header] Server-side - Language:", lang);
  console.log("[Header] Server-side - Nav home translation:", t("nav.home", lang));
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <h2 data-astro-cid-3ef6ksr2><a href="/" data-astro-cid-3ef6ksr2>${SITE_TITLE}</a></h2> <div class="internal-links" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`${t("nav.home", lang)}` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`${t("nav.blog", lang)}` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`${t("nav.about", lang)}` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/login", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`${t("nav.login", lang)}` })} </div> <div class="header-right" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "ThemeSwitcher", $$ThemeSwitcher, { "data-astro-cid-3ef6ksr2": true })} ${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, { "data-astro-cid-3ef6ksr2": true })} <div class="social-links" data-astro-cid-3ef6ksr2> <a href="https://www.facebook.com/thanhtoan0306" target="_blank" rel="noreferrer" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>Facebook</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="26" height="26" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-astro-cid-3ef6ksr2></path> </svg> </a> <a href="https://www.linkedin.com/in/toan-duong-5b7450150/" target="_blank" rel="noreferrer" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>LinkedIn</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="26" height="26" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8.12h4.2V24H.4V8.12zm7.1 0h4.02v2.16h.06c.56-1.06 1.94-2.18 4-2.18 4.28 0 5.07 2.82 5.07 6.49V24h-4.2v-8.2c0-1.96-.03-4.48-2.73-4.48-2.73 0-3.15 2.13-3.15 4.33V24H7.5V8.12z" data-astro-cid-3ef6ksr2></path> </svg> </a> <a href="https://www.tiktok.com/@duothanktoanf" target="_blank" rel="noreferrer" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>TikTok</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="26" height="26" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" data-astro-cid-3ef6ksr2></path> </svg> </a> <a href="https://www.instagram.com/thanktoanf/" target="_blank" rel="noreferrer" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>Instagram</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="26" height="26" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-astro-cid-3ef6ksr2></path> </svg> </a> <a href="https://x.com/thanktoanf" target="_blank" rel="noreferrer" data-astro-cid-3ef6ksr2> <span class="sr-only" data-astro-cid-3ef6ksr2>X (Twitter)</span> <svg viewBox="0 0 24 24" aria-hidden="true" width="26" height="26" data-astro-cid-3ef6ksr2> <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-3ef6ksr2></path> </svg> </a> </div> </div> </nav> </header> `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/components/Header.astro", void 0);

const $$Astro = createAstro("http://thanktoanf.online");
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { title = SITE_TITLE, description = SITE_DESCRIPTION, image } = Astro2.props;
  const lang = getCurrentLanguage(Astro2);
  console.log("[PageLayout] Server-side - Detected language:", lang);
  try {
    const langCookie = Astro2.cookies.get("lang")?.value;
    console.log("[PageLayout] Server-side - Lang cookie value:", langCookie);
  } catch (e) {
    console.log("[PageLayout] Server-side - Could not read cookies (may be prerendered)");
  }
  const langMap = { en: "en", zh: "zh", vi: "vi" };
  const htmlLang = langMap[lang] || "en";
  console.log("[PageLayout] Server-side - HTML lang attribute:", htmlLang);
  return renderTemplate`<html${addAttribute(htmlLang, "lang")} data-astro-cid-3zbxo6iv> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "image": image, "data-astro-cid-3zbxo6iv": true })}${renderScript($$result, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/layouts/PageLayout.astro?astro&type=script&index=0&lang.ts")}${renderHead()}</head> <body data-astro-cid-3zbxo6iv> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-3zbxo6iv": true })} <main class="page" data-astro-cid-3zbxo6iv> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-3zbxo6iv": true })} ${renderScript($$result, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/layouts/PageLayout.astro?astro&type=script&index=1&lang.ts")} </body> </html> `;
}, "/Users/fe.tony/Desktop/reviewcode/thanktoanf2025/src/layouts/PageLayout.astro", void 0);

export { $$PageLayout as $, getCurrentLanguage as g, t };
