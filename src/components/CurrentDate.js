import dayjs from 'dayjs';

export default function CurrentDate(){
    const today = dayjs().format('DD/MM/YYYY');
    const time = dayjs().format('HH:mm');

        return(
            <div>
            <strong> Today:</strong>  {today}, {time} 
            </div>
        )
}