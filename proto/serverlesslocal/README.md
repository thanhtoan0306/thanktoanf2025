# Serverless Local (Vercel Dev) trong repo này

Mục tiêu: chạy **Serverless Function** local giống production (90%+) bằng `vercel dev`, giảm cấu hình thủ công và giữ **cognitive load** thấp.

## Cấu trúc

- `api/hello.js`: serverless function (atomic unit)
- `.env.local`: biến môi trường local (KHÔNG commit)

## Chạy local

## Yêu cầu đăng nhập Vercel CLI (một lần)

`vercel dev` sẽ yêu cầu xác thực để chạy gateway local.

```bash
npx vercel login
```

Sau khi login xong, chạy dev server:

```bash
npx vercel dev
```

Mặc định vào:

- `http://localhost:3000/api/hello`

## Environment variables

Tạo `.env.local` ở root:

```bash
API_KEY=your_secret_key
```

Trong code dùng `process.env.API_KEY`.

## Test nhanh

```bash
curl -i http://localhost:3000/api/hello
curl -i -X POST http://localhost:3000/api/hello
```

Kỳ vọng:

- `GET` trả `200` JSON có `status`, `timestamp`
- Method khác trả `405` và header `Allow: GET`

