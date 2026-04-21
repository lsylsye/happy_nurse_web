import { DashboardLayout } from "../components/layout/DashboardLayout";
import { PatientSidebar } from "../components/sidebar/PatientSidebar";
import { EMRGrid } from "../components/grid/EMRGrid";
import { RightPanel } from "../components/rightsidebar/RightPanel";

export function Dashboard() {
  return (
    <DashboardLayout
      sidebar={<PatientSidebar />}
      mainGrid={<EMRGrid />}
      actionPanel={<RightPanel />}
    />
  );
}
