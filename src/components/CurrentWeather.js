import * as React from 'react';


export default function CurrentWeather(){
        const[temperature, setTemperature] = React.useState('');
        const[weather, setWeather] = React.useState('');
        const[image, setImage] = React.useState('');
        

        React.useEffect(() => {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=Helsinki,fi&units=metric&APPID=5a00724f1104fa2953b06e8198eadca9')
            .then(response => response.json())
            .then(responseData => {
              setTemperature(responseData.main.temp);
              setWeather(responseData.weather[0].description);
              setImage(responseData.weather[0].icon);
        })
        .catch(err => console.error(err))
      })
      const imgUrl = 'https://openweathermap.org/img/wn/' + image + '.png';

          return(
            <div> 
            <p><strong>Temperature: </strong>{temperature} celcius</p>
            <p><strong>Weather: </strong>{weather}</p>
            <img src= {imgUrl} alt='weather-sign'/>
            
            </div>
          );
          }
    