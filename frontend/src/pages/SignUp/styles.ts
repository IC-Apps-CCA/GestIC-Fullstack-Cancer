import styled from '@emotion/styled';

import { Box as BoxUI } from '@chakra-ui/react';

export const LightContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  background: '#192A51',
}

export const LightBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '400px',
  background: 'white',
  padding: '20px',
  margin: '20px',
  borderRadius: '10px',
}


export const DarkContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  color: '#192A51',
  background: '#121212',
}

export const DarkBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  text: '#F5E6E8',
  maxWidth: '400px',
  borderWidth: '1px',
  background: '#121212',
  padding: '20px',
  margin: '20px',
  color: 'white',
  borderRadius: '10px',
}


export const DarkSecondaryText = {
  color: '#F5E6E8'
}

export const LightSecondaryText = {
  color: '#192A51'
}