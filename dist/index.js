const isNode = () => {
    return typeof window.process?.versions !== 'undefined';
};

const fetch = async (url, options = {}) => {
    if (isNode()) {
        throw new Error('fetch is only supported in a browser environment');
    }
    const response = await window.fetch(url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body || null,
    });
    const body = await response.text();
    return {
        bodyUsed: response.bodyUsed,
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,
        body: {
            text: () => body,
            json: () => JSON.parse(body),
            html: () => new DOMParser().parseFromString(body, 'text/html'),
        },
    };
};

var http = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fetch: fetch
});

/**
 * thena@0.0.6
 * A browser-safe, simple, lightweight, and fast utility library for JavaScript
 */
const loop = (n, fn) => {
    return new Promise((resolve) => {
        for (let i = 0; i < n; i++) {
            fn(i);
            if (i === n - 1) {
                resolve();
            }
        }
    });
};
const each = (arr, fn) => {
    return new Promise((resolve) => {
        for (let i = 0; i < arr.length; i++) {
            fn(arr[i], i);
            if (i === arr.length - 1) {
                resolve();
            }
        }
    });
};
const num = (n) => {
    switch (typeof n) {
        case 'number':
            return n;
        case 'string': {
            let number;
            if (n.includes(',')) {
                number = Number(n.replace(/,/g, ''));
            }
            else {
                number = Number(n);
            }
            if (isNaN(number)) {
                throw new Error(`Cannot convert '${n}' to number`);
            }
            return number;
        }
        case 'object':
            if (n instanceof Array) {
                return n.reduce((acc, curr) => acc + num(curr), 0);
            }
            return Object.keys(n).length;
        default:
            return 0;
    }
};
var index = {
    loop,
    each,
    num,
    ...http,
};

export { index as default, each, fetch, loop, num };
