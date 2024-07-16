//React imports
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Quotes from './RandomQuote';
import CurrentDate from './CurrentDate';
import CurrentWeather from './CurrentWeather';

export default function HomePage(){

    return (
        <div>
            <Container 
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/gymmer.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh', 
                    maxWidth: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40
                }}
            >
                <Box sx={{
                    width:'100vw',
                    borderRadius: '15px',
                    padding:2, 
                    backgroundColor: 'white',
                    opacity: 1,
                }}>
                    <h1>Welcome to Fitworks!</h1>  
                    <Quotes />
                    <br></br>     
                    <hr style={{width: '40%'}}></hr>
                    <br></br>     
                    <CurrentDate />     
                    <CurrentWeather />   
                </Box>
            </Container>
        </div>
    )
}
