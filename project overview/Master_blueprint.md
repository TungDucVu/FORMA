# 📱 MASTER BLUEPRINT: AI FITNESS & NUTRITION APP

## 1. PRODUCT OVERVIEW & CORE LOOP
- Ứng dụng fitness cá nhân hóa tích hợp AI đa tính năng kết hợp **Tamagotchi Gamification Engine** (Nhân vật ảo đồng hành phản chiếu lối sống thực tế của người dùng). Hướng tới trải nghiệm mượt mà, trực quan, thúc đẩy hành động (Action-driven) và cảm giác chinh phục (Feeling of accomplishment).
- **Core Loop:** Onboarding (Sinh Avatar & Lộ trình) ➔ Daily Execution (Interactive Workout cày XP + AI Food Tracking nạp Fuel cho Pet) ➔ Level Up & Tiến hóa hình thái (Evolution).

## 2. TECH STACK ARCHITECTURE
- **Phase 1 (Dev & Test - $0 Free Tier Optimized):**
  - **Frontend:** Next.js (React) + Tailwind CSS (Mobile-first UI, tối ưu hiển thị trên Safari iPhone).
  - **Backend:** Python (FastAPI).
  - **Database & Storage:** Supabase (PostgreSQL + Supabase Storage cho ảnh).
  - **AI Engine:** Google Gemini Flash (Gemini 1.5/2.0 Flash qua Google AI Studio Free Tier - 15 RPM, zero cost, Multimodal Vision + Structured JSON).
  - **Media Library:** ExerciseDB (1,300+ bài tập có GIF & target muscles, cache về Supabase).
  - **Test Environment:** Localhost chạy qua Ngrok / Cloudflare Tunnel để test trực tiếp trên iPhone.
- **Phase 2 (Production Mobile App):**
  - Đóng gói codebase Next.js sang Native App bằng **Capacitor (by Ionic)** để phát hành lên App Store / Google Play.

## 3. CORE FEATURES & TAMAGOTCHI INTEGRATION
- **Feature 1: Onboarding & Assessment (Sinh ra nhân vật đầu tiên)**
  - Sau khi điền xong chỉ số tối thiểu (Tuổi, chiều cao, cân nặng, mục tiêu), hệ thống cho user chọn và đặt tên cho nhân vật khởi đầu (chú rồng con, chiến binh robot, hoặc linh vật đại diện).
  - Nhân vật có chỉ số xuất phát (HP, STR, Physique) khớp hoàn toàn với vóc dáng hiện tại của user.
  - Zero-Keyboard UI (Wheel Picker & Cards), phân loại Bắt buộc vs Nâng cao.
- **Feature 2: AI Workout Plan & Interactive Session (Cày XP & Sức Mạnh cho Pet)**
  - Giao diện thẻ bài tập Tinder/Bumble UI: Tên bài, ảnh lớn, số Reps, các ô tick Set 1-4. Bấm vào xem Tutorial & Nhóm cơ.
  - Mỗi khi user bấm Swipe/Check to Done: Hiệu ứng Pet tung đòn đánh / hiệp tập cùng user, cộng trực tiếp EXP lên thanh Level của Pet.
  - Hoàn thành cả buổi tập: Pet nhảy múa ăn mừng, tặng quà ảo (mở khóa skin, trang bị tập gym).
- **Feature 3: AI Macro Planner & Food Tracker (Cho Pet "Ăn" Năng Lượng Chuẩn)**
  - Chụp ảnh món ăn bằng camera ➔ AI Gemini Flash bóc tách Macro ➔ Quẹt phải xác nhận.
  - Hệ thống thông báo: *"Bạn nạp 500 kcal (40g Protein). Pet đã được nạp năng lượng hoàn hảo!"*.
  - Tăng điểm "Nutrition Fuel", Pet nhận trạng thái "Super Saiyan". Ăn chuẩn liên tục kích hoạt Tiến Hóa Hình Thái (Evolution Stage).
  - Nếu bỏ tập hoặc ăn cheat quá đà: Pet bị "tuột mood", đói mệt, thúc đẩy tâm lý trách nhiệm của user.
- **Feature 4: AI Body Progress Tracker & Avatar Evolution**
  - Lưu trữ lịch sử ảnh vóc dáng và chỉ số cơ thể.
  - Vóc dáng nhân vật thay đổi trực quan tương ứng với sự tiến bộ ngoài đời của user (săn chắc, cơ bắp hơn hoặc ì ạch khi bỏ bê).