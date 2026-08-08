import { useState, type ReactNode } from 'react';

interface MainLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function MainLayout({ sidebar, children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 h-full bg-blue-950 text-white p-4 flex-shrink-0 overflow-y-auto max-md:fixed max-md:z-40 max-md:transition-transform max-md:duration-300 ${
          sidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        }`}
      >
        {sidebar}
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Scrollable content container */}
      <main className="flex-1 h-full p-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
