// fetching data

export function getFlowers(){

    const URL = 'https://raw.githubusercontent.com/yuktadandeva/flowers-api/main/flowers-api';
    const promise = fetch(URL);
    return promise;
}

