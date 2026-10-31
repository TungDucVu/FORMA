# 📝 USER FEEDBACK & DESIGN ADJUSTMENT LOG

**Mã phiên ghi nhận:** FB-20261031-04  
**Chủ đề:** Tích Hợp Chi Tiết Cơ Chế Tamagotchi Character Gamification Vào 3 Feature Chính Của App

---

## 1. CƠ CHẾ CỐT LÕI CỦA TAMAGOTCHI CHARACTER (CORE MECHANICS)

Nhân vật ảo (Avatar/Pet) chính là **tấm gương phản chiếu chính xác lối sống thực tế** của người dùng:

### A. Chỉ số sinh tồn & Trạng thái (Stats & States):
1. **HP / Energy (Năng lượng):** Phụ thuộc vào việc ngủ đủ giấc và ăn uống đúng Macro/Calo mục tiêu.
2. **Strength (Sức mạnh):** Tăng lên mỗi khi user hoàn thành các bài tập trong Feature 2 (Check/Swipe to Done).
3. **Form / Physique (Vóc dáng nhân vật):** Thay đổi hình ảnh trực quan dựa trên progress thực tế của user (săn chắc, cơ bắp khi tăng cơ/giảm mỡ thành công, hoặc ì ạch nếu bỏ tập quá 3 ngày).

### B. Vòng lặp phần thưởng (Feedback Loop):
- **Tập luyện (Workout Complete):** ➔ Nhận XP + Thể lực cho Pet ➔ Nhân vật lên Level / Học được Skill mới.
- **Ăn uống chuẩn Macro (Log Food qua AI Vision):** ➔ Tăng điểm *"Nutrition Fuel"* ➔ Pet nhận vật phẩm tăng trưởng / Giữ trạng thái *"Super Saiyan"*.
- **Bỏ tập / Ăn "cheat" quá đà:** ➔ Pet bị *"tuột mood"*, đói mệt, hoặc sụt chỉ số.

---

## 2. TÍCH HỢP TAMAGOTCHI VÀO 3 FEATURE CHÍNH HIỆN TẠI

### 🌟 Feature 1: Onboarding (Sinh ra nhân vật đầu tiên)
- Sau khi điền xong các chỉ số tối thiểu (Tuổi, chiều cao, cân nặng, mục tiêu), hệ thống sẽ cho user chọn và đặt tên cho nhân vật khởi đầu (Ví dụ: Một chú rồng con, chiến binh robot, hoặc linh vật đại diện cho mục tiêu).
- Nhân vật này sẽ có chỉ số xuất phát khớp hoàn toàn với vóc dáng hiện tại của user.

### 🏋️ Feature 2: Interactive Workout ➔ Cày XP cho Pet
- Mỗi khi user bấm Swipe to Done hoàn thành một bài tập trên giao diện:
  - Màn hình có hiệu ứng Pet tung đòn đánh / hoàn thành hiệp tập cùng user.
  - Cộng trực tiếp EXP (Point kinh nghiệm) lên thanh Level của Pet.
- **Gamification Nudge:** Khi hoàn thành cả buổi tập, Pet sẽ nhảy múa ăn mừng, tặng quà ảo (mở khóa trang phục mới, phụ kiện tập luyện cho Pet).

### 🥗 Feature 3: AI Food Tracker ➔ Cho Pet "Ăn" năng lượng chuẩn
- Khi user chụp ảnh món ăn và được AI Gemini Flash bóc tách macro thành công:
  - Hệ thống thông báo: *"Bạn nạp 500 kcal (40g Protein). Pet đã được nạp năng lượng hoàn hảo!"*.
  - Nếu user ăn uống đúng macro mục tiêu nhiều ngày liên tiếp, Pet sẽ tiến hóa sang hình thái mới (**Evolution Stage**) – tạo cảm giác cực kỳ thỏa mãn (Dopamine hit).

---

## 3. LỘ TRÌNH TRIỂN KHAI FRONTEND (COMPONENT ARCHITECTURE)
1. Tạo component `PetCompanionCard.tsx` hiển thị Pet tương tác sống động ở Tab **Hôm nay** (thanh HP/Energy, thanh XP Level, cảm xúc phản ứng khi chạm vào).
2. Tích hợp hiệu ứng Pet tung chiêu / hiệp lực khi tick Set hoàn thành ở Tab **Tập luyện**.
3. Tích hợp câu thoại và animation Pet được "ăn" khi log bữa ăn ở Tab **Macro**.
