  module.exports = (longitud) => {
      let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ012346789!·$%&/()";
      let contraseña = "";
      for (i = 0; i < longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      return contraseña;
  }