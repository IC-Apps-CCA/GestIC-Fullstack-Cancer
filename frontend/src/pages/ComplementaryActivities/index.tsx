import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import { useToast, Box, Button, Stack, Text, Link, useOutsideClick } from '@chakra-ui/react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import * as E from './styles';
import { CustomInput } from '../../components/CustomInput';
import { api } from '../../services/api';
// import { usersMock } from '../../services/mocks';
import { useAuth } from '../../providers/AuthProvider';

const schema = yup.object().shape({
  name: yup.string().trim().required('Nome é obrigatório'),
  description: yup.string().trim().required('Description é obrigatório'),
  group: yup.string().trim().required('Grupo é obrigatório'),
  hours: yup.string().trim().required('Horas é obrigatório'),
  start: yup.string().trim().required('Início de Atividades é obrigatório'),
  end: yup.string().trim().required('Término de Atividades é obrigatório'),
});

type complementaryInputs = {
  owner: string;
  id: string;
  name: string;
  description: string;
  group: string;
  hours: string;
  start: string;
  end: string;
};

const ComplementaryActivities = () => {
  const { handleSubmit, formState, control } = useForm<complementaryInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { push } = useHistory();
  const toast = useToast();

  const { errors } = formState;

  const { user } = useAuth();

  //

  //

  const onSubmit = async ({ name, description, group, hours, start, end }: complementaryInputs) => {
    try {
      await api.post('/complementary', {
        ownerId: user.id,
        name,
        description,
        group,
        hours,
        start,
        end,
      });

      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Você pode consultar as atividades agora',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      // push('/login', {
      //   email,
      //   password,
      // });
    } catch {
      toast({
        title: 'Ocorreu um erro ao fazer o cadastro na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <E.Container>
      <E.Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} type="text" placeholder="Atividade" errorMessage={errors?.name?.message} />
              )}
            />

            <Box my={2} />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="text"
                  placeholder="Descrição da Atividade"
                  errorMessage={errors?.surname?.message}
                />
              )}
            />

            <Box my={2} />

            <Controller
              name="group"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} type="text" placeholder="Grupo" errorMessage={errors?.group?.message} />
              )}
            />
            <Box my={2} />

            <Controller
              name="hours"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} type="text" placeholder="Carga Horária" errorMessage={errors?.hours?.message} />
              )}
            />
            <Box my={2} />

            <Controller
              name="start"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="text"
                  placeholder="Data de Início da Atividade"
                  errorMessage={errors?.start?.message}
                />
              )}
            />
            <Box my={2} />

            <Controller
              name="end"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="text"
                  placeholder="Data de Término da Atividade"
                  errorMessage={errors?.end?.message}
                />
              )}
            />
          </Stack>

          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            {/* <Button
              mt={7}
              width="100%"
              colorScheme="teal"
              isLoading={formState.isSubmitting}
              type="submit"
              display="flex"
              alignSelf="end"
              disabled={Object.values(errors).length > 0}
            >
              Adicionar outra Atividade Complementar
            </Button>
            <Box my={2} /> */}

            <Button
              mt={7}
              width="100%"
              colorScheme="teal"
              isLoading={formState.isSubmitting}
              type="submit"
              display="flex"
              alignSelf="end"
              disabled={Object.values(errors).length > 0}
            >
              Cadastrar Atividades Complementares
            </Button>

            {/* <Text mt={5}>Já possui uma conta?</Text>
            <Link color="teal.500" href="/complementary" mt={2}>
              Fazer login agora
            </Link> */}
          </Box>
        </form>
      </E.Box>
    </E.Container>
  );
};

export default ComplementaryActivities;
