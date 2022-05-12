import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import { useToast, Box, Button, Stack, Text, Link, FormLabel, FormControl } from '@chakra-ui/react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRef } from 'react';
import * as E from './styles';
import { CustomInput } from '../../components/CustomInput';
import { api } from '../../services/api';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  surname: yup.string().required('Sobrenome é obrigatório'),
  email: yup.string().email('Digite um email válido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

type SignUpFormInputs = {
  name: string;
  surname: string;
  profile: string;
  email: string;
  password: string;
  title: string;
};

const SignUp = () => {
  const { handleSubmit, formState, control } = useForm<SignUpFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [profile, setProfile] = React.useState('Estudante');
  const filesElement = useRef(null);

  const { push } = useHistory();
  const toast = useToast();

  const { errors } = formState;

  const onSubmit = async ({ name, surname, email, password, title }: SignUpFormInputs) => {
    console.log(profile);
    const dataForm = new FormData();
    const file = filesElement?.current?.files[0];
    dataForm.append('file', file);
    console.log(file);
    try {
      api
        .post('/access/register', {
          name: `${name} ${surname}`,
          email,
          password,
          profile,
          title,
        })
        .then(response => {
          console.log(response.data.id);
          dataForm.append('user_id', response.data.id);
          api.post('/access/register/file', dataForm);
        });

      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Você pode realizar o acesso agora',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      push('/login', {
        email,
        password,
      });
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
                <CustomInput {...field} type="text" placeholder="Nome" errorMessage={errors?.name?.message} />
              )}
            />

            <Box my={2} />

            <Controller
              name="surname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} type="text" placeholder="Sobrenome" errorMessage={errors?.surname?.message} />
              )}
            />

            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} type="text" placeholder="Titulo" errorMessage={errors?.surname?.message} />
              )}
            />

            <Controller
              name="profile"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl isInvalid={!!errors?.profile?.message} errortext={errors?.profile?.message}>
                  <FormLabel htmlFor={field.name}>profile</FormLabel>
                  <select value={profile} onChange={event => setProfile(event.target.value)}>
                    <option value="Estudante">Estudante</option>
                    <option value="Monitor">Monitor</option>
                  </select>
                </FormControl>
              )}
            />

            <Box my={2} />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} type="email" placeholder="Email" errorMessage={errors?.email?.message} />
              )}
            />

            <Box my={2} />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="password"
                  name="password"
                  placeholder="Senha"
                  errorMessage={errors?.password?.message}
                />
              )}
            />
            <h4>Imagem perfil:</h4>
            <input type="file" multiple ref={filesElement} />
          </Stack>

          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
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
              Realizar cadastro na plataforma
            </Button>

            <Text mt={5}>Já possui uma conta?</Text>
            <Link color="teal.500" href="/login" mt={2}>
              Fazer login agora
            </Link>
          </Box>
        </form>
      </E.Box>
    </E.Container>
  );
};

export default SignUp;
