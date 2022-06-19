import * as React from 'react';
import { Box, Button, Heading, Spinner, Stack, useMediaQuery, Text, useToast, Select } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../services/api';
import { Page } from '../../../components/Page';
import { CustomInput } from '../../../components/CustomInput';

const schema = yup.object().shape({
  weekday: yup.string().trim().required('Campo obrigatório'),
  start_time: yup.string().trim().required('Campo obrigatório'),
  end_time: yup.string().trim().required('Campo obrigatório'),
});

type OfferTimetableFormInputs = {
  id?: string;
  weekday: string;
  start_time: string;
  end_time: string;
};

const OfferTimetableEdit = () => {
  const { handleSubmit, formState, control, reset } = useForm<OfferTimetableFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { id_timetable, id_offer } = useParams<{ id_timetable: string; id_offer: string }>();
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const getTimetable = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/timetable/${id_timetable}`);
      reset(data);
    } catch (err) {
      toast({
        title: 'Erro getTimetable',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        description: JSON.stringify(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id_timetable) {
      getTimetable();
    }
  }, [id_timetable]);

  const { errors } = formState;

  const onSubmit = async (data: OfferTimetableFormInputs) => {
    try {
      if (id_timetable) {
        await api.put('/timetable', { ...data, id: id_timetable });
      } else {
        await api.post('/timetable', { ...data, offerId: id_offer });
      }
      toast({
        title: id_timetable ? 'Horário editado com sucesso' : 'Novo horário criado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      history.push(`/ofertas-disciplinas/show/${id_offer}`);
    } catch {
      toast({
        title: `Ocorreu um erro ao ${id_timetable ? 'editar' : 'criar'} um novo horário na plataforma`,
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} maxW={isLargerThan766 ? '100%' : '60vw'}>
        <Heading color="teal" mb={6}>
          {id_timetable ? 'Editar' : 'Novo'} Horário
        </Heading>
        {isLoading && id_timetable ? (
          <Box textAlign={isLoading ? 'center' : 'inherit'}>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há horário com esse id.</Text>}
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="weekday"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value={undefined}>Selecione um dia da semana</option>
                    <option value="mon">Segunda</option>
                    <option value="tue">Terça</option>
                    <option value="wed">Quarta</option>
                    <option value="thu">Quinta</option>
                    <option value="fri">Sexta</option>
                    <option value="sat">Sábado</option>
                    <option value="sun">Domingo</option>
                  </Select>
                )}
              />
              <Controller
                name="start_time"
                control={control}
                render={({ field }) => (
                  <CustomInput {...field} type="time" placeholder="Início" errorMessage={errors?.start_time?.message} />
                )}
              />
              <Controller
                name="end_time"
                control={control}
                render={({ field }) => (
                  <CustomInput {...field} type="time" placeholder="Fim" errorMessage={errors?.end_time?.message} />
                )}
              />
            </Stack>

            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={formState.isSubmitting}
                type="submit"
                alignSelf="end"
                disabled={Object.values(errors).length > 0}
              >
                {!id_timetable ? 'Adicionar Novo' : 'Editar horário'}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Page>
  );
};

export default OfferTimetableEdit;
