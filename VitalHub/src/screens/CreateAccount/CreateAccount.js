import { useState } from "react"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { Input } from "../../components/Input/StyleInput"
import { LinkCancel,  } from "../../components/Links/StyleLink"
import { Logo } from "../../components/Logo/StyleLogo"
import { TextCreate } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import api from "../../services/services"

export const CreateAccount = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")


    async function Create() {

        const formData = new FormData()
        formData.append('Rg', null)
        formData.append('Cpf', null)
        formData.append('DataNascimento', )
        formData.append('Cep', null)
        formData.append('Logradouro', null)
        formData.append('Numero', )
        formData.append('Nome', null)
        formData.append('Email', email)
        formData.append('Senha', password)
        formData.append('Cidade', null)
        formData.append('IdTipoUsuario', '3D98ECF8-CC99-40E8-BDC4-7F1AF1FDC5EF')
        formData.append('Foto', null)
        formData.append('File', '')

        try {
            if (password === confirm) {
                const response = await api.post("/Paciente", formData, {
                    "headers" : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }) 
                if (response.status === 200) {
                    // Redireciona apenas se a requisição for bem-sucedida
                    navigation.Replace("Profile")
                }
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (

        <Container>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Criar Conta</Title>
            <TextCreate>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextCreate>

            <Input
                value={email}
                onChangeText={(txt) => { setEmail(txt) }}
                placeholder={"Usuario ou Email"}
            />

            <Input
                value={password}
                onChangeText={(txt) => { setPassword(txt) }}
                placeholder={"Senha"}
            />


            <Input
                value={confirm}
                onChangeText={(txt) => { setConfirm(txt) }}
                placeholder={"Confirmar Senha"}
            />

            <Button onPress={() => Create()}>
                <ButtonTitle>Cadastrar</ButtonTitle>
            </Button>

            <LinkCancel onPress={() => navigation.navigate("Login")}>Cancelar</LinkCancel>
        </Container>
    )
}