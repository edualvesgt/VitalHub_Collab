import axios from "axios"

//Declarar a porta da api 
const portaAPI = '4466'

//Declarar Ip da maquina 
const ip = "172.16.39.112"

//definir base de URL de acesso da api
const baseUrlLocal = `http://${ip}:${portaAPI}/api`

//config axios 
 const api = axios.create({
    baseURL : baseUrlLocal,
    timeout: 3000
})


export const LoginResorce = "/Login"

export const ListClinicResorce = "/Clinica/ListarTodas"

export default api;

