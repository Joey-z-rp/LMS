import crossFetch from 'cross-fetch';

export default function fetch(url: string, options?: any) {
    return crossFetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        ...options,
    })
        .then(response => response.json())
        .then((json) => {
            if (isError(json)) {
                throw json;
            }
            return json;
        });
}

function isError(e) {
    return ['message', 'name', 'stack']
        .filter(key => key in e).length === 3;
}
