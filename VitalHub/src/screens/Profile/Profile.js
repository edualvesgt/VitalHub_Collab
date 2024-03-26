import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container, DoubleView, InputContainer } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderContent, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { ModalTitle } from "../../components/Modal/Modal"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ButtonLogout, ContainerForm, ScrollForm } from "./StyleProfile"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Profile = ({ navigation }) => {

    async function profileLoad() {

        const token = await userDecodeToken();

        console.log(token)
        setName(token.name)
        setEmail(token.email)
        console.log(email);
    }

    useEffect(() => {
        profileLoad();
    }, [])

    async function profileLogout(token) {
        try {
            const token = await userDecodeToken();
            await AsyncStorage.removeItem("token", navigation.replace("Login"))
            // await AsyncStorage.getItem("token", console.log(token) )
        } catch (error) {
            console.log(error)
        }
    }

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")



    return (

        <Container>
            <HeaderContainer>
                <HeaderPhoto source={require("../../assets/PhotoProfile.png")} />
            </HeaderContainer>

            <ModalTitle>
                <Title>{name}</Title>
                <TextAccount>{email}</TextAccount>
            </ModalTitle>

            <ScrollForm>

                <BoxInput
                    textLabel={"Data de Nascimento"}
                    placeholder={"01/01/2000"}
                />
                <BoxInput
                    textLabel={"CPF"}
                    placeholder={"000.000.000-00"}
                />

                <BoxInput
                    textLabel={"Endereco"}
                    placeholder={"Rua Fulano de Tal"}
                />

                <DoubleView>
                    <BoxInput
                        fieldWidth={40}
                        textLabel={"CEP"}
                        placeholder={"00000-00"}
                    />
                    <BoxInput
                        fieldWidth={40}
                        textLabel={"Cidade"}
                        placeholder={"Brazolas"}
                    />
                </DoubleView>

                <InputContainer>
                    <Button>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </Button>

                </InputContainer>

                <ButtonLogout onPress={() => { profileLogout() }}>
                    <ButtonTitle>SAIR DO APP</ButtonTitle>
                </ButtonLogout>

            </ScrollForm>
        </Container>

    )
}