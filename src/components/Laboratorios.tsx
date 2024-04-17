import { useState, useEffect } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FormikProps } from 'formik';
import { SearchFormValues } from './Formulario';

type LabsType = {
  searchFormik: FormikProps<SearchFormValues>;
};

type LabType = {
  id: number;
  nome: string;
};

const Laboratorios = ({ searchFormik }: LabsType) => {
  const [laboratorios, setLaboratorios] = useState<LabType[]>([]);

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await fetch('https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/laboratorios.json');
        const data = await response.json();
        setLaboratorios(data);
      } catch (error) {
        console.error('Erro ao buscar dados dos laboratórios:', error);
        alert("Erro ao buscar dados dos laboratórios")
      }
    };
    fetchLaboratorios();
  }, []);

  const handleChangeLabs = (event: SelectChangeEvent<string>) => {
    const labName = event.target.value;

    const selectedLab = laboratorios.find(lab => lab.nome === labName);

    if (selectedLab) {
      searchFormik.setFieldValue("labName", selectedLab.nome);
      searchFormik.setFieldValue("labId", selectedLab.id.toString());
    }
  };

  return (
    <div>
      <Select
        name='labName'
        value={searchFormik.values.labName}
        onChange={handleChangeLabs}
        displayEmpty
        fullWidth
        renderValue={(selectedName) => {
          const selectedLab = laboratorios.find(lab => lab.nome === selectedName);
          return selectedLab ? selectedLab.nome : "Laboratório *";
        }}
      >
        <MenuItem value="" disabled>
          Laboratório *
        </MenuItem>
        {laboratorios.map((laboratorio) => (
          <MenuItem key={laboratorio.id} value={laboratorio.nome}>
            {laboratorio.nome}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Laboratorios;
