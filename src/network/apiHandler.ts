import { sendEvents, events } from '../appEvents';

const baseurl = import.meta.env.VITE_API_URL;

export const getToken = function () {
    const authToken = localStorage.getItem('accessToken');
    return authToken || '';
};

const http = function (
    path: string,
    method: RequestInit,
    content: string,
    headers: object | null = null
) {
    const url = baseurl + path;
    method.headers = {
        Accept: '*/*',
    };
    if (content) {
        method.headers['content-type'] = content;
    }
	const token = getToken();
    if (token) {
        method.headers['Authorization'] = 'Bearer ' + token;
    }
    method.credentials = 'include';
    method.signal = AbortSignal.timeout(5000);

    if (headers) {
        method.headers = {
            ...method.headers,
            ...headers,
        };
    }
    return new Promise((resolve, reject) => {
        fetch(url, method)
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                const text = await response.json();
                sendEvents(events.HTTP_API_FAILURE, {
                    error: JSON.stringify(text),
					url: url,
                });
                console.log(text);
                throw new Error(text.error.error, {
                    cause: { status: text.statusCode },
                });
            })
            .then((response) => {
                //console.log('Received ' + path + ' response: ', response);
                if (response.statusCode !== 200) {
                    sendEvents(events.HTTP_API_FAILURE, {
                        error: JSON.stringify(response),
                    });
                    reject({ error: response.error });
                }
                if (response.data) {
					sendEvents(events.HTTP_API_SUCCESS, {
						body: method?.body,
						url: url,
					});
                    resolve(response.data);
                } else {
                    resolve(response);
                }
            })
            .catch(function (e) {
                console.log(e?.name);
                console.log(e?.message);
                console.log('Request to ' + path + ' failed: ', e);
                reject({ error: e });
            });
    });
};

const apiHandler = {
    // TODO: change object type to the union of all the types in createPayload.ts
    post: function (path: string, data: object, headers = null) {
        return http(
            path,
            { method: 'POST', body: JSON.stringify(data) },
            'application/json',
            headers
        );
    },

    put: function (path: string, data: object) {
        return http(
            path,
            { method: 'PUT', body: JSON.stringify(data) },
            'application/json'
        );
    },

    get: function (path: string, params: string) {
        return http(`${path}${params}`, { method: 'GET' }, 'application/json');
    },
};

export default apiHandler;
