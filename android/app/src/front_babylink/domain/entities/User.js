class User {
    constructor(id, nombre, apellido, email, contraseña) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.contraseña = contraseña;
    }
  
    // Getter para obtener el ID del usuario
    getId() {
      return this.id;
    }
  
    // Setter para actualizar el ID del usuario
    setId(id) {
      this.id = id;
    }
  
    // Getter para obtener el nombre del usuario
    getNombre() {
      return this.nombre;
    }
  
    // Setter para actualizar el nombre del usuario
    setNombre(nombre) {
      this.nombre = nombre;
    }
  
    // Getter para obtener el apellido del usuario
    getApellido() {
      return this.apellido;
    }
  
    // Setter para actualizar el apellido del usuario
    setApellido(apellido) {
      this.apellido = apellido;
    }
  
    // Getter para obtener el email del usuario
    getEmail() {
      return this.email;
    }
  
    // Setter para actualizar el email del usuario
    setEmail(email) {
      this.email = email;
    }
  
    // Getter para obtener la contraseña del usuario
    getContraseña() {
      return this.contraseña;
    }
  
    // Setter para actualizar la contraseña del usuario
    setContraseña(contraseña) {
      this.contraseña = contraseña;
    }
  }
  
  export default User;
  