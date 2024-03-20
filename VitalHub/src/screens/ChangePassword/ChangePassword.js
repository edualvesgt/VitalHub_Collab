import { Image } from "react-native"
import { Button, ButtonBack, ButtonTitle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { Logo } from "../../components/Logo/StyleLogo"
import { Title } from "../../components/Title/StyleTitle"
import { Input } from "../../components/Input/StyleInput"
import { TextForgot, TextPassword } from "../../components/Text/Text"

export const ChangePassword = ({navigation}) => {

    return(
        <Container>
            <ButtonBack onPress={() => navigation.navigate('Login')}>
            <Image source={require("../../assets/ExitButton.png")}  />
            </ButtonBack>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Redefina Sua Senha</Title>
            <TextPassword>Insira e confirme a sua nova senha</TextPassword>
            <Input placeholder ={"Digite Sua Nova Senha"}/>
            <Input placeholder ={"Digite Novamente"}/>
            <Button onPress={() => navigation.navigate('Login')}>
                <ButtonTitle> Confirmar Nova Senha</ButtonTitle>
            </Button>
        </Container>
    )
}