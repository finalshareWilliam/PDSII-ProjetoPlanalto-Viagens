import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Switch, Alert} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
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

const SwitchView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  padding-left: 10px;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  padding-bottom: 15px;
`;

const InputView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  padding-left: 10px;
  overflow: hidden;
`;

const SelectorView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  height: 40px;
  display: flex;
  justify-content: center; 
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

const SMSText = styled.Text`
  font-size: 18px;
  overflow: hidden;
  padding: 0;
  color: #424242;
`;

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
  },
  datePickerStyle: {
    width: 250,
  }, 
  pickerStyle: {
    color: '#424242',
  },
  inputStyle: {
    height: 40,
    fontSize: 18,
    overflow: 'hidden',
    padding: 0,
    color: '#424242',
  }
});

export default function Cadastro ({navigation, route}) {
  
  const datahoje = new Date();
  const datainicial = new Date(1900,0,1);
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmapassword, setConfirmaPassword] = useState('');
  const [datanascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [confirmaemail, setConfirmaEmail] = useState('');
  const [tipotelefone, setTipoTelefone] = useState('1');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('RS');
  const [isEnabled, setIsEnabled] = useState(false);
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const aguardarCadastro = async () =>{
    if ((nome && documento && password && confirmapassword && datanascimento && email && confirmaemail && telefone && cep && rua && numero && bairro && cidade && estado) != "") {

      try {
        const dataarray = datanascimento.split('/');
        const datacerta = dataarray[2] + '-' + dataarray[1] + '-' + dataarray[0];
        
        const request = await fetch('http://34.207.157.190:5000/register', {
          method: 'POST',
          body: JSON.stringify({
            name: nome,
            email: email,
            email_confirmation: confirmaemail,
            password: password,
            password_confirmation: confirmapassword,
            document: documento,
            phone_type: tipotelefone,
            phone: telefone,
            addr_postal_code: cep,
            addr_street: rua,
            addr_number: numero,
            addr_additional_info: complemento,
            birthdate: datacerta,
            neighbourhood: bairro,
            city: cidade,
            state: estado,
            enable_sms: isEnabled
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        })

        console.log("Cheguei aqui no cadastro novo!");

        const response = await request.json()

        if(response.success == false){
          Alert.alert('Aviso','Erro no cadastro - ' + response.message);
        } else {
          Alert.alert('Aviso','Cadastro realizado com sucesso!');
          navigation.navigate('Pesquisa de Viagens');
        }

      } catch (error) {
        Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
        console.log(error);
      }

    } else {
      Alert.alert('Aviso','Preencha as informações!')
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
        <TitleText>Dados Pessoais</TitleText>
      </Title>
      <Container>
        <InputView>
          <Input value={nome} onChangeText={t=>setNome(t)} placeholder={'Nome completo'} />
        </InputView>
        <InputView>
          <TextInputMask 
            style={styles.inputStyle}
            type={'cpf'}
            value={documento}
            onChangeText={t=>setDocumento(t)}
            placeholder={'CPF'}
            placeholderTextColor = '#A4A4A4'/>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha'}></Input>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={confirmapassword} onChangeText={t=>setConfirmaPassword(t)} placeholder={'Confirmação de senha'}></Input>
        </InputView>
        <InputView>
          <DatePicker
            style={styles.datePickerStyle}
            date={datanascimento}
            mode="date"
            placeholder="Data de Nascimento"
            format="DD/MM/YYYY"
            minDate={datainicial}
            maxDate={datahoje}
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
            onDateChange={t=>{setDataNascimento(t)}}/>
        </InputView>
        <InputView>
          <Input value={email} onChangeText={t=>setEmail(t)} placeholder={'E-mail'}/>
        </InputView>
        <InputView>
          <Input value={confirmaemail} onChangeText={t=>setConfirmaEmail(t)} placeholder={'Confirmação de e-mail'}/>
        </InputView>
        <SelectorView>
        <Picker style={styles.pickerStyle} selectedValue={tipotelefone} mode={'dropdown'} onValueChange={t=>setTipoTelefone(t)}>
          <Picker.Item style={styles.item} label="Celular" value="1"/>
          <Picker.Item style={styles.item} label="Residencial" value="2"/>
          <Picker.Item style={styles.item} label="Comercial" value="3"/>
        </Picker>
        </SelectorView>
        <InputView>
          <TextInputMask 
            style={styles.inputStyle}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            value={telefone}
            onChangeText={t=>setTelefone(t)}
            placeholder={'Telefone'}
            placeholderTextColor = '#A4A4A4'/>
        </InputView>
        <SwitchView>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#2E64FE" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <SMSText>Receber SMS</SMSText>
        </SwitchView>
        <InputView>
          <TextInputMask 
            style={styles.inputStyle}
            type={'custom'}
            options={{
              mask: '99999-999'
            }}
            value={cep}
            onChangeText={t=>setCep(t)}
            placeholder={'CEP'}
            placeholderTextColor = '#A4A4A4'/>
        </InputView>
        <InputView>
          <Input value={rua} onChangeText={t=>setRua(t)} placeholder={'Rua'}/>
        </InputView>
        <InputView>
          <Input value={numero} onChangeText={t=>setNumero(t)} placeholder={'Número'}/>
        </InputView>
        <InputView>
          <Input value={complemento} onChangeText={t=>setComplemento(t)} placeholder={'Complemento'}/>
        </InputView>
        <InputView>
          <Input value={bairro} onChangeText={t=>setBairro(t)} placeholder={'Bairro'}/>
        </InputView>
        <InputView>
          <Input value={cidade} onChangeText={t=>setCidade(t)} placeholder={'Cidade'}/>
        </InputView>
        <SelectorView>
        <Picker style={styles.pickerStyle} selectedValue={estado} mode={'dropdown'} onValueChange={t=>setEstado(t)}>
          <Picker.Item style={styles.item} value="AC" label="Acre"/>
          <Picker.Item style={styles.item} value="AL" label="Alagoas"/>
          <Picker.Item style={styles.item} value="AP" label="Amapá"/>
          <Picker.Item style={styles.item} value="AM" label="Amazonas"/>
          <Picker.Item style={styles.item} value="BA" label="Bahia"/>
          <Picker.Item style={styles.item} value="CE" label="Ceará"/>
          <Picker.Item style={styles.item} value="DF" label="Distrito Federal"/>
          <Picker.Item style={styles.item} value="ES" label="Espírito Santo"/>
          <Picker.Item style={styles.item} value="GO" label="Goiás"/>
          <Picker.Item style={styles.item} value="MA" label="Maranhão"/>
          <Picker.Item style={styles.item} value="MT" label="Mato Grosso"/>
          <Picker.Item style={styles.item} value="MS" label="Mato Grosso do Sul"/>
          <Picker.Item style={styles.item} value="MG" label="Minas Gerais"/>
          <Picker.Item style={styles.item} value="PA" label="Pará"/>
          <Picker.Item style={styles.item} value="PB" label="Paraíba"/>
          <Picker.Item style={styles.item} value="PR" label="Paraná"/>
          <Picker.Item style={styles.item} value="PE" label="Pernambuco"/>
          <Picker.Item style={styles.item} value="PI" label="Piauí"/>
          <Picker.Item style={styles.item} value="RJ" label="Rio de Janeiro"/>
          <Picker.Item style={styles.item} value="RN" label="Rio Grande do Norte"/>
          <Picker.Item style={styles.item} value="RS" label="Rio Grande do Sul"/>
          <Picker.Item style={styles.item} value="RO" label="Rondônia"/>
          <Picker.Item style={styles.item} value="RR" label="Roraima"/>
          <Picker.Item style={styles.item} value="SC" label="Santa Catarina"/>
          <Picker.Item style={styles.item} value="SP" label="São Paulo"/>
          <Picker.Item style={styles.item} value="SE" label="Sergipe"/>
          <Picker.Item style={styles.item} value="TO" label="Tocantins"/>
        </Picker>
        </SelectorView>
        <Button onPress={aguardarCadastro}>
          <LoginText>Cadastrar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}