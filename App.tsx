// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './android/app/src/front_babylink/ui/components/Login';
import Registro from './android/app/src/front_babylink/ui/components/Registro';
import Inicio from './android/app/src/front_babylink/ui/components/Inicio';
import Portada from './android/app/src/front_babylink/ui/components/Portada';
import Bienvenida from './android/app/src/front_babylink/ui/components/Bienvenida';
import RegistroBebe from './android/app/src/front_babylink/ui/components/RegistroBebe';
import Pediatras from './android/app/src/front_babylink/ui/components/Pediatras';
import ChatPadres from './android/app/src/front_babylink/ui/components/ChatPadres';
import Notificaciones from './android/app/src/front_babylink/ui/components/Notificaciones';
import {NotificationProvider} from './android/app/src/front_babylink/ui/components/context/NotificationContext'; // Importar el proveedor de notificaciones
import CitaMedica from './android/app/src/front_babylink/ui/components/CitaMedica';
import Vacunacion from './android/app/src/front_babylink/ui/components/Vacunacion';
import Lista04 from './android/app/src/front_babylink/ui/components/Lista04';
import Lista06 from './android/app/src/front_babylink/ui/components/Lista06';
import Lista18 from './android/app/src/front_babylink/ui/components/Lista18';
import SueñoPrincipal from './android/app/src/front_babylink/ui/components/SueñoPrincipal';
import PersonalizadoSueno from './android/app/src/front_babylink/ui/components/PersonalizadoSueno';
import ListaSueno from './android/app/src/front_babylink/ui/components/ListaSueno';
import Alimentacion from './android/app/src/front_babylink/ui/components/Alimentacion';
import AlimentoList from './android/app/src/front_babylink/ui/components/AlimentoList';
import AgregarAlimento from './android/app/src/front_babylink/ui/components/AgregarAlimento';
import Menu from './android/app/src/front_babylink/ui/components/Menu';
import RegistroCita from './android/app/src/front_babylink/ui/components/RegistroCita';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Portada"
            component={Portada}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen
            name="Bienvenida"
            component={Bienvenida}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegistroBebe"
            component={RegistroBebe}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pediatras"
            component={Pediatras}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatPadres"
            component={ChatPadres}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notificaciones"
            component={Notificaciones}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cita Medica"
            component={CitaMedica}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Vacunacion"
            component={Vacunacion}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lista04"
            component={Lista04}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lista06"
            component={Lista06}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lista18"
            component={Lista18}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SueñoPrincipal"
            component={SueñoPrincipal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListaSueno"
            component={ListaSueno}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PersonalizadoSueno"
            component={PersonalizadoSueno}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Alimentacion"
            component={Alimentacion}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AlimentoList"
            component={AlimentoList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AgregarAlimento"
            component={AgregarAlimento}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{headerShown: false}}
          />

           <Stack.Screen 
         name="RegistroCita" 
          component={RegistroCita} 
          options={{ headerShown: false }} 
        /> 
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
