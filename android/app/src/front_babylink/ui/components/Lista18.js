import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import VacunasService from '../../infrastructure/repositories/ApiVacunasRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const Lista18 = () => {
  const [vacunas, setVacunas] = useState({
    pentavalenteAcelular: false,
    InfluenzaRefuerzoAnual: false,
    InfluenzaRefuerzoAnual2: false,
  });

  const [vacunasLista, setVacunaLista] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const toggleCheckbox = key => {
    setModalMessage(
      `¿Está seguro de que quiere ${
        vacunas[key] ? 'deseleccionar' : 'seleccionar'
      } la vacuna ${key.replace(/([A-Z])/g, ' $1').toUpperCase()}?`,
    );
    setSelectedKey(key);
    setModalVisible(true);
  };

  const confirmToggleCheckbox = () => {
    setVacunas({...vacunas, [selectedKey]: !vacunas[selectedKey]});
    setModalVisible(false);
  };

  useEffect(() => {
    listarVacunas();
  }, []);

  const listarVacunas = async () => {
    const IdGrupo = 3; // no cambiar
    let bebe = await AsyncStorage.getItem("bebe")
    bebe = JSON.parse(bebe)
    const IdBaby = bebe.IdBaby
    const response = await VacunasService.listarVacunas(IdBaby, IdGrupo);
    setVacunaLista(response.value);
  };

  const actualizarDato = async (IdVaccineBaby, itIsApplied) => {
    const response = await VacunasService.actualizarDato(
      IdVaccineBaby,
      itIsApplied,
    );
  };

  const renderCheckbox = (IdVaccineGroup, itIsApplied) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          itIsApplied = itIsApplied === 0 ? 1 : 0;
          await actualizarDato(IdVaccineGroup, itIsApplied);
          await listarVacunas();
        }}
        style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {itIsApplied === 1 && <Icon name="check" size={24} color="#000000" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.ellipse}></View>
      <View style={styles.ellipseBottomRight}></View>

      <Text style={styles.textHeader}>Vacunas de 18 a 36 Meses</Text>

      {vacunasLista.map(item => {
        return (
          <View key={item.IdVaccineBaby} style={styles.row}>
            <Image
              source={require('../../assets/images/vacuna1.png')}
              style={styles.icon}
            />
            <Text style={styles.textLabel}>{item.description}</Text>
            <View style={styles.checkboxWrapper}>
              {renderCheckbox(item.IdVaccineBaby, item.itIsApplied)}
            </View>
          </View>
        );
      })}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmación</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmToggleCheckbox}
              style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
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
    position: 'relative',
    backgroundColor: '#FFFFFF', // Fondo blanco
    paddingHorizontal: 20,
  },
  ellipse: {
    position: 'absolute',
    width: 900.5,
    height: 1180,
    left: -800,
    top: -850,
    backgroundColor: 'rgba(200, 200, 200, 0.4)', // Fondo gris claro para un efecto suave
    borderRadius: 745,
    transform: [{rotate: '260deg'}],
  },
  ellipseBottomRight: {
    position: 'absolute',
    width: 900.5,
    height: 1180,
    right: -800,
    bottom: -850,
    backgroundColor: 'rgba(200, 200, 200, 0.4)', // Fondo gris claro para un efecto suave
    borderRadius: 745,
    transform: [{rotate: '260deg'}],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#8EEBD5', // Fondo blanco
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textLabel: {
    flex: 1,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    color: '#000000',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    color: '#000000',
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
    color: '#000000',
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
  cancelButton: {
    backgroundColor: '#c4c4c4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  okButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Lista18;
