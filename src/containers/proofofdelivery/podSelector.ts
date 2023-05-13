import type { RootState } from '../../reduxInit/store';

const getPodList = (state: RootState) => {
    return state.pod.invoiceList;
};

const getLastReadPod = (state: RootState) => {
    return state.pod.prevPageLastInvId;
};

const getIsPodLoading = (state: RootState) => {
    return state.pod.loading;
};

const getPodError = (state: RootState) => {
    return state.pod.error;
};

const getDefaultTime = (state: RootState) => {
    return {
        startTime: state.pod.defaultStartTime,
        endTime: state.pod.defaultEndTime,
    };
};

export {
    getPodList,
    getLastReadPod,
    getIsPodLoading,
    getPodError,
    getDefaultTime,
};
