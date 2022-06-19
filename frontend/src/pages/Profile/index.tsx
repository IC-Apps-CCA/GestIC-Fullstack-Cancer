import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
} from '@chakra-ui/react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useHistory } from 'react-router-dom';

import * as E from './styles';
import { CustomInput } from '../../components/CustomInput';
import { Page } from '../../components/Page';
import { api } from '../../services/api';

import { useAuth } from '../../providers/AuthProvider';

import image from '../../uploads/users/eu2.jpeg';

const schema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  old_password: yup.string().trim(),
  password: yup
    .string()
    .trim()
    .when('old_password', {
      is: (val: string) => {
        return !!val.length;
      },
      then: yup.string().trim().required('Campo obrigátorio'),
      otherwise: yup.string().trim(),
    }),
  password_confirmation: yup
    .string()
    .trim()
    .when('old_password', {
      is: (val: string) => {
        return !!val.length;
      },
      then: yup.string().trim().required('Campo obrigátorio'),
      otherwise: yup.string().trim(),
    })
    .oneOf([yup.ref('password')], 'Confirmação incorreta'),
});

type ProfileFormInputs = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Profile = () => {
  const { handleSubmit, formState, control } = useForm<ProfileFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const mappedTag = { MONIT: 'Monitor' };
  const toast = useToast();

  const history = useHistory();

  const { user, updateUser } = useAuth();

  const { errors } = formState;

  const onSubmit = async (data: ProfileFormInputs) => {
    console.log(user);
    try {
      const response = await api.put('/user', {
        id: user.id,
        name: data.name,
        old_password: data.old_password,
        new_password: data.password,
      });

      updateUser(response.data);
      history.push('/');

      toast({
        title: 'Alterações realizadas com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Ocorreu um erro ao alterar os dados na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Page>
      <E.Container>
        <E.Box>
          <E.Subheader>
            <E.ColorBlock />
            <E.Pa>Painel de Usuário</E.Pa>
          </E.Subheader>
          <E.Flex>
            <E.BoxDiv1>
              <E.Image src={image} />
              <E.User>{user.name}</E.User>
              <E.Info>{mappedTag[user.profileTag]}</E.Info>
            </E.BoxDiv1>
            <E.BoxDiv2>
              <E.Boxinside>
                <E.Title>
                  Ocupação
                  {/* {user.name} */}
                </E.Title>
                <E.Info1>{user.title}</E.Info1>
                <E.Title>
                  Posts Curtidos
                  {/* {user.name} */}
                </E.Title>
                <E.Info>Total: 10</E.Info>
              </E.Boxinside>
              <E.Button onClick={onOpen}>Alterar Dados</E.Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Alterar Dados</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Stack spacing={2}>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue={user.name}
                          render={({ field }) => (
                            <CustomInput
                              {...field}
                              type="text"
                              placeholder="Nome"
                              errorMessage={errors?.name?.message}
                            />
                          )}
                        />

                        <Box my={2} />

                        <Box my={2} />

                        <Box my={2} />

                        <Controller
                          name="old_password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomInput
                              {...field}
                              type="password"
                              name="old_password"
                              placeholder="Senha antiga"
                              errorMessage={errors?.old_password?.message}
                            />
                          )}
                        />

                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomInput
                              {...field}
                              type="password"
                              name="password"
                              placeholder="Nova senha"
                              errorMessage={errors?.password?.message}
                            />
                          )}
                        />

                        <Controller
                          name="password_confirmation"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomInput
                              {...field}
                              type="password"
                              name="password_confirmation"
                              placeholder="Confirmação da senha"
                              errorMessage={errors?.password_confirmation?.message}
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
                          Confirmar mudanças
                        </Button>
                      </Box>
                    </form>

                    {/* <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        type="password"
                        name="password"
                        placeholder="Nova senha"
                        errorMessage={errors?.password?.message}
                      />
                    )}
                  />
                  <Controller
                    name="password_confirmation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirmação da senha"
                        errorMessage={errors?.password_confirmation?.message}
                      />
                    )}
                  /> */}
                  </ModalBody>

                  <ModalFooter>
                    {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                      confirmar Mudanças
                    </Button> */}

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
                      Confirmar mudanças
                    </Button> */}

                    {/* <Button variant="ghost">Secondary Action</Button> */}
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </E.BoxDiv2>
          </E.Flex>

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                defaultValue={user.name}
                render={({ field }) => (
                  <CustomInput {...field} type="text" placeholder="Nome" errorMessage={errors?.name?.message} />
                )}
              />
              <img src = {image} alt="fireSpot"/>
              <Box my={2} />

              <Box my={2} />

              <Box my={2} />

              <Controller
                name="old_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    name="old_password"
                    placeholder="Senha antiga"
                    errorMessage={errors?.old_password?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    errorMessage={errors?.password?.message}
                  />
                )}
              />

              <Controller
                name="password_confirmation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmação da senha"
                    errorMessage={errors?.password_confirmation?.message}
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
                Confirmar mudanças
              </Button>
            </Box>
          </form> */}
        </E.Box>
      </E.Container>
    </Page>
  );
};

export default Profile;
function componentDidMount() {
  throw new Error('Function not implemented.');
}
