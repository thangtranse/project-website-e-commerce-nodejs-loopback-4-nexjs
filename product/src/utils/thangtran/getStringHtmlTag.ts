/**
 * Loại bỏ các phần tử thẻ HTML ra khỏi "String"
 * <html> <body> Javascript<body> is not Java' => Javascript is not Java
 */
export const cleanTag = (str) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}
