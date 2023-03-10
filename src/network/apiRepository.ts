import apiHandler from './apiHandler';

const apiRepository = {
    // TODO: type the data properly in create payload
    getPodInfo: function (data: object) {
        const URL = 'invoice/get/info';
        return apiHandler.post(URL, data);
    },
};

export default apiRepository;
