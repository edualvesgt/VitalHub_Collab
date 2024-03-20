import { Image } from "react-native"
import { Button, ButtonBack, ButtonTitle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { Input } from "../../components/Input/StyleInput"
import { Logo } from "../../components/Logo/StyleLogo"
import { TextForgot } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"

export const ForgotPassword = ({navigation}) => {
    return (
        <Container>
            <ButtonBack onPress={() => navigation.navigate('Login')}>
            <Image source={require("../../assets/ButtonBack.png")}  />
            </ButtonBack>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />

            <Title> Recuperar Senha </Title>

            <TextForgot>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextForgot>
            <Input
                placeholder={"Usuario ou Email"}
            />

            <Button onPress={() => navigation.navigate('VerifyEmail')}>
                <ButtonTitle> Continuar</ButtonTitle>
            </Button>
        </Container>
    )

}