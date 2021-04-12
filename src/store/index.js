import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const registerApi = (req) => {
    req.keys().forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        const options = () => {
            const config = req(filename)
            return config.default || config
        }
        modules[name] = options()
    })
}

registerApi(require.context('./modules/', false, /[A-Za-z]+\.(js)$/))


export default new Vuex.Store({
    state: {},
    getters: {},
    actions: {},
    modules
})
