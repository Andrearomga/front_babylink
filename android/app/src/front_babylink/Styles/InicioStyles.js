import { StyleSheet } from 'react-native';
const InicoStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff', // El color de fondo por defecto
      },
      svgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      greetingText: {
        position: 'absolute',
        top: 40, // Alineado con el elipse
        left: 85, // Alineado con el elipse
        fontSize: 18,
        color: '#000000',
      },
      menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10, // Ajusta este valor según sea necesario
        width: '100%',
        paddingHorizontal: 20,
      },

});
export default InicoStyles;