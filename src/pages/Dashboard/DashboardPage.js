import React from 'react';
import Header from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';
import ToolBar from '../../components/Dashboard/ToolBar';
import Content from '../../components/Dashboard/Content';
import '../../styles/Pages/Dashboard.css';

const DashboardPage = () => {
  return (
    <div style={ { display: 'flex', flexDirection: 'column', height: '100vh' } }>
      <Header />
      <div style={ { display: 'flex', flex: 1 } }>
        <Sidebar />
        <div style={ { flex: 1, marginLeft: '250px' } }>
          <ToolBar />
          <Content />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
