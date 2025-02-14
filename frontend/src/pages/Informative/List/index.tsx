import * as React from 'react';
import {
  Box,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Divider,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useMediaQuery,
  Center,
  Spinner,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsSearch, BsTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import { useAuth } from '../../../providers/AuthProvider';
import { InformativeItem } from '../Item';
import { useState, useEffect } from 'react';

const InformativeList = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { user } = useAuth();
  const toast = useToast();

  const [informativeList, setInformativeList] = React.useState([]);
  const [informativeListSearch, setInformativeListSearch] = React.useState([]);
  const [currentInformative, setCurrentInformative] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    return localTheme && setTheme(localTheme);
  }, []);

  const getInformativeList = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/informative');
      if (data.length) {
        setInformativeList(data);
        setInformativeListSearch(data);
      } else {
        setInformativeList([]);
        setInformativeListSearch([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getInformativeList();
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    if (informativeList.length) {
      if (value) {
        const newInformativeList = informativeList.filter(informative => {
          return (
            informative?.title?.toLowerCase().includes(value.toLowerCase()) ||
            informative?.content?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setInformativeListSearch(newInformativeList);
      } else {
        setInformativeListSearch(informativeList);
      }
    }
  };

  const clickToRemove = informative => {
    setCurrentInformative(informative);
    setIsOpen(true);
  };

  const removeInformative = async () => {
    try {
      await api.delete(`/informative/${currentInformative.id}`);
      toast({
        title: 'Informativo deletado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      getInformativeList();
    } catch {
      toast({
        title: 'Ocorreu um erro ao criar um novo informativo na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {informativeList.length === 0 ? (
          <Center flexDirection="column">
            <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent="center">
              <Heading style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} textAlign="center" mr={2}>
                Informativo
              </Heading>
              {!isLoading && user && (
                <Button
                  leftIcon={<AddIcon />}
                  onClick={() => history.push('informativos/new')}
                  colorScheme={theme === 'light' ? '#192A51' : '#F5E6E8'}
                  variant="outline"
                >
                  Criar novo
                </Button>
              )}
            </Box>
            {isLoading ? <Spinner style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} size="xl" /> : <Text>Não há informativos por enquanto.</Text>}
          </Center>
        ) : (
          <>
            <Box
              display="flex"
              mb={10}
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              // ml={6}
              maxW={isLargerThan766 ? '80vw' : '50vw'}
              margin="auto"
            >
              <Box
                display="flex"
                w="100%"
                mb={4}
                alignItems="center"
                justifyContent={user ? 'space-between' : 'center'}
              >
                <Heading style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} textAlign="center" mr={2}>
                  Informativos
                </Heading>
                {user && (
                  <Button
                    leftIcon={<AddIcon />}
                    onClick={() => history.push('informativos/new')}

                    colorScheme={theme === 'light' ? '#192A51' : '#F5E6E8'}
                    variant="outline"
                  >
                    Criar novo
                  </Button>
                )}
              </Box>
              <Box minW="55%" w="100%">
                <InputGroup style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} >
                  <Input placeholder="Buscar" bg="white" onChange={handleChange} />
                  <InputRightElement>
                    <BsSearch />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
            {isLoading ? (
              <Center flexDirection="column" mt={4}>
                <Spinner style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} size="xl" />
              </Center>
            ) : (
              <Box maxW="80vh" margin="auto">
                {informativeListSearch.map((informative, index) => {
                  return (
                    <React.Fragment key={index}>
                      {index !== 0 && <Divider maxW="400px" borderBottomWidth="3px" size="md" m="auto" />}
                      <InformativeItem informative={informative} clickToRemove={() => clickToRemove(informative)} />
                    </React.Fragment>
                  );
                })}
              </Box>
            )}
          </>
        )}
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} fontSize="lg" fontWeight="bold">
              Remover Informativo
            </AlertDialogHeader>

            <AlertDialogBody style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }}  >
              Tem certeza que deseja remover o informativo <strong>&quot;{currentInformative.title}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} >
              <Button style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} colorScheme="red" onClick={removeInformative}>
                Remover
              </Button>
              <Button style={{ color: theme === 'light' ? '#192A51' : '#F5E6E8' }} ref={cancelRef} onClick={onClose} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Page>
  );
};

export default InformativeList;
