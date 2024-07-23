import axios from 'axios';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const service = '/information-management/feeding';

const url = `${baseURL}${service}`;

const guardar = async feeding => {
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
      feeding,
    },
  });

  return response.data;
};

const actualizar = async feeding => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  const response = await axios({
    url: `${url}/save`,
    method: 'update',
    headers: {
      token,
    },
    data: {
      feeding,
    },
  });

  return response.data;
};

const list = async IdBaby => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  const response = await axios({
    url: `${url}/list/${IdBaby}`,
    method: 'GET',
    headers: {
      token,
    },
  });

  return response.data;
};

const deletes = async IdFeeding => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  const response = await axios({
    url: `${url}/delete/${IdFeeding}`,
    method: 'DELETE',
    headers: {
      token,
    },
  });

  return response.data;
};

const AlimentacionService = {
  guardar,
  list,
  actualizar,
  deletes,
};

export default AlimentacionService;
