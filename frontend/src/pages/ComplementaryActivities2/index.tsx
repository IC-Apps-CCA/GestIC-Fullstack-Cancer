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
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';
import { api } from '../../services/api';

interface activityData {
  owner: string;
  id: string;
  name: string;
  description: string;
  group: string;
  hours: string;
  start: string;
  end: string;
}

// const data: activityData[] = [
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

const ComplementaryActivities = () => {
  const history = useHistory();
  const [activities, setActivities] = React.useState<activityData[]>([]);
  const [activitiesSearch, setActivitiesSearch] = React.useState<activityData[]>([]);

  const { user } = useAuth();

  const getAllActivities = async () => {
    try {
      const { data } = await api.get('/complementary');

      setActivities(data);
      setActivitiesSearch(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getAllActivities();
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    if (activities.length) {
      if (value) {
        const newActivities = activities.filter(activity => {
          return (
            activity?.owner?.toLowerCase().includes(value.toLowerCase()) ||
            activity?.name?.toLowerCase().includes(value.toLowerCase()) ||
            activity?.description
              ?.toLowerCase()
              .includes(
                value.toLowerCase() ||
                activity?.group?.toLowerCase().includes(value.toLowerCase()) ||
                activity?.hours?.toLowerCase().includes(value.toLowerCase()) ||
                activity?.start?.toLowerCase().includes(value.toLowerCase()) ||
                activity?.end?.toLowerCase().includes(value.toLowerCase()),
              )
          );
        });
        setActivitiesSearch(newActivities);
      } else {
        setActivitiesSearch(activities);
      }
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
  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} textAlign="center" mr={2}>
              Atividades Complementares
            </Heading>
            {user && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('/complementary-activities')}
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
        {activities.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Aluno</Th>
                <Th>Atividade</Th>
                <Th>Descrição</Th>
                <Th>Grupo</Th>
                <Th>Horas</Th>
                <Th>Início</Th>
                <Th>Fim</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activitiesSearch.map(activity => {
                return (
                  <Tr key={activity.id}>
                    <Td>{activity.owner}</Td>
                    <Td>
                      <Link display="block" href={`complementary-actvities/show/${activity.id}`}>
                        {activity.name}
                      </Link>
                    </Td>
                    <Td>{activity.description}</Td>
                    <Td>{activity.group}</Td>
                    <Td>{activity.hours}</Td>
                    <Td>{activity.start}</Td>
                    <Td>{activity.end}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Text
          style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}}

          >Não há atividades cadastradas</Text>
        )}
      </Box>
    </Page>
  );
};

export default ComplementaryActivities;
