import axios from "axios"

//Declarar a porta da api 
const portaAPI = '4466'

//Declarar Ip da maquina 
<<<<<<< HEAD
const ip = "172.16.39.112"
=======
const ip = "172.16.38.31"
>>>>>>> bfc1e84da9ecd2b4685fe2e78c57eae6ffc8a91f

//definir base de URL de acesso da api
const baseUrlLocal = `http://${ip}:${portaAPI}/api`

//config axios 
 const api = axios.create({
    baseURL : baseUrlLocal
})


export const LoginResorce = "/Login"

export default api;

