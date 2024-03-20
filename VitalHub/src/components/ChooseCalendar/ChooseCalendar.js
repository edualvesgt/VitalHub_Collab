import React, { useState } from 'react';
import { Text } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';

// Configuração de localização para o idioma inglês
LocaleConfig.locales['en'] = {
    monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dev.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    today: "Today"
};

// Define o idioma padrão como inglês
LocaleConfig.Locales = 'en';

// Componente funcional ChooseCalendar
const ChooseCalendar = () => {
    // Estado para armazenar a data selecionada
    const [selected, setSelected] = useState('')

    const isFutureDate = (dateString) => {
        const selectedDate = new Date(dateString);
        const currentDate = new Date();
        return selectedDate > currentDate;
    };

    return (
        <Calendar
            style={{
                width: '100%',
                aspectRatio: 2,
                backgroundColor: 'white',
                marginBottom: 180,
                marginTop: 35,
            }}
            // Função para atualizar a data selecionada quando um dia é pressionado

            // Função para atualizar a data selecionada quando um dia é pressionado
            onDayPress={day => {
                if (isFutureDate(day.dateString)) {
                    setSelected(day.dateString);
                } else {
                    alert('Por favor, selecione uma data futura.');
                }
            }}

            // Substituir o componente de texto padrão por um personalizado para o título do mês (Linha feita com auxilio do GPT)
            renderHeader={(date) => <Text style={{ fontFamily: 'MontserratAlternates_600SemiBold', fontSize: 18 }}>{date.toString('MMMM yyyy')}</Text>}
            // Oculta as setas de navegação do calendário
            hideArrows={false}

            // Personalização do tema do calendário
            theme={{
                selectedDayBackgroundColor: '#49B3BA',
                selectedDayTextColor: '#FFFFFF',
                dayBackgroundColor: 'transparent'
            }}

            // Marcadores para a data selecionada
            markedDates={{
                [selected]: { selected: true, disableTouchEvent: true }
            }}
        />
    )
}

// Exporta o componente ChooseCalendar como padrão
export default ChooseCalendar;
