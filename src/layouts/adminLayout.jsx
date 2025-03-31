import React, { useEffect, useState } from 'react';
import {
    FileTextOutlined,
    FormOutlined,
    PieChartOutlined,
    ProjectOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Avatar, Dropdown, Space } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import { UserOutlined } from '@ant-design/icons'; // Import UserOutlined icon
import { toast } from 'react-toastify';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to= {`/dashboard/${key}`}>{label}</Link>,
    //key sẽ dc override khi nhấn thêm bất cứ key sau /dashboard/
    //phải bỏ cái lable vào trong cái chỗ để mà nó có thể render ra cái label 
  };
}
//truyền childeren là list 
const items = [
  getItem('Overview', 'overview', <PieChartOutlined />),
//   getItem('Client', 'client', <FiUsers />), //DesktopOutlined cái này là icon nha (có trong antd desing icon)
  getItem('Psychologist', 'psychologist', <FiUsers />), //DesktopOutlined cái này là icon nha (có trong antd desing icon)
  getItem('Test', 'test', <FileTextOutlined />),
  getItem('Test score', 'test-score', <FormOutlined />), // Added Test Score item
  getItem('Survey', 'survey', <FormOutlined />),
  getItem('Program', 'program', <ProjectOutlined />),

//   getItem('Program', 'program', <ProjectOutlined />),
  //thêm mấy cái item cho cái dashboard

  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation(); // Get current location
  const [managerName, setManagerName] = useState("Manager"); // Replace with actual name fetching

  useEffect(() => {
    if (location.pathname === '/dashboard') {
        navigate('/dashboard/overview', { replace: true });
    }
    // Retrieve full name from localStorage
    const fullName = localStorage.getItem('fullName');
    if (fullName) {
        setManagerName(fullName);
    }
}, [location, navigate]);

const getCurrentBreadcrumb = () => {
  const pathParts = location.pathname.split('/').filter((part) => part !== '');
  if (pathParts.length > 1) {
      const currentSection = pathParts[1];
      const breadcrumbItems = ['Dashboard'];
      const matchedItem = items.find((item) => item.key === currentSection);
      if (matchedItem) {
          breadcrumbItems.push(matchedItem.label);
      }
      return breadcrumbItems;
  } else {
      return ['Dashboard'];
  }
};

const handleMenuClick = (e) => {
  if (e.key === 'logout') {
      console.log('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('fullName');
      toast.success("Logout Successfully");
      navigate('/login', { replace: true });
  } else if (e.key === 'profile') {
      navigate('/dashboard/profile', { replace: true });
  }
};

const menu = (
  <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">View Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

return (
  <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Link to="/" className="logo-link">
              <div className="demo-logo-vertical" style={{ color: 'orange', fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
                  Fcare
              </div>
          </Link>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} selectedKeys={[location.pathname.split('/')[2] || 'overview']} />
      </Sider>
      <Layout>
          <Header
              style={{
                  background: colorBgContainer,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 20px',
              }}
          >
              <div style={{ color: 'black' }}>
                  Welcome back: <span style={{ fontWeight: 'bold' }}>{managerName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Search placeholder="Search..." style={{ width: 200, marginRight: 16 }} />
                  <Dropdown overlay={menu}>
                      <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                  </Dropdown>
              </div>
          </Header>
          <Content style={{ margin: '0 16px', height: '100%', minHeight: '100vh' }} className="flex-grow">
              <Breadcrumb style={{ margin: '16px 0' }}>
                  {getCurrentBreadcrumb().map((item, index) => (
                      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                  ))}
              </Breadcrumb>
              <div
    className="p-24 w-full h-full"
    style={{
        padding: 24,
        height: '100%',
        background: colorBgContainer,
    }}
>
                  <Outlet />
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
  </Layout>
  );
};
export default AdminLayout;