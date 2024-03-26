import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container, DoubleView, InputContainer } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderContent, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { ModalTitle } from "../../components/Modal/Modal"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ContainerForm, ScrollForm } from "./StyleProfile"
import { userDecodeToken } from "../../utils/Auth"

export const Profile = ({ navigate }) => {

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

    const [name, setName] = useState("")
<<<<<<< HEAD
=======
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")

>>>>>>> 55b3a513796543f782e25e094373cb56897a5e14

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

            </ScrollForm>
        </Container>

    )
}