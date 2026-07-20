# CLOUD_SAVE_MINIMAL_v0_1 — Setup một lần

## 1. Tạo Supabase project

Tạo một project mới. Không dùng chung với dữ liệu production khác ở giai đoạn thử nghiệm.

## 2. Tạo bảng và RLS

Mở **SQL Editor**, dán toàn bộ nội dung `supabase-setup.sql`, rồi Run.

Bảng chỉ cho tài khoản đã đăng nhập đọc, tạo và sửa đúng dòng có `user_id` của mình.

## 3. Cấu hình Auth URL

Trong **Authentication → URL Configuration**:

- Site URL: `https://kiencuongnguyen88.github.io/diamond-os/`
- Redirect URLs: thêm `https://kiencuongnguyen88.github.io/diamond-os/`

Giữ email magic link/OTP được bật.

## 4. Lấy cấu hình client

Trong Supabase Project Settings/API, lấy:

- Project URL
- Publishable key hoặc anon key

Không bao giờ dùng hoặc đưa `service_role` key vào trình duyệt.

## 5. Cấu hình trong game

Mở game → **Cloud** → nhập Project URL và publishable/anon key → Lưu cấu hình.

Sau đó:

1. Nhập email.
2. Gửi link đăng nhập.
3. Mở link trong email.
4. Chọn **Đẩy save local lên cloud** để tạo cloud save đầu tiên.
5. Trên thiết bị khác, đăng nhập cùng email và chọn **Tải save cloud về máy**.

## Ranh giới slice

- Local-first: save local vẫn là save làm việc tức thời.
- Đồng bộ thủ công có kiểm soát; chưa tự chạy nền.
- Một JSON cloud cho mỗi tài khoản.
- Có revision guard và backup trước khi cloud ghi đè local.
- Chưa có community, multiplayer, public profile hoặc merge tự động.
