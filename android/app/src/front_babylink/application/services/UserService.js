// UserService.js

import ApiUserRepository from '../../infrastructure/repositories/ApiUserRepository';

const userRepository = new ApiUserRepository();

const UserService = {
  register: async (nombre, apellido, email, contraseña) => {
    try {
      const user = { nombre, apellido, email, contraseña };
      const response = await userRepository.register(user);
      return response; // Puedes retornar directamente la respuesta si esperas el formato correcto desde la API
    } catch (error) {
      throw error; // Lanza cualquier error que ocurra al registrar el usuario
    }
  },
  // Otras funciones del UserService si las hubiera
};

export default UserService;
