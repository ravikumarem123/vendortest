export const getToken = function () {
    const authToken = localStorage.getItem('authToken');
    return authToken;
};

export const baseurl: string =
    'http://vendor.localhost.jumbotail.com:5173/api/'; // local
//const baseurl = 'http://test.api.jumbotail.com:5555';

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
    method.credentials = 'include';

    //method.headers['tetantId'] = 'J24';

    //method.headers['requestOrigin'] = 'J24';

    const token = getToken();
    if (token) {
        method.headers['Authorization'] = 'Bearer ' + token;
    }
    //method.headers['tenantId'] = 'J24';
    //method.headers['userId'] = 'J24_USER';
    if (headers) {
        method.headers = {
            ...method.headers,
            ...headers,
        };
    }
    return new Promise((resolve, reject) => {
        fetch(url, method)
            .then(async (response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                const text = await response.json();
                throw new Error(text.error.error);
            })
            .then((response) => {
                // console.log('Received ' + path + ' response: ', response);
                if (response.statusCode !== 200) {
                    reject({ error: response.error });
                }
                if (response.data) {
                    resolve(response.data);
                } else {
                    resolve(response);
                }
            })
            .catch(function (e) {
                console.log('Request to ' + path + ' failed: ', e);
                reject({ error: e });
            });
    });
};

const apiHandler = {
    // TODO: change object type to the union of all the types in createPayload.ts
    post: function (path: string, data: object, headers = null) {
        console.log(
            'Inside post function path is: ',
            path,
            ' and data is: ',
            data
        );
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
