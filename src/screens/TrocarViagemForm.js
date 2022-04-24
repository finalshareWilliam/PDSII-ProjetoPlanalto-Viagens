import React, { useState } from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
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

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 300,
  }
});

export default function TrocarViagemForm({navigation, route}) {
  const [trip] = useState(route.params.trip);

  const dia = new Date().getDate();
  const mes = new Date().getMonth()+1;
  const ano = new Date().getFullYear();

  var mesReal = mes;
  var diaReal = dia;
  if(mes < 10)
    mesReal = '0' + mes;
  if(dia<10)
    diaReal = '0' + dia;
  
  const data = diaReal + '/' + mesReal + '/' + ano;

  var novoMes = Number(mes)+2;
  var novoAno = Number(ano);
  if(novoMes > 12){
    novoMes -= 12;
    novoAno += 1;
  }

  var ultimoMes;
  if(novoMes<10)
    ultimoMes = '0' + novoMes.toString();
  else
    ultimoMes = novoMes.toString();

  const ultimoAno = novoAno.toString();
  const ultimaData = '28/' + ultimoMes + '/' + ultimoAno;
  const [dataIda, setDataIda] = useState(data);

  const Buscar = async () => {
    if(data !== "") {
        try {
          const dataArray = dataIda.split('/');
          const dataCerta = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];

          const reqTrip = await fetch('http://34.207.157.190:5000/tripByDate', {
            method: 'POST',
            body: JSON.stringify({
              tripdate : dataCerta,
              origin_id: trip.origin_id,
              destination_id: trip.destination_id
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          });
          
          const responseTrip = await reqTrip.json();
          console.log(responseTrip);
  
          if(responseTrip.success) {

            console.log(responseTrip.trips);
            navigation.navigate('Trocar Viagem', {origem: trip.origin, destino: trip.destination, viagensIda: responseTrip.trips, viagensVolta: [], dataHandler: route.params.dataHandler, lastID: route.params.lastID})
          } else {
            console.log(responseTrip.message);
            Alert.alert('Aviso','Não foi encontrada nenhuma viagem nesta data');
          }
  
        } catch (error) {
          Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
          console.log(error);
        }
      } else {
        alert('Preencha os campos obrigatórios');
      }
  }
  
  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Pesquisa de Viagens</HeaderText>
      </Header>
      <Container>
        <Image source={require('../images/logo.png')} style={{height: 50, width: 330, marginBottom: 20, marginTop: 20}} />
        <InputView>
          <DatePicker
          style={styles.datePickerStyle}
          date={dataIda}
          mode="date"
          placeholder="Escolha a data de ida"
          format="DD/MM/YYYY"
          minDate={data}
          maxDate={ultimaData}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderWidth: 0,
            },
            dateText: {
              fontSize: 18,
            },
            placeholderText: {
              fontSize: 18,
              color: '#A4A4A4',
            },
          }}
          onDateChange={(dataIda) => setDataIda(dataIda)}/>
        </InputView>
        <Button onPress={Buscar}>
          <LoginText>Buscar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}