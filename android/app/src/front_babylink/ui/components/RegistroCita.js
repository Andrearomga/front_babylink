import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CitasMedicasServices from '../../infrastructure/repositories/CitasMedicasServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const socket = io('http://192.168.0.24:3000');

const RegistroCita = () => {
  const navigation = useNavigation();
  // const initialLetter = "A" ? "A".charAt(0).toUpperCase() : 'A';

  // Estado para almacenar los datos de las citas y el nombre del usuario
  const [citasData, setCitasData] = useState([]);
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario

  // Imagen constante para todas las citas
  const imageSource = require('../../assets/images/Citas.png');
  const handleAddCitaPress = () => {
    navigation.navigate('Cita Medica'); // Navegar a la pantalla 'Login'
  };

  const userIcon = require('../../assets/images/Usuario.png');
  const notificationsIcon = require('../../assets/images/notificaciones.png');
  const homeIcon = require('../../assets/images/home.png');
  const chatIcon = require('../../assets/images/comentarios.png');
  const doctorIcon = require('../../assets/images/doctores.png');

  const handleChatPress = () => {
    // Lógica para manejar la acción del chat
  };

  const handleDoctorPress = () => {
    // Lógica para manejar la acción del doctor
  };

  const handleDeleteCita = async id => {
    // setCitasData(citasData.filter(cita => cita.id !== id));

    const response = await CitasMedicasServices.deletes(id);
    listarCitasMedicas();
  };

  const handleMenuPress = () => {
    navigation.navigate('Menu');
  };

  useEffect(() => {
    listarCitasMedicas();
    cargarDatos();
    // socket.on('guardarCitaMedica', async newRecord => {
    //   listarCitasMedicas();
    // });
    intervar()
  }, []);

  const intervar = () => {
    setInterval(() => {
      // console.log("interval")
      listarCitasMedicas();
    }, 5000);
  };

  const cargarDatos = async () => {
    let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    setUserName(usuario.fullName + ' ' + usuario.fullLastName);
  };

  const listarCitasMedicas = async () => {
    try {
      let bebe = await AsyncStorage.getItem('bebe');
      bebe = JSON.parse(bebe);
      let IdBaby = bebe.IdBaby;
  
      const response = await CitasMedicasServices.list(IdBaby);
  
      
       setCitasData(response.value);
      
    } catch (error) {
      //console.log({ error }, 'pss');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuIconContainer}
        onPress={handleMenuPress}>
        <View style={styles.menuIconBackground}></View>
        <Entypo name="menu" size={40} color="#000" style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Círculo inicial y saludo */}
      <View style={styles.circleContainer}>
        <Text style={styles.saludo}>Hola, {userName}</Text>
      </View>

      {/* Lista de citas */}
      <FlatList
        data={citasData}
        renderItem={({item}) => (
          <CitaItem
            key={item.id}
            item={item}
            imageSource={imageSource}
            onDelete={() => handleDeleteCita(item.IdMedicalAppointment)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Botón de agregar */}
      <TouchableOpacity
        style={styles.ellipseContainer}
        onPress={handleAddCitaPress}>
        <View style={styles.ellipse}></View>
        <Entypo name="plus" size={50} color="#000" style={styles.plusIcon} />
      </TouchableOpacity>

      {/* Rectángulo con íconos */}
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MenuScreen')}
            style={styles.iconButton}>
            <Image source={userIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrincipalSueno')}
            style={styles.iconButton}>
            <Image source={notificationsIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ListVacuna')}
            style={styles.iconButton}>
            <Image source={homeIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChatPress}>
            <Image source={chatIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDoctorPress}>
            <Image source={doctorIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CitaItem = ({item, imageSource, onDelete}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    onDelete();
    hideModal();
  };

  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity onPress={showModal}>
      <View style={styles.citaContainer}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.cita}>{item.title}</Text>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.dateTime}>{item.date}</Text>
        </View>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Eliminar Cita</Text>
          <Text style={styles.modalMessage}>
            ¿Estás seguro de que deseas eliminar esta cita?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="contained"
              onPress={handleDelete}
              style={styles.okButton}>
              Eliminar
            </Button>
            <Button
              mode="outlined"
              onPress={hideModal}
              style={styles.cancelButton}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 30,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8EEBD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  initial: {
    fontFamily: 'Roboto',
    fontWeight: '800',
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  saludo: {
    fontFamily: 'Urbanist',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#000000',
    marginLeft: 10,
  },
  citaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
    marginTop: 5,
  },
  cita: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
  },
  dateTime: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 24,
    color: '#000000',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 10,
    zIndex: 1,
  },
  flatListContent: {
    paddingBottom: 100, // Espacio adicional para desplazar por completo los elementos superiores
  },
  menuIconContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 10,
  },
  menuIcon: {
    zIndex: 1,
  },
  ellipseContainer: {
    position: 'absolute',
    width: 57,
    height: 58,
    left: 327,
    top: 650,
  },
  ellipse: {
    position: 'absolute',
    width: 60,
    height: 58,
    left: 0,
    top: 15,
    backgroundColor: '#38A169',
    borderRadius: 100,
  },
  plus: {
    position: 'absolute',
    width: 30,
    height: 24,
    left: 12,
    top: 25,
    fontFamily: 'Inria Sans',
    fontWeight: '400',
    fontSize: 50,
    lineHeight: 24,
    letterSpacing: 0.09,
    color: '#000000',
  },
  plusIcon: {
    position: 'absolute',
    left: 5,
    alignSelf: 'center',
    top: 18,
  },
  icon: {
    width: 35,
    height: 35,
    top: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
    lineHeight: 40,
    marginLeft: -25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rectangleContainer: {
    position: 'absolute',
    width: 430,
    height: 70,
    left: -6,
    top: 770,
    backgroundColor: '#FFFFFF',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  okButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#6200ee',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default RegistroCita;
