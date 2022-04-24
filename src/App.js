import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViagemForm  from './screens/ViagemForm';
import OrigemPesquisa  from './screens/OrigemPesquisa';
import DestinoPesquisa  from './screens/DestinoPesquisa';
import Viagens from './screens/Viagens'
import Assentos from './screens/Assentos';
import Login from './screens/Login';
import Confirmar from './screens/Confirmar';
import Cadastro from './screens/Cadastro';
import MinhasViagens from './screens/MinhasViagens';
import TrocarViagem from './screens/TrocarViagem';
import Voucher from './screens/Voucher';
import Perfil from './screens/Perfil';
import TrocarAssento from './screens/TrocarAssento';
import TrocarConfirmar from './screens/TrocarConfirmar';
import TrocarViagemForm from './screens/TrocarViagemForm';
import Senha from './screens/Senha';

const Stack = createNativeStackNavigator();

export default () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name='Pesquisa de Viagens'
        component={ViagemForm}/>
      <Stack.Screen
        name='Minhas Viagens'
        component={MinhasViagens}/>
        <Stack.Screen
        name='Trocar Viagem'
        component={TrocarViagem}/>
        <Stack.Screen
        name='Trocar Assento'
        component={TrocarAssento}/>
        <Stack.Screen
        name='Trocar Confirmar'
        component={TrocarConfirmar}/>
        <Stack.Screen
        name='Trocar Pesquisa de Viagens'
        component={TrocarViagemForm}/>
        <Stack.Screen
        name='Voucher'
        component={Voucher}/>
      <Stack.Screen
        name='Login'
        component={Login}/>
      <Stack.Screen
        name='Cadastro'
        component={Cadastro}/>
      <Stack.Screen
        name='Perfil'
        component={Perfil}/>
      <Stack.Screen
        name='Pesquisa de Origem'
        component={OrigemPesquisa}/>
      <Stack.Screen
        name='Pesquisa de Destino'
        component={DestinoPesquisa}/>
      <Stack.Screen
        name='Viagens'
        component={Viagens}/>
      <Stack.Screen
        name='Assentos'
        component={Assentos}/>
      <Stack.Screen
        name='Confirmar'
        component={Confirmar}/>
      <Stack.Screen
        name='Senha'
        component={Senha}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
