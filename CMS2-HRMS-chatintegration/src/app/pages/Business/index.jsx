import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import ActivityLog from '../../modules/BusinessIntelligence/ActivityLog';
import MonitoringOperation from '../../modules/BusinessIntelligence/MonitoringOperation';

const Components = {
  ActivityLog,
  MonitoringOperation
};

export default (props) => {
  const DashboardComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading} socket={props.socket}>
      <DashboardComp setLoading={setLoading} />
    </Dashboard>
  );
};
