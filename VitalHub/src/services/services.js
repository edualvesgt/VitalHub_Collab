import axios from "axios"

//Declarar a porta da api 
const portaAPI = '4466'

//Declarar Ip da maquina 
<<<<<<< HEAD
const ip = "172.16.39.115"
=======
const ip = "172.16.39.112"
>>>>>>> 55b3a513796543f782e25e094373cb56897a5e14

//definir base de URL de acesso da api
const baseUrlLocal = `http://${ip}:${portaAPI}/api`

//config axios 
 const api = axios.create({
    baseURL : baseUrlLocal,
})


export const LoginResorce = "/Login"

export default api;

