import { useEffect, useState } from "react"
import CardDoctor from "../../components/CardDoctor/CardDoctor"
import { ContainerClinic, FlatListClinic } from "../../components/Container/StyleContainer"
import { Title } from "../../components/Title/StyleTitle"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Links/StyleLink"
import api from "../../services/services"

export const ChooseDoctor = ({ navigation }) => {

    const [select, setSelected] = useState('')

    const rawData = [
        {
            name: "Doutor Eduardo ",
            field: "Pediatra"
        },
        {
            name: "Doutor Carlos ",
            field: "Cardiologista"
        },
        {
            name: "Doutora Ana",
            field: "Gine"
        },
        {
            name: "Doutor Pedro  ",
            field: "Geral"
        },
        {
            name: "Doutor Bezerra ",
            field: "Podologo"
        },
        {
            name: "Doutor Sidao  ",
            field: "Ortopedista"
        },

    ]

    const [listDoctor, setListDoctor] = useState([])

    async function ListDoctors() {
        //Instanciar A chamada da Api

        await api.get('/Medicos')
            .then(response => {
                setListDoctor(response.data)

                // console.log("oiiiii");
                // console.log(response.data);

            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        ListDoctors()
    }, [])

    return (
        <ContainerClinic>
            <Title>Selecionar Medico </Title>

            <FlatListClinic
                data={listDoctor}
                keyExtractor={(item) => item.id}
                renderItem={ ({ item }) => (
                    <CardDoctor
                        select={select}
                        onPress={() => { setSelected(item.idNavigation.nome) }}
                        name={item.idNavigation.nome}
                        field={item.especialidade.especialidade1}
                    />
                )}
            />


            <Button onPress={() => navigation.navigate('ChooseData')}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>
            <LinkCancel onPress={() => navigation.navigate('Main')}> Cancelar </LinkCancel>

        </ContainerClinic>
    )
} 