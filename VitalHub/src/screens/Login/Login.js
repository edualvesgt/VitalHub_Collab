import { LinkMedium, TextLink } from "../../components/Links/StyleLink"
import { Button, ButtonGoogle, ButtonTitle, ButtonTitleGoogle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { ContentAccount } from "../../components/ContentAccount/StyleContentAccount"
import { Input } from "../../components/Input/StyleInput"
import { GoogleLogo, Logo } from "../../components/Logo/StyleLogo"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"

export const Login = ({ navigation }) => {


    async function Login() {
        navigation.replace("Main")
    }

    return (
        <Container>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Entrar ou Criar Conta</Title>
            <Input
                placeholder={"Usuario ou Email"}
            />
            <Input
                placeholder={"Senha"}
                secureTextEntry={true}
            />
            <LinkMedium onPress={() => navigation.navigate('ForgotPassword')}>Esqueceu Sua Senha?</LinkMedium>


            <Button onPress = {() => {Login()}}>
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