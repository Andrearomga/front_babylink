import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Vacunacion = () => {
  const navigation = useNavigation();
  const [vacunas, setVacunas] = useState([]);
  const [usuarioNombre, serUsuarioNombre] = useState('');
    const [nombreBebe, setNombreBebe] = useState('');


  const cargarDatos = async () => {
    try {
      let usuario = await AsyncStorage.getItem('usuario');
      usuario = JSON.parse(usuario);
      serUsuarioNombre(usuario.fullName + " " + usuario.fullLastName);
      
   

    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };
  useEffect(() => {
    cargarDatos();
    // Aquí podrías hacer la llamada a la API para obtener las vacunas
    /*
    fetch('https://tu-api-url.com/vacunas')
      .then(response => response.json())
      .then(data => setVacunas(data))
      .catch(error => {
        console.error('Error al obtener las vacunas:', error);
        Alert.alert('Error', 'Hubo un problema al obtener las vacunas. Inténtalo nuevamente.');
      });
    */
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola {`${usuarioNombre}`}</Text>
      <Text style={styles.title}>Vacunación</Text>

      {vacunas.map((vacuna, index) => (
        <View key={index} style={styles[`rectangle${index + 74}`]}>
          <TouchableOpacity onPress={() => navigation.navigate(vacuna.route)} style={styles.iconButton}>
            <Icon name="angle-right" style={[styles.icon, styles[`icon${index + 74}`]]} />
          </TouchableOpacity>
          <Text style={styles.text}>{vacuna.ageRange}</Text>
          <View style={styles[`ellipse${index + 7}`]}>
            <Image source={require('../../assets/images/vaccine.png')} style={styles.image} />
          </View>
        </View>
      ))}

      <View style={styles.rectangle74}>
        <TouchableOpacity onPress={() => navigation.navigate('Lista04')} style={styles.iconButton}>
          <Icon name="angle-right" style={[styles.icon, styles.icon74]} />
        </TouchableOpacity>
        <Text style={styles.text}>0-4 meses</Text>
        <View style={styles.ellipse7}>
          <Image source={require('../../assets/images/vaccine.png')} style={styles.image} />
        </View>
      </View>

      <View style={styles.rectangle75}>
        <TouchableOpacity onPress={() => navigation.navigate('Lista06')} style={styles.iconButton}>
          <Icon name="angle-right" style={[styles.icon, styles.icon75]} />
        </TouchableOpacity>
        <Text style={styles.text}>6-12 meses</Text>
        <View style={styles.ellipse8}>
          <Image source={require('../../assets/images/vaccine.png')} style={styles.image} />
        </View>
      </View>

      <View style={styles.rectangle76}>
        <TouchableOpacity onPress={() => navigation.navigate('Lista18')} style={styles.iconButton}>
          <Icon name="angle-right" style={[styles.icon, styles.icon76]} />
        </TouchableOpacity>
        <Text style={styles.text}>18-36 meses</Text>
        <View style={styles.ellipse9}>
          <Image source={require('../../assets/images/vaccine.png')} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  rectangle74: {
    width: '100%',
    height: 85,
    backgroundColor: 'rgba(27, 139, 79, 0.4)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  rectangle75: {
    width: '100%',
    height: 85,
    backgroundColor: '#4CCFC0',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  rectangle76: {
    width: '100%',
    height: 85,
    backgroundColor: '#8EEBD5',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    top: 27,
    right: 10,
  },
  icon: {
    fontSize: 30,
    right: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  ellipse7: {
    position: 'absolute',
    width: 53,
    height: 50,
    left: 10,
    backgroundColor: 'rgba(96, 187, 238, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  ellipse8: {
    position: 'absolute',
    width: 53,
    height: 50,
    left: 10,
    backgroundColor: 'rgba(212, 95, 45, 0.64)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  ellipse9: {
    position: 'absolute',
    width: 53,
    height: 50,
    left: 10,
    backgroundColor: 'rgba(45, 92, 212, 0.64)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  ellipseIcon: {
    fontSize: 24,
    color: '#000',
  },
});

export default Vacunacion;