import React, { ReactNode, useState, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import NavBar from '../NavBar';

type Props = {
  children: ReactNode;
};

const Page = ({ children }: Props) => {
  const [isLargerThan768] = useMediaQuery('(max-width: 768px)');

  const [time, setTime] = useState(Date.now());

  let theme = window.localStorage.getItem("theme");

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      theme = window.localStorage.getItem("theme");
      clearInterval(interval);
    };

  }, []);

  return (
    <div
      style={{
        height: "100vh",
        paddingTop: !isLargerThan768 ? 'initial' : '3.5rem',
        backgroundColor: theme === 'light' ? 'black' : 'white',
        overflow: 'hidden',
        left: '0',
        width: '100%',

      }}

    >
      <NavBar />
      <div style={{
        height: "160%",
        paddingTop: !isLargerThan768 ? 'initial' : '3.5rem',
        backgroundColor: theme === 'light' ? 'white' : '#121212',
        overflow: 'hidden',
        left: '0',
        width: '100%',

      }}>{children}</div>
    </div >
  );
};

export { Page };
