import { LinkMedium, TextLink } from "../../components/Links/StyleLink"
import { Button, ButtonGoogle, ButtonTitle, ButtonTitleGoogle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { ContentAccount } from "../../components/ContentAccount/StyleContentAccount"
import { Input } from "../../components/Input/StyleInput"
import { GoogleLogo, Logo } from "../../components/Logo/StyleLogo"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { useState } from "react"
import api, { LoginResorce } from "../../services/services"
import AsyncStorage from '@react-native-async-storage/async-storage'


export const Login = ({ navigation }) => {

    async function Login() {
        console.log("Comecou a funcao");

        // Chamar api
        try {
<<<<<<< HEAD
            const response = await api.post('/Login', {
                email: 'medico@medico',
                senha: 'medico'
=======
            const response = await api.post("/Login", {
                email: 'renato@email.com',
                senha: 'renato@email.com'
>>>>>>> 55b3a513796543f782e25e094373cb56897a5e14
            })
            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            console.log(response);
            navigation.replace("Main")
        } catch (error) {
            console.log(error);
        }


    }
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState()


    return (
        <Container>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Entrar ou Criar Conta</Title>
            <Input
                placeholder={"Usuario ou Email"}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            // onChange ={event => event.native}
            />
            <Input
                placeholder={"Senha"}
                secureTextEntry={true}
            />
            <LinkMedium onPress={() => navigation.navigate('ForgotPassword')}>Esqueceu Sua Senha?</LinkMedium>


            <Button onPress={() => { Login() }}>
                <ButtonTitle> Entrar</ButtonTitle>
            </Button>

            <ButtonGoogle>
                <GoogleLogo source={require('../../assets/GOOGLE.png')} />
                <ButtonTitleGoogle> Login with Google</ButtonTitleGoogle>
            </ButtonGoogle>


            <ContentAccount>
                <TextAccount>Não tem conta?
                    <TextLink onPress={() => navigation.navigate('CreateAccount')}>Crie uma conta agora!</TextLink> </TextAccount>
            </ContentAccount>
        </Container>
    )


}