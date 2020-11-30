export default (url_string, searchKey) => {
    const url = new URL(url_string);
    return url.searchParams.get(searchKey);
}