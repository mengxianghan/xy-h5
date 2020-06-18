const api = {}
const registerApi = (req) => {
    req.keys().forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        const options = () => {
            const config = req(filename)
            return config.default || config
        }
        api[name] = options()
    })
}

registerApi(require.context('./modules', false, /[A-Za-z]+\.(js)$/))

export default api
