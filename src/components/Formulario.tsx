import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styled from 'styled-components';
import Propriedades from './Propriedades';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Laboratorios from './Laboratorios';
import HelperTextWithCounter from './HelperTextWithCounter';
import Alert from '@mui/material/Alert';

dayjs.locale('pt-br');

export type SearchFormValues = {
  name: string;
  startDate: string;
  endDate: string;
  propertyName: string;
  propertyId: number;
  propertyCnpj: string;
  labName: string;
  labId: number;
  notes?: string;
};

const CHARACTER_LIMIT_NAME = 40;
const CHARACTER_LIMIT_NOTES = 1000;
const DATE_FORMAT_PTBR = 'DD/MM/YYYY';
const ALERT_TIME_ON_SCREEN = 5000;

const SearchValidationSchema = yup.object({
  name: yup.string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 palavras')
    .max(CHARACTER_LIMIT_NAME, `Nome deve ter no máximo ${CHARACTER_LIMIT_NAME} palavras`),
  startDate: yup.date()
    .required('Data inicial é obrigatória')
    .max(yup.ref('endDate'), 'Data inicial não pode ser maior que data final'),
  endDate: yup.date()
    .required('Data final é obrigatória')
    .min(yup.ref('startDate'), 'Data final não pode ser menor que data inicial'),
  notes: yup.string()
    .max(CHARACTER_LIMIT_NOTES, `Observações devem ter no máximo ${CHARACTER_LIMIT_NOTES} palavras`),
  labName: yup.string()
    .required('Nome do laboratório é obrigatório'),
  propertyName: yup.string()
    .required('Nome da propriedade é obrigatório')
});

function Formulario() {
  const initialValues: SearchFormValues = {
    name: '',
    startDate: '',
    endDate: '',
    propertyName: '',
    propertyId: 0,
    propertyCnpj: '',
    labName: '',
    labId: 0,
    notes: '',
  };

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = React.useState(false);

  const searchFormik = useFormik<SearchFormValues>({
    initialValues,
    validationSchema: SearchValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const output = {
        nome: values.name,
        dataInicial: values.startDate.toString(),
        dataFinal: values.endDate.toString(),
        infosPropriedade: {
          id: values.propertyId,
          nome: values.propertyName,
        },
        cnpj: values.propertyCnpj,
        laboratorio: {
          id: values.labId,
          nome: values.labName,
        },
        observacoes: values.notes
      };
      
      console.log(JSON.stringify(output, null, 2));
      resetForm();
      setIsSubmittedSuccessfully(true);
      setTimeout(() => {
        setIsSubmittedSuccessfully(false);
      }, ALERT_TIME_ON_SCREEN);
      
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledFormContainer>
        <form onSubmit={searchFormik.handleSubmit}>
          <FormHeader>
            <FormTitle>Teste Front-end</FormTitle>
            <Button type="submit" variant="text" style={{ color: '#FFFFFF' }}>
              SALVAR
            </Button>
          </FormHeader>
          {isSubmittedSuccessfully && (<Alert severity="success">Cadastro realizado com sucesso.</Alert>)}
          <Box margin={4}>
            <Grid container rowSpacing={4} columnSpacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  label="Nome *"
                  variant="standard"
                  onChange={searchFormik.handleChange}
                  fullWidth
                  inputProps={{
                    maxLength: 40
                  }}
                  error={searchFormik.touched.name && Boolean(searchFormik.errors.name)}
                  helperText={
                    <HelperTextWithCounter
                      error={searchFormik.touched.name && Boolean(searchFormik.errors.name ?? false)}
                      touched={searchFormik.touched.name}
                      valueLength={searchFormik.values.name.length}
                      maxLength={CHARACTER_LIMIT_NAME}
                      errorMessage={searchFormik.touched.name && searchFormik.errors.name}
                    />
                  }
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DatePicker
                  name="startDate"
                  label="Data Inicial *"
                  format={DATE_FORMAT_PTBR}
                  maxDate={dayjs(searchFormik.values.endDate)}
                  onChange={value => searchFormik.setFieldValue('startDate', value)}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DatePicker
                  name="endDate"
                  label="Data Final *"
                  format={DATE_FORMAT_PTBR}
                  minDate={dayjs(searchFormik.values.startDate)}
                  onChange={value => searchFormik.setFieldValue('endDate', value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Propriedades searchFormik={searchFormik}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <Laboratorios searchFormik={searchFormik}/>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="notes"
                  label="Observações"
                  multiline
                  rows={4}
                  variant="standard"
                  fullWidth
                  onChange={searchFormik.handleChange}
                  inputProps={{
                    maxLength: 1000
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </StyledFormContainer>
    </LocalizationProvider>
  );
}

const StyledFormContainer = styled.div`
  flex-direction: column;
  margin: 20px;
  border: 1px solid #CCC;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  max-width: 75%;
  margin-right: auto;
  margin-left: auto;
`;

const FormHeader = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: #00796B;
`;

const FormTitle = styled.p`
  font-size: 20px;
  color: #FFFFFF;
  padding: 8px;
  font-family: 'Roboto', sans-serif;
`;

export default Formulario;
