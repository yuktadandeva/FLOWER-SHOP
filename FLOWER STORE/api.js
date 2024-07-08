// fetching data

export async function getFlowers(){

    const URL = 'https://raw.githubusercontent.com/yuktadandeva/flowers-api/main/flowers-api';
//     const promise = fetch(URL);
//     return promise;

    const response = await fetch(URL);
    return response;
}

