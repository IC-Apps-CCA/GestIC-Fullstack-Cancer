import * as React from 'react';
import {
  Box,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  SimpleGrid,
  Button
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/AuthProvider';

export const NavBarMobile = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();
  const { user, signOut } = useAuth();
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
    window.location.reload()
  };

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    return localTheme && setTheme(localTheme);
  }, []);

  return (
    <SimpleGrid
      // style={
      //   isMobile ? { display: "flex", justifyContent: "space-between" } : {}
      // }
      display="flex"
      justifyContent="space-between"
      columns={[null, null, 2]}
      w="100%"
      bg="#192A51"
      zIndex="5"
      color="#F5E6E8"
      p={4}
      gridTemplateColumns="0.5fr 1fr"
      alignItems="center"
      position="fixed"
    >
      {/* <Box w="100%" bg="#192A51" zIndex="3" color="#F5E6E8" p={4} position="fixed"> */}
      {/* <Flex gridGap={3}>
        <Box>GestIC</Box>
        <Box>
          <Link>Informativos</Link>
        </Box>
        <Box>
          <Link>Projetos Ativos</Link>
        </Box>
        <Box>
          <Link>Grupos</Link>
        </Box>
        <Box>
          <Link>Ofertas de Disciplina</Link>
        </Box>
        <Box>
          <Link>Informações Úteis</Link>
        </Box>
      </Flex> */}
      <Box><Link href="/">GestIC</Link></Box>
      <Box>
                    <Link onClick={toggleTheme} _hover={{ textDecoration: 'none' }} m={2}>
                    <Button style={ {paddingBottom: '6px'}}color={theme === 'light' ? 'white' : 'white'} background="None">
                      ☾
                    </Button>
                  </Link>
        <Link fontSize="3xl" alignSelf="center" ref={btnRef} colorScheme="quaternary" onClick={onOpen}>
          {/* <Icon as={HamburgerIcon} /> */}
          <HamburgerIcon />
        </Link>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} initialFocusRef={btnRef} size="md">
          <DrawerOverlay>
            <DrawerContent bg="#192A51" color="#F5E6E8">
              <DrawerCloseButton top={8} right={4} fontSize="1rem" />
              <DrawerHeader pt={6}>
                <Box top={8} position="absolute">
                  {/* <Icon
                          as={LogoIcon}
                          fontSize="7.5rem"
                          mt="-1.8rem"
                          position="absolute"
                        /> */}
                  <Link href="/">GestIC</Link>
                </Box>
              </DrawerHeader>
              <DrawerBody
                fontWeight="bold"
                textAlign="center"
                justifyContent="space-between"
                display="flex"
                flexDir="column"
                // maxHeight="90%"
                py={12}
                mt={5}
              >
                <Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/informacoes-uteis">Informações Úteis</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="#F5E6E8" href="/calendario">
                      Calendário
                    </Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/informativos">Informativos</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="#F5E6E8" href="/projetos-ativos">
                      Projetos Ativos
                    </Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/grupos-de-pesquisa">Grupos de Pesquisa</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="#F5E6E8" href="/ofertas-disciplinas">
                      Ofertas de Disciplina
                    </Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/complementary-activities/list">Atividades Complementares</Link>
                    </Box>
                </Box>
                {user && user.id !== '' ? (
                  <Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/perfil">Meu Perfil</Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link onClick={signOut}>Sair</Link>
                    </Box>
                    <Link onClick={toggleTheme} _hover={{ textDecoration: 'none' }} m={2}>
                      <Button color={theme === 'light' ? 'teal' : 'black'} background={theme === 'light' ? 'white' : 'teal'}>
                        ☾
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Box>
                  <Link href="/login">
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      Login
                    </Box>
                  </Link>
                    <Link onClick={toggleTheme} _hover={{ textDecoration: 'none' }} m={2}>
                    <Button color={theme === 'light' ? 'teal' : 'black'} background={theme === 'light' ? 'white' : 'teal'}>
                      ☾
                    </Button>
                  </Link>
                  </Box>
                )}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </SimpleGrid>
  );
};
