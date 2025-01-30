import { createBrowserRouter, Outlet } from 'react-router-dom';
import Map from './pages/Map/Map';
import App from './App';
import PrivacyPolicy from './pages/PrivacyPolicy';
import GetTheApp from './pages/GetTheApp';
import FrequentlyAskedQuestions from './pages/FrequentlyAskedQuestions';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: '',
        element: <Map />,
      },
      {
        path: 'get-the-app',
        element: <GetTheApp />,
      },
      {
        path: '/about',
        element: <Outlet />,
        children: [
          {
            path: 'support',
            element: <h1>this is the about page</h1>,
          },
          {
            path: 'privacy',
            element: <PrivacyPolicy />,
          },
        ],
      },
      {
        path: '/frequently-asked-questions',
        element: <FrequentlyAskedQuestions />,
      },
    ],
  },
]);

export default router;
