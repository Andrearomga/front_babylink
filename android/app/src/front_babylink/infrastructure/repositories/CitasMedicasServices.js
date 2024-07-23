import axios from 'axios';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const service = '/community/medical-appointment';
const url = `${baseURL}${service}`;

const guardar = async (medicalAppointment) => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;

  const response = await axios({
    url: `${url}/save`,
    method: 'POST',
    headers: {
      token,
    },
    data: {
      medicalAppointment,
    },
  });

  return response.data;
};

const list = async IdBaby => {
  //llamar al storage del bebe
 

  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;

  let response;
  
 
    response = await axios({
      url: `${url}/list/${IdBaby}`,
      method: 'GET',
      headers: {
        token,
      },
    });
    return response.data;  // Devuelve directamente response.data si la petición fue exitosa

  
};

const deletes = async (id) => {
  let usuario = await AsyncStorage.getItem('usuario');
  const token = usuario.token;

  const response = await axios({
    url: `${url}/delete/${id}`,
    method: 'DELETE',
    headers: {
      token,
    },
  });

  return response.data;
};

const CitasMedicasServices = {
  guardar,
  list,
  deletes,
};

export default CitasMedicasServices;
