import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container, DoubleView, InputContainer } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderContent, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { ModalTitle } from "../../components/Modal/Modal"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ContainerForm, ScrollForm } from "./StyleProfile"

export const Profile = ({ navigate }) => {

    return (

        <Container>
            <HeaderContainer>
                <HeaderPhoto source={require("../../assets/PhotoProfile.png")} />
            </HeaderContainer>

            <ModalTitle>
                <Title>Richard Kosta</Title>
                <TextAccount>richard.kosta@gmail.com</TextAccount>
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