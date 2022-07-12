import * as React from 'react';
import { Box, Button, Heading, Spinner, Stack, useMediaQuery, Text, useToast } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../services/api';
import { Page } from '../../../components/Page';
import { CustomInput } from '../../../components/CustomInput';
import { CustomTextarea } from '../../../components/CustomTextarea';
import { useAuth } from '../../../providers/AuthProvider';

const schema = yup.object().shape({
  name: yup.string().trim().required('Campo obrigatório'),
  description: yup.string().trim().required('Campo obrigatório'),
});

interface ProjectData {
  project_id?: string;
  userId?: string;
  name: string;
  description: string;
  researchType?: string;
  participants?: {
    name: string;
  }[];
  activities?: string;
}
const ProjectNewEdit = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { user } = useAuth();
  const { id } = useParams();
  const [oldProject, setOldProject] = React.useState<ProjectData>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const getProject = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/projetos-ativos/show/${id}`);
      if (data) {
        setOldProject(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      getProject();
    }
  }, [id]);

  const { handleSubmit, formState, control } = useForm<ProjectData>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (data: ProjectData) => {
    console.log(data)
    console.log('aqui')
    try {
      // if (id) {
      //   await api.put('projetos-ativos/show', { ...data, id });
      // } else {
      //   await api.post('projetos-ativos', data);
      // }
      toast({
        title: id ? 'Projeto editado com sucesso' : 'Novo Projeto criado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      history.push('/projetos-ativos');
    } catch {
      toast({
        title: `Ocorreu um erro ao ${id ? 'editar' : 'criar'} um novo projeto na plataforma`,
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  console.log(oldProject);

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} maxW={isLargerThan766 ? '100%' : '60vw'}>
        <Heading color="teal" mb={6}>
          {id ? 'Editar' : 'Novo'} Projeto
        </Heading>
        {!(Object.values(oldProject).length > 0) && id ? (
          <Box textAlign={isLoading ? 'center' : 'inherit'}>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há um projeto com esse id.</Text>}
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomInput {...field} type="text" placeholder="Nome" errorMessage={errors?.name?.message} />
                )}
                defaultValue={oldProject?.name}
              />

              <Box my={2} />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={6}
                    type="text"
                    placeholder="Descrição"
                    errorMessage={errors?.description?.message}
                    defaultValue={oldProject?.description}
                  />
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
                Adicionar Novo
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Page>
  );
};

export default ProjectNewEdit;
