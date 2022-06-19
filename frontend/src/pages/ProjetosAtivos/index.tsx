import * as React from 'react';
import {
  useToast,
  Box,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';
import { LightText, DarkText } from './theme'
import { api } from '../../services/api';

interface dataType {
  id: string;
  userId: string;
  name: string;
  description: string;
}

const ProjetosAtivos = () => {
  const history = useHistory();
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');

  const [activeProjects, setActiveProjects] = React.useState<dataType[]>([]);
  const [activeProjectsSearch, setActiveProjectsSearch] = React.useState<dataType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useAuth();

  const toast = useToast();

  const getAllActiveProjects = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/project/all');

      setActiveProjects(data);
      setActiveProjectsSearch(data);
    } catch (err) {
      toast({
        title: 'Ocorreu um erro ao carregar os dados na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [time, setTime] = React.useState(Date.now());

  let theme = window.localStorage.getItem("theme");

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      theme = window.localStorage.getItem("theme");
      clearInterval(interval);
    };

  }, []);


  React.useEffect(() => {
    getAllActiveProjects();
  }, [toast]);

  const handleChange = event => {
    const { value } = event.target;
    if (activeProjects.length) {
      if (value) {
        const newActiveProjects = activeProjects.filter(project => {
          return (
            project?.name?.toLowerCase().includes(value.toLowerCase()) ||
            project?.description?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setActiveProjectsSearch(newActiveProjects);
      } else {
        setActiveProjectsSearch(activeProjects);
      }
    }
  };

  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} textAlign="center" mr={2}

            >
              Projetos Ativos
            </Heading>
            {!isLoading && user && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('projetos-ativos/new')}
                colorScheme="teal"
                variant="outline"
              >
                Criar novo
              </Button>
            )}
          </Box>

          <Box minW="20%" w="25%" mb={user ? 6 : 0}>
            <InputGroup style={{color: theme === "light" ? '#192A51' : '#192A51'}}>
              <Input placeholder="Buscar" bg="white" onChange={handleChange} />
              <InputRightElement>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        {activeProjects.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={theme === 'light' ? LightText : DarkText}>Nome</Th>
                <Th style={theme === 'light' ? LightText : DarkText}>Descrição</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activeProjectsSearch.map(project => {
                return (
                  <Link key={project.id} as={Tr} href={`projetos-ativos/show/${project.id}`}
                    style={theme === 'light' ? LightText : DarkText}

                  >
                    <Td>
                      <Link display="block" href={`projetos-ativos/show/${project.id}`}
                        style={theme === 'light' ? LightText : DarkText}

                      >
                        {project.name}
                      </Link>
                    </Td>
                    <Td >
                      <Link display="block" href={`projetos-ativos/show/${project.id}`}
                        style={theme === 'light' ? LightText : DarkText}

                      >
                        {project.description}
                      </Link>
                    </Td>
                  </Link>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Text display="flex" alignItems="center" justifyContent="center">
            {isLoading ? <Spinner style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} size="xl" /> : <Text

              style={theme === 'light' ? LightText : DarkText}

            >Não há projetos ativos cadastrados.</Text>}
          </Text>
        )}
      </Box>
    </Page>
  );
};

export default ProjetosAtivos;
