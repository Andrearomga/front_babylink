// Notificaciones.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image as RNImage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from './context/NotificationContext';  // Importar el contexto

const Notificaciones = () => {
  const navigation = useNavigation();
  const { notificaciones } = useContext(NotificationContext);  // Usar el contexto

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.bellContainer}>
          <RNImage source={require('../../assets/images/campana.png')} style={styles.bellIcon} />
          {notificaciones.length > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{notificaciones.length}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Lista de notificaciones */}
      <ScrollView style={styles.notificationsArea}>
        {notificaciones.map((notificacion) => (
          <View key={notificacion.id} style={styles.notificationCard}>
            <RNImage source={notificacion.icono} style={styles.notificationIcon} />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>{notificacion.texto}</Text>
              <Text style={styles.notificationTime}>{notificacion.tiempo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Usuario')}>
          <RNImage source={require('../../assets/images/Usuario.png')} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Notificaciones')}>
          <RNImage source={require('../../assets/images/notificaciones.png')} style={styles.tabIcon} />
          {notificaciones.length > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{notificaciones.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Inicio')}>
          <RNImage source={require('../../assets/images/home.png')} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ChatPadres')}>
          <RNImage source={require('../../assets/images/comentarios.png')} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Pediatras')}>
          <RNImage source={require('../../assets/images/doctores.png')} style={styles.tabIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bellContainer: {
    position: 'relative',
  },
  bellIcon: {
    width: 25,
    height: 25,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
  },
  notificationsArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  notificationIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
  },
  notificationTime: {
    fontSize: 14,
    color: '#666',
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});

export default Notificaciones;
