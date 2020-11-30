import getUrlParams from "src/utils/getUrlParams";
export * from "./uploadFile";

export const fetchGet = ({ url, dataRequest, optionHeader }) => {
    try {
        const optionRequest = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        return new Promise(function (resolve, reject) {
            if (!url) reject("Url not found")
            if (dataRequest) {
                url = url + '?' + getUrlParams(dataRequest)
            }
            if (optionHeader) {
                optionRequest.headers = {
                    ...optionRequest.headers,
                    ...optionHeader
                }
            }
            fetch(url.trim(), { ...optionRequest })
                .then((res) => { return res.json() })
                .then((response) => {
                    resolve(response)
                })
                .catch(error => console.log(error))
        })
    } catch (error) {
        console.log("thangtran.error.fetchGet:", { url, dataRequest, optionHeader })
    }
}

export const fetchPost = ({ url, dataRequest, optionHeader }) => {

    const optionRequest = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    return new Promise(function (resolve, reject) {
        if (!url) reject("Url not found")

        if (optionHeader) {
            optionRequest.headers = {
                ...optionRequest.headers,
                ...optionHeader
            }
        }

        fetch(url, { ...optionRequest, body: JSON.stringify(dataRequest) })
            .then((res) => { return res.json() })
            .then((response) => {
                resolve(response)
            })
            .catch(error => reject(error))
    })
}

export const fetchPut = ({ url, dataRequest, optionHeader }) => {

    const optionRequest = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    return new Promise(function (resolve, reject) {
        if (!url) reject("Url not found")

        if (optionHeader) {
            optionRequest.headers = {
                ...optionRequest.headers,
                ...optionHeader
            }
        }
        fetch(url, { ...optionRequest, body: JSON.stringify(dataRequest) })
            .then((res) => {
                if (res.status === 204 || res.status === 200 || res.status === 304)
                    return true
            })
            .then((response) => {
                resolve(response)
            })
            .catch(error => reject(error))
    })
}


export const fetchDelete = ({ url, dataRequest, optionHeader }) => {

    const optionRequest = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    return new Promise(function (resolve, reject) {
        if (!url) reject("Url not found")

        if (dataRequest) {
            url = url + '?' + getUrlParams(dataRequest)
        }

        if (optionHeader) {
            optionRequest.headers = {
                ...optionRequest.headers,
                ...optionHeader
            }
        }

        fetch(url, { ...optionRequest })
            .then((res) => { return res })
            .then((response) => {
                resolve(response)
            })
            .catch(error => console.log(error))
    })
}