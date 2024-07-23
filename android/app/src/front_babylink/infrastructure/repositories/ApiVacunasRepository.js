import axios from 'axios';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const service = '/information-management/vaccines';


const url = `${baseURL}${service}`;

const listarVacunas = async (IdBaby, IdVaccineGroup) => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  const response = await axios({
    url: `${url}/list/by-baby/${IdBaby}/${IdVaccineGroup}`,
    method: 'GET',
    headers: {
      token,
    },
  });
  return response.data;
};

const actualizarDato = async (IdVaccineBaby, itIsApplied) => {

  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  const response = await axios({
    url: `${url}/by-baby/update`,
    method: 'PUT',
    headers: {
      token,
    },
    data: {
        IdVaccineBaby,
        itIsApplied
    },
  });

  return response.data;
};

const VacunasService = {
  listarVacunas,
  actualizarDato,
};

export default VacunasService;
