# 📱 MASTER BLUEPRINT: AI FITNESS & NUTRITION APP

## 1. PRODUCT OVERVIEW & CORE LOOP
- Ứng dụng fitness cá nhân hóa tích hợp AI đa tính năng, hướng tới trải nghiệm mượt mà, trực quan, thúc đẩy người dùng hành động (Action-driven) và tạo cảm giác chinh phục (Feeling of accomplishment).
- **Core Loop:** Onboarding ➔ AI Generation (Workout + Macro) ➔ Daily Execution (Interactive Workout + AI Food Tracking + Progress Tracking).

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

## 3. CORE FEATURES & UX DESIGN LANGUAGE
- **Feature 1: Onboarding & Assessment (Low-friction, Gamified & Step-by-step)**
  - **Zero-Keyboard Design:** Tối ưu hóa ngón tay cái, dùng Wheel Picker / Chip / Card thay vì gõ số.
  - **Phân định rõ 2 nhóm thông tin:**
    - *Nhóm bắt buộc (Tối thiểu 2 trang, max 5 ô/trang):* Giới tính, Tuổi, Chiều cao & Cân nặng (Trang 1: Vóc dáng); Mục tiêu & Số buổi tập/tuần (Trang 2: Mục tiêu & Lịch tập). Đủ tính BMR, TDEE, Macro và sinh lịch tập tức thì.
    - *Nhóm nâng cao (Điền sau qua Profile Nudge):* Body Fat %, mức vận động chi tiết, địa điểm tập (gym/home), chấn thương, chế độ ăn kiêng.
  - **Dashboard Nudge & Checklist:** Thanh Onboarding Progress Tracker (VD: *60% hoàn thành*) + Checklist thưởng huy hiệu, nhắc nhở nhẹ nhàng, tuyệt đối không hỏi lại thông tin cũ.
- **Feature 2: AI Workout Plan & Interactive Session (Gym Workout focus - có thể mở rộng)**
  - **Visual Exercise Cards:** Tên bài tập, GIF minh họa kỹ thuật, số Sets/Reps, Target muscles, Approx Calories.
  - **Interactive Execution:** Check/Swipe to Done từng bài tập, thanh tiến độ buổi tập (Workout Progress Bar).
  - **AI Feedback Loop:** Cho phép user phản hồi trực tiếp (đau khớp, tạ nhẹ/nặng, thiết bị bận) để AI tinh chỉnh bài tập thay thế ngay lập tức.
- **Feature 3: AI Macro Planner & Food Tracker**
  - **Visual Progress Rings & Bars:** Theo dõi trực quan Calories, Protein, Carbs, Fat theo thời gian thực.
  - **Smart Vision Logging:** Chụp ảnh món ăn bằng camera iPhone ➔ AI Vision phân tích thành phần, bóc tách macro ➔ Quẹt phải (Swipe) để xác nhận và trừ vào tổng ngày.
  - **Gamification & Accomplishment:** Hiệu ứng hoàn thành mục tiêu (Confetti, Haptic feedback, thông báo cổ vũ) tạo động lực tiến về phía trước.
- **Feature 4: AI Body Progress Tracker**
  - Lưu trữ lịch sử ảnh vóc dáng theo mốc thời gian (timestamp) vào Supabase Storage.
  - AI so sánh sự thay đổi cơ bắp/mỡ qua các mốc thời gian, kết hợp biểu đồ cân nặng để đánh giá hiệu quả lộ trình.