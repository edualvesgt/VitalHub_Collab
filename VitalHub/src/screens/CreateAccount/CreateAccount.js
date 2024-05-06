import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, ButtonTitle } from "../../components/Button/Button";
import { Container, ContainerItens } from "../../components/Container/StyleContainer";
import { Input } from "../../components/Input/StyleInput";
import { LinkCancel } from "../../components/Links/StyleLink";
import { Logo } from "../../components/Logo/StyleLogo";
import { TextCreate } from "../../components/Text/Text";
import { Title } from "../../components/Title/StyleTitle";
import api from "../../services/services";
import { ScrollCreate } from "../Profile/StyleProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notification } from "../../components/Notification/Notification";

export const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar mensagens de erro

    // Função para validar os campos antes do envio
    const validateFields = () => {
        if (!email || !password || !confirm || !name) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return false;
        }
        if (password !== confirm) {
            setErrorMessage("As senhas não correspondem.");
            return false;
        }
        return true;
    };

    async function Create() {
        if (!validateFields()) {
            return; // Se os campos não forem válidos, interrompe a função
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('Rg', null);
        formData.append('Cpf', null);
        formData.append('DataNascimento', "");
        formData.append('Cep', null);
        formData.append('Logradouro', null);
        formData.append('Numero', "");
        formData.append('Nome', name);
        formData.append('Email', email);
        formData.append('Senha', password);
        formData.append('Cidade', null);
        formData.append('IdTipoUsuario', '3D98ECF8-CC99-40E8-BDC4-7F1AF1FDC5EF');
        formData.append('Foto', null);
        formData.append('File', "");

        try {
            const response = await api.post('/Pacientes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            if (response.status === 200) {
                Notification("Usuário Cadastrado", "Sucesso");
                await Login();
                Notification("Usuário Cadastrado");
            }
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    async function Login() {
        setLoading(true);

        try {
            const response = await api.post('/Login', {
                email: email,
                senha: password
            });

            await AsyncStorage.setItem("token", JSON.stringify(response.data));
            navigation.replace("Profile");
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <ScrollCreate>
                <ContainerItens>
                    <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
                    <Title>Criar Conta</Title>
                    <TextCreate>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextCreate>

                    <Input
                        value={name}
                        onChangeText={(txt) => { setName(txt) }}
                        placeholder={"Informe seu Nome"}
                    />
                    <Input
                        value={email}
                        onChangeText={(txt) => { setEmail(txt) }}
                        placeholder={"Informe seu Email"}
                    />

                    <Input
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(txt) => { setPassword(txt) }}
                        placeholder={"Digite Sua senha"}
                    />

                    <Input
                        value={confirm}
                        secureTextEntry={true}
                        onChangeText={(txt) => { setConfirm(txt) }}
                        placeholder={"Confirmar Senha"}
                    />

                    {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>} {/* Exibe a mensagem de erro se houver */}

                    <Button onPress={() => Create()}>
                        <ButtonTitle>{loading ? <ActivityIndicator size="small" color="#ffffff" /> : "Cadastrar"}</ButtonTitle>
                    </Button>

                    <LinkCancel onPress={() => navigation.navigate("Login")}>Cancelar</LinkCancel>
                </ContainerItens>
            </ScrollCreate>
        </Container>
    );
};
