# 📝 USER FEEDBACK & DESIGN ADJUSTMENT LOG

**Mã phiên ghi nhận:** FB-20261031-02  
**Chủ đề:** Nâng cấp Wheels Tiến độ, Thẻ Vuốt Bài tập (Swipe Exercise Cards), 2 Tab con Macro (Nhật ký & Đề xuất AI kèm Công thức nấu)

---

## 1. YÊU CẦU ĐIỀU CHỈNH CHI TIẾT (PHIÊN BẢN 2)

### 🏠 Tab 1: Hôm nay (Today Dashboard)
1. **Chuyển đổi toàn bộ Progress Track thành Progress Wheel (Vòng tròn tiến độ):**
   - Loại bỏ các thanh ngang (bar tracks).
2. **Wheel Macro Hợp Nhất (Concentric / Segmented Multi-Ring Wheel):**
   - Vẽ tất cả 4 chỉ số Macro (Calories, Protein, Carb, Fat) vào **1 cụm Wheel đồng tâm** cao cấp.
   - Phân biệt từng chỉ số bằng các sắc thái màu rõ ràng trong hệ màu xanh lá cây công nghệ (Bright Emerald cho Calo, Mint Green cho Protein, Sage Green cho Carb, Deep Forest Green cho Fat).
   - Thể hiện đầy đủ nhãn chỉ số `[Hiện tại / Tổng]` kèm % hoàn thành.
3. **Wheel Tiến độ Tập luyện:**
   - Vòng tròn hiển thị tỷ lệ hoàn thành buổi tập `[Số bài & Sets: Hiện tại / Tổng]`.

---

### 🏋️ Tab 2: Tập luyện (Workout Tab)
1. **Dạng Thẻ Bài Tập Tập Trung (Focus Card with Swipe-to-Next):**
   - Hiển thị bài tập hiện tại theo dạng thẻ đơn lớn, trực quan.
   - Người dùng tick vào từng Set (Set 1, Set 2, Set 3, Set 4).
   - Khi hoàn thành (hoặc chuyển bài), hỗ trợ **vuốt từ phải sang trái (Swipe gesture / Nút chuyển bài)** để chuyển sang bài tập kế tiếp.
2. **Icon Danh sách bài tập (List View Drawer):**
   - Ở phía trên thẻ vuốt có 1 Icon danh sách bài tập.
   - Nhấn vào mở Drawer hiển thị nhanh toàn bộ tên các bài tập trong buổi hôm nay để nhảy nhanh đến bài bất kỳ.

---

### 🥗 Tab 3: Macro (Dinh dưỡng với 2 Tab con)
Chia tab Macro thành 2 Tab con (Sub-tabs):
1. **Tab con 1: "Nhật Ký Hôm Nay":**
   - Hiển thị các bữa ăn người dùng đã nạp / tự up ảnh.
   - Bóc tách Calo và P/C/F của từng món.
2. **Tab con 2: "Gợi Ý Thực Đơn AI":**
   - Hệ thống gợi ý thực đơn 4 bữa chuẩn khoa học theo đúng mục tiêu Calo & Macro của user.
   - **Khi bấm vào từng Card món ăn:** Mở popup/modal hiển thị chi tiết **Công thức nấu ăn (Recipe)** bao gồm:
     - Định lượng nguyên liệu (Grams)
     - Thời gian chuẩn bị & chế biến
     - Hướng dẫn các bước nấu (Step-by-step instructions)
     - Nút *"Ăn món này & Nạp vào hôm nay"*.
