import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/components/layout';

import { HomePage } from '@/pages/HomePage';
import { CandidatePage } from '@/pages/CandidatePage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { TopScoreA } from '@/pages/TopScoreA';

export const routes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/candidate',
    label: 'Candidate Search',
  },
  {
    path: '/analytics',
    label: 'Analytics',
  },
  {
    path: '/top-score-a',
    label: 'Top 10 Group A',
  },
];

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/candidate',
        element: <CandidatePage />,
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '/top-score-a',
        element: <TopScoreA />,
      },
    ],
  },
]);
