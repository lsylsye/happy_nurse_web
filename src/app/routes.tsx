import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { PatientSidebar } from "./components/sidebar/PatientSidebar";
import { EMRGrid } from "./components/grid/EMRGrid";
import { STTPanel } from "./components/panel/STTPanel";
import { Login } from "./pages/Login";

function Dashboard() {
  return (
    <DashboardLayout 
      sidebar={<PatientSidebar />}
      mainGrid={<EMRGrid />}
      actionPanel={<STTPanel />}
    />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
