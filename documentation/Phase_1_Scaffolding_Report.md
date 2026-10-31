# 📑 DOCUMENTATION: PHASE 1 SCAFFOLDING & FOUNDATION REPORT
**Dự án:** FORMA - Intelligence Behind Your Transformation  
**Thời gian tạo:** 2026-10-31  
**Trạng thái:** Hoàn thành Sprint 1 Scaffolding

---

## 1. TỔNG KẾT CÁC CÔNG VIỆC ĐÃ HOÀN THÀNH Ở PHASE 1

### 1.1. Khởi tạo Cơ sở Dữ liệu (Supabase SQL)
- **File:** `supabase/schema.sql`
- **Các bảng đã định nghĩa:**
  1. `profiles`: Lưu trữ thông tin cá nhân, chỉ số vóc dáng, mục tiêu và tiến độ onboarding. Có Trigger tự động tạo hồ sơ khi user đăng ký qua Supabase Auth.
  2. `exercises_cache`: Lưu cache hơn 1,300+ bài tập từ ExerciseDB để phục vụ offline và loại bỏ chi phí API.
  3. `workout_plans`, `workout_days`, `workout_day_exercises`: Lưu trữ lộ trình tập luyện theo từng ngày và bài tập chi tiết.
  4. `daily_nutrition_logs`, `meal_items`: Theo dõi calo, macro hàng ngày với trigger tự động cập nhật tổng calo khi thêm món.
  5. `body_checkins`: Lưu trữ ảnh vóc dáng và nhận xét của AI theo mốc thời gian.
- **Bảo mật:** Kích hoạt Row-Level Security (RLS) cho tất cả các bảng.

### 1.2. Khởi tạo Backend (Python FastAPI)
- **File:** `backend/`
- **Thư viện tích hợp:** `fastapi`, `uvicorn`, `pydantic>=2.7`, `httpx`, `python-multipart`, `google-genai`.
- **Endpoints đã hoạt động và kiểm thử thành công:**
  - `GET /api/v1/health`: Kiểm tra trạng thái hệ thống và API keys.
  - `POST /api/v1/onboarding/generate-plan`: Nhận chỉ số bắt buộc, tính BMR/TDEE theo công thức Mifflin-St Jeor và sinh giáo án tập + macro chuẩn JSON.
  - `POST /api/v1/workout/swap`: Endpoint hoán đổi bài tập khi đau khớp hoặc thiết bị bận.
  - `POST /api/v1/nutrition/analyze-food`: Tiếp nhận ảnh món ăn qua camera và bóc tách thành phần dinh dưỡng.
- **Kết quả kiểm thử:** Đã chạy unit test qua `TestClient(app)` đạt mã phản hồi `200 OK`.

### 1.3. Khởi tạo Frontend Khung (Next.js 14 App Router)
- **File:** `frontend/`
- **Công nghệ:** React 18, Next.js 14, Tailwind CSS, Lucide Icons, Framer Motion.
- **Tối ưu Mobile Safari iOS:** Định nghĩa dynamic viewport `min-h-screen-ios`, `safe-area-insets`, `overscroll-behavior-y: none` chống giật kéo màn hình.
- **Component đã tạo:**
  - `WheelPicker.tsx`: Cuộn chọn số cho Chiều cao / Cân nặng / Tuổi (Zero-Keyboard).
  - `OnboardingModal.tsx`: Luồng Onboarding 2 bước tinh gọn.
  - `ProfileChecklist.tsx`: Checklist tiến độ hồ sơ 60%.
  - `WorkoutSessionCard.tsx`: Thẻ bài tập trực quan.
  - `MacroRings.tsx`: Vòng tiến độ calo.
- **Kết quả build:** `npm run build` biên dịch 100% không có lỗi TypeScript hay cú pháp.

