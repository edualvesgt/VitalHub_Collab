import axios from "axios"

//Declarar a porta da api 
const portaAPI = '4466'

//Declarar Ip da maquina 
const ip = "172.16.39.115"

//definir base de URL de acesso da api
const baseUrlLocal = `http://${ip}:${portaAPI}/api`

//config axios 
 const api = axios.create({
    baseURL : baseUrlLocal,
})

export default api;

