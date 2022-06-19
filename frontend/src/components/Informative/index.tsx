import * as React from 'react';
import { Box, Divider, Heading, Link, Text, Spinner } from '@chakra-ui/react';
import { api } from '../../services/api';
import { InformativeItem } from '../../pages/Informative/Item';
import theme from '../../styles/theme';

const Informative = () => {
  const [informativeList, setInformativeList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [time, setTime] = React.useState(Date.now());

  let theme = window.localStorage.getItem("theme");

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      theme = window.localStorage.getItem("theme");
      clearInterval(interval);
    };

  }, []);

  const getInformativeList = async () => {
    try {
      const { data } = await api.get('/informative');
      if (data.length) {
        setInformativeList(data || []);
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

  const render = () => {
    if (!informativeList.length) {
      if (isLoading) {
        return <Spinner color="#192A51" size="xl" />;
      }
      return <Text style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}}>Não há informativos por enquanto.</Text>;
    }
    return informativeList.map((informative, index) => (
      <React.Fragment key={`key-${index}`}>
        {index !== 0 && <Divider maxW="400px" borderBottomWidth="3px" size="md" m="auto" />}
        <InformativeItem informative={informative} withActions={false} />
      </React.Fragment>
    ));
  };

  return (
    <Box fontSize="xl" w="100%">
      <Box color="#192A51" mb={4} display="flex" alignItems="center" position="relative" top="25px">
        <Heading width="100%" position="absolute" style={{color: theme === "light" ? '#192A51' : '#F5E6E8'}}>
          Informativos
        </Heading>
        {!!informativeList.length && (
          <Text fontSize="md" right="0" position="absolute">
            <Link href="informativos">Ver todos</Link>
          </Text>
        )}
      </Box>
      <Box mt={16}>{render()}</Box>
    </Box>
  );
};

export default Informative;
