/**
 * 获取地址栏参数
 * @param url
 * @returns {{}|any}
 */
export const getQueryParams = (url) => {
    url = url ?? window.location.href
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}')
}
