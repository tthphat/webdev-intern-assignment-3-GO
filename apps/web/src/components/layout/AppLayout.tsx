import { Outlet } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <MainLayout sidebar={<Sidebar />}>
      <Outlet />
    </MainLayout>
  );
}
