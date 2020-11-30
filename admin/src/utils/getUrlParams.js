/**
 * Conver object sang params để cho method GET
 * {firstName: "tran", lastName: "Thang"} => firstName="tran"&lastName="Thang"
 */
export default (params) => Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + (typeof params[k] === 'string' ? encodeURIComponent(params[k]) : JSON.stringify(params[k])))
    .join('&');
