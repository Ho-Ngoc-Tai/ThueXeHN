import {
    DeleteOutlined,
    StopOutlined,
    HomeOutlined,
    CheckCircleOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop, Breadcrumb,
    Button,
    Col,
    Form,
    Input,
    Modal, Popconfirm,
    Row,
    Space,
    Spin,
    Table,
    notification,
    Select,
    InputNumber
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import assetManagementApi from "../../../apis/assetManagementApi";
import "./vehicleApproval.css";
import assetCategoryApi from '../../../apis/assetCategoryApi';
import uploadFileApi from '../../../apis/uploadFileApi';
import userApi from '../../../apis/userApi';

const { Option } = Select;

const VehicleApproval = () => {

    const [category, setCategory] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleCategoryList = async () => {
        try {
            await assetManagementApi.listAssetManagement().then((res) => {
                // Filter complaints based on the created_by field
                const filteredComplaints = res.filter(item => item.user_id === userData.id && item.is_rented === 1);

                setCategory(filteredComplaints);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleFilter = async (name) => {
        try {
            const res = await assetManagementApi.searchAssetManagement(name);
            setCategory(res);
        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    const handleUnBanAccount = async (data) => {
        const params = {
            "is_rented": 2
        }
        try {
            await assetManagementApi.unBanAccount(params, data.id).then(response => {
                if (response.message === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Phê duyệt thất bại',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Phê duyệt thành công',

                    });
                }
                handleCategoryList();
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleBanAccount = async (data) => {
        console.log(data);
        const params = {
            "is_rented": 3
        }
        try {
            await assetManagementApi.banAccount(params, data.id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Từ chối thất bại',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Từ chối thành công',

                    });
                }
                handleCategoryList();

            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} style={{ height: 80 }} />,
            width: '10%'
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Tên xe',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Giá cho thuê',
            dataIndex: 'rental_price',
            key: 'rental_price',
            render: (text, record) => {
                const formattedCost = Number(record.rental_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                return formattedCost;
            },
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },

        {
            title: 'Năm sản xuất xe',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_rented',
            key: 'is_rented',
            render: (isRented) => {
                let statusText = '';
                switch (isRented) {
                    case 0:
                        statusText = 'Chưa cho thuê';
                        break;
                    case 1:
                        statusText = 'Đợi phê duyệt';
                        break;
                    case 2:
                        statusText = 'Đã cho thuê';
                        break;
                    default:
                        statusText = 'Từ chối cho thuê';
                }

                return <span>{statusText}</span>;
            },
        },

        {
            title: 'Danh mục',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Ngày tạo',
            key: 'created_at',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('YYYY-MM-DD'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    {record.is_rented !== 2 && (
                        <Row>
                            

                            <Popconfirm
                                title="Bạn muốn cho thuê xe này?"
                                onConfirm={() => handleUnBanAccount(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    icon={<CheckCircleOutlined />}
                                    style={{ width: 160, borderRadius: 15, height: 30 }}
                                >
                                    {"Phê duyệt"}
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title="Bạn muốn từ chối cho thuê xe này?"
                                onConfirm={() => handleBanAccount(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    icon={<StopOutlined />}
                                    style={{ width: 160, borderRadius: 15, height: 30 }}
                                >
                                    {"Không phê duyệt"}
                                </Button>
                            </Popconfirm>
                        </Row>
                    )}
                </div>
            ),
        },
    ];


    const [userData, setUserData] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                console.log(response);
                setUserData(response.user);



                const createdById = response.user.id;

                if (response.user.role == "isAdmin") {
                    await assetManagementApi.listAssetManagement().then((res) => {
                        console.log(res);
                        setCategory(res);
                        setLoading(false);
                    });
                } else {
                    await assetManagementApi.listAssetManagement().then((res) => {
                        console.log(res);

                        // Filter complaints based on the created_by field
                        const filteredComplaints = res.filter(item => item.user_id === createdById && item.is_rented === 1);



                        setCategory(filteredComplaints);
                        setLoading(false);
                    });
                }


                await assetCategoryApi.listAssetCategories().then((res) => {
                    console.log(res);
                    setCategoryList(res.data);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch category list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <ShoppingOutlined />
                                <span>Phê duyệt cho thuê xe</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        <Input
                                            placeholder="Tìm kiếm"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={category} />
                    </div>
                </div>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default VehicleApproval;