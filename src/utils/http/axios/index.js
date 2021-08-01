import Axios from './axios'

function createAxios() {
    return new Axios()
}

export const defHttp = createAxios()
