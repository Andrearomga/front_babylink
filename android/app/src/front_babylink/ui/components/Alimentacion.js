import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Alimentacion = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/fondo.png')} style={styles.headerImage} />
      <Text style={styles.description}>
        Sabemos que la alimentación es muy importante, por lo que cuidaremos la alimentación de tu bebé a detalle.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlimentoList')}>
        <Image source={require('../../assets/images/flech.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  
    
  },
  headerImage: {
    width: '100%',
    height: 550,
    resizeMode: 'contain',
    marginTop: -4,
   
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginVertical: 15,
    padding:38,
  },
  button: {
    width: 80,
    height: 80,
   
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  buttonImage: {
    width: 50,
    height: 50,
  
  },
});

export default Alimentacion;
