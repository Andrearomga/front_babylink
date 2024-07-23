import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const portadaStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fondo blanco para toda la pantalla
    width: width, // Asegura que el ancho ocupe el 100% de la pantalla
    height: height, // Asegura que la altura ocupe el 100% de la pantalla
  },
  logo: {
    width: width * 0.4, // Ancho ajustado a 40% del ancho de la pantalla
    height: width * 0.4, // Alto ajustado a 40% del ancho de la pantalla
    resizeMode: 'contain', // Ajusta el modo de redimensionamiento para mostrar la imagen completa
    marginBottom: 20, // Espacio entre la imagen y el texto
  },
  text: {
    color: 'rgba(30, 30, 30, 0.76)',
    fontSize: 38,
    fontFamily: 'Urbanic-Bold', // Asegúrate de que la fuente esté disponible en tu proyecto
    textAlign: 'center',
    marginTop: -20, // Ajusta este valor para mover el texto más arriba
  },
});

export default portadaStyles;
