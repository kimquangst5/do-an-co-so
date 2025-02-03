# Đồ án cơ sở ngành công nghệ thông tin

## Tổng quan

Dự án này là một webiste được xây dựng bằng Node.js và Express.js, theo mô hình MVC (Model-View-Controller). Nó bao gồm các tính năng như xác thực người dùng, xác thực đầu vào và các biện pháp bảo mật API.

## Hướng dẫn dự án

### 1. Tổ chức tập tin

- **Routes**: Xác định tuyến đường ứng dụng.
- **Utilities**: Common utility functions.
- **Controllers**: Logic điều khiển.
- **Services**: Logic xử lí yêu cầu.
- **Configuration**: Cấu hình máy chủ và môi trường.

### 2. Quy ước đặt tên nhất quán

- **camelCase** cho các biến và hàm (Ví dụ: `apiResponse`,
  `decryptRequestBody`).
- **PascalCase** cho tên lớp (Ví dụ: `HomeController`, `ProductController`).
- **UPPERCASE với dấu gạch dưới** cho các biến môi trường (Ví dụ: `APP_DEBUG`,
  `JWT_SECRET`).

### 3. Xử lý lỗi

- Các hàm không đồng bộ dùng `try-catch` để bắt lỗi.

### 4. Cấu hình biến môi trường

- Biến môi trường được sử dụng để cấu hình (Ví dụ:
  `process.env.PORT`, `process.env.JWT_SECRET`).
- Thư viện `dotenv` được sử dụng để tải các biến môi trường từ tệp `.env`.

### 5. Tính không đồng bộ

- Cú pháp `async/await` được sử dụng để xử lý các hoạt động không đồng bộ nhằm
  cải thiện khả năng đọc và khả năng bảo trì.

### 6. Xác thực đầu vào

- Thư viện **Zod** được sử dụng để xác thực dữ liệu đầu vào.

### 7. Thực hành bảo mật

### 8. Database Operations

- Thư viện **Mongoose** được sử dụng cho các tương tác MongoDB (ví dụ: `User.findOne`, `user.save()`).

### 9. Cấu trúc phản hồi API

<!-- - Cấu trúc phản hồi API nhất quán được duy trì bằng hàm `apiResponse` -->

### 10. Bình luận mã

- Bình luận được đưa vào để giải thích logic phức tạp và các phần mã quan trọng.

### 11. Quản lý phụ thuộc

- Thư viện bên ngoài được yêu cầu ở đầu mỗi tệp.
- **npm** được sử dụng để quản lý gói.
- Các bản cập nhật thường xuyên được quản lý bằng một tập lệnh nâng cấp.

### 12. Ghi nhật ký và giám sát

### 13. Thực hành tốt nhất của Express.js

- Các hàm phần mềm trung gian được sử dụng cho các tác vụ phổ biến (Ví dụ: phân tích cú pháp nội dung, phục vụ tệp tĩnh).
- Các tuyến được sắp xếp trong tệp `Routes.js`.

### 14. Định dạng và kiểm tra mã

- **ESLint** để kiểm tra mã sau [Cấu hình ESLint của Google](https://github.com/google/eslint-config-google).
- **Prettier** để định dạng mã.
- Các tập lệnh npm có sẵn để kiểm tra mã và định dạng các tác vụ.

### 15. Tập lệnh phát triển và sản xuất

### 16. Tập lệnh triển khai

- **Bắt đầu**: `npm run start`

### 17. Kiểm tra

### 18. Kiểm soát phiên bản

- **npm** để quản lý gói và cập nhật phụ thuộc.
- Tập lệnh được bao gồm để kiểm tra và cập nhật các phụ thuộc.

### 19. Quản lý cơ sở dữ liệu

- Một tập lệnh được bao gồm để chạy di chuyển cơ sở dữ liệu.

## Bắt đầu

Để bắt đầu dự án, hãy làm theo các bước sau:

1. **Sao chép kho lưu trữ:**

```bash
git clone https://github.com/kimquangst5/do-an-co-so-nganh.git
cd do-an-co-so-nganh
```

2. **Cài đặt các phụ thuộc:**

```bash
npm install
```

3. **Tạo tệp `.env`**: liên hệ với Quang để lấy file .env [Zalo Kim Quang](https://zalo.me/0859615254).

4. **Chạy máy chủ phát triển:**

## Scripts

- **Khởi chạy dự án**: `npm start`
