import React from 'react';
import { Box, Container, styled, Theme } from '@mui/material';
import DiamondCalculator from './diamond-calculator/DiamondCalculator';

const ImageBackground = styled(Box)(({ imageurl }: { imageurl: string }) => ({
  backgroundImage: `url(${imageurl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));
const MainBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  padding: '150px 50px',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: '50px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
  },
}));

const App = () => {
  return (
    <ImageBackground imageurl="diamond.jpg">
      <Container maxWidth="md">
        <MainBox>
          <DiamondCalculator />
        </MainBox>
      </Container>
    </ImageBackground>
  );
};

export default App;
