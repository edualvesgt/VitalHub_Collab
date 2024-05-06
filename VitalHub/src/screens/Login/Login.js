import { LinkMedium, TextLink } from "../../components/Links/StyleLink"
import { Button, ButtonGoogle, ButtonTitle, ButtonTitleGoogle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { ContentAccount } from "../../components/ContentAccount/StyleContentAccount"
import { Input } from "../../components/Input/StyleInput"
import { GoogleLogo, Logo } from "../../components/Logo/StyleLogo"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { useEffect, useState } from "react"
import api, { LoginResorce } from "../../services/services"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userDecodeToken } from "../../utils/Auth"
import { ActivityIndicator } from 'react-native';

export const Login = ({ navigation }) => {

    async function Login() {
        // console.log("Comecou a funcao");
        setLoading(true); // Inicia a requisição

        // Chamar api
        try {
            setDisabled(true);
            const response = await api.post('/Login', {
                // email: 'eduardo.silva@gmail.com',
                // senha: 'eduardo.silva@gmail.com'
                email: 'gabriel.victor@gmail.com',
                senha: 'gabriel.victor@gmail.com'
            })


            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            // console.log(response);
            navigation.replace("Main")
        } catch (error) {
            console.log(error);
            setDisabled(false);
        } finally {
            setLoading(false)
        }


    }

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState()

    async function test() {
        const token = await userDecodeToken();
        // console.log(token);
    }

    useEffect(() => {
        test()
    }, [])

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false)

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


            <Button onPress={() => { Login() }} disabled={disabled}>
                <ButtonTitle> {loading ? <ActivityIndicator size="small" color="#ffffff" /> : "Entrar"}</ButtonTitle>
            </Button>

            <ButtonGoogle >
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