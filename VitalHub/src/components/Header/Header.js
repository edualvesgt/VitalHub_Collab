import { DoctorPhoto } from "../Logo/StyleLogo";
import { DataUser, HeaderBox, HeaderContainer,  NameUser, TextDefault,  } from "./StyleHeader";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export function Header({navigation}) {
    return (


        <HeaderContainer>
            <HeaderBox onPress = {() => navigation.navigate("Profile")}>
                <DoctorPhoto source={require("../../assets/PhotoProfile.png")} />
                <DataUser>
                    <TextDefault>Bem Vindo </TextDefault>
                    <NameUser>Dr Eduardo</NameUser>
                </DataUser>
            </HeaderBox>
            <MaterialIcons
                name="notifications"
                size={30}
                color="#FBFBFB" 
                style={{ marginTop: "22%",marginRight: 20 }}
                />
        </HeaderContainer>
    )
}