import { Image } from "react-native"
import { Button, ButtonBack, ButtonTitle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { Logo } from "../../components/Logo/StyleLogo"
import { Title } from "../../components/Title/StyleTitle"
import { Input } from "../../components/Input/StyleInput"
import { TextPassword } from "../../components/Text/Text"
import { useState } from "react"
import api from "../../services/services"

export const ChangePassword = ({ navigation, route }) => {

    const [email, setEmail] = useState('')

    const [senha, setSenha] = useState("")
    const [confirmar, setConfirmar] = useState("")

    async function UpdatePassword() {
        
        if (senha === confirmar) {
            await api.put(`/Usuario/AlterarSenha?email=${route.params.email}`,{
                senhaNova : senha
            }).then(()=> {
                navigation.navigate('Login')
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <Container>
            <ButtonBack onPress={() => navigation.navigate('Login')}>
                <Image source={require("../../assets/ExitButton.png")} />
            </ButtonBack>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Redefina Sua Senha</Title>
            <TextPassword>Insira e confirme a sua nova senha</TextPassword>

            <Input
                value={senha}
                placeholder={"Digite Sua Nova Senha"}
                onChangeText={(txt) => setSenha(txt)}

            />

            <Input
                value={confirmar}
                placeholder={"Digite Novamente"}
                onChangeText={(txt) => setConfirmar(txt)}
                
                
            />
            <Button onPress={() => UpdatePassword()}>
                <ButtonTitle> Confirmar Nova Senha</ButtonTitle>
            </Button>
        </Container>
    )
}