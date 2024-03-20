import { Image } from "react-native"
import { Button, ButtonBack, ButtonTitle } from "../../components/Button/Button"
import { CheckEmail, Container } from "../../components/Container/StyleContainer"
import { InputCheck } from "../../components/Input/StyleInput"
import { LinkCode } from "../../components/Links/StyleLink"
import { Logo } from "../../components/Logo/StyleLogo"
import { TextColor, TextForgot } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"

export const VerifyEmail = ({navigation}) => {
    return (
        <Container>
            <ButtonBack onPress={() => navigation.navigate('Login')}>
            <Image source={require("../../assets/ExitButton.png")}  />
            </ButtonBack>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Verifique seu Email</Title>
            <TextForgot>
                Digite o código de 4 dígitos enviado para <TextColor>username@email.com</TextColor>
            </TextForgot>

            <CheckEmail>
                <InputCheck placeholder={"0"} />
                <InputCheck placeholder={"0"} />
                <InputCheck placeholder={"0"} />
                <InputCheck placeholder={"0"} />
            </CheckEmail>

            <Button onPress={() => navigation.navigate('ChangePassword')}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <LinkCode>Reenviar Codigo</LinkCode>
        </Container>
    )
}