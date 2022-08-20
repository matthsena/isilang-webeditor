import axios from "axios";

const options = {
    method: 'POST',
    url: 'http://localhost:8080/',
    headers: { 'Content-Type': 'text/plain' },
};

export default async function httpRequest(plainText: string): Promise<string> {
    if (!plainText) throw new Error("Editor de texto vazio!")

    return axios.request({ ...options, data: plainText })
        .then(({ data }) => data)
        .catch((error) => {
            throw new Error(error.response.data)
        })
}