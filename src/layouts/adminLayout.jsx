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
  getItem('overview', 'overview', <PieChartOutlined />),
  getItem('user', 'user', <FiUsers />), //DesktopOutlined cái này là icon nha (có trong antd desing icon)
  getItem('test', 'test', <FileTextOutlined />),
  getItem('survey', 'survey', <FormOutlined />),
  getItem('program', 'program', <ProjectOutlined />),
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
    // Check if the current path is exactly /dashboard (no sub-route)
    if (location.pathname === '/dashboard') {
        navigate('/dashboard/overview', { replace: true }); // Redirect to /dashboard/overview
    }
}, [location]); // Add location as a dependency

  const getCurrentBreadcrumb = () => {
    const pathParts = location.pathname.split('/').filter(part => part !== ''); // Split path and remove empty parts
    if (pathParts.length > 1) {
        const currentSection = pathParts[1]; // Get the section (e.g., 'user', 'test')

        const breadcrumbItems = ['Dashboard']; // Start with "Dashboard"

        const matchedItem = items.find(item => item.key === currentSection);
        if (matchedItem) {
          breadcrumbItems.push(matchedItem.label);
        }
        return breadcrumbItems;
    } else {
      return ['Dashboard']; // Default to just "Dashboard"
    }
};

const handleMenuClick = (e) => {
  if (e.key === 'logout') {
      // Handle logout logic here (e.g., clear tokens, redirect to login)
      console.log("logout");
      navigate('/login', { replace: true }); // Example redirect
  } else if (e.key === 'profile') {
      navigate('/dashboard/profile', { replace: true }); // Correct path
  }
};

const menu = (
  <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">View Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Link to="/" className="logo-link"> {/* Link to homepage */}
                    <div className="demo-logo-vertical" style={{ color: "orange", fontSize: "24px", textAlign: "center", marginBottom: "20px" }}>Fcare</div>
      </Link>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} selectedKeys={[location.pathname.split('/')[2] || 'overview']} /> {/* Highlight selected menu item */}
      </Sider>
      <Layout>
      <Header
                    style={{
                        // padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between', // Align items to left and right
                        alignItems: 'center', // Vertically center items
                        padding: '0 20px', // Add some padding
                    }}
                >
                   <div style={{ color: 'black' }}>Welcome back: <span style={{ fontWeight: 'bold' }}>{managerName}</span></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}> {/* Container for search and avatar */}
                        <Search
                            placeholder="Search..."
                            style={{ width: 200, marginRight: 16 }} // Adjust width as needed
                        />

                        <Dropdown overlay={menu}>
                            <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                        </Dropdown>
                    </div>

                </Header>
         <Content
          style={{
            margin: '0 16px',
          }}
          className="flex-grow" // Key change
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {getCurrentBreadcrumb().map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className="p-24 w-full"
            style={{
              padding: 24,
              height: "100%",
              minHeight: 360,
              background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Outlet /> 
          </div>
        </Content>

        
        {/* Tag Outlet này cần để map với cái bên manage của admin */}
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;