import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, PanResponder } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SueñoPrincipal = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();
    const [usuarioNombre, serUsuarioNombre] = useState('');
  
    const updateCurrentTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
  
      hours = hours % 12;
      hours = hours ? hours : 12;
  
      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    
  
    // useEffect(() => {
    //   updateCurrentTime();
  
    //   const now = new Date();
    //   const secondsUntilNextMinute = 60 - now.getSeconds();
    //   const timeoutId = setTimeout(() => {
    //     updateCurrentTime();
    //     const intervalId = setInterval(updateCurrentTime, 60000);
    //     return () => clearInterval(intervalId);
    //   }, secondsUntilNextMinute * 60000);
    //   return () => clearTimeout(timeoutId);
    // }, []);
  

    const cargarDatos = async () => {
      try {
        let usuario = await AsyncStorage.getItem('usuario');
        usuario = JSON.parse(usuario);
        serUsuarioNombre(usuario.fullName + " " + usuario.fullLastName);
        
      

  
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    // useEffect(() => {
    //   cargarDatos();
    // }, []);
    useFocusEffect(
      React.useCallback(() => {
      
        cargarDatos();
  
        return () => {
          
        };
      }, []),
    );
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy < -50) {
            navigation.navigate('ListaSueno', { scheduleList: [] });
          }
        },
      })
    ).current;
  
    return (
      <View style={styles.container} {...panResponder.panHandlers}>
        <Text style={styles.greeting}>Buenas noches, {`${usuarioNombre}`}</Text>
        <View style={styles.ellipse}></View>
        <Text style={styles.time}>{currentTime}</Text>
        <Image
          source={require('../../assets/images/linea1.png')}
          style={styles.vector1}
        />
        <Image
          source={require('../../assets/images/linea2.png')}
          style={styles.vector2}
        />
        <Image
          source={require('../../assets/images/luna.png')}
          style={styles.image29}
        />
        <Text style={styles.swipeToStart}>Deslizar para comenzar</Text>
        <Image
          source={require('../../assets/images/desliza.png')}
          style={styles.upArrowIcon}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#070F22',
    },
    greeting: {
      position: 'absolute',
      width: 324,
      height: 38,
      left: 53,
      top: 49,
      fontFamily: 'Urbanist',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    ellipse: {
      position: 'absolute',
      width: 489,
      height: 499,
      left: -49,
      top: 600,
      backgroundColor: '#141C2F',
      borderRadius: 244.5,
    },
    time: {
      position: 'absolute',
      width: 116,
      height: 48,
      left: 146,
      top: 124,
      fontFamily: 'Urbanist',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 40,
      lineHeight: 48,
      textAlign: 'center',
      letterSpacing: 0.1,
      color: '#FFFFFF',
    },
    image29: {
      position: 'absolute',
      width: 437,
      height: 328,
      right: -12,
      top: 200,
    },
    swipeToStart: {
      position: 'absolute',
      width: 171,
      height: 19,
      left: 125,
      top: 710,
      fontFamily: 'Urbanist',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    upArrowIcon: {
      position: 'absolute',
      width: 43,
      height: 43,
      left: 182,
      top: 640,
    },
    vector1: {
      position: 'absolute',
      width: 380,
      height: 80.5,
      left: 4,
      top: 315.5,
    },
    vector2: {
      position: 'absolute',
      width: 350,
      height: 110.5,
      left: 4,
      top: 305.5,
    },
  });
  

export default SueñoPrincipal;
