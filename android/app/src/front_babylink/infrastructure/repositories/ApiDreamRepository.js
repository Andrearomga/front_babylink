import axios from 'axios';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const service = '/information-management/dream';

const url = `${baseURL}${service}`;

const guardar = async dream => {
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
      dream,
    },
  });

  return response.data;
};

const list = async IdBaby => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  let response;
  try {
    response = await axios({
      url: `${url}/list/${IdBaby}`,
      method: 'GET',
      headers: {
        token,
      },
    });
  } catch (error) {
    
    response = {
      value: [],
    };
  }

  return response.data;
};

const deletes = async IdDream => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
  const response = await axios({
    url: `${url}/delete/${IdDream}`,
    method: 'DELETE',
    headers: {
      token,
    },
  });

  return response.data;
};

const update = async IdDream => {
  let usuario = await AsyncStorage.getItem('usuario');
  usuario = JSON.parse(usuario);
  const token = usuario.token;
    const response = await axios({
        url: `${url}/update/${IdDream}`,
      method: 'PUT',
      headers: {
        token,
      },
    });
  
    return response.data;
  };

const DreamService = {
  guardar,
  list,
  deletes,
  update
};

export default DreamService;
