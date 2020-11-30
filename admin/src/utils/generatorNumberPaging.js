/**
 * Làm tròn  số nếu số phia hết cho 10 là thập phân thì cộng thêm cho 1
 * @param {*} number 
 */
module.exports = (number, perPage) => {
    let cal = number / perPage;
    return parseInt(cal < 1 ? 1 : cal % 1 === 0 ? cal : cal + 1)
}