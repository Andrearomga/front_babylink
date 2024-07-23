import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BabyService from '../../infrastructure/repositories/ApiBbayRepositor';
import UserService from '../../infrastructure/repositories/ApiUserRepository';
const {width, height} = Dimensions.get('window');

const Menu = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [usuarioNombre, serUsuarioNombre] = useState('');

  const cargarDatos = async () => {
    try {
      let usuario = await AsyncStorage.getItem('usuario');
      usuario = JSON.parse(usuario);
      serUsuarioNombre(usuario.fullName + ' ' + usuario.fullLastName);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
    // Aquí podrías hacer la llamada a la API para obtener los datos del usuario
    /*
    fetch('https://tu-api-url.com/user-profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token si es necesario
      },
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
        Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario. Inténtalo nuevamente.');
      });
    */
  }, []);

  const handleLogout = () => {
    setModalTitle('Cerrar sesión');
    setModalMessage('¿Estás seguro de que deseas cerrar sesión?');
    setModalVisible(true);
  };

  const handleDeleteAccount = () => {
    setModalTitle('Eliminar cuenta');
    setModalMessage(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
    );
    setModalVisible(true);
  };

  const confirmAction = async () => {
    if (modalTitle === 'Cerrar sesión') {
      // Comentado para futura integración con la API de cierre de sesión
      /*
      fetch('https://tu-api-url.com/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token si es necesario
        },
      })
        .then(response => {
          if (response.ok) {
            Alert.alert('Cerrar sesión', 'Has cerrado sesión exitosamente');
            navigation.navigate('Login');
          } else {
            Alert.alert('Error', 'Hubo un problema al cerrar sesión. Inténtalo nuevamente.');
          }
        })
        .catch(error => {
          console.error('Error al cerrar sesión:', error);
          Alert.alert('Error', 'Hubo un problema al cerrar sesión. Inténtalo nuevamente.');
        });
      */
      Alert.alert('Cerrar sesión', 'Has cerrado sesión exitosamente');
      navigation.navigate('Login');
    } else if (modalTitle === 'Eliminar cuenta') {
      let usuario = await AsyncStorage.getItem('usuario');
      usuario = JSON.parse(usuario);
      const IdUser = usuario.IdUser;
      const response = await UserService.deletes(IdUser);
      Alert.alert(
        'Cuenta eliminada',
        'Tu cuenta ha sido eliminada exitosamente',
      );
      AsyncStorage.removeItem('usuario');
      AsyncStorage.removeItem('bebe');
      navigation.navigate('Login');
    }
    setModalVisible(false);
  };

  const menuItems = [
    {
      icon: require('../../assets/images/sueño1.png'),
      label: 'Sueño',
      screen: 'PrincipalSueno',
    },
    {
      icon: require('../../assets/images/comida.png'),
      label: 'Comida',
      screen: 'ComidaScreen',
    },
    {
      icon: require('../../assets/images/Citas.png'),
      label: 'Citas',
      screen: 'Login',
    },
    {
      icon: require('../../assets/images/vacuna1.png'),
      label: 'Vacunas',
      screen: 'ListVacuna',
    },
    {
      icon: require('../../assets/images/Chat1.png'),
      label: 'Chat',
      screen: 'MarketplaceScreen',
    },
    {
      icon: require('../../assets/images/Pediatr.png'),
      label: 'Pediatr',
      screen: 'PediatrasScreen',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/corazon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{`${usuarioNombre}`}</Text>
      </View>

      <View style={styles.menuItemsContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.icon} style={styles.menuItemIcon} />
            <Text style={styles.menuItemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => navigation.navigate('RivacidadPolitica')}>
          <Text style={styles.sectionItemText}>Aviso de Privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem} onPress={handleLogout}>
          <Text style={styles.sectionItemText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={handleDeleteAccount}>
          <Text style={styles.sectionItemText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Image
            source={require('../../assets/images/tacha1.jpeg')}
            style={styles.errorIcon}
          />
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmAction} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  menuItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 15,
  },
  menuItem: {
    width: '45%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItemIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    padding: 15,
    marginVertical: 10,
  },
  sectionItem: {
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  sectionItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Menu;
