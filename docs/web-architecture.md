# Web App Architecture

## Folder Structure

```
apps/web/src/
├── main.tsx                 # Entry point - mount React app to DOM
├── App.tsx                  # Root component - renders RouterProvider
├── App.css                  # Global styles
├── index.css                # Base styles
├── assets/                  # Static assets (images, icons)
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/              # Shared/reusable components
│   ├── layout/             # Layout components (header, footer, sidebar)
│   │   ├── MainLayout.tsx  # Responsive layout wrapper
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── AppLayout.tsx   # React Router layout wrapping pages with Outlet
│   │   └── index.ts        # Exports layout components
│   └── ui/                 # UI components (buttons, inputs, cards)
├── features/                # Feature-based modules
│   ├── candidate/          # Candidate feature
│   │   ├── api/            # API calls for candidate
│   │   ├── components/    # Candidate-specific components (Search, ScoreCard)
│   │   └── types/         # TypeScript types
│   └── analytics/          # Analytics feature
│       ├── api/            # API calls for statistics
│       ├── components/    # Chart & report components
│       └── types/          # Analytics types
├── pages/                   # Application pages (views)
│   ├── HomePage.tsx        # Home/welcome page
│   ├── CandidatePage.tsx   # Candidate search page
│   ├── AnalyticsPage.tsx   # Score statistics page
│   └── TopScoreA.tsx       # Top 10 Group A page
├── routes/                  # Routing configurations
│   └── routes.tsx          # Defines routes & createBrowserRouter
└── lib/                    # Core libraries/utilities
    └── api.ts              # Centralized API fetch wrapper
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Entry Point                         │
│                         main.tsx                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Root Component                         │
│                       App.tsx                               │
│              (renders RouterProvider)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Router Engine                           │
│                 routes/routes.tsx                           │
│             (defines browser paths)                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Main Layout                            │
│           components/layout/AppLayout.tsx                   │
│         (MainLayout + Sidebar + <Outlet />)                 │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼ (matches path '/')           ▼ (matches path '/candidate')
    ┌────────────────────┐         ┌────────────────────┐
    │     HomePage       │         │   CandidatePage    │
    │  (pages/HomePage)  │         │ (pages/Candidate)  │
    └────────────────────┘         └──────────┬─────────┘
                                              │
                                              ▼ (uses)
                                   ┌────────────────────┐
                                   │  CandidateSearch   │
                                   │(features/candidate)│
                                   └────────────────────┘
```

## Routing & Layout Mechanism

Ứng dụng sử dụng **React Router v6+** (Data APIs) với mô hình Nested Routing để quản lý các trang và layout chung.

### 1. Luồng Hoạt Động (Application Flow)
1. **`main.tsx`** mount component `App` vào DOM.
2. **`App.tsx`** gọi `<RouterProvider router={router} />` để khởi tạo cơ chế định tuyến.
3. **`router`** (định nghĩa trong `src/routes/routes.tsx`) cấu hình đường dẫn và phân cấp layout:
   * Đường dẫn gốc `/` chứa component chính là **`AppLayout`**.
   * Các trang con (`HomePage`, `CandidatePage`, `AnalyticsPage`, `TopScoreA`) được khai báo trong phần `children` của `AppLayout`.
4. Khi truy cập vào một URL (ví dụ: `/candidate`):
   * Hệ thống render component **`AppLayout`** trước.
   * Bên trong **`AppLayout`**, thẻ `<Outlet />` tự động chuyển đổi và hiển thị component **`CandidatePage`**.

### 2. Layout gọi Child Pages (AppLayout & Outlet)
File `src/components/layout/AppLayout.tsx` là layout bọc chung (App Shell) cho toàn bộ ứng dụng:
```tsx
import { Outlet } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <MainLayout sidebar={<Sidebar />}>
      {/* Outlet sẽ được thay thế bằng Component của trang con đang active */}
      <Outlet />
    </MainLayout>
  );
}
```
* **`MainLayout`**: Layout chứa cấu trúc Flexbox chia màn hình thành Sidebar (bên trái) và Content Area (bên phải), tích hợp cơ chế Responsive đóng/mở sidebar trên mobile.
* **`Sidebar`**: Đọc mảng cấu hình `routes` được export từ `routes.tsx` để tự động vẽ ra các menu liên kết bằng `<NavLink>`. Khi click vào menu, URL thay đổi mà không cần reload trang.
* **`<Outlet />`**: Nơi React Router chèn nội dung của các trang con tương ứng với URL hiện tại.

### 3. Danh sách các trang (Pages Overview)

| Trang | Path | Chức năng chính | Kết nối Features |
|-------|------|-----------------|------------------|
| **HomePage** | `/` | Trang chủ, hiển thị thông tin giới thiệu chung về Kỳ thi Tốt nghiệp THPT 2024. | Không |
| **CandidatePage** | `/candidate` | Tra cứu điểm số của từng thí sinh theo số báo danh. | Sử dụng `<CandidateSearch />` từ `features/candidate` |
| **AnalyticsPage** | `/analytics` | Báo cáo phổ điểm theo 4 mức và biểu đồ thống kê theo môn học. | Sử dụng các component thống kê từ `features/analytics` |
| **TopScoreA** | `/top-score-a` | Danh sách Top 10 học sinh khối A có điểm cao nhất. | Sắp tới kết nối API của database |

## Design Patterns

1. **Feature-based Architecture**: Mỗi tính năng nghiệp vụ cụ thể (như `candidate`, `analytics`) tự đóng gói API, Component, và Types riêng biệt trong `src/features/*`.
2. **Centralized API**: Tất cả API calls đi qua wrapper `lib/api.ts` để đồng bộ cấu hình baseUrl, headers và credentials.
3. **Component Separation**: Các component dùng chung cho toàn bộ dự án đặt tại `components/` (như layout, UI kit); component chỉ dùng riêng cho một chức năng đặt trong `features/*/components/`.