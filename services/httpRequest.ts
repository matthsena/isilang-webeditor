import axios from "axios";

const options = {
    method: 'POST',
    url: 'http://localhost:8080/',
    headers: { 'Content-Type': 'text/plain' },
};

type HttpResponse = {
    data: string
    warning: string | undefined
}

export default async function httpRequest(plainText: string): Promise<HttpResponse> {
    if (!plainText) throw new Error("Editor de texto vazio!")

    return axios.request({ ...options, data: plainText })
        .then((res) => ({ data: res.data, warning: res.headers?.warning }))
        .catch((error) => {
            throw new Error(error.response.data)
        })
}