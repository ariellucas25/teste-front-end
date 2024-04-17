import { useState, useEffect } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FormikProps } from 'formik';
import { SearchFormValues } from './Formulario';

type PropertyType = {
  searchFormik: FormikProps<SearchFormValues>;
}

type FazendaType = {
  id: number;
  nome: string;
  cnpj: string;
};

type PropertiesByIdType = {
  [key: number]: FazendaType;
};

const Propriedades = ({searchFormik}: PropertyType ) => {
  const [fazendas, setFazendas] = useState<PropertiesByIdType>({} as PropertiesByIdType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/propriedades.json');
        const data = await response.json();
        const fazendasPorId = data.reduce((acc: PropertiesByIdType, fazenda: FazendaType): PropertiesByIdType => {
          acc[fazenda.id] = fazenda;
          return acc;
        }, {});
        setFazendas(fazendasPorId);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert("Erro ao buscar dados")
      }
    };

    fetchData();
  }, []);

  const handleChangeProperties = (event: SelectChangeEvent<number>) => {
    const fazendaId = Number(event.target.value);
    const fazenda = fazendas[fazendaId];
    
    if (fazenda) {
      searchFormik.setFieldValue("propertyName", fazenda.nome);
      searchFormik.setFieldValue("propertyId", fazenda.id.toString());
      searchFormik.setFieldValue("propertyCnpj", fazenda.cnpj);
    }
  };

  return (
    <div>
      <Select
        name="propertyName"
        value={searchFormik.values.propertyId}
        onChange={handleChangeProperties}
        displayEmpty
        fullWidth
        renderValue={(selectedId) => {
          const fazenda = fazendas[Number(selectedId)];
          return fazenda ? fazenda.nome : "Propriedades *";
        }}
      >
        <MenuItem key={0} value="0" disabled>
          Propriedades *
        </MenuItem>
        {Object.values(fazendas).map((fazenda) => (
          <MenuItem key={fazenda.id} value={fazenda.id}>
            {fazenda.nome}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Propriedades;
