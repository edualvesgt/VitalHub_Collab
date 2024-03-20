import {AntDesign} from '@expo/vector-icons'
import {FontAwesome6} from '@expo/vector-icons'
import { TextCardGray, TextCardGreen, TextCardWater } from '../Text/Text';
import { CardGray, CardGreen, CardWater } from './StyleStatus';


export const StatusGreen = ({time}) => {
    return (
        <CardGreen>
            <AntDesign
                name="clockcircle"
                size={14}
                color={"green"}
                />
            <TextCardGreen>{time}</TextCardGreen>
        </CardGreen>
    )
}

export const StatusGray = ({time}) => {
    return (
        <CardGray>
             <AntDesign
                name="clockcircle"
                size={14}
                color={"gray"}
                />            
            <TextCardGray>{time}</TextCardGray>
        </CardGray>
    )
}
export const StatusCalendar = ({time}) => {
    return (
        <CardWater>
             <FontAwesome6
                name="calendar-day"
                size={14}
                color={"#49B3BA"}
                />            
            <TextCardWater>{time}</TextCardWater>
        </CardWater>
    )
}