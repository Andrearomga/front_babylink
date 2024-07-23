import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import DreamService from '../../infrastructure/repositories/ApiDreamRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const ListaSueno = ({route, navigation}) => {
  const [scheduleList, setScheduleList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    index: null,
  });

  const [IdDream, setIdDream] = useState(0);

  useEffect(() => {
    // Definir la función que se ejecutará cada segundo

    // Configurar el intervalo para ejecutar listarSuenos cada segundo
    // const intervalId = setInterval(listarSuenos, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    // return () => clearInterval(intervalId);
    listarSuenos();
    intervar();
  }, []);
  const intervar = () => {
    setInterval(() => {
      // console.log("interval")
      listarSuenos();
    }, 5000);
  };
  const listarSuenos = async () => {
    let baby = await AsyncStorage.getItem('bebe');
    baby = JSON.parse(baby);
    const IdBaby = baby.IdBaby;

    const response = await DreamService.list(IdBaby);
    setScheduleList(response.value);
  };

  const navigateToAddSchedule = () => {
    navigation.navigate('PersonalizadoSueno', {scheduleList});
  };

  const handleDelete = index => {
    setIdDream(index);
    setModalContent({
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar este horario?`,
      index: index,
    });
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    const response = await DreamService.deletes(IdDream);
    listarSuenos();
    setModalVisible(false);
  };

  const renderItem = ({item, index}) => (
    <ScheduleItem item={item} index={index} handleDelete={handleDelete} />
  );

  return (
    <View style={styles.container}>
      <Ionicons name="star" style={styles.star1} />
      <Ionicons name="star" style={styles.star2} />
      <Ionicons name="star" style={styles.star3} />
      <Ionicons name="star" style={styles.star4} />
      <FlatList
        data={scheduleList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay horarios agregados</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.plusButton}
        onPress={navigateToAddSchedule}>
        <Ionicons name="add-sharp" size={50} color="#FFFFFF" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{modalContent.title}</Text>
          <Text style={styles.modalMessage}>{modalContent.message}</Text>
          <View style={styles.modalButtonContainer}>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={() => confirmDelete()}
              style={styles.deleteButton}>
              Eliminar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ScheduleItem = ({item, index, handleDelete}) => {
  const [isEnabled, setIsEnabled] = useState(item.IsActivated === 1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', message: ''});

  const toggleSwitch = IdDream => {
    setIsEnabled(previousState => !previousState);
    setModalContent({
      title: !isEnabled ? 'Activado' : 'Desactivado',
      message: `Horario de ${item.startTime} a ${item.endTime}`,
    });
    setModalVisible(true);
    actualizar(IdDream);
  };

  const listarSuenos = async () => {
    // Esto lo recuperan del storage del movile
    let bebe = await AsyncStorage.getItem('bebe');
    bebe = JSON.parse(bebe);
    const IdBaby = bebe.IdBaby;
    const response = await DreamService.list(IdBaby);

    setScheduleList(response.value);
  };

  const actualizar = async IdDream => {
    const response = await DreamService.update(IdDream);
    listarSuenos();
  };

  const convertTo12HourFormat = timeStr => {
    // Dividir la hora, los minutos y los segundos
    let [hours, minutes, seconds] = timeStr.split(':');

    // Convertir a número
    hours = parseInt(hours, 10);

    // Determinar el modificador AM/PM
    const modifier = hours >= 12 ? 'PM' : 'AM';

    // Convertir las horas al formato de 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'

    // Asegurar que las horas y minutos tienen dos dígitos
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.padStart(2, '0');

    // Formatear en 12 horas
    return `${hoursStr}:${minutesStr} ${modifier}`;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleDelete(item.IdDream);
      }}>
      <View style={styles.item}>
        <View style={styles.rectangle}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12HourFormat(item.initialHour)}
            </Text>
            <Image
              source={require('../../assets/images/luna2.png')}
              style={styles.moon}
            />
          </View>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{
                false: 'rgba(237, 240, 249, 0.5)',
                true: 'rgba(237, 240, 249, 0.5)',
              }}
              thumbColor={isEnabled ? '#395CB1' : 'rgba(237, 240, 249, 0.5)'}
              ios_backgroundColor="rgba(237, 240, 249, 0.5)"
              onValueChange={() => toggleSwitch(item.IdDream)}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {convertTo12HourFormat(item.finalHour)}
            </Text>
            <Image
              source={require('../../assets/images/sol.png')}
              style={styles.sun}
            />
          </View>
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalMessage}>{modalContent.message}</Text>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={styles.okButton}>
              OK
            </Button>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const colors = {
  primaryBackground: '#070F22',
  secondaryBackground: '#EDF0F9',
  accent: '#141C2F',
  text: '#000000',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070F22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    position: 'absolute',
    width: 53,
    height: 53,
    right: 20,
    top: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Urbanist',
    fontSize: 16,
    color: '#FFFFFF',
  },
  listContentContainer: {
    paddingBottom: 100,
  },
  itemText: {
    fontFamily: 'Urbanist',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  rectangle: {
    width: width * 0.9,
    backgroundColor: 'rgba(237, 240, 249, 0.5)',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    top: 50,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 1,
  },
  timeText: {
    fontFamily: 'Urbanist',
    fontWeight: '800',
    fontSize: 20,
    color: '#000000',
  },
  sun: {
    width: 28,
    height: 19,
    marginRight: 200,
  },
  moon: {
    width: 31,
    height: 31,
    marginRight: 200,
    transform: [{rotate: '340deg'}, {scale: 1.5}],
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 20,
  },
  switch: {
    transform: [{scaleX: 2.0}, {scaleY: 2.0}],
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
    color: 'black',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  okButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  star1: {
    position: 'absolute',
    fontSize: 14,
    left: 39,
    top: 186,
    color: colors.white,
  },
  star2: {
    position: 'absolute',
    fontSize: 14,
    left: 96,
    top: 20,
    color: colors.white,
  },
  star3: {
    position: 'absolute',
    fontSize: 14,
    left: 370,
    top: 242,
    color: colors.white,
  },
});

export default ListaSueno;
