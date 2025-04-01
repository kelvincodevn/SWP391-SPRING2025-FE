import React, { useEffect, useState } from 'react';
import {
    FileTextOutlined,
    FormOutlined,
    PieChartOutlined,
    ProjectOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Avatar, Dropdown, Space, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { FiCalendar } from 'react-icons/fi';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

// Hàm tạo item cho menu
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label: <Link to={`/user-dashboard/${key}`}>{label}</Link>,
    };
}

// Các mục sidebar cho STUDENT
const studentItems = [
    getItem('Overview', 'overview', <PieChartOutlined />),
    getItem('Tests', 'tests', <FileTextOutlined />),
    getItem('Booking', 'booking', <FiCalendar />),
    getItem('Surveys', 'survey', <FormOutlined />),
    getItem('Programs', 'programs', <ProjectOutlined />),
    getItem('Associate', 'associate', <UserSwitchOutlined />),
];

// Các mục sidebar cho PARENT
const parentItems = [
    getItem('Overview', 'overview', <PieChartOutlined />),
    getItem('Tests', 'tests', <FileTextOutlined />),
    getItem('Survey', 'survey', <FormOutlined />),
    getItem('Booking', 'booking', <FiCalendar />),
    getItem('Associate', 'associate', <UserSwitchOutlined />),
];

const UserLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const [userName, setUserName] = useState('User');
    const [role, setRole] = useState(localStorage.getItem('role')); // Lấy role từ localStorage
    const [menuItems, setMenuItems] = useState([]); // Danh sách menu động

    useEffect(() => {
        // Điều chỉnh đường dẫn base của menu dựa trên role
        const basePath = role === 'STUDENT' ? '/student-dashboard' : '/parent-dashboard';
        const items = role === 'STUDENT' ? studentItems : parentItems;

        // Cập nhật menu items với basePath
        const updatedItems = items.map(item => ({
            ...item,
            label: <Link to={`${basePath}/${item.key}`}>{item.label.props.children}</Link>,
        }));
        setMenuItems(updatedItems);

        // Điều hướng mặc định khi vào user-dashboard
        if (location.pathname === '/user-dashboard') {
            navigate(`${basePath}/overview`, { replace: true });
        } else if (location.pathname === '/student-dashboard' || location.pathname === '/parent-dashboard') {
            navigate(`${basePath}/overview`, { replace: true });
        }

        // Lấy fullName từ localStorage
        const fullName = localStorage.getItem('fullName');
        if (fullName) {
            setUserName(fullName);
        }
    }, [location, navigate, role]);

    const getCurrentBreadcrumb = () => {
        const pathParts = location.pathname.split('/').filter((part) => part !== '');
        if (pathParts.length > 1) {
            const currentSection = pathParts[pathParts.length - 1];
            const breadcrumbItems = ['Dashboard'];
            const itemsToUse = role === 'STUDENT' ? studentItems : parentItems;
            const matchedItem = itemsToUse.find((item) => item.key === currentSection);
            if (matchedItem) {
                breadcrumbItems.push(matchedItem.label.props.children);
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
            localStorage.removeItem('role');
            localStorage.removeItem('userID');
            toast.success('Logout Successfully');
            navigate('/login', { replace: true });
        } else if (e.key === 'profile') {
            // Điều hướng đến trang profile dựa trên role
            const basePath = role === 'STUDENT' ? '/student-dashboard' : '/parent-dashboard';
            navigate(`${basePath}/profile`, { replace: true });
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
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['overview']}
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[location.pathname.split('/').pop() || 'overview']}
                />
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