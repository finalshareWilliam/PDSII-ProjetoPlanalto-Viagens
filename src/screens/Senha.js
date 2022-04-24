import React, { useState } from 'react';
import { Alert } from 'react-native';
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

const Container = styled.ScrollView`
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
  flex: 1; 
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

const Title = styled.View`
  width: 100%;
  background-color: #D8D8D8;
  height: 50px;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const TitleText = styled.Text`
  color: #848484;
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

export default function Senha ({navigation, route}) {
  const [password, setPassword] = useState('');
  const [novapassword, setNovaPassword] = useState('');
  const [confirmapassword, setConfirmaPassword] = useState('');

  const atualizarSenha = async () =>{
    if ((password && novapassword && confirmapassword) != "") {
      
      try {
        const requestToken = await fetch('http://34.207.157.190:5000/refresh', {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: route.params.dataHandler.getRefreshToken()
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        })

        const responseToken = await requestToken.json();
        
        route.params.dataHandler.setAccessToken(responseToken.access_token);
        route.params.dataHandler.setRefreshToken(responseToken.refresh_token);

        const request = await fetch('http://34.207.157.190:5000/update_password/'+route.params.dataHandler.getUserID(), {
          method: 'PUT',
          body: JSON.stringify({
            access_token: route.params.dataHandler.getAccessToken(),
            old_password: password,
            password: novapassword,
            password_confirmation: confirmapassword
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        })

        console.log("Cheguei aqui na atualização da senha!");
        
        const response = await request.json();
        console.log(response)
        
        if(response.success == false){
          Alert.alert('Aviso','Erro na atualização - ' + response.message);
        } else {
          Alert.alert('Aviso','Senha atualizada!');
          navigation.navigate('Perfil', {dataHandler: route.params.dataHandler, userData: route.params.userData});
        }

      } catch (error) {
        Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
        console.log(error);
      }

    } else {
      Alert.alert('Aviso','Preencha todas as informações!')
    }
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
        <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Cadastro</HeaderText>
      </Header>
      <Title>
        <TitleText>Alterar Senha</TitleText>
      </Title>
      <Container>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha atual'}></Input>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={novapassword} onChangeText={t=>setNovaPassword(t)} placeholder={'Nova senha'}></Input>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={confirmapassword} onChangeText={t=>setConfirmaPassword(t)} placeholder={'Confirmação de nova senha'}></Input>
        </InputView>
        <Button onPress={atualizarSenha}>
          <LoginText>Atualizar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}