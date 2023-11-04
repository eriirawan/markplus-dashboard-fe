import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { DashboardProvider } from '@/hooks/useDashboard';
import ProtectedLayout from '../components/layout/protected-with-sidebar/ProtectedLayout';

const Loading = lazy(() => import('../components/Loading'));

const Home = lazy(() => import('../pages/home'));
const User = lazy(() => import('../pages/user'));
const Evidence = lazy(() => import('../pages/evidence'));
const ActivityLog = lazy(() => import('../pages/activity-log'));
const Login = lazy(() => import('../pages/login'));
const ForgotPassword = lazy(() => import('../pages/forgotPassword'));
const ForgotPasswordSuccess = lazy(() => import('../pages/forgotPasswordSuccess'));
const ResetPassword = lazy(() => import('../pages/resetPassword'));
const AddChart = lazy(() => import('../pages/addChart'));

const LazyComponent = ({ children }) => <Suspense fallback={<Loading open />}>{children}</Suspense>;

const ErrorBoundary = () => {
  const error = useRouteError();
  console.warn('blocker error', error);
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LazyComponent children={<Login />} />} errorElement={<ErrorBoundary />} />
      <Route
        path="/forgot-password"
        element={<LazyComponent children={<ForgotPassword />} />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/forgot-password-success"
        element={<LazyComponent children={<ForgotPasswordSuccess />} />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/reset-password"
        element={<LazyComponent children={<ResetPassword />} />}
        errorElement={<ErrorBoundary />}
      />
      {/* <Route
        path="/reset-password-success"
        element={<LazyComponent children={<ResetPasswordSuccess />} />}
        errorElement={<ErrorBoundary />}
      /> */}
      <Route path="/" element={<ProtectedLayout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Navigate to="/home" />} errorElement={<ErrorBoundary />} />
        <Route path="home" errorElement={<ErrorBoundary />}>
          <Route path="/home" element={<LazyComponent children={<Home />} />} errorElement={<ErrorBoundary />} />
          <Route
            path="add-chart"
            element={<LazyComponent children={<AddChart />} />}
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="edit-chart/:id"
            element={<LazyComponent children={<AddChart />} />}
            errorElement={<ErrorBoundary />}
          ></Route>
        </Route>
        <Route path="results" element={<LazyComponent children={<Home />} />} errorElement={<ErrorBoundary />} />
        <Route path="fieldwork" element={<LazyComponent children={<Home />} />} errorElement={<ErrorBoundary />} />
        <Route path="evidence" element={<LazyComponent children={<Evidence />} />} errorElement={<ErrorBoundary />} />
        <Route path="user-list" element={<LazyComponent children={<User />} />} errorElement={<ErrorBoundary />} />
        <Route
          path="activity-log"
          element={<LazyComponent children={<ActivityLog />} />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
    </>
  )
);

const AppRoutes = () => (
  <AuthProvider>
    <DashboardProvider>
      <RouterProvider router={router} />
    </DashboardProvider>
  </AuthProvider>
);

export default AppRoutes;
