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
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  theme,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BiChevronDown } from 'react-icons/bi';
import { useAuth } from '../../providers/AuthProvider';
import { useState, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, LightSimpleGrid, DarkSimpleGrid, DarkDrawerContent, LightDrawerContent } from "./theme";

export const NavBarDesktop = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();
  const { user, signOut } = useAuth();

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    return localTheme && setTheme(localTheme);
  }, []);

  return (

    <ThemeProvider

      theme={theme === "light" ? lightTheme : darkTheme}
    >

      <SimpleGrid style={theme === "light" ? LightSimpleGrid : DarkSimpleGrid}>

        <Box>
          <Flex alignItems="center">
            <Link fontSize="3xl" alignSelf="center" ref={btnRef} colorScheme="quaternary" onClick={onOpen}>
              {/* <Icon as={HamburgerIcon} /> */}
              <HamburgerIcon />
            </Link>
            {/* <Heading size="md" ml={4}><Link href="/">GestIC</Link></Heading> */}
          </Flex>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose} initialFocusRef={btnRef} size="md">
            <DrawerOverlay>
              <DrawerContent style={theme === "light" ? LightDrawerContent : DarkDrawerContent}>
                <DrawerCloseButton top={8} right={4} fontSize="1rem" />
                <DrawerHeader pt={6}>
                  <Box top={8} position="absolute">
                    <Link href="/">GestIC</Link>
                  </Box>
                </DrawerHeader>
                <DrawerBody
                  fontWeight="bold"
                  textAlign="center"
                  justifyContent="space-between"
                  display="flex"
                  flexDir="column"
                  py={12}
                  mt={5}
                >
                  <Box

                  >

                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/informacoes-uteis">Informações Úteis</Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/calendario">
                        Calendário
                      </Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/informativos">Informativos</Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/projetos-ativos">
                        Projetos Ativos
                      </Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/grupos-de-pesquisa">Grupos de Pesquisa</Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/ofertas-disciplinas">
                        Ofertas de Disciplina
                      </Link>
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
                    </Box>
                  ) : (
                    <Link href="/login">
                      <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                        Login
                      </Box>
                    </Link>
                  )}
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
        <Flex alignItems="center">
          <Heading size="md" ml={4}>
            <Link href="/">GestIC</Link>
          </Heading>
        </Flex>
        {user && user.id !== '' ? (
          <Box color="#192A51" zIndex="2">
            <Menu>
              <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                {user.name}
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href="/perfil">
                    <span>Ir para perfil</span>
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={signOut}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : (

          <Box>
            <Link href="/login" _hover={{ textDecoration: 'none' }} m={2}>
              <Button color={theme === "light" ? "#192A51" : "black"}
                background={theme === "light" ? "#F5E6E8" : "white"}
              >Login</Button>
            </Link>

            <Link onClick={toggleTheme} _hover={{ textDecoration: 'none' }} m={2}>
              <Button color={theme === "light" ? "#192A51" : "black"}
                background={theme === "light" ? "#F5E6E8" : "white"}

              >☾</Button>
            </Link>
          </Box>

        )}

      </SimpleGrid>

    </ThemeProvider>
  );
};
