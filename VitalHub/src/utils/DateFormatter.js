import { parse, format } from 'date-fns';

export function convertDateToISO(dateString) {
    // Analisa a data no formato DD/MM/YYYY
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());

    // Formata a data no formato YYYY/MM/DD
    const formattedDate = format(parsedDate, 'yyyy/MM/dd');

    return formattedDate;
}



// export const formatarDataNascimento = (data) => {
//     // Remove tudo que não é dígito
//     data = data.replace(/[^\d]/g, "");

//     // Aplica a formatação
//     if (data.length > 4) {
//         data = data.substring(0, 2) + "/" + data.substring(2, 4) + "/" + data.substring(4, 8);
//     } else if (data.length > 2) {
//         data = data.substring(0, 2) + "/" + data.substring(2, 4);
//     }

//     return data;
// };

// const handleDataNascimentoChange = (text) => {
//     setDataNascimento(formatarDataNascimento(text));
// };



// const formatarDataNascimento = (dataNascimento) => {
//     // Extrai os componentes da data
//     const dia = dataNascimento.substring(0, 2);
//     const mes = dataNascimento.substring(2, 4);
//     const ano = dataNascimento.substring(4);

//     // Formata a data no formato desejado
//     const dataFormatada = `${ano}/${mes}/${dia}`;
    
//     return dataFormatada;
// };

// // Exemplo de uso
// const dataNascimentoFormatada = formatarDataNascimento("27122003");
// console.log(dataNascimentoFormatada); // Saída: "2003/12/27"

