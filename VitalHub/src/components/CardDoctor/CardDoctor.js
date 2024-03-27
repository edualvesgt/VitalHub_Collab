import { useEffect } from "react";
import {  CardBoxSelect, CardBoxSelected, ImageCard, TextCardBox } from "../Card/StyleCard"
import { Container } from "../Container/StyleContainer"
import { TextAbout, TextAccount } from "../Text/Text"

const CardDoctor = ({  name, field, select, onPress }) => {
    const imageLink = "https://blog.maxtitanium.com.br/wp-content/uploads/2024/01/ramon-dino-fisiculturista-profissional-atleta-max-titanium-2.jpg"; // URL da imagem

    useEffect(() => {
        console.log(name)
    }, [])

    if (select !== name) {
        return (

            <CardBoxSelect onPress={onPress}>
                <ImageCard source={{ uri: imageLink }} />
                <Container>

                    <TextCardBox>
                        <TextAccount>{name}</TextAccount>
                        <TextAbout>{field} </TextAbout>
                    </TextCardBox>

                </Container>


            </CardBoxSelect>
        )

    } else {
        return (
            <CardBoxSelected>
                <ImageCard source={{ uri: imageLink }} />
                <Container>

                    <TextCardBox>
                        <TextAccount>{name}</TextAccount>
                        <TextAbout>{field} </TextAbout>
                    </TextCardBox>

                </Container>
            </CardBoxSelected>
        )
    }

}

export default CardDoctor