# thanktoanf

Blog cá nhân cho developer được dựng bằng [Astro 5], sử dụng JavaScript thuần và CSS. Dự án tập trung vào cách tách component rõ ràng (layout, header/footer, hero, card bài viết) để bạn có thể mở rộng nhanh.

## Chạy dự án

```bash
npm install
npm run dev   # chạy local tại http://localhost:4321
npm run build # tạo bản build production
npm run preview
```

## Cấu trúc chính

- `src/layouts/PageLayout.astro`: khung trang chung (SEO, header, footer).
- `src/components/Hero.astro`, `PostCard.astro`, `Header.astro`, `Footer.astro`.
- `src/pages/`: trang `index`, `blog`, `about` và trang bài viết động.
- `src/content/blog/`: nơi đặt markdown/MDX cho bài viết.
- `src/styles/global.css`: style nền tảng cho toàn site.

## Tuỳ chỉnh nhanh

- Cập nhật thông tin site ở `src/consts.js` và `astro.config.mjs` (`site`).
- Thay đường dẫn social trong `Header.astro` và `Footer.astro`.
- Thay favicon, ảnh hero tại thư mục `public/` hoặc `src/assets/`.

## Việc cần làm
- Tạo 1 trang tổng hợp các từ vựng hsk1, hsk2, hsk3 có pinyin, audio, sắp xếp theo nhóm
- Tạo 1 trang thi thử các đề hsk1, hsk2, hsk3
