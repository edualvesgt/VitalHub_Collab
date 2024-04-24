import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { Input } from "../../components/Input/StyleInput"
import { LinkCancel, LinkCode } from "../../components/Links/StyleLink"
import { Logo } from "../../components/Logo/StyleLogo"
import { TextAccount, TextCreate } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import api from "../../services/services"

export const CreateAccount = ({ navigation }) => {
    async function CreateAccount(params) {
        const response = await api.post("/Pacientes", {})
    }
    return (
        <Container>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Criar Conta</Title>
            <TextCreate>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextCreate>

            <Input placeholder = {"Usuario ou Email"}/>
            <Input placeholder = {"Senha"}/>
            <Input placeholder = {"Confirmar Senha"}/>

            <Button>
                <ButtonTitle>Cadastrar</ButtonTitle>
            </Button>

            <LinkCancel onPress = {() => navigation.navigate("Login")}>Cancelar</LinkCancel>
        </Container>
    )


}