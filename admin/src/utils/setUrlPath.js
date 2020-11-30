export default (slug) => {
    slug = slug.toLowerCase()
    slug = slug.trim()
    slug = slug.replace(/ /g, '-')
    slug = slug.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    return slug;
}