import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import portadaStyles from '../../Styles/portadaStyles';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Portada = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navegar a la pantalla de Login después de 9 segundos
    }, 9000);
    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [navigation]);

  return (
    <View style={portadaStyles.container}>
     <Animatable.Image
  animation="flipInY"
  duration={1500}
  source={require('../../assets/images/niño2.png')}
  style={portadaStyles.logo}
/>
<Animatable.Text
  animation="flipInX"
  duration={1500}
  delay={500}
  style={portadaStyles.text}
>
  BABYLINK
</Animatable.Text>

    </View>
  );
};

export default Portada;
