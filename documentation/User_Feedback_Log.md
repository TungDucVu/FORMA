# 📝 USER FEEDBACK & DESIGN ADJUSTMENT LOG

**Mã phiên ghi nhận:** FB-20261031-01  
**Chủ đề:** Tinh chỉnh Ngôn ngữ Thiết kế (Color Palette) & Chuyển dịch Chiến lược Ưu tiên Frontend UI/UX

---

## 1. YÊU CẦU ĐIỀU CHỈNH GIAO DIỆN (UI/UX)

### 🎨 Quy chuẩn Màu sắc (Strict Minimal Color Palette):
1. **Màu chủ đạo:** Xanh lá cây (Emerald / Neon Fitness Green `#22C55E` / `#16A34A`).
2. **Số lượng màu tối đa trên 1 trang:** Không quá 5 màu, **lý tưởng từ 3 - 4 màu**.
3. **Bảng màu chuẩn hóa (3-4 màu cốt lõi):**
   - **Màu nền (Background):** Đen than ánh rêu tối (`#090D0B`)
   - **Màu thẻ bề mặt (Surface/Card):** Xám đen bề mặt (`#121814` kèm viền xanh lá tinh tế `rgba(34, 197, 94, 0.12)`)
   - **Màu điểm nhấn chính (Brand Green):** Xanh lá cây (`#22C55E`)
   - **Màu chữ (Typography):** Trắng (`#F9FAFB`) cho tiêu đề, Xám bạc nhạt (`#9CA3AF`) cho nội dung phụ.
   - *Loại bỏ hoàn toàn các màu phụ rườm rà (cam, tím, hồng, cyan không cần thiết).*

---

## 2. QUY CHUẨN ĐIỀU HƯỚNG & 4 TABS CHÍNH

Thanh Bottom Navigation Dock gồm 4 Tabs + 1 Icon Camera chụp ảnh trung tâm:

### 🏠 Tab 1: Hôm nay (Today Dashboard)
- Hiển thị toàn bộ tiến độ hôm nay của người dùng dưới dạng **Progress Wheel / Progress Track**.
- Bắt buộc thể hiện rõ ràng **[Hiện tại / Tổng]** cho tất cả các chỉ số:
  - **Tập luyện:**
    - Ngày tập trong tuần (Ví dụ: Buổi 3/4).
    - Số bài đã hoàn thành / Tổng số bài tập (Ví dụ: 3/4 bài).
    - Số Sets hoàn thành / Tổng số Sets (Ví dụ: 9/12 sets).
  - **Dinh dưỡng Macro (Bắt buộc show đầy đủ 4 chỉ số):**
    - **Calories:** [Hiện tại / Mục tiêu] kcal
    - **Protein:** [Hiện tại / Mục tiêu] g
    - **Carb:** [Hiện tại / Mục tiêu] g
    - **Fat:** [Hiện tại / Mục tiêu] g

### 🏋️ Tab 2: Tập luyện (Workout)
- Danh sách các thẻ (Exercise Cards) bài tập sẽ tập trong ngày hôm nay.
- Mỗi thẻ bài tập phải thể hiện đầy đủ:
  - Tên bài tập
  - Ảnh động GIF minh họa kỹ thuật chuẩn
  - Số Sets, số Reps
  - Nhóm cơ tác động (Target Muscles)
  - Tips hướng dẫn kỹ thuật / lưu ý an toàn.
  - Tương tác đánh dấu hoàn thành từng Set.

### 🥗 Tab 3: Macro (Dinh dưỡng & Bữa ăn)
- Hiển thị các thẻ bữa ăn (Meal Cards) người dùng đã nạp trong ngày.
- Có hiển thị ảnh chụp món ăn (nếu có hoặc ảnh minh họa).
- Bóc tách chi tiết lượng Kcal, Protein, Carb, Fat của từng bữa.

### 👤 Tab 4: Hồ sơ (Profile)
- Hiển thị cài đặt ứng dụng, thông tin thể trạng cơ bản (Tuổi, Chiều cao, Cân nặng, Mục tiêu).
- Tích hợp thanh tiến độ hoàn thiện hồ sơ thể lực (60%) kèm Checklist nhắc nhở.

### 📸 Icon Máy ảnh (Center Action Button)
- Nằm chính giữa thanh Bottom Bar.
- Nhấn vào mở giao diện/modal cho phép người dùng chụp ảnh hoặc tải ảnh lên (tạo placeholder hoàn chỉnh).

---

## 3. ĐIỀU CHỈNH CHIẾN LƯỢC: FRONTEND-FIRST ROADMAP

- **Quyết định:** Tạm hoãn kết nối backend/server để tập trung 100% nguồn lực hoàn thiện giao diện người dùng (UI/UX), logic tương tác, chuyển động mượt mà và quản lý trạng thái trên Client trước.
- **Lợi ích:** Đảm bảo trải nghiệm chạm vuốt trên Safari iPhone đạt mức hoàn hảo nhất, dễ dàng kiểm thử và tinh chỉnh với người dùng thực tế trước khi đầu tư hạ tầng backend.

