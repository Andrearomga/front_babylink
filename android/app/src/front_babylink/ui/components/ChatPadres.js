import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image as RNImage,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Importar useNavigation
import ChatService from '../../infrastructure/repositories/ApiChatService';
import AsyncStorage from '@react-native-async-storage/async-storage';

import io from 'socket.io-client';

const socket = io('http://192.168.0.24:3000');

const ChatPadres = () => {
  const navigation = useNavigation(); // Obtener el objeto de navegación
  const padres = []; // Lista de padres
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje
  const [mensajes, setMensajes] = useState([]); // Estado para la lista de mensajes

  const handleEnviarMensaje = () => {
    // if (mensaje.trim()) {
    //   const nuevoMensaje = {texto: mensaje, tipo: 'enviado'}; // Tipo enviado
    //   setMensajes([...mensajes, nuevoMensaje]); // Agregar el nuevo mensaje a la lista de mensajes
    //   setMensaje(''); // Limpiar el campo de entrada
    // }
    mandarMensaje(mensaje);
  };

  // Simular recepción de mensajes
  const handleRecibirMensaje = mensajeRecibido => {
    const nuevoMensaje = {texto: mensajeRecibido, tipo: 'recibido'}; // Tipo recibido
    setMensajes([...mensajes, nuevoMensaje]);
  };

  // Simulación de mensaje recibido después de 5 segundos
  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   cargarMensajes();
    // }, 1000); // 1000 ms = 1 segundo

    // // Limpia el intervalo cuando el componente se desmonte
    // return () => clearInterval(intervalId);

    socket.on('connection', () => {
    });

    cargarMensajes();
    socket.on('newRecord', async newRecord => {
      cargarMensajes()
    });

    // Cleanup the socket connection on unmount
    return () => {
      socket.off('newRecord');
      socket.disconnect();
    };
  }, []);

  const obtenerFechaFormateada = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const obtenerFechaHoraFormateada = () => {
    const fecha = new Date();

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const day = String(fecha.getDate()).padStart(2, '0');

    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const seconds = String(fecha.getSeconds()).padStart(2, '0');

    const fechaFormateada = `${year}-${month}-${day}`;
    const horaFormateada = `${hours}:${minutes}:${seconds}`;

    return `${horaFormateada}`;
  };
  const mandarMensaje = async text => {
    let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    const IdUser = usuario.IdUser;
    const chat = {
      IdChat: 0,
      IdUser,
      date: obtenerFechaFormateada(),
      hour: obtenerFechaHoraFormateada(),
      text,
      username: usuario.fullName + ' ' + usuario.fullLastName,
    };
    const response = await ChatService.send(chat);

    if (response.tieneGroseria == true) {
      Alert.alert('No puedes mandar groserias al chat');
    }
    setMensaje('');
    cargarMensajes();
  };

  const cargarMensajes = async () => {
    let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    const IdUser = usuario.IdUser;
    try {
      let response = await ChatService.list();

      let mensajes = [];
      for (let index = 0; index < response.value.length; index++) {
        mensajes.push({
          tipo:
            response.value[index].IdUser === IdUser ? 'enviado' : 'recivido',
          texto:
            response.value[index].IdUser === IdUser
              ? `${response.value[index].text}`
              : `${response.value[index].username}: ${response.value[index].text}`,
        });
      }
      setMensajes([...mensajes]);

      // response.value.map(element => {
      //   setMensajes([...mensajes, {texto: '123', tipo: 'recibido'}]);
      // });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.profilePic} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Chat de padres</Text>
          <Text style={styles.headerSubtitle}>{padres.join(', ')}</Text>
        </View>
      </View>

      {/* Área de mensajes */}
      <ScrollView style={styles.messagesArea}>
        {mensajes.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.tipo === 'enviado'
                ? styles.messageBubbleEnviado
                : styles.messageBubbleRecibido,
            ]}>
            <Text
              style={[
                styles.messageText,
                msg.tipo === 'enviado'
                  ? styles.messageTextEnviado
                  : styles.messageTextRecibido,
              ]}>
              {msg.texto}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Enviar mensaje */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Mensaje"
            placeholderTextColor="#888888" // Color del texto del placeholder
            value={mensaje}
            onChangeText={setMensaje}
          />
          <TouchableOpacity style={styles.attachmentButton}>
            <RNImage
              source={require('../../assets/images/attachment.png')}
              style={styles.attachmentIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleEnviarMensaje}>
            <RNImage
              source={require('../../assets/images/send.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    backgroundColor: 'rgba(156, 39, 176, 0.57)', // Color púrpura al 57%
    padding: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#cccccc', // Color gris para la imagen de perfil
    marginRight: 15,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
  },
  messagesArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageBubbleEnviado: {
    backgroundColor: '#469C6E',
    alignSelf: 'flex-end',
  },
  messageBubbleRecibido: {
    backgroundColor: '#2E373C',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageTextEnviado: {
    color: '#ffffff',
  },
  messageTextRecibido: {
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  sendButton: {
    width: 35, // Reducir tamaño
    height: 35, // Reducir tamaño
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  sendIcon: {
    width: 25, // Reducir tamaño
    height: 25, // Reducir tamaño
  },
  attachmentButton: {
    width: 35, // Reducir tamaño
    height: 35, // Reducir tamaño
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  attachmentIcon: {
    width: 25, // Reducir tamaño
    height: 25, // Reducir tamaño
  },
});

export default ChatPadres;
