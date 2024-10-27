import { FileDoneOutlined, ShoppingCartOutlined, BarsOutlined, AuditOutlined, AppstoreOutlined, FolderOpenOutlined, FileTextOutlined, CarryOutOutlined, CalendarOutlined, BookOutlined, BlockOutlined, DashboardOutlined, ShoppingOutlined, CommentOutlined, CloudSyncOutlined, AlertOutlined, FileOutlined, BarcodeOutlined, PicLeftOutlined, BorderLeftOutlined, UserOutlined, ContainerOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import "./sidebar.css";

const { Sider } = Layout;

function Sidebar() {

  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState([]);

  const menuSidebarAdmin = [
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
    {
      key: "account-management",
      title: "Quản Lý Tài Khoản",
      link: "/account-management",
      icon: <UserOutlined />
    },
    {
      key: "asset-list",
      title: "Danh mục xe",
      link: "/asset-list",
      icon: <ShoppingOutlined />
    },
    {
      key: "asset-management",
      title: "Quản lý xe",
      link: "/asset-management",
      icon: <ContainerOutlined />
    },
    {
      key: "notifications",
      title: "Gửi thông báo",
      link: "/notifications",
      icon: <AuditOutlined />
    },
    {
      key: "news-list",
      title: "Tin tức",
      link: "/news-list",
      icon: <BarsOutlined />
    },
  ];

  const menuSidebarSecurity = [
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
    {
      key: "complaint-management",
      title: "Quản lý khiếu nại",
      link: "/complaint-management",
      icon: <CalendarOutlined />
    },
    {
      key: "emergency",
      title: "Vấn đề khẩn cấp",
      link: "/emergency",
      icon: <FolderOpenOutlined />
    },
  ];

  const menuSidebarUser = [
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
    {
      key: "asset-management",
      title: "Quản lý xe",
      link: "/asset-management",
      icon: <ContainerOutlined />
    },
    {
      key: "currently-rented",
      title: "Xe đang cho thuê",
      link: "/currently-rented",
      icon: <CalendarOutlined />
    },
    {
      key: "order-list",
      title: "Phê duyệt xe",
      link: "/order-list",
      icon: <ShoppingCartOutlined />
    },
  ];

  const menuSidebarAccountant = [
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [])



  const navigate = (link, key) => {
    history.push(link);
  }

  useEffect(() => {
  })

  return (
    <Sider
    className={'ant-layout-sider-trigger'}
    width={230}
    style={{
      position: "fixed",
      top: 60,
      height: 'calc(100% - 60px)',
      left: 0,
      padding: 0,
      zIndex: 1,
      marginTop: 0,
      boxShadow: " 0 1px 4px -1px rgb(0 0 0 / 15%)",
      overflowY: 'auto',
      background: '#FFFFFF'
    }}
  >
    <Menu
      mode="inline"
      selectedKeys={location.pathname.split("/")}
      defaultOpenKeys={['account']}
      style={{ height: '100%', borderRight: 0, backgroundColor: "#FFFFFF" }}
      theme='light'
    >

      {user.role === "isUser" ? (
        menuSidebarUser.map((map) => (
          <Menu.Item
            onClick={() => navigate(map.link, map.key)}
            key={map.key}
            icon={map.icon}
            className="customeClass"
          >
            {map.title}
          </Menu.Item>
        ))
      ) : user.role === "isAdmin" ? (
        menuSidebarAdmin.map((map) => (
          <Menu.Item
            onClick={() => navigate(map.link, map.key)}
            key={map.key}
            icon={map.icon}
            className="customeClass"
          >
            {map.title}
          </Menu.Item>
        ))
      )  : user.role === "isSecurity" ? (
        menuSidebarSecurity.map((map) => (
          <Menu.Item
            onClick={() => navigate(map.link, map.key)}
            key={map.key}
            icon={map.icon}
            className="customeClass"
          >
            {map.title}
          </Menu.Item>
        ))
      ) : user.role === "isManagement" ? (
        menuSidebarAccountant.map((map) => (
          <Menu.Item
            onClick={() => navigate(map.link, map.key)}
            key={map.key}
            icon={map.icon}
            className="customeClass"
          >
            {map.title}
          </Menu.Item>
        ))
      ) : null}
    </Menu>

  </Sider >
  );
}

export default Sidebar;