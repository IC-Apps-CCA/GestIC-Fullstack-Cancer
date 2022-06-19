import * as React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Box,
  Heading,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { BsSearch } from 'react-icons/bs';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../../components/Page';
import { useAuth } from '../../../providers/AuthProvider';
import { api } from '../../../services/api';
import { DarkText, LightText } from './theme'

interface groupData {
  id: string;
  name: string;
  description: string;
}

// const data: groupData[] = [
//   {
//     id: '1',
//     name: 'name1',
//     description: 'descrição1',
//   },
//   {
//     id: '2',
//     name: 'name2',
//     description: 'descrição2',
//   },
//   {
//     id: '3',
//     name: 'name3',
//     description: 'descrição3',
//   },
// ];

const GruposPesquisa = () => {
  const history = useHistory();
  const [groups, setGroups] = React.useState<groupData[]>([]);
  const [groupsSearch, setGroupsSearch] = React.useState<groupData[]>([]);

  const { user } = useAuth();

  const getAllGroups = async () => {
    try {
      const { data } = await api.get('/research');

      setGroups(data);
      setGroupsSearch(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getAllGroups();
  }, []);

  const [time, setTime] = React.useState(Date.now());

  let theme = window.localStorage.getItem("theme");

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      theme = window.localStorage.getItem("theme");
      clearInterval(interval);
    };

  }, []);

  const handleChange = event => {
    const { value } = event.target;
    if (groups.length) {
      if (value) {
        const newGroups = groups.filter(group => {
          return (
            group?.name?.toLowerCase().includes(value.toLowerCase()) ||
            group?.description?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setGroupsSearch(newGroups);
      } else {
        setGroupsSearch(groups);
      }
    }
  };

  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} textAlign="center" mr={2}>
              Grupos de Pesquisa
            </Heading>
            {user && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('grupos-de-pesquisa/new')}
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
        {groups.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={
                  theme === 'light' ? LightText : DarkText
                } >Nome</Th>
                <Th
                  style={
                    theme === 'light' ? LightText : DarkText
                  }
                >Descrição</Th>
              </Tr>
            </Thead>
            <Tbody>
              {groupsSearch.map(group => {
                return (
                  <Tr key={group.id}>
                    <Td
                      style={
                        theme === 'light' ? LightText : DarkText
                      }
                    >
                      <Link display="block" href={`grupos-de-pesquisa/show/${group.id}`}>
                        {group.name}
                      </Link>
                    </Td
                    >
                    <Td
                      style={
                        theme === 'light' ? LightText : DarkText
                      }
                    >{group.description}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Text
            style={
              theme === 'light' ? LightText : DarkText
            }
          >Não há grupos de pesquisa cadastrados</Text>
        )}
      </Box>
    </Page>
  );
};

export default GruposPesquisa;
