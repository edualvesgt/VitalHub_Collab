import { DoctorPhoto } from "../Logo/StyleLogo";
import { DataUser, HeaderBox, HeaderContainer, NameUser, TextDefault, } from "./StyleHeader";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";


export function Header({ navigation, foto }) {
    async function profileLoad() {

        const token = await userDecodeToken();
        setName(token.name)
    }
    
    useEffect(() => {
        profileLoad();
    }, [])

    const [name, setName] = useState("")

    return (


        <HeaderContainer>
            <HeaderBox onPress={() => navigation.navigate("Profile")}>
                <DoctorPhoto source={foto} />
                <DataUser>
                    <TextDefault>Bem Vindo </TextDefault>
                    <NameUser>{name}</NameUser>
                </DataUser>
            </HeaderBox>
            <MaterialIcons
                name="notifications"
                size={30}
                color="#FBFBFB"
                style={{ marginTop: "22%", marginRight: 20 }}
            />
        </HeaderContainer>
    )
}