import { events } from './constants';
const sendEvents = async (eventName: string, eventProperties: object) => {
    const webhookUrl = 'https://in-webhook.hevodata.com/t/ud1knpzm4w';
    const vendorId = localStorage.getItem('vendorId') || '';

    const DEV = import.meta.env.MODE === 'development';

    const properties = {
        eventName: eventName,
        vendorId: vendorId || '',
        timeStamp: Date.now(),
        ...eventProperties,
    };
    const requestData = { event: 'hevo_events', properties };
    !DEV &&
        fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log('Data sent successfully');
                }
            })
            .catch(function (e) {
                // send logger
            });
};

export { sendEvents, events };
