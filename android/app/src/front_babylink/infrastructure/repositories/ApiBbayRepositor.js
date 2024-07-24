import axios from 'axios';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const service = '/information-management/baby';

const url = `${baseURL}${service}`;

const guardar = async baby => {
  try {
    let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    const token = usuario.token;
    console.log({url: `${url}/save`})
    const response = await axios({
      url: `${url}/save`,
      method: 'POST',
      headers: {
        token,
      },
      data: {
        baby,
      },
    });
  
    return response.data;
  } catch (error) {
    // console.log("Guardar baby")
    // console.log({error})
  }
 

 
};

const getBabyById = async IdUser => {
  let usuario = await AsyncStorage.getItem('usuario');

  usuario = JSON.parse(usuario);
  const token = usuario.token;

  const response = await axios({
    url: `${url}/get/${IdUser}`,
    method: 'GET',
    headers: {
      token,
    },
  });

  return response.data;
};

const actualizar = async IdUser => {
  let usuario = await AsyncStorage.getItem('usuario');

  usuario = JSON.parse(usuario);
  const token = usuario.token;
  //console.log(token)
  const response = await axios({
    url: `${url}/update/${IdUser}`,
    method: 'PUT',
    headers: {
      token,
    },
    data: {
      baby,
    },
  });

  return response.data;
};


const BabyService = {
  guardar,
  getBabyById,
  actualizar,
};

export default BabyService;
