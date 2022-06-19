import * as React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  InputGroup,
  Input,
  Spinner,
  InputRightElement,
  Text,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';
import { DarkText, LightText } from './theme';
import { api } from '../../services/api';

interface dataType {
  id: string;
  name: string;
  code: string;
  codeClassroom: string;
  linkClassroom: string;
  linkMeets: string;
  linkWpp: string;
  linkTel: string;
  timetables?: TimetableDataType[];
  conflict?: boolean;
  empty_timetable?: boolean;
}

interface TimetableDataType {
  id: string;
  offerId: string;
  code: string;
  weekday: string;
  start_time: string;
  end_time: string;
  createdAt: string;
  updatedAt: string;
  offer_id: string;
}

const MontarHorario = () => {
  const history = useHistory();

  const [disciplines, setADisciplines] = React.useState<dataType[]>([]);
  const [disciplinesSearch, setDisciplinesSearch] = React.useState<dataType[]>([]);
  const [disciplinesSelected, setDisciplinesSelected] = React.useState<dataType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentTimetables, setACurrentTimetables] = React.useState<TimetableDataType[]>([]);
  const [table, setATable] = React.useState<string[][]>([]);
  const [times, setATimes] = React.useState<string[]>([]);

  const { user } = useAuth();

  const toast = useToast();

  const update = (timetables: TimetableDataType[]) => {
    let timesToUpdate: string[] = times.slice();
    timetables.forEach(element => {
      timesToUpdate.push(element.start_time);
      timesToUpdate.push(element.end_time);
    });
    function uniq(a: string[]) {
      return a.sort().filter(function diff(item, pos, ary) {
        return !pos || item !== ary[pos - 1];
      });
    }
    timesToUpdate = uniq(timesToUpdate);
    setATimes(timesToUpdate);
  };

  const updateTable = () => {
    const tableToUpdate = Array(times.length)
      .fill(null)
      .map(_ => ['', '', '', '', '']);

    const selected = disciplinesSelected.map(el => ({ ...el, conflict: false }));
    currentTimetables.forEach(el => {
      const week = ['mon', 'tue', 'wed', 'thu', 'fri'].findIndex(w => w === el.weekday);
      const start = times.findIndex(t => t === el.start_time);
      const end = times.findIndex(t => t === el.end_time);

      for (let index = start; index <= end; index += 1) {
        if (tableToUpdate[index][week] !== '') {
          tableToUpdate[index][week] += `/${el.code}`;
          tableToUpdate[index][week].split('/').forEach(conflict => {
            const disc = selected.find(s => s.code === conflict);
            if (disc) disc.conflict = true;
          });
        } else {
          tableToUpdate[index][week] = el.code;
        }
      }
    });
    setATable(tableToUpdate);
    setDisciplinesSelected(selected);
  };

  const getAllDisciplines = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/offer');

      setADisciplines(data);
      setDisciplinesSearch(data);
    } catch (err) {
      toast({ description: JSON.stringify(err), status: 'error', position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  };

  const getOffer = async (id: string) => {
    setIsLoading(true);
    try {
      if (!currentTimetables.find(el => el.offerId === id)) {
        const { data } = await api.get(`/offer/${id}`);
        if (data.timetables.length === 0) {
          toast({ description: 'Disciplina sem horário', status: 'error', position: 'top' });
          const changeStatusD = disciplines.find(el => el.id === id);
          const changeStatusDS = disciplinesSearch.find(el => el.id === id);
          if (changeStatusD) {
            changeStatusD.empty_timetable = true;
            setADisciplines([...disciplines.filter(el => el.id !== id), changeStatusD]);
          }
          if (changeStatusDS) {
            changeStatusDS.empty_timetable = true;
            setDisciplinesSearch([...disciplinesSearch.filter(el => el.id !== id), changeStatusDS]);
          }
        } else {
          const withCode = data.timetables.map((el: dataType) => ({ ...el, code: data.code }));
          const toStore = [...currentTimetables, ...withCode];
          setACurrentTimetables(toStore);
          setDisciplinesSelected([...disciplinesSelected, data]);
        }
      } else {
        setACurrentTimetables(currentTimetables.filter(el => el.offerId !== id));
        setDisciplinesSelected(disciplinesSelected.filter(el => el.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAllDisciplines();
  }, []);

  React.useEffect(() => {
    if (currentTimetables) {
      update(currentTimetables);
    }
  }, [currentTimetables]);

  React.useEffect(() => {
    if (times) {
      updateTable();
    }
  }, [times]);

  const [time, setTime] = React.useState(Date.now());

  let theme = window.localStorage.getItem("theme");

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      theme = window.localStorage.getItem("theme");
      clearInterval(interval);
    };

  }, []);

  const handleChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    if (disciplines.length) {
      if (value) {
        const newDisciplines = disciplines.filter(discipline => {
          return (
            discipline?.name?.toLowerCase().includes(value.toLowerCase()) ||
            discipline?.code?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setDisciplinesSearch(newDisciplines);
      } else {
        setDisciplinesSearch(disciplines);
      }
    }
  };
  return (
    <Page>
      <Box p={8}>
        <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
          <Heading style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} textAlign="center" mr={2}>
            Montar Horário
          </Heading>
          <Box display="flex" mb={4} alignItems="center" justifyContent="left">
            <Button onClick={() => history.push('ofertas-disciplinas')} colorScheme="teal" variant="outline">
              Oferta de disciplinas
            </Button>
          </Box>
        </Box>
        <Box minW="20%" w="25%" mb={5}>
          <InputGroup style={{color: theme === "light" ? '#192A51' : '#192A51'}}>
            <Input placeholder="Buscar" bg="white" onChange={handleChange} />
            <InputRightElement>
              <BsSearch />
            </InputRightElement>
          </InputGroup>
        </Box>
        {disciplines.length !== 0 ? (
          <>
            <ButtonGroup variant="outline" spacing="6" mb={2}>
              {disciplinesSearch.slice(0, 5).map(dicipline => {
                return (
                  <Button
                    colorScheme={dicipline.empty_timetable ? 'red' : 'blue'}
                    key={dicipline.id}
                    onClick={() => getOffer(dicipline.id)}
                  >
                    {dicipline.code} - {dicipline.name}
                  </Button>
                );
              })}
            </ButtonGroup>
            <Text display="flex" alignItems="center" justifyContent="center" mb={3}>
              {disciplinesSearch.length > 5 ? '...' : ''}
              {disciplinesSearch.length === 0 ? 'Disciplina não encontrada' : ''}
            </Text>
          </>
        ) : (
          <Text display="flex" alignItems="center" justifyContent="center"
            style={theme === 'light' ? LightText : DarkText}
          >
            {isLoading ? <Spinner style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} size="xl" /> : <Text
              style={theme === 'light' ? LightText : DarkText}


            >Não há disciplinas cadastradas</Text>}
          </Text>
        )}
        {disciplinesSelected.length ? (
          <Text display="flex" alignItems="center" mb={1}
            style={theme === 'light' ? LightText : DarkText}

          >
            Remover
          </Text>
        ) : null}
        <ButtonGroup variant="outline" spacing="6" mb={5}>
          {disciplinesSelected.slice(0, 5).map(dicipline => {
            return (
              <Button
                colorScheme={dicipline.conflict ? 'red' : 'blue'}
                key={dicipline.id}
                onClick={() => getOffer(dicipline.id)}
              >
                {dicipline.code}
              </Button>
            );
          })}
        </ButtonGroup>
        <Table variant="simple">
          <TableCaption>Horário de disciplinas</TableCaption>
          <Thead>
            <Tr
              style={theme === 'light' ? LightText : DarkText}

            >
              <Th />
              <Th style={theme === 'light' ? LightText : DarkText} >Segunda</Th>
              <Th style={theme === 'light' ? LightText : DarkText}>Terça</Th>
              <Th style={theme === 'light' ? LightText : DarkText}>Quarta</Th>
              <Th style={theme === 'light' ? LightText : DarkText}>Quinta</Th>
              <Th style={theme === 'light' ? LightText : DarkText}>Sexta</Th>
            </Tr>
          </Thead>
          <Tbody>
            {table.map((row, idx) => {
              return (
                <Tr key={idx}>
                  <Td
                    style={theme === 'light' ? LightText : DarkText}


                  >{times[idx]}</Td>
                  {row.map((col, idx) => {
                    return <Td key={idx}>{col}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Page>
  );
};

export default MontarHorario;
