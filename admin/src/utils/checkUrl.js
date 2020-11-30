const checkUrlFacebook = (url) => {
    const regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
    return regex.test(url)
}

const checkUrlInstagram = (url) => {
    const regex = /(https?:\/\/(?:www\.)?instagram\.com\/([^/?#&]+)).*/
    return regex.test(url)
}

const checkUrlTwitter = (url) => {
    const regex = /(https?:\/\/(?:www\.)?twitter\.com\/([^/?#&]+)).*/
    return regex.test(url)
}

export {
    checkUrlFacebook,
    checkUrlInstagram,
    checkUrlTwitter
}