import { AntDesign } from '@expo/vector-icons'
import { TextAbout, TextAccount, TextYellow } from "../Text/Text"
import { AllStatusBox, CardBoxClinic, CardBoxClinicSelected, TextCardBox } from "./StyleCardClinic"
import { View } from 'react-native'
import { StatusCalendar } from '../Status/Status'

const CardClinic = ({ time, name, location, review, select , onPress}) => {

    if (select !== name) {
        return (
            <CardBoxClinic onPress={onPress}>

                <TextCardBox>
                    <TextAccount>{name}</TextAccount>
                    <TextAbout>{location} </TextAbout>
                </TextCardBox>

                <AllStatusBox>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                            name="star"
                            size={20}
                            color={"#F9A620"}
                        />
                        <TextYellow>{review}</TextYellow>
                    </View>

                    <StatusCalendar time={time} />
                </AllStatusBox>

            </CardBoxClinic>
        )
    } else {
        return (
            <CardBoxClinicSelected>
                <TextCardBox>
                    <TextAccount>{name}</TextAccount>
                    <TextAbout>{location} </TextAbout>
                </TextCardBox>

                <AllStatusBox>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                            name="star"
                            size={20}
                            color={"#F9A620"}
                        />
                        <TextYellow>{review}</TextYellow>
                    </View>

                    <StatusCalendar time={time} />
                </AllStatusBox>
            </CardBoxClinicSelected>

        )
    }


}

export default CardClinic;
