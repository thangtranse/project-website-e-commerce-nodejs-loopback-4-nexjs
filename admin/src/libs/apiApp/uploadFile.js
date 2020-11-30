import { API, LocalStorage, SETTING } from "src/constants";

export const UploadFile = (file) => {
    return new Promise((resolve, reject) => {
        let tokenData = JSON.parse(localStorage.getItem(LocalStorage.STATE_LOADER));
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', API.uploadFile);
            xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData.user.userToken);
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                if (response && response.files && response.files.length > 0) {
                    resolve({ data: { link: SETTING.URL_IMAGE_PATH_SERVER + "/" + response.files[0].originalname, path: URL.createObjectURL(file), ...response.files[0] } });
                } else {
                    reject(response)
                }
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                console.log("thangtran.error.uploadFile", error)
                reject(error);
            });
        } catch (error) {
            console.log("thangtran.error.uploadFile.catch", error)
        }
    }
    );
}