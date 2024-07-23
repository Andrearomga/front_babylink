import axios from 'axios';
import baseURL from '../config/apiConfig';

const service = '/authentication/user';

const url = `${baseURL}${service}`;

const guardar = async user => {
  const response = await axios({
    url: `${url}/save`,
    method: 'POST',

    data: {
      user,
    },
  });

  return response.data;
};

const login = async (email, password) => {
  try {
    const response = await axios({
      url: `${url}/login`,
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    return response.data;
  } catch (error) {
   
    return {
      error: true,
      value: {IdUser: 0},
    };
  }
};

const deletes = async IdUser => {
 
  try {
    const response = await axios({
      url: `${url}/delete/${IdUser}`,
      method: 'DELETE',
    });

    return response.data;
  } catch (error) {
  
    return {
      error: true,
      value: {IdUser: 0},
    };
  }
};

const UserService = {
  guardar,
  login,
  deletes,
};

export default UserService;
