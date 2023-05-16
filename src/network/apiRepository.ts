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
	verifyEmail: function (data: object) {
		const URL = '';
		return apiHandler.post(URL, data);
	},
	verifyOTP: function (data: object) {
		const URL = '';
		return apiHandler.post(URL, data);
	},
    getUTRList: function (data: object) {
        const URL = 'payments/v1/get-info';
        return apiHandler.post(URL, data);
    },
    getUTRInfo: function (data: object) {
        const URL = 'payments/v1/get-advice-info';
        return apiHandler.post(URL, data);
    },
	getUTRIngestion: function (data: object) {
		const URL = 'payments/v1/download/payment-advice';
		return apiHandler.post(URL, data);
	},
	getInvoiceInfo: function (data: object) {
        const URL = 'invoice/v1/get/info';
        return apiHandler.post(URL, data);
    },
	validatePassword: function(data: object) {
		const URL = '';
		return apiHandler.post(URL, data);
	},
	setPassword: function (data: object) {
		const URL = '';
		return apiHandler.post(URL, data);
	},
};

export default apiRepository;
