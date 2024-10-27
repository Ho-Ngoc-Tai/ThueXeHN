import {
    ContactsTwoTone,
    DashboardOutlined,
    EnvironmentTwoTone,
    FolderOpenTwoTone,
    HddTwoTone,
    HomeOutlined,
    NotificationTwoTone,
    ShopTwoTone,
    ShoppingTwoTone
} from '@ant-design/icons';
import {
    BackTop,
    Breadcrumb,
    Card,
    Col,
    Modal,
    Row,
    Spin,
    Tag,
    Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import dashBoardApi from "../../apis/dashBoardApi";
import "./dashBoard.css";


const DashBoard = () => {
    const [order, setOrder] = useState([]);
    const [statisticList, setStatisticList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotalList] = useState();
    const [data, setData] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                await dashBoardApi.getAssetStatistics().then((res) => {
                    console.log(res);
                    setTotalList(res)
                    setStatisticList(res);
                    setData(res.data.data);
                    setLoading(false);
                });
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={false}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <DashboardOutlined />
                                <span>DashBoard</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{statisticList?.userCount}</div>
                                        <div className='title_total'>Số thành viên</div>
                                    </div>
                                    <div>
                                        <ContactsTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{statisticList?.assetCategoryCount}</div>
                                        <div className='title_total'>Số danh mục xe</div>
                                    </div>
                                    <div>
                                        <ShopTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>
                                            {parseFloat(statisticList?.totalRentalValue).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </div>
                                        <div className='title_total'>Tổng chi phí cho thuê xe</div>
                                    </div>
                                    <div>
                                        <HddTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{statisticList?.rentalCount}</div>
                                        <div className='title_total'>Số xe đang cho thuê</div>
                                    </div>
                                    <div>
                                        <ShoppingTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                    </Row>
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default DashBoard;