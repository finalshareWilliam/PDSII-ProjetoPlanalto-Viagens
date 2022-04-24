import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
// LogBox.ignoreAllLogs();

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Container = styled.View`
  width: 90%;
`;

const InputView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  padding-left: 10px;
  overflow: hidden;
`;

const Input = styled.TextInput.attrs((props) => ({
  placeholderTextColor: '#A4A4A4',
}))`
  height: 40px;
  font-size: 18px;
  overflow: hidden;
  padding: 0;
  color: #424242;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  width: 100%;  
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const SenhaText = styled.Text`
  color: #A4A4A4;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const CadastroText = styled.Text`
  color: #2E9AFE;
  font-size: 24px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
`;

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  align-items: flex-start;
  flex-direction: row;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;

const BackButton = styled.TouchableHighlight`
  background-color: #088A29;
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 10%;
  margin-top: 13px;
  align-items: center;
`;

export default function Login({navigation, route}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const aguardarLogin = async () => {
    if (password !== "" && username !== "") {

      try {
        const request = await fetch('http://34.207.157.190:5000/login', {
          method: 'POST',
          body: JSON.stringify({
            email: username,
            password: password
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        })

        const response = await request.json();

        if(response.success == true){
          route.params.dataHandler.setAccessToken(response.access_token);
          route.params.dataHandler.setRefreshToken(response.refresh_token);
          route.params.dataHandler.setUserID(response.user.id);
          if(route.params.isBuying == true){
            navigation.navigate('Confirmar', {dataHandler: route.params.dataHandler, trip: route.params.trip});
          } else {
            navigation.navigate('Pesquisa de Viagens');
          }
        } else {
          Alert.alert('Aviso','Login Negado - ' + response.message);
        }

      } catch (error) {
        Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
        console.log(error);
      }

    } else {
      Alert.alert('Aviso','Preencha toda as informações!')
    }
  }

  const recuperarSenha = async () => {
    if (username !== "") {

      try {
        const request = await fetch('http://34.207.157.190:5000/reset_password', {
          method: 'POST', 
          body: JSON.stringify({
            email: username 
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        console.log(request);

        const response = await request.json();

        console.log(response);

        if(response.success == true){
          Alert.alert('Aviso', 'Nova senha enviada por e-mail!')
        } else {
          Alert.alert('Aviso','Erro na recuperação - ' + response.message);
        }

      } catch (error) {
        Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
        console.log(error);
      }

    } else {
      Alert.alert('Aviso','Preencha o campo de e-mail!')
    }
  }
  
  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
        <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Login</HeaderText>
      </Header>
      <Container>
        <Image source={require('../images/logo.png')} style={{height: 60, width: 370, marginBottom: 20, marginTop: 20}} />
        <InputView>
          <Input value={username} onChangeText={t=>setUsername(t)} placeholder={'E-mail/CPF/CNPJ'}/>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha'}></Input>
        </InputView>
        <Button onPress={aguardarLogin}>
          <LoginText>Fazer Login</LoginText>
        </Button>
        <Button onPress={recuperarSenha}>
          <SenhaText>Esqueceu a senha?</SenhaText>
        </Button>
        <Button onPress={() => navigation.navigate('Cadastro')}>
          <CadastroText>CADASTRE-SE AQUI</CadastroText>
        </Button>
      </Container>
    </Page>
  );
}