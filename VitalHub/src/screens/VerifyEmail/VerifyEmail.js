import { Image } from "react-native"
import { Button, ButtonBack, ButtonTitle } from "../../components/Button/Button"
import { CheckEmail, Container } from "../../components/Container/StyleContainer"
import { InputCheck } from "../../components/Input/StyleInput"
import { LinkCode } from "../../components/Links/StyleLink"
import { Logo } from "../../components/Logo/StyleLogo"
import { TextColor, TextForgot } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { useEffect, useRef, useState } from "react"
import api from "../../services/services"

export const VerifyEmail = ({ navigation, route }) => {

    // Referências para os campos de entrada
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    // Estado para armazenar o código digitado
    const [codigo, setCodigo] = useState("")

    // Função para mover o foco para o próximo campo
    function focusNextInput(index) {
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }

    // Função para mover o foco para o campo anterior
    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    // Função para validar o código e navegar para a próxima tela
    async function ValidateCode() {
        console.log(codigo);

        try {
            // Chama a API para validar o código
            await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoDeSenha?email=${route.params.emailRecovery}&code=${codigo}`)
            // Se a validação for bem-sucedida, navega para a próxima tela
            navigation.navigate('ChangePassword', { email: route.params.emailRecovery })
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.log(error);
        }
    }

    useEffect(() => {
        inputs[0].current.focus()
    }, []);


    return (
        <Container>
            <ButtonBack onPress={() => navigation.navigate('Login')}>
                <Image source={require("../../assets/ExitButton.png")} />
            </ButtonBack>
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Verifique seu Email</Title>
            <TextForgot>
                Digite o código de 4 dígitos enviado para <TextColor>{route.params.emailRecovery}</TextColor>
            </TextForgot>

            <CheckEmail>
                {
                    // Renderiza os campos de entrada para cada dígito do código
                    [0, 1, 2, 3].map((index) => (
                        <InputCheck
                            key={index}
                            ref={inputs[index]}
                            keyboardType='numeric'
                            placeholder={"0"}
                            maxLength={1}
                            caretHidden={true}
                            // Quando o texto do campo muda
                            onChangeText={(text) => {
                                if (text == "") {
                                    // Se o texto for vazio, move o foco para o campo anterior
                                    focusPrevInput(index)
                                } else {
                                    // Se o texto não for vazio, atualiza o código e move o foco para o próximo campo
                                    const newCode = [...codigo]
                                    newCode[index] = text
                                    setCodigo(newCode.join(''))
                                    focusNextInput(index)
                                }
                            }}
                        />
                    ))
                }
            </CheckEmail>

            <Button onPress={() => ValidateCode()}>
                <ButtonTitle>Enviar</ButtonTitle>
            </Button>

            <LinkCode>Reenviar Codigo</LinkCode>
        </Container>
    )
}
