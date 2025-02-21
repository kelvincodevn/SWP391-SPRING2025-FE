import React, { useState } from 'react';
import {
  FileTextOutlined,
  FormOutlined,
  // FileOutlined,
  PieChartOutlined,
  ProjectOutlined,
  UsbFilled,
  // TeamOutlined,
  // UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
const { Header, Content, Footer, Sider } = Layout;
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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation(); // Get current location

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

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} selectedKeys={[location.pathname.split('/')[2] || 'overview']} /> {/* Highlight selected menu item */}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
         <Content
          style={{
            margin: '0 16px',
          }}
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
          <div
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;