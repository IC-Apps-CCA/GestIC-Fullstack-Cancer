import styled from '@emotion/styled';

import { Box as BoxUI } from '@chakra-ui/react';

export const LightContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  background: '#192A51',
  border: "1px",
  borderColor: 'white',
}

export const LightBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  background: 'white',
  maxWidth: '300px',
  padding: '20px',
  margin: '20px',
  borderRadius: '10px',
  color: '#192A51'
}


export const DarkContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  height: '100vh',
  width: '100vw',

  background: '#121212',
}

export const DarkBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  text: 'white',
  maxWidth: '300px',
  background: '#121212',
  borderWidth: '1px',
  padding: '20px',
  margin: '0px',
  borderRadius: '10px',
}


export const DarkSecondaryText = {
  color: 'white'
}

export const LightSecondaryText = {
  color: '#192A51'
}