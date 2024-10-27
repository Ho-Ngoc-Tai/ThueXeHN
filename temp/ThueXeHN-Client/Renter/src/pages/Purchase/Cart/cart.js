import {
  CreditCardOutlined,
  LeftSquareOutlined
} from "@ant-design/icons";
import {
  Breadcrumb, Button, Card, Col, Divider, Form,
  Input, InputNumber, Layout, Row, Select, Spin, Statistic, Table, Typography, notification
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosClient from "../../../apis/axiosClient";
import eventApi from "../../../apis/eventApi";


const { Meta } = Card;
const { Option } = Select;
const { Content } = Layout;
const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const { TextArea } = Input;

const Cart = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggest, setSuggest] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataForm, setDataForm] = useState([]);
  const [lengthForm, setLengthForm] = useState();
  const [cartLength, setCartLength] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [form] = Form.useForm();
  let { id } = useParams();
  const history = useHistory();

  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const listEvent = () => {
    setLoading(true);
    (async () => {
      try {
        const response = await eventApi.getDetailEvent(id);
        console.log(response);
        setProductDetail(response);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
  };

  const handleDetailEvent = (id) => {
    history.replace("/event-detail/" + id);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const getDataForm = async (uid) => {
    try {
      await axiosClient
        .get("/event/" + id + "/template_feedback/" + uid + "/question")
        .then((response) => {
          console.log(response);
          setDataForm(response);
          let tabs = [];
          for (let i = 0; i < response.length; i++) {
            tabs.push({
              content: response[i]?.content,
              uid: response[i]?.uid,
              is_rating: response[i]?.is_rating,
            });
          }
          form.setFieldsValue({
            users: tabs,
          });
          setLengthForm(tabs.length);
        });
    } catch (error) {
      throw error;
    }
  };

  const handlePay = () => {
    history.push("/pay");
  };

  const deleteCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartLength");
    window.location.reload(true);
  };

  const onFinish = async (values) => {
    console.log(values.users);
    let tabs = [];
    for (let i = 0; i < values.users.length; i++) {
      tabs.push({
        scope:
          values.users[i]?.scope == undefined ? null : values.users[i]?.scope,
        comment:
          values.users[i]?.comment == undefined
            ? null
            : values.users[i]?.comment,
        question_uid: values.users[i]?.uid,
      });
    }
    console.log(tabs);
    setLoading(true);
    try {
      const dataForm = {
        answers: tabs,
      };
      await axiosClient
        .post("/event/" + id + "/answer", dataForm)
        .then((response) => {
          if (response === undefined) {
            notification["error"]({
              message: `Notification`,
              description: "Answer event question failed",
            });
            setLoading(false);
          } else {
            notification["success"]({
              message: `Notification`,
              description: "Successfully answer event question",
            });
            setLoading(false);
            form.resetFields();
          }
        });
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log(newQuantity);
    // Tìm kiếm sản phẩm trong giỏ hàng
    const updatedCart = productDetail.map((item) => {
      if (item.id === productId) {
        // Cập nhật số lượng và tính toán tổng tiền
        item.quantity = newQuantity;
        item.total = item.rental_price * newQuantity;
      }
      return item;
    });
    const total = updatedCart.reduce(
      (acc, item) => acc + item.quantity * item.rental_price,
      0
    );
    setCartTotal(total);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setProductDetail(updatedCart);
  };

  const handleDelete = async (productId) => {
    const updatedCart = JSON.parse(localStorage.getItem("cart"));
    const filteredCart = updatedCart.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setCartLength(cartLength - 1);
    setProductDetail(filteredCart);
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} style={{ height: 80 }} />,
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "rental_price",
      key: "rental_price",
      render: (text) => (
        <a>
          {text.toLocaleString("vi", { style: "currency", currency: "VND" })}
        </a>
      ),
    },
    {
      title: "Số ngày thuê",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) => (
        <div>
          <div className="groupButton">
            {(record.rental_price * record.quantity).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProductDetail(cart);
        console.log(cart);
        const cartLength = localStorage.getItem("cartLength");
        setCartLength(cartLength);
        const total = cart.reduce(
          (acc, item) => acc + item.quantity * item.rental_price,
          0
        );
        setCartTotal(total);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div class="py-5">
        <Spin spinning={false}>
          <Card className="container">
            <div className="box_cart">
              <Layout className="box_cart">
                <Content className="site-layout-background">
                  <Breadcrumb>
                    <Breadcrumb.Item href="http://localhost:3500/product-list/643cd88879b4192efedda4e6">
                      <LeftSquareOutlined style={{ fontSize: "24px" }} />
                      <span> Tiếp tục mua sắm</span>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <hr></hr>
                  <br></br>
                  <Row>
                    <Col span={12}>
                      <h4>
                        <strong>{productDetail.length}</strong> Sản Phẩm
                      </h4>
                    </Col>
                    <Col span={12}>
                      <Button type="default" danger style={{ float: "right" }}>
                        <span onClick={() => deleteCart()}>Xóa tất cả</span>
                      </Button>
                    </Col>
                  </Row>
                  <br></br>
                  <Table
                    columns={columns}
                    dataSource={productDetail}
                    pagination={false}
                  />
                  <br></br>
                  <Divider orientation="left">Chính sách</Divider>
                  <Row justify="start">
                    <Col>
                      <ol>
                        <li>
                          Dịch vụ cho thuê xe cam kết cung cấp những phương tiện chất lượng, đúng với thông tin được mô tả trong hình ảnh và video trên trang web, với mức giá cạnh tranh trên thị trường.
                        </li>
                        <li>
                          Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn lòng hỗ trợ, nhiệt tình và tận tâm để đảm bảo bạn có trải nghiệm thuê xe thoải mái và thuận lợi nhất.
                        </li>
                        <li>
                          Chính sách đổi trả của chúng tôi áp dụng trong các trường hợp sau:<br />
                          - Sản phẩm cho thuê phải được giữ nguyên vẹn, không bị hỏng do các tác nhân bên ngoài.<br />
                          - Sản phẩm giao không đúng theo đơn hàng, không đủ số lượng hoặc không đúng bộ như cam kết.
                        </li>
                      </ol>
                    </Col>
                  </Row>

                  <br></br>
                  <Divider orientation="right">
                    <p>Thanh toán</p>
                  </Divider>
                  <Row justify="end">
                    <Col>
                      <h6>Tổng {cartLength} sản phẩm</h6>
                      <Statistic
                        title="Tổng tiền (đã bao gồm VAT)."
                        value={`${Math.round(cartTotal).toFixed(0)}`}
                        precision={0}
                      />
                      <Button
                        style={{ marginTop: 16 }}
                        type="primary"
                        onClick={() => handlePay()}
                      >
                        Thanh toán ngay{" "}
                        <CreditCardOutlined style={{ fontSize: "20px" }} />
                      </Button>
                    </Col>
                  </Row>
                </Content>
              </Layout>
            </div>
          </Card>
        </Spin>
      </div>
    </div>
  );
};

export default Cart;
