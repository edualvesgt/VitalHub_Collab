
import CardClinic from "../../components/CardClinic/CardClinic"
import { ContainerClinic, FlatListClinic } from "../../components/Container/StyleContainer"
import { Title } from "../../components/Title/StyleTitle"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Links/StyleLink"
import { useEffect, useState } from "react"
import api, { ListClinicResorce } from "../../services/services"

export const ChooseClinic = ({navigation}) => {


    const rawData = [
        {
            name: 'Senai Paulo Skaf',
            location: 'São Caetano do Sul, SP',
            time: 'Seg-Sab',
            review: "5.0"
        },
        {
            name: 'Senai Anchieta',
            location: 'Vila Mariana, SP',
            time: 'Seg-Sab',
            review: "4.0"
        },
        {
            name: 'UMC',
            location: 'Mogi Das Cruzes, SP',
            time: 'Seg-Sab',
            review: "4.5"
        },
        {
            name: 'Clinica Hitler',
            location: 'São Caetano do Sul, SP',
            time: 'Seg-Dom',
            review: "5.0"
        },
        {
            name: 'Bola De Neve SCS',
            location: 'São Caetano do Sul, SP',
            time: 'Qui-Dom',
            review: "5.0"
        }
    ]
    const [listClinic , setListClinic] = useState([])
    const [select, setSelected] = useState('')

    async function ListClinic() {
        await api.get(ListClinicResorce)
        .then(response => {
            setListClinic(response.data)
            console.log("Oiaa a lista das clinicas ");
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        ListClinic();
    }, [])
    return (
        <ContainerClinic>
            <Title>Selecionar Clinica </Title>


            <FlatListClinic
                data={listClinic}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <CardClinic
                        select={select}
                        onPress={() => { setSelected(item.nome) }}
                        // review={item.review}
                        location={item.endereco.logradouro}
                        number={item.endereco.numero}
                        name={item.nomeFantasia}
                        time={item.time}
                    />} />

            <Button  onPress={() => navigation.navigate('ChooseDoctor')}>
                <ButtonTitle >Continuar</ButtonTitle>
            </Button>
            <LinkCancel  onPress={() => navigation.navigate('Main')}> Cancelar </LinkCancel>
        </ContainerClinic>
    )
}