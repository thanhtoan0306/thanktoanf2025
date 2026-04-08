# thanktoanf
Live preview: https://www.thanktoanf.online/
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

## Proto: MXH1 (Firebase posts demo)

Demo 1 file HTML để test kiểu “Facebook feed” (đăng bài) với Firebase **Authentication (Email/Password)** + **Cloud Firestore** realtime.

- **File**: `proto/bot/mxh1/index.html`
- **Firestore**: collection `posts`

### Yêu cầu Firebase (setup 1 lần)

Firebase Console → dự án `thanktoanf2025`:

- **Authentication → Sign-in method**: bật **Email/Password**
- **Firestore Database**: tạo database (Test mode ok cho demo nhanh)
- **Authentication → Settings → Authorized domains**: đảm bảo có `localhost` / `127.0.0.1` nếu chạy local

### Chạy local

Mở bằng VSCode/Cursor Live Server, hoặc chạy server tĩnh:

```bash
python3 -m http.server 5173
```

Mở:

- `http://127.0.0.1:5173/proto/bot/mxh1/index.html`

### Cách dùng

- Điền email/password → **Sign up** (lần đầu) hoặc **Sign in**
- Nhập nội dung → **Post**
- Mở 2 tab để thấy realtime sync

### Data model: `posts/{postId}`

Fields:

- `text` (string)
- `authorUid` (string)
- `authorName` (string)
- `createdAt` (timestamp, `serverTimestamp()`)

### Firestore Rules (posts-only, gợi ý)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.authorUid == request.auth.uid;
      allow delete: if request.auth != null && resource.data.authorUid == request.auth.uid;
      allow update: if false;
    }
  }
}
```
