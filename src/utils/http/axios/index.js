import Axios from './axios'

function createAxios() {
    return new Axios({
        config: {},
        requestOptions: {}
    })
}

export const defHttp = createAxios()
