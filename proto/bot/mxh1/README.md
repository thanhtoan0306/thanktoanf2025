## MXH1 — Firebase posts demo (single HTML file)

Demo 1 file HTML để test “Facebook feed” (đăng bài) với Firebase **Auth (Email/Password)** + **Cloud Firestore** realtime.

- **UI file**: `proto/bot/mxh1/index.html`
- **Firestore**: collection `posts`

### 1) Firebase setup (1 lần)

Trong Firebase Console của project `thanktoanf2025`:

- **Authentication → Sign-in method**: bật **Email/Password**
- **Firestore Database**: tạo database (Test mode ok để thử nhanh)
- **Authentication → Settings → Authorized domains**: đảm bảo có `localhost` / `127.0.0.1` khi chạy local

### 2) Run local

Mở bằng VSCode/Cursor Live Server, hoặc chạy static server:

```bash
python3 -m http.server 5173
```

Mở:

- `http://127.0.0.1:5173/proto/bot/mxh1/index.html`

### 3) Cách dùng

- Nhập email/password → **Sign up** (lần đầu) hoặc **Sign in**
- Nhập nội dung → **Post**
- Mở 2 tab để thấy realtime sync

### Firestore data model

`posts/{postId}` fields:

- `text` (string)
- `authorUid` (string) — `request.auth.uid`
- `authorName` (string)
- `createdAt` (timestamp) — `serverTimestamp()`

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

