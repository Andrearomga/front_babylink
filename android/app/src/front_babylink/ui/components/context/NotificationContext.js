// front_babylink/ui/components/context/NotificationContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import io from 'socket.io-client';
import CitasMedicasServices from '../../../infrastructure/repositories/CitasMedicasServices';
import DreamService from '../../../infrastructure/repositories/ApiDreamRepository';

const socket = io('http://192.168.0.24:3000'); // aqui ira la ruta del api-gateway|

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      texto: 'La hora de dormir se aproxima',
      tiempo: '10 min',
      icono: require('../../../assets/images/moon.png'),
    },
    {
      id: 2,
      texto: 'Te faltan algunas vacunas por aplicar',
      tiempo: '40 min',
      icono: require('../../../assets/images/vaccine.png'),
    },
  ]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        const nuevaNotificacion = {
          id: Math.random(),
          texto: notification.message,
          tiempo: 'ahora',
          icono: require('../../../assets/images/notificaciones.png'),
        };
        setNotificaciones(prevNotificaciones => [
          ...prevNotificaciones,
          nuevaNotificacion,
        ]);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // const timer = setTimeout(() => {
    //   PushNotification.localNotification({
    //     title: "Nueva Notificación",
    //     message: "Has recibido una nueva notificación",
    //     playSound: true,
    //     soundName: 'default',
    //   });
    // }, 10000);

    // Escucha el evento 'newRecord'
    socket.on('newRecord', async newRecord => {
      // console.log('Nuevo registro recibido:', newRecord);
      PushNotification.localNotification({
        title: 'Nueva Notificación',
        message: 'Han comentado algo en le chat',
        playSound: true,
        soundName: 'default',
      });
    });

    socket.on('tick', async newRecord => {
      listarCitasMedicas();
      listarSuenos();
    });

    // Cleanup the socket connection on unmount
    return () => {
      socket.off('newRecord');
      socket.disconnect();
    };

    return () => clearTimeout(timer);
  }, []);

  const listarSuenos = async () => {
    // Esto lo recuperan del storage del movile
    try {
      let bebe = await AsyncStorage.getItem('bebe');
      bebe = JSON.parse(bebe);
      const IdBaby = bebe.IdBaby;
      const response = await DreamService.list(IdBaby);
      for (let index = 0; index < response.value.length; index++) {
        let item = response.value[index];
        let hora = item.finalHour;
        if (item.IsActivated == 1) {
          let value = isFiveMinutesOrLessAway(hora);
          if (value === true) {
            PushNotification.localNotification({
              title: 'Nueva Notificación',
              message: 'Hay que despertar al bebe a las ' + item.finalHour,
              playSound: true,
              soundName: 'default',
            });
            item = {
              ...item,
              IsActivated: 0,
            };
            await DreamService.guardar(item);
          }
        }
      }
    } catch (error) {
      console.log({error});
    }
  };

  const listarCitasMedicas = async () => {
    try {
      let bebe = await AsyncStorage.getItem('bebe');
      bebe = JSON.parse(bebe);
      let IdBaby = bebe.IdBaby;
      const response = await CitasMedicasServices.list(IdBaby);
      if (response.value) {
        for (let index = 0; index < response.value.length; index++) {
          let item = response.value[index];
          let fecha = item.date;
          let hora = item.hour;
          // console.log({fecha, hora, active: item.active});
          if (item.active == 1) {
            let value = isApproximatelyOneHourAway({fecha, hora});
            // console.log({value});
            if (value === true) {
              PushNotification.localNotification({
                title: 'Nueva Notificación',
                message: 'Cital con pediatra cerca: ' + item.title,
                playSound: true,
                soundName: 'default',
              });
              await CitasMedicasServices.guardar(item);
            }
          }
        }
      }
    } catch (error) {
      console.log({error});
    }
  };

  const isFiveMinutesOrLessAway = targetTime => {
    // Obtener la hora actual
    const now = new Date();

    // Extraer la hora y los minutos actuales
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // Construir una fecha solo con la hora y los minutos actuales
    const nowTime = new Date();
    nowTime.setHours(currentHours, currentMinutes, 0, 0); // Resetea segundos y milisegundos

    // Parsear la hora objetivo
    const [targetHours, targetMinutes] = targetTime.split(':').map(Number);

    // Construir una fecha solo con la hora y los minutos objetivo
    const targetTimeDate = new Date();
    targetTimeDate.setHours(targetHours, targetMinutes, 0, 0); // Resetea segundos y milisegundos

    // Calcular la diferencia en milisegundos
    const difference = targetTimeDate - nowTime;

    // Convertir la diferencia a minutos
    const differenceInMinutes = difference / (1000 * 60);

    // Verificar si la diferencia es de 5 minutos o menos
    return differenceInMinutes <= 5 && differenceInMinutes >= 0;
  };

  const isApproximatelyOneHourAway = targetDateTime => {
    // Parsear la fecha y hora objetivo
    const targetDate = new Date(
      targetDateTime.fecha + 'T' + targetDateTime.hora,
    );

    // Obtener la fecha y hora actual
    const now = new Date();

    // Calcular la diferencia en milisegundos
    const difference = targetDate - now;

    // Convertir la diferencia a horas
    const differenceInHours = difference / (1000 * 60 * 60);

    // Verificar si la diferencia es de una hora o menos
    return differenceInHours <= 1 && difference > 0;
  };

  return (
    <NotificationContext.Provider value={{notificaciones}}>
      {children}
    </NotificationContext.Provider>
  );
};
