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

---

## 4. FEEDBACK FB-20261031-07 (TINH GỌN CARD STREAK: CHẤM TRÒN & CHIỀU DÀI BẰNG 1/4 CARD PET)

**Mã phiên ghi nhận:** FB-20261031-07  
**Chủ đề:** Thu nhỏ kích thước Card Streak, chuyển 30 ngày thành hệ thống chấm tròn (Dot Matrix), chiều dài (chiều cao) card streak = 1/4 card Pet.

### Yêu cầu chi tiết:
1. **Thu nhỏ Card Streak (Tỷ lệ 1/4 Card Pet):**
   - Giảm độ cao card streak về mức ~75-80px (tương đương 1/4 chiều cao khối Hero Card Pet ~340-400px), nhường không gian tối đa cho Pet và 2 Wheel.
2. **Biểu diễn ngày bằng Chấm Tròn (Dot Matrix):**
   - Mỗi ngày trong tháng là 1 chấm tròn (`rounded-full`):
     - Ngày đã hoàn thành: Chấm xanh lá `bg-emerald-500` kèm ánh sáng glow.
     - Ngày hôm nay: Chấm nổi bật có viền ring hoặc hiệu ứng nhấp nháy `animate-pulse`.
     - Ngày nghỉ / chưa tập: Chấm xám mờ tinh tế.
3. **Giữ nguyên tính năng phóng to:**
   - Chạm vào card streak thu nhỏ vẫn mở bung Modal Lịch 30 ngày chi tiết kèm điều hướng các tháng trước.

---

## 5. FEEDBACK FB-20261031-08 (CẬP NHẬT LOGO CHÍNH THỨC, TINH CHỈNH HEADER & 5 CARD HỒ SƠ TƯƠNG TÁC)

**Mã phiên ghi nhận:** FB-20261031-08  
**Chủ đề:** Sử dụng Logo chính thức (`Gemini_Generated_Image_nnc51znnc51znnc5.png`), Tinh giản Header chỉ chứa Logo + Tên FORMA + Slogan; Tái cấu trúc Tab Hồ Sơ thành 5 Card tương tác chỉnh sửa được.

### Yêu cầu chi tiết:
1. **Logo & Header:**
   - Đưa logo chính thức từ file ảnh vào Header.
   - Header chỉ hiển thị: Logo + Tên "FORMA" + Slogan "Intelligence Behind Your Transformation".
   - Loại bỏ các thành phần rườm rà (nút reset onboarding, pill streak) khỏi header để giữ nhận diện thương hiệu tập trung và đẳng cấp.
2. **Tab Hồ Sơ (Profile) gồm 5 Card thông tin:**
   - **Card 1: Ảnh đại diện, Tên & Mục tiêu** (Avatar, họ tên, mục tiêu tập luyện, số buổi/tuần).
   - **Card 2: Chỉ số Body** (Chiều cao, cân nặng, Body Fat %, tính toán BMI tự động).
   - **Card 3: Chỉ số Sức khỏe** (BMR calo nền, TDEE, Mức độ vận động PAL, Nhịp tim nghỉ).
   - **Card 4: Chấn thương & Kiêng khem** (Tiền sử chấn thương né bài tập, Dị ứng thực phẩm / Kiêng khem AI lọc món).
   - **Card 5: Cài đặt ứng dụng** (Đơn vị đo kg/lbs, bật tắt thông báo, ngôn ngữ, thiết lập lại Onboarding).
3. **Cơ chế chỉnh sửa:**
   - Tất cả các Card thông tin đều cho phép click trực tiếp để mở giao diện sửa dữ liệu, sau đó bấm **"Xác nhận"** để lưu thay đổi ngay lập tức.

---

## 6. FEEDBACK FB-20261101-09 (TAB TẬP LUYỆN: BẢN ĐỒ LEO THÁP CANDY CRUSH / SAGA MAP)

**Mã phiên ghi nhận:** FB-20261101-09  
**Chủ đề:** Tái thiết kế Tab Tập luyện theo phong cách Trò chơi Leo Tháp (Candy Crush / Saga Map). Ban đầu hiển thị Bản đồ phân chia thành từng chặng tương ứng với từng ngày; khi bấm vào ô ngày sẽ mở ra giao diện tập luyện thẻ vuốt tương tác như hiện tại.

### Yêu cầu chi tiết:
1. **Giao diện Bản đồ Leo Tháp (Tower Climb / Saga Map):**
   - Thiết kế con đường leo tháp uốn lượn zíc zắc (Winding path / Stepping stones) phân bổ theo các Chặng (Chapters) và Tầng/Ngày (Days).
   - Mỗi mốc/node ngày thể hiện trạng thái:
     - **Đã hoàn thành (Completed):** Sáng ngọc bích `bg-emerald-500`, có số sao đạt được (⭐⭐⭐) và dấu kiểm.
     - **Hiện tại (Current Active):** Node phát sáng mạnh mẽ (`shadow-glow-green`), hiệu ứng nhấp nháy, có Avatar/Pet đứng ngay tại vị trí này để cổ vũ.
     - **Chưa mở khóa (Locked):** Biểu tượng ổ khóa `🔒`, nền tối tinh tế.
   - Hiển thị thông số tổng thể: Tầng hiện tại, Tổng số sao tích lũy, EXP thưởng khi vượt tầng.
2. **Chuyển tiếp Vào Bài Tập Của Ngày (Day Workout View):**
   - Khi bấm vào bất kỳ node ngày nào (hoặc nút "Tiếp Tục Leo Tháp"):
     - Chuyển sang giao diện tập luyện hiện tại (Thẻ vuốt Tinder/Bumble card stack, tick set 1 2 3, gif hướng dẫn, mẹo tập, nhóm cơ tác động).
     - Bổ sung nút quay lại: **"← Bản Đồ Leo Tháp"** để người dùng có thể quay lại bản đồ tổng quan bất cứ lúc nào.




