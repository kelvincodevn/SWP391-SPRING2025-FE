import React, { useEffect, useState } from 'react';
import {
    FileTextOutlined,
    FormOutlined,
    PieChartOutlined,
    ProjectOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Avatar, Dropdown, Space, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { FiCalendar } from 'react-icons/fi';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label: <Link to={`/user-dashboard/${key}`}>{label}</Link>,
    };
}

const items = [
    getItem('Overview', 'overview', <PieChartOutlined />),
    getItem('Tests', 'tests', <FileTextOutlined />),
    getItem('Booking', 'booking', <FiCalendar />), // Add booking item with FiCalendar icon
    getItem('Surveys', 'surveys', <FormOutlined />),
];

const UserLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        if (location.pathname === '/user-dashboard') {
            navigate('/user-dashboard/overview', { replace: true });
        }
        const fullName = localStorage.getItem('fullName');
        if (fullName) {
            setUserName(fullName);
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
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('fullName');
            toast.success('Logout Successfully');
            navigate('/login', { replace: true });
        } else if (e.key === 'profile') {
            navigate('/user-dashboard/profile', { replace: true });
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
                        Welcome back: <span style={{ fontWeight: 'bold' }}>{userName}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="primary" onClick={() => navigate('/')}>
                            Back to Home
                        </Button>
                        <Search placeholder="Search..." style={{ width: 200, marginLeft: 16, marginRight: 16 }} />
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

export default UserLayout;