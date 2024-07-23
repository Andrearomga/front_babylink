import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image as RNImage,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Importar useNavigation
import PediatraService from '../../infrastructure/repositories/PediatraRepository';

const Pediatras = () => {
  const navigation = useNavigation(); // Obtener el objeto de navegación
  const [pedriatraLista, setPediatraLista] = useState([]);
  const [textoBuscador, setTextoBuscador] = useState('');

  useEffect(() => {
    listarPediatras();
  }, []);

  const listarPediatras = async () => {
    const response = await PediatraService.listarPediatra();
    setPediatraLista(response.value);
  };

  const buscarPediatra = async () => {
    const response = await PediatraService.buscarPediatra(textoBuscador);
    setPediatraLista(response.value);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.greetingText}>Hola, Andrea</Text>
          <Text style={styles.title}>Especialistas en pediatría</Text>

          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => {
                buscarPediatra();
              }}>
              <RNImage
                source={require('../../assets/images/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar doctor"
              value={textoBuscador}
              onChangeText={(texto) => {
                setTextoBuscador(texto);
              }}
            />
          </View>

          <Text style={styles.subtitle}>Top doctor</Text>

          <ScrollView contentContainerStyle={styles.scrollView}>
            {pedriatraLista.map(item => {
              return (
                <TouchableOpacity style={styles.doctorCard}>
                  <View
                    style={[styles.imageContainer, styles.doctor1Background]}>
                    <RNImage
                      source={require('../../assets/images/doctor1.png')}
                      style={styles.doctorImage}
                    />
                  </View>
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{item.fullName}</Text>
                    <View style={styles.doctorDetails}>
                      <RNImage
                        source={require('../../assets/images/clock.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.doctorTime}>
                        {item.initialAttentionTime} - {item.finalAttentionTime}
                      </Text>
                    </View>
                    <View style={styles.doctorDetails}>
                      <RNImage
                        source={require('../../assets/images/phone.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.doctorPhone}>{item.numberPhone}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* <TouchableOpacity style={styles.doctorCard}>
              <View style={[styles.imageContainer, styles.doctor2Background]}>
                <RNImage source={require('../../assets/images/doctor2.png')} style={styles.doctorImage} />
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dra. Guadalupe Herdez</Text>
                <View style={styles.doctorDetails}>
                  <RNImage source={require('../../assets/images/clock.png')} style={styles.icon} />
                  <Text style={styles.doctorTime}>10:00 AM - 10:00 PM</Text>
                </View>
                <View style={styles.doctorDetails}>
                  <RNImage source={require('../../assets/images/phone.png')} style={styles.icon} />
                  <Text style={styles.doctorPhone}>554-621-23-72</Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Usuario')}>
          <RNImage
            source={require('../../assets/images/Usuario.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Notificaciones')}>
          <RNImage
            source={require('../../assets/images/notificaciones.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Inicio')}>
          <RNImage
            source={require('../../assets/images/home.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('ChatPadres')}>
          <RNImage
            source={require('../../assets/images/comentarios.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Pediatras')}>
          <RNImage
            source={require('../../assets/images/doctores.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center', // Centrar horizontalmente
  },
  scrollView: {
    alignItems: 'center',
    width: '100%', // Asegura que el scrollview ocupe todo el ancho
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderColor: '#4CCFC0',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '60%', // Ajustar el ancho del buscador
    maxWidth: 250, // Limitar el ancho máximo del buscador
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start', // Alinear a la izquierda
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '100%', // Asegurar que las tarjetas ocupen todo el ancho disponible
    maxWidth: 350, // Limitar el ancho máximo de las tarjetas
  },
  imageContainer: {
    borderRadius: 30,
    padding: 10,
    marginRight: 15,
  },
  doctor1Background: {
    backgroundColor: '#D45F2D', // Color de fondo para el primer doctor
  },
  doctor2Background: {
    backgroundColor: '#BD2DD4', // Color de fondo para el segundo doctor
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  doctorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 20, // Ajustar el tamaño del ícono
    height: 20,
    marginRight: 8,
  },
  doctorTime: {
    fontSize: 16, // Ajustar el tamaño del texto
    color: '#666',
  },
  doctorPhone: {
    fontSize: 16, // Ajustar el tamaño del texto
    color: '#666',
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, // Ajustar la altura según sea necesario
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 15,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 30, // Ajustar el tamaño del ícono
    height: 30,
  },
});

export default Pediatras;
