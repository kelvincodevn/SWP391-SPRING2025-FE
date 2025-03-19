import React, { useEffect, useState } from 'react';
import {
    PieChartOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Avatar, Dropdown } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiUsers, FiCalendar } from 'react-icons/fi'; // Import FiCalendar for booking icon
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label: <Link to={`/workview/${key}`}>{label}</Link>,
    };
}

const items = [
    getItem('Overview', 'overview', <PieChartOutlined />),
    getItem('Clients', 'clients', <FiUsers />),
    getItem('Booking', 'booking', <FiCalendar />), // Add booking item with FiCalendar icon
    getItem('Slots', 'slots', <FiCalendar />), // Thêm mục Slots với icon FiCalendar
];

const PsychologistLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const [psychologistName, setPsychologistName] = useState("Psychologist");

    useEffect(() => {
        if (location.pathname === '/workview') {
            navigate('/workview/overview', { replace: true });
        }
    }, [location, navigate]);

    const getCurrentBreadcrumb = () => {
        const pathParts = location.pathname.split('/').filter(part => part !== '');
        if (pathParts.length > 1) {
            const currentSection = pathParts[1];
            const breadcrumbItems = ['Workview'];
            const matchedItem = items.find(item => item.key === currentSection);
            if (matchedItem) {
                breadcrumbItems.push(matchedItem.label);
            }
            return breadcrumbItems;
        } else {
            return ['Workview'];
        }
    };

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            console.log("logout");
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('fullName');
            toast.success("Logout Successfully");
            navigate('/login', { replace: true });
        } else if (e.key === 'profile') {
            navigate('/workview/profile', { replace: true });
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
                    <div className="demo-logo-vertical" style={{ color: "green", fontSize: "24px", textAlign: "center", marginBottom: "20px" }}>FCare</div>
                </Link>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} selectedKeys={[location.pathname.split('/')[2] || 'overview']} />
            </Sider>
            <Layout>
                <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
                    <div style={{ color: 'black' }}>Welcome back: <span style={{ fontWeight: 'bold' }}>{psychologistName}</span></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Search placeholder="Search..." style={{ width: 200, marginRight: 16 }} />
                        <Dropdown overlay={menu}>
                            <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }} className="flex-grow">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {getCurrentBreadcrumb().map((item, index) => (
                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div className="p-24 w-full" style={{ padding: 24, height: "100%", minHeight: 360, background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default PsychologistLayout;