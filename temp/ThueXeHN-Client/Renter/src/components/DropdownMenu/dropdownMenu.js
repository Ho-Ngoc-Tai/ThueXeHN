<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import userApi from "../../apis/userApi";
import "./dropdownMenu.css";
=======
import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Row } from 'antd';
import { Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import styles from '../layout/Header/header.module.css'
import userApi from "../../apis/userApi";
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js

function DropdownAvatar() {

  const [userData, setUserData] = useState([]);
<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js
=======
  const [isLogin, setIsLogin] = useState(false);

>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js
  let history = useHistory();

  const Logout = async () => {
    localStorage.clear();
    history.push("/");
<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js
=======
    await userApi.logout();
    window.location.reload(false);
  }

  const Login = () => {
    history.push("/login");
  }

  const handleRouter = (link) => {
    history.push(link);
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getProfile();
        console.log(response);
        setUserData(response.user);
<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js
=======
        const checkLogin = localStorage.getItem("client");
        if (checkLogin) {
          setIsLogin(checkLogin);
        }
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js
      } catch (error) {
        console.log('Failed to fetch profile user:' + error);
      }
    })();
  }, [])

<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js
  const handleRouter = (link) => {
    history.push(link);
  }

  const avatar = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} >
=======
  const avatarPrivate = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}  >
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js
        <a target="_blank" rel="noopener noreferrer" onClick={() => handleRouter("/profile")}>
          Trang cá nhân
        </a>
      </Menu.Item>
<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js
      <Menu.Item icon={<SettingOutlined />} >
      <a target="_blank" rel="noopener noreferrer" onClick={() => handleRouter("/change-password/"+ userData._id)}>
         Thay đổi mật khẩu
=======
      <Menu.Item icon={<ShoppingCartOutlined />}  >
        <a target="_blank" rel="noopener noreferrer" onClick={() => handleRouter("/cart-history")}>
          Quản lý đơn hàng
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js
        </a>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={Logout}  >
        <a target="_blank" rel="noopener noreferrer" >
          Thoát
        </a>
      </Menu.Item>
    </Menu>
  );

<<<<<<< HEAD:ThueXeHN-Admin/src/components/DropdownMenu/dropdownMenu.js

  return (
    <Dropdown key="avatar" placement="bottomCenter" overlay={avatar} arrow>
      <Row
        style={{
          paddingLeft: 5, paddingRight: 5, cursor: 'pointer'
        }}
        className="container"
      >
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
          <div style={{ paddingRight: 10 }}>
            <Avatar
              style={{
                outline: 'none',
              }}
              src={userData?.image}
            />
          </div>
          <p style={{ padding: 0, margin: 0, textTransform: 'capitalize', color: "#000000" }} >
            {userData?.username}
          </p>
        </div>
      </Row>
    </Dropdown>
=======
  return (
    <div>
      {isLogin ?
        <Dropdown key="avatar" placement="bottomCenter" overlay={avatarPrivate} arrow>
          <Row
            style={{
              paddingLeft: 5, paddingRight: 8, cursor: 'pointer'
            }}
            className={styles.container}
          >

            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
              {/* <div style={{ paddingRight: 10 }}>
                <Avatar
                  style={{
                    outline: 'none',
                  }}
                  src={userData ? userData.image : "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}
                />
              </div> */}
              <p style={{ padding: 0, margin: 0, textTransform: 'capitalize', color: "#FFFFFF" }} >
                {userData?.username}
              </p>
            </div>
            {/* <p>Score: {userData.score}</p> */}
          </Row>
        </Dropdown>
        :
        <span
          className={styles.loginSpan}
          onClick={Login}
        >
          Đăng nhập
        </span>
      }
    </div>
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/DropdownMenu/dropdownMenu.js
  );
};

export default DropdownAvatar;