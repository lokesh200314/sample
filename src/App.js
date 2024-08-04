import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "../src/App.css"
import { Layout, Menu } from 'antd';
import SegementDialog from './components/Segment/SegemenDialog';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{backgroundColor: "darkcyan",height: '57px'}}>
          <div  />
          <div className='tittle'>View Audience</div>
        </Header>
        <Layout style={{height: "700px"}}>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-content">
            <SegementDialog/>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
