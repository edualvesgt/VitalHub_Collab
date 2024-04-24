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
import { userDecodeToken } from "../../utils/Auth";

export const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState("teste5@teste.com");
    const [password, setPassword] = useState("teste5@teste.com");
    const [confirm, setConfirm] = useState("teste5@teste.com");
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

    async function Create() {
        const formData = new FormData();
        formData.append('Rg', null);
        formData.append('Cpf', null);
        formData.append('DataNascimento', "");
        formData.append('Cep', null);
        formData.append('Logradouro', null);
        formData.append('Numero', "");
        formData.append('Nome', null);
        formData.append('Email', email);
        formData.append('Senha', password);
        formData.append('Cidade', null);
        formData.append('IdTipoUsuario', '3D98ECF8-CC99-40E8-BDC4-7F1AF1FDC5EF');
        formData.append('Foto', null);
        formData.append('File', '');

        try {
            if (password === confirm) {
                setLoading(true); // Inicia o carregamento
                const response = await api.post('/Pacientes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                if (response.status === 200) {
                    await Login(); // Chama o login após o cadastro
                }
            }
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    }

    async function Login() {
        setLoading(true); // Inicia o carregamento

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
            setLoading(false); // Finaliza o carregamento
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
                        value={email}
                        onChangeText={(txt) => { setEmail(txt) }}
                        placeholder={"Usuario ou Email"}
                    />

                    <Input
                        value={password}
                        onChangeText={(txt) => { setPassword(txt) }}
                        placeholder={"Senha"}
                    />

                    <Input
                        value={confirm}
                        onChangeText={(txt) => { setConfirm(txt) }}
                        placeholder={"Confirmar Senha"}
                    />

                    {/* Botão de cadastro com texto dinâmico de acordo com o estado de carregamento */}
                    <Button onPress={() => Create()}>
                        <ButtonTitle>{loading ? <ActivityIndicator size="small" color="#ffffff" /> : "Cadastrar"}</ButtonTitle>
                    </Button>

                    <LinkCancel onPress={() => navigation.navigate("Login")}>Cancelar</LinkCancel>
                </ContainerItens>
            </ScrollCreate>
        </Container>
    );
};
