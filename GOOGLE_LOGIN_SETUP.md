# Hướng dẫn cấu hình Google Login

## Bước 1: Tạo Google OAuth Client ID

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo một project mới hoặc chọn project hiện có
3. Vào **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Nếu chưa có OAuth consent screen, bạn sẽ được yêu cầu cấu hình:
   - Chọn **External** (hoặc Internal nếu dùng Google Workspace)
   - Điền thông tin cơ bản: App name, User support email, Developer contact
   - Thêm scopes: `email`, `profile`, `openid`
   - Thêm test users (nếu ở chế độ testing)
6. Tạo OAuth Client ID:
   - Application type: **Web application**
   - Name: Tên ứng dụng của bạn
   - Authorized JavaScript origins: 
     - `http://localhost:4321` (cho dev)
     - `https://thanktoanf.online` (cho production)
   - Authorized redirect URIs: (có thể để trống cho Google Identity Services)
7. Copy **Client ID** được tạo

## Bước 2: Cấu hình trong dự án

### Cách 1: Sử dụng biến môi trường (khuyến nghị)

Tạo file `.env` trong thư mục root:

```env
PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

### Cách 2: Thay trực tiếp trong code

Mở file `src/pages/login.astro` và thay thế:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
```

thành:

```javascript
const GOOGLE_CLIENT_ID = 'your-client-id-here.apps.googleusercontent.com';
```

## Bước 3: Test

1. Chạy dev server: `npm run dev`
2. Truy cập `/login`
3. Click nút "Sign in with Google"
4. Chọn tài khoản Google và xác nhận
5. Kiểm tra xem đã login thành công chưa

## Lưu ý

- **Development**: Có thể dùng `localhost` trong Authorized JavaScript origins
- **Production**: Cần thêm domain thực tế vào Authorized JavaScript origins
- **Security**: Không commit file `.env` vào git (đã có trong `.gitignore`)
- **Token verification**: Trong production, nên verify JWT token ở backend để đảm bảo an toàn

## Troubleshooting

### Lỗi "Invalid client ID"
- Kiểm tra lại Client ID đã đúng chưa
- Đảm bảo domain trong Authorized JavaScript origins khớp với domain hiện tại

### Nút Google không hiển thị
- Kiểm tra console browser có lỗi không
- Đảm bảo script Google Identity Services đã load xong
- Kiểm tra Client ID đã được cấu hình đúng

### Lỗi CORS
- Thêm domain vào Authorized JavaScript origins trong Google Cloud Console
