import React, { useRef, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Bienvenida = () => {
  const navigation = useNavigation();

  const bubbles = Array.from({ length: 10 }).map(() => ({
    x: useRef(new Animated.Value(Math.random() * width)).current,
    y: useRef(new Animated.Value(height + 50)).current,
  }));

  useEffect(() => {
   
    const animations = bubbles.map((bubble) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bubble.y, {
            toValue: -50,
            duration: Math.random() * 3000 + 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(bubble.y, {
            toValue: height + 50,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    Animated.stagger(500, animations).start();
  }, [bubbles]);

  const bubbleColors = ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FF8C00', '#FFA500', '#ADFF2F', '#FF4500', '#1E90FF', '#DA70D6'];

  return (
    <View style={styles.container}>
      <Svg height="250" width={width} viewBox={`0 0 ${width} 250`} style={styles.svg}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#4CCFC0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#4CCFC0" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d={`
            M0,0 
            L${width},0 
            L${width},150 
            L${width / 2},250 
            L0,150 
            Z
          `}
          fill="url(#grad)"
          style={styles.triangle}
        />
      </Svg>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BIENVENIDO</Text>
      </View>
      <View style={styles.imageContainerWrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/bebito7.png')} // Asegúrate de que esta sea la ruta correcta
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.infoText}>Estamos emocionados de acompañarte en este nuevo capítulo de tu vida.</Text>
        <Text style={[styles.infoText, { marginTop: 20 }]}>¿Listo para agregar a tu nuevo bebé?</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistroBebe')}>
          <Text style={styles.buttonText}>Agregar bebé</Text>
        </TouchableOpacity>
      </View>
      {bubbles.map((bubble, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              transform: [{ translateX: bubble.x }, { translateY: bubble.y }],
              backgroundColor: bubbleColors[index % bubbleColors.length],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  svg: {
    position: 'absolute',
    top: 0,
  },
  triangle: {
    shadowColor: '#67CAAB',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 35,
    fontFamily: 'Urbanist-Bold',
    color: '#fff',
  },
  imageContainerWrapper: {
    position: 'absolute',
    top: 120, // Ajusta según sea necesario
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: 250,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 75, // Ajusta el borde redondeado según sea necesario
    borderWidth: 4,
    borderColor: '#4CCFC0',
    width: 150,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Asegura que la imagen cubra todo el contenedor de manera adecuada
    borderRadius: 75, // Mantén el mismo borde redondeado que el contenedor
  },
  content: {
    marginTop: 380, // Ajusta según sea necesario
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Urbanist-Light',
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CCFC0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 30, // Aumentar espacio superior
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bubble: {
    position: 'absolute',
    width: 30, // Ajusta según el tamaño deseado
    height: 30, // Ajusta según el tamaño deseado
    borderRadius: 15, // Hace que la burbuja sea redonda
    opacity: 0.7,
  },
});

export default Bienvenida;
