import axios from 'axios';
import baseURL from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const service = "/information-management/pediatrician"

const url = `${baseURL}${service}`

const listarPediatra = async () => {
    let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    const token = usuario.token;

    const response = await axios({
        url:`${url}/list`,
        method:"GET",
    })

    return response.data
}

const buscarPediatra = async (fullName) => {
    let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    const token = usuario.token;

    const response = await axios({
        url:`${url}/search`,
        method:"POST",
        headers: {
            token,
          },
        data:{
            fullName
        }
    })

    return response.data
}

const PediatraService = {
    listarPediatra,
    buscarPediatra
}

export default PediatraService;
