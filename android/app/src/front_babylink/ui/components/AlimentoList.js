import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import AlimentacionService from '../../infrastructure/repositories/ApiAlimentacionRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const AlimentoList = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [feedingData, setFeedingData] = useState([]);

  const toggleModal = item => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    // Aquí puedes manejar la eliminación del elemento

    await AlimentacionService.deletes(selectedItem.IdFeeding);
    listarAlimentacion();
    setModalVisible(false);
  };

/*   useEffect(() => {
    listarAlimentacion();
    // intervar();
  }, []);
 */
  
  useFocusEffect(
    React.useCallback(() => {
      listarAlimentacion();

      return () => {};
    }, []),
  );



  // const // intervar = () => {
  //   setInterval(() => {
  //     // console.log("interval al")
  //     listarAlimentacion();
  //   }, 60000);
  // };

  const listarAlimentacion = async () => {
    try {
      let bebe = await AsyncStorage.getItem('bebe');
      bebe = JSON.parse(bebe);
      const IdBaby = bebe.IdBaby;
      const response = await AlimentacionService.list(IdBaby);

      setFeedingData(response.value);
    } catch (error) {}
  };

  const renderFeedingItem = ({item}) => (
    <View style={styles.feedingItem}>
      <View style={styles.feedingContent}>
        <View style={styles.feedingHeader}>
          <Text style={styles.feedingTitle}>{item.title}</Text>
          <Text style={styles.feedingTime}>{item.time}</Text>
        </View>
        <Text style={styles.feedingNotes}>{item.notes}</Text>
        <View style={styles.iconContainer}>
          {/* <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
         
              navigation.navigate('AgregarAlimento', {item})
            }}>
            <Image
              source={require('../../assets/images/EDIT.jpeg')}
              style={styles.edit}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => toggleModal(item)}>
            <Image
              source={require('../../assets/images/BORRAR.jpeg')}
              style={styles.edit}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/fondolist.png')}
        style={styles.headerImage}
      />
      <FlatList
        data={feedingData}
        renderItem={renderFeedingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AgregarAlimento')}>
        <Image
          source={require('../../assets/images/mas.png')}
          style={styles.addButton}
        />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalContent}>
          <Image
            source={require('../../assets/images/borar.png')}
            style={styles.trash}
          />
          <Text style={styles.modalTitle}>Eliminar</Text>
          <Text style={styles.modalText}>
            ¿Estás seguro de que deseas eliminar?.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButtonCancel}>
              <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.modalButtonDelete}>
              <Text style={styles.modalButtonTextDelete}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginTop: -50,
  },
  trash: {
    width: 90,
    height: 90,
  },
  list: {
    paddingBottom: 80,
    paddingHorizontal: 20,
    paddingVertical: -550,
  },
  feedingItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5, // Añadir sombra para Android
    shadowColor: '#000', // Añadir sombra para iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderLeftWidth: 8,
    borderLeftColor: '#4CCFC0', // Color del borde izquierdo
  },
  feedingIcon: {
    marginRight: 15,
  },
  feedingContent: {
    flex: 1,
  },
  feedingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  feedingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  feedingTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  feedingNotes: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  edit: {
    width: 30,
    height: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonTextCancel: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonDelete: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonTextDelete: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AlimentoList;
