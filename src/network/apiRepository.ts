import apiHandler from './apiHandler';

const apiRepository = {
    // TODO: type the data properly in create payload
    getPodInfo: function (data: object) {
        const URL = 'invoice/v1/get/pod-info';
        return apiHandler.post(URL, data);
    },
    login: function (data: object) {
        const URL = 'v1/login';
        return apiHandler.post(URL, data);
    },
    getUTRList: function (data: object) {
        const URL = 'invoice/v1/get/pod-info';
        return apiHandler.post(URL, data);
    },
};

export default apiRepository;
