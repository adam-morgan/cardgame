const SERVER_URL = '/api';

export const get = async <Resp>(apiPath: string): Promise<Resp> => {
    try {
        const response = await fetch(
            createUrl(apiPath),
            {
                method: 'GET'
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const post = async <Req, Resp>(apiPath: string, request: Req): Promise<Resp> => {
    try {
        const response = await fetch(
            createUrl(apiPath),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: request == null ? undefined : JSON.stringify(request)
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const createUrl = (path: string) => {
    let url = SERVER_URL;

    while (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }

    while (path.startsWith('/')) {
        path = path.substring(1);
    }

    return `${url}/${path}`;
}
