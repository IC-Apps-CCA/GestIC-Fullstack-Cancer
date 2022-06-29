import * as React from 'react';
import { Box, Button, Heading, Link, useMediaQuery } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Page } from '../../../components/Page';
import { useAuth } from '../../../providers/AuthProvider';
import { api } from '../../../services/api';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const { user } = useAuth();

  const history = useHistory();
  const [eventList, setEventList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const getEventList = async () => {
    try {
      const { data } = await api.get('/event');
      if (data.length) {
        setEventList(data || []);
        // setEventListSearch(data || []);
      }
    } catch (err) {
      console.error(err);
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
    getEventList();
  }, []);

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} mb={16}>
        <Heading style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}} textAlign="center" mr={2}>
          Calendário
        </Heading>
        {user && (
          <Button
            mt={4}
            leftIcon={<AddIcon />}
            onClick={() => history.push('eventos/new')}
            colorScheme="#192A51"
            variant="outline"
          >
            Criar evento
          </Button>
        )}
        <Box mt={10}>
          <Calendar
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500, color: theme === "light" ? '#192A51' : '#192A51', backgroundColor: theme === "light" ? 'white' : 'white  '}}
          />
        </Box>
        <Box mt={8} style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}}>
          <Link href="/eventos">Ver lista e pesquisar por todos os eventos</Link>
        </Box>
      </Box>
    </Page>
  );
};

export default CalendarPage;
