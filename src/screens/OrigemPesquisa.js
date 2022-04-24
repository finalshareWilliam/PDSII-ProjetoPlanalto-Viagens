import React, { useState } from 'react';
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

const InputView = styled.View`
  background-color: #088A29;
  width: 100%;
  padding-left: 50px;
`

const Input  = styled.TextInput.attrs((props) => ({
  placeholderTextColor: 'white',
}))`
  background-color: #088A29;
  color: white;
  width: 80%;
  height: 50px;
  font-size: 20px;
  padding-horizontal: 10px;
  border-bottom-width: 1px;
  border-bottom-color: white;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const SearchDropdownArea = styled.ScrollView`
  position: absolute;
  top: 25%;
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
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  color: #A4A4A4;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemArea = styled.TouchableHighlight`
  width: 100%;
`;

export default function OrigemPesquisa({navigation, route}) {
  console.log(route.params.cities);
  const [dataSource] = useState(route.params.cities);
  const [filtered, setFiltered] = useState(dataSource);
  const [origem, setOrigem] = useState('');
  const OnSearch = (text) => {
    setOrigem(text);
    if(text){
      const temp = text.toString().toLowerCase();
      const tempList = dataSource.filter(item=>{
        if(item.name.toString().toLowerCase().startsWith(temp))
        return item
      })
      setFiltered(tempList);
    }
    else{
      setFiltered(dataSource);
    }
  }

  const Select = (item) => {
    setOrigem(item);
    route.params.onReturnOrigem(item);
    navigation.goBack();
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Selecione sua Origem</HeaderText>
      </Header>
      <InputView>
        <Input placeholder={'Ex: Pelotas'} onChangeText={OnSearch} value={origem}/>
      </InputView>
      <SearchDropdownArea>
        <SearchDropdown>
        {filtered.map(item=>{
          return(
          <ItemArea key={item.id} onPress={() => Select(item)}
            navigator={navigation}
            underlayColor='#b5b5b5'
            activeOpacity={0.6}>
            <Item>{item.name}</Item>
          </ItemArea>
          )})
        }
        </SearchDropdown>
      </SearchDropdownArea>
    </Page>
  );
}