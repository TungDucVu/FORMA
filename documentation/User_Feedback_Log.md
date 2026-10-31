# 📝 USER FEEDBACK & DESIGN ADJUSTMENT LOG

**Mã phiên ghi nhận:** FB-20261031-05  
**Chủ đề:** Tái Cấu Trúc Tab Hôm Nay Lấy Pet Làm Trung Tâm (2 Card Duy Nhất: Streak & Borderless Pet Card, Wheels HP/EXP Kèm Popup Trực Quan, Công Thức Hồi Phục HP Theo Macro)

---

## 1. THIẾT KẾ TAB HÔM NAY (PET-CENTRIC DESIGN)

Tab Hôm Nay được tinh giản tối đa, chỉ gồm **2 Card duy nhất**:
1. **Card 1: Card Streak (Nằm ở trên cùng):**
   - Lịch 7 ngày tuần kỷ luật, đánh dấu số ngày streak liên tiếp.
2. **Card 2: Card Pet (Linh vật trung tâm - Thiết kế Borderless):**
   - Loại bỏ viền thô (borderless), tạo cảm giác không gian mở cao cấp.
   - Người dùng chạm vào Pet để tương tác, nghe thoại cổ vũ và xem animation gồng cơ.
   - **Chuyển đổi Progress Bar thành 2 Vòng Tròn (Wheels) riêng biệt cho HP và EXP:**
     - **Wheel HP (Năng lượng sinh tồn):** Chạm vào sẽ mở **Popup Modal Vòng tròn Macro 4 màu**.
     - **Wheel EXP (Kinh nghiệm tập luyện):** Chạm vào sẽ mở **Popup Modal Vòng tròn Tiến độ Tập luyện**.

---

## 2. LOGIC SINH TỒN & TIẾN HÓA CỦA PET

### A. Cơ chế Hồi phục HP theo Macro (HP Regeneration Formula):
$$\text{HP\%} = 100 \times \left(0.25 \times \frac{\text{kcal}}{\text{target\_kcal}} + 0.25 \times \frac{\text{protein}}{\text{target\_protein}} + 0.25 \times \frac{\text{carb}}{\text{target\_carb}} + 0.25 \times \frac{\text{fat}}{\text{target\_fat}}\right)$$
- Trọng số 4 chất là bằng nhau ($0.25$ mỗi chất, chuẩn hóa tối đa $1.0$).
- **Nếu user đạt 100% KPI macro trong ngày:** Pet hồi phục trọn vẹn **100% HP**.
- **Nếu user ăn thiếu/chưa đủ:** HP giảm tương ứng với tỷ lệ nạp nhưng không về 0.
- **Nếu user hoàn toàn không log bữa ăn (0% target):** Pet bị cạn kiệt năng lượng về **0% HP** (trạng thái đói lả cần được nạp thức ăn).

### B. Cơ chế Tăng cấp EXP & Level Up:
- Mỗi khi hoàn thành bài tập / set tập: Cộng trực tiếp EXP vào thanh tiến độ Pet.
- Đủ EXP trong ngày hoặc qua ngày mới kỷ luật: Pet tăng 1 Cấp độ (Level Up).

---

## 3. FEEDBACK FB-20261031-06 (CARD STREAK LỊCH 30 NGÀY & VỊ TRÍ 2 WHEEL PET)

**Mã phiên ghi nhận:** FB-20261031-06  
**Chủ đề:** Streak Lịch 30 Ngày Phóng To / Xem Lịch Sử Tháng Trước; Bố Trí 2 Wheel (HP & EXP) Xuống Dưới Pet Tràn Màn Hình.

### Yêu cầu chi tiết:
1. **Card Streak Lịch 30 Ngày:**
   - Vẽ dạng lưới lịch 30 ngày (mini month grid) thay vì chỉ 7 ngày.
   - Khi click vào Card Streak: Tự động phóng to ra modal toàn màn hình/zoom-in.
   - Hỗ trợ chuyển tháng (Tháng trước / Tháng sau) để xem lại toàn bộ lịch sử rèn luyện và streak của các tháng trước.
2. **Bố trí 2 Wheel Macro & Tập Luyện xuống Dưới Pet:**
   - Thay vì nằm 2 bên hông Pet, chuyển 2 Wheel (HP/Macro và EXP/Workout) xuống ngay bên dưới Pet Avatar.
   - Cân đối tỷ lệ đồ họa để Tab Hôm nay tràn trọn vẹn 1 trang màn hình app, chuẩn hóa trải nghiệm mobile-first không bị cụt hay trống trải.

