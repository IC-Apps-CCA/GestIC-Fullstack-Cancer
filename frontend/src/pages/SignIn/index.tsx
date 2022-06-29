import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Stack, Text, Link, useToast } from '@chakra-ui/react';

import { CustomInput } from '../../components/CustomInput';
import { useAuth } from '../../providers/AuthProvider';
import { DarkBox, LightBox, LightContainer, DarkContainer, DarkSecondaryText, LightSecondaryText } from './styles'


const schema = yup.object().shape({
  email: yup.string().email('Digite um email válido').required('Email é obrigatório'),
  password: yup.string().trim().required('Senha é obrigatória'),
});

type SignInFormInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { handleSubmit, formState, control } = useForm<SignInFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const {
    push,
    location: { state },
  } = useHistory();
  const toast = useToast();
  const { signIn } = useAuth();

  const { errors } = formState;

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const { email, password } = data;

      await signIn({
        email,
        password,
      });

      toast({
        title: 'Login realizado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      push('/');
    } catch {
      toast({
        title: 'Ocorreu um erro ao fazer o login na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
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
    <div
      style={
        theme === 'light' ? LightContainer : DarkContainer

      }

    >
      <Box
        style={
          theme === 'light' ? LightBox : DarkBox

        }

      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              defaultValue={state?.email}
              render={({ field }) => (
                <CustomInput
                  style={
                    theme === 'light' ? LightSecondaryText : DarkSecondaryText
                  }
                  {...field}
                  type="email" placeholder="Email" errorMessage={errors?.email?.message}


                />
              )}
            />

            <Box my={2}


            />

            <Controller


              name="password"
              control={control}
              defaultValue={state?.password}
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
              Entrar na plataforma
            </Button>

            <Link color="teal.500" href="/forgot-password" mt={4}>
              Esqueci minha senha
            </Link>

            <Text mt={5}
              style={
                theme === 'light' ? LightSecondaryText : DarkSecondaryText
              }

            >Não possui conta?</Text>
            <Link color="teal.500" href="/register" mt={2}>
              Criar agora
            </Link>
          </Box>
        </form>
      </Box>
    </div >
  );
};

export default SignIn;
