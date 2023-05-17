import events from './constants';

const sendEvents = async (eventName: string, eventProperties: object) => {
    const webhookUrl = 'https://in-webhook.hevodata.com/t/ud1knpzm4w';
    const vendorId = localStorage.getItem('vendorId') || '';

    const PROD = import.meta.env.MODE === 'production';

    const properties = {
        eventName,
        vendorId: vendorId || '',
        timeStamp: Date.now(),
        origin: window.location.origin.toString(),
        ...eventProperties,
    };
    const requestData = { event: 'hevo_events', properties };
    if (PROD) {
        fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log('Data sent successfully');
                }
            })
            .catch();
    } else {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(requestData));
    }
};

export { sendEvents, events };
