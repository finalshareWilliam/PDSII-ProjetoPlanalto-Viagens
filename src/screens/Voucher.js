import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
// LogBox.ignoreAllLogs();

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
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

const SearchDropdownArea = styled.ScrollView`
  position: absolute;
  top: 15%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const SearchDropdown = styled.View`
  flex-wrap: wrap;
  margin-horizontal: 20px;
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

const Item = styled.Text`
  font-size: 22px;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  color: #A4A4A4;
`;

const ItemArea = styled.View`
  flex: 1;
  width: 100%;
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default function Voucher({navigation, route}) {
  const formatarData = (data) => {
    let d = new Date (data);
    return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`
  }

  const formatarHora = (data) => {
    let d = new Date (data);
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Voucher da Viagem</HeaderText>
      </Header>
      <SearchDropdownArea>
        <SearchDropdown>
          <ItemArea>
              <QRCode
                value='Some string value'
                color={'black'}
                backgroundColor={'white'}
                size={200}/>
              <Item>{route.params.trip.origin.name} ------{'>'} {route.params.trip.destination.name}</Item>
              <Item>Saída: {formatarData(route.params.trip.tripdate)} {formatarHora(route.params.trip.tripdate)}</Item>
              <Item>Assento: {route.params.seat.name} ({route.params.seat.description})</Item>
              <Item>Ônibus: {route.params.trip.bus.plate} ({route.params.trip.bus.model})</Item>
              <Item>Pagamento: Aprovado</Item>
          </ItemArea>
        </SearchDropdown>
      </SearchDropdownArea>
    </Page>
  );
}