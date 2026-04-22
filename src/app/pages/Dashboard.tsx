import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { PatientSidebar } from "../components/sidebar/PatientSidebar";
import { EMRGrid } from "../components/grid/EMRGrid";
import { RightPanel } from "../components/rightsidebar/RightPanel";

export function Dashboard() {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);

  return (
    <DashboardLayout
      isLeftOpen={isLeftOpen}
      isRightOpen={isRightOpen}
      onOpenLeft={() => setIsLeftOpen(true)}
      onOpenRight={() => setIsRightOpen(true)}
      sidebar={<PatientSidebar onCollapse={() => setIsLeftOpen(false)} />}
      mainGrid={<EMRGrid />}
      actionPanel={<RightPanel onCollapse={() => setIsRightOpen(false)} />}
    />
  );
}
