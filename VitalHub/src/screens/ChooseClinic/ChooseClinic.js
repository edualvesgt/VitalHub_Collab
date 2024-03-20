
import CardClinic from "../../components/CardClinic/CardClinic"
import { ContainerClinic, FlatListClinic } from "../../components/Container/StyleContainer"
import { Title } from "../../components/Title/StyleTitle"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Links/StyleLink"
import { useState } from "react"

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
    const [select, setSelected] = useState('')
    return (
        <ContainerClinic>
            <Title>Selecionar Clinica </Title>


            <FlatListClinic
                data={rawData}
                renderItem={({ item }) =>
                    <CardClinic
                        select={select}
                        onPress={() => { setSelected(item.name) }}
                        review={item.review}
                        location={item.location}
                        name={item.name}
                        time={item.time}
                    />} />

            <Button  onPress={() => navigation.navigate('ChooseDoctor')}>
                <ButtonTitle >Continuar</ButtonTitle>
            </Button>
            <LinkCancel  onPress={() => navigation.navigate('Main')}> Cancelar </LinkCancel>
        </ContainerClinic>
    )
}