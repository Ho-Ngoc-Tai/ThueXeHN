import axiosClient from './axiosClient';

const orderApi = {
    /*Danh sách api category */

    createOrder(data) {
        const url = '/order/search';
        return axiosClient.post(url, data);
    },
    getDetailOrder(id) {
        const url = '/order/' + id;
        return axiosClient.get(url);
    },
    getListOrder(data) {
        const url = '/order';
        return axiosClient.get(url);
    },
    getListOrderOwner(id) {
        const url = '/order/owner/'+id;
        return axiosClient.get(url);
    },
    deleteOrder(id) {
        const url = "/order/" + id;
        return axiosClient.delete(url);
    },
    searchOrder(name) {
        const params = {
            name: name.target.value
        }
        const url = '/order/searchByName';
        return axiosClient.get(url, { params });
    },

    
}

export default orderApi;