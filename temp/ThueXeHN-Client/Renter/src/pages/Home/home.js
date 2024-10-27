import Texty from "rc-texty";
import React, { useEffect, useRef, useState } from "react";
import eventApi from "../../apis/eventApi";
import productApi from "../../apis/productApi";
import triangleTopRight from "../../assets/icon/Triangle-Top-Right.svg";
import assetManagementApi from "../../apis/assetManagementApi";
import { Link } from 'react-router-dom';
import "../Home/home.css";

import {
  BackTop,
  Col,
  Row,
  Spin
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { useHistory } from "react-router-dom";
import background from "../../assets/image/background-xe.png";
import { numberWithCommas } from "../../utils/common";
import newsApi from "../../apis/newsApi";
import ChatComponent from "../chatbot/talk";

const CardComponent = ({ title, imageSrc }) => (
  <div className="card">
    <img className="card-image" src={imageSrc} alt={title} />
    <div className="card-overlay">
      <div className="card-title">{title}</div>
    </div>
  </div>
);

const NewsComponent = ({ id, title, image, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Link to={`/news/${id}`} className={`news-item${isHovered ? ' hover' : ''}`}>
      <img className="news-image" src={image} alt={title} />
      <div className="news-details" onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <h3 className="news-title">{title}</h3>
      </div>
    </Link>
  );
};


const Home = () => {
  const [productList, setProductList] = useState([]);
  const [eventListHome, setEventListHome] = useState([]);
  const [totalEvent, setTotalEvent] = useState(Number);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const history = useHistory();

  const handleReadMore = (id) => {
    console.log(id);
    history.push("product-detail/" + id);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await assetManagementApi.listAssetManagement();
        setProductList(response);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }

      try {
        const response = await productApi.getListEvents(1, 6);
        setEventListHome(response.data);
        setTotalEvent(response.total_count);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }

      try {
        const response = await newsApi.getListNews();
        setNews(response);
        console.log(response)
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }


    })();
  }, []);

  const cardData = [
    { title: 'Hải Châu', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_triton_4x2_2022/p/g/2023/02/14/11/0rQNwCDQJ1T0r_y5BUrHuQ.jpg' },
    { title: 'Ngũ Hành Sơn', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_veloz_cross_2022/p/g/2023/02/14/15/FJpzIca_F0NmNDIZfTuBOw.jpg' },
    { title: 'Liên Chiểu', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_veloz_cross_2023/p/g/2023/09/05/02/787CToKarNoikFrHZiGTHQ.jpg' },
    { title: 'Thanh Khê', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mg_5_standard_2022/p/g/2023/02/24/15/gOKXS1RzjoekP3sHp1HO1w.jpg' },
    { title: 'Cẩm Lệ', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_kona_2019/p/g/2023/10/09/12/Krz-i_VhIZdY9bxllKetHw.jpg' },
    { title: 'Sơn Trà', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_triton_4x2_2022/p/g/2023/02/14/11/0rQNwCDQJ1T0r_y5BUrHuQ.jpg' },
    { title: 'Hòa Vang', imageSrc: 'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_fadil_2020/p/g/2022/01/09/16/P-oIwXOF8JhWR77hRK3ZyQ.jpg' },

  ];

  return (
    <Spin spinning={false}>
        <button 
    className="chatbox" 
    style={{position: 'fixed', bottom: '0', right: '0',backgroundColor: '#E57373', 
    color: 'white', 
  borderRadius: '10%', 
  padding: '10px 20px', zIndex: 1000}}
    onClick={() => setShowChat(!showChat)}
>
    {showChat ? 'Hide ChatBox' : 'Contact Admin'}
</button>   
        {showChat && <ChatComponent style={{
          position: 'fixed', 
          bottom: '0', right: '0', 
        zIndex: 1000}} />}
      <div
        style={{
          background: "#FFFFFF",
          overflowX: "hidden",
          overflowY: "hidden",
          marginTop: -15,
        }}
        className="home"
      >

        <div >
          <img src={background} className="promotion1"></img>
        </div>
        <div>

          <div className="texty-demo">
            <Texty>Khu Vực</Texty>
          </div>
          <div className="texty-title">
            <p>
              Các Khu Vực có Xe  <strong style={{ color: "#3b1d82" }}>Cho Thuê</strong>
            </p>
          </div>
          <div className="card-container">
            {cardData.map((card, index) => (
              <CardComponent key={index} title={card.title} imageSrc={card.imageSrc} />
            ))}
          </div>
        </div>

        <div className="image-one">
          <div className="texty-demo">
            <Texty>Khuyến Mãi</Texty>
          </div>
          <div className="texty-title">
            <p>
              Thuê Xe Giá Rẻ  <strong style={{ color: "#3b1d82" }}>Chất Lượng Tốt Nhất</strong>
            </p>
          </div>

          <div className="column-two">
            <div className="list-products container" key="1">
              {productList.map((item) => (
                <div
                  className="col-product"
                  onClick={() => handleReadMore(item.id)}
                  key={item.id}
                >
                  <div className="show-product">
                    <div className="col-2-product">
                      <div style={{ with: 500 }}>
                        {item.image ? (
                          <img className="image-product" src={item.image} alt={item.name} />
                        ) : (
                          <img
                            className="image-product"
                            src={require("../../assets/image/NoImageAvailable.jpg")}
                            alt="No Image Available"
                          />
                        )}
                      </div>
                      <div className="wrapper-products">
                        <Paragraph className="title-product" ellipsis={{ rows: 2 }}>
                          {item.name}
                        </Paragraph>
                        <div>
                          {item.description}
                        </div>
                        <div className="price-amount">
                          <Paragraph className="price-product">
                            {numberWithCommas(item.rental_price)}đ/ngày
                          </Paragraph>
                        </div>
                        <button className="order-button" style={{ backgroundColor: 'red', color: 'white', width: '120px', border: '1px solid white', outline: 'none' }}>
                          Đặt Xe
                        </button>
                      </div>
                    </div>
                  </div>
                  <Paragraph
                    className="badge"
                    style={{ position: "absolute", top: 10, left: 9 }}
                  >
                    <span>Giảm giá</span>
                    <img src={triangleTopRight} alt="Discount Badge" />
                  </Paragraph>
                </div>
              ))}
            </div>
            <div className="list-products container" key="1">
              {productList.map((item) => (
                <div
                  className="col-product"
                  onClick={() => handleReadMore(item.id)}
                  key={item.id}
                >
                  <div className="show-product">
                    <div className="col-2-product">
                      <div style={{ with: 500 }}>
                        {item.image ? (
                          <img className="image-product" src={item.image} alt={item.name} />
                        ) : (
                          <img
                            className="image-product"
                            src={require("../../assets/image/NoImageAvailable.jpg")}
                            alt="No Image Available"
                          />
                        )}
                      </div>
                      <div className="wrapper-products">
                        <Paragraph className="title-product" ellipsis={{ rows: 2 }}>
                          {item.name}
                        </Paragraph>
                        <div>
                          {item.description}
                        </div>
                        <div className="price-amount">
                          <Paragraph className="price-product">
                            {numberWithCommas(item.rental_price)}đ/ngày
                          </Paragraph>
                        </div>
                        <button className="order-button" style={{ backgroundColor: 'red', color: 'white', width: '120px', border: '1px solid white', outline: 'none' }}>
                          Đặt Xe
                        </button>
                      </div>
                    </div>
                  </div>
                  <Paragraph
                    className="badge"
                    style={{ position: "absolute", top: 10, left: 9 }}
                  >
                    <span>Giảm giá</span>
                    <img src={triangleTopRight} alt="Discount Badge" />
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
          <div className="texty-demo">
            <Texty>Tin tức</Texty>
          </div>
          <div className="texty-title">
            <p>
              Cập nhật <strong style={{ color: "#3b1d82" }}>Các Tin Tức Mới Nhất</strong>
            </p>
          </div>
          <div className="list-news-container">
            {news.map((item, index) => (
              <NewsComponent
                key={index}
                id={item.id}
                title={item.name}
                image={item.image}
              />
            ))}
          </div>



        </div>


      </div>
      <BackTop style={{ textAlign: "right" }} />
    </Spin>
  );
};

export default Home;
