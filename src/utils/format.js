/**
 * 格式化文本域内容，支持换行
 * @param content
 * @return {string}
 */
export function formatTextarea(content = '') {
    return content.replace(/\n|\r\n/g, '<br/>')
}
