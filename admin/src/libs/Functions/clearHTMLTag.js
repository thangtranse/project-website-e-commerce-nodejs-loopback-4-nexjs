/**
 * Loại bỏ thẻ HTML trong Tag
 * @param {*} html 
 */
export const ClearHTMLTag = (html) => {
    return html.replace(/<(?!br\s*\/?)[^>]+>/g, '')
}