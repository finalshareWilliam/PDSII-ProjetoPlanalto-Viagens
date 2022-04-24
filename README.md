# Etapas de Instalação
 
1º Instalar Node, Python e Java: 

Node Mais Atual
https://nodejs.org/en/download/

Python 2 Mais Atual
https://www.python.org/ftp/python/2.7.18/python-2.7.18.amd64.msi

JDK 8
https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html#license-lightbox

Precisa fazer conta pro downaload do Java...

2º Instalar React: 

npm install -g react-native-cli

3º Instalar Android Studio:

https://developer.android.com/studio

A princípio a instalação e configuração padrão dele já resolve!

4º Configurar Variáveis de Ambiente

Nova Variável de Sistema (Ajustar para o seu usuário)

Nome: ANDROID_HOME 
Valor: C:\Users\pcsan\AppData\Local\Android\Sdk

Nome: JAVA_HOME
Valor: C:\Program Files\Java\jdk1.8.0_202

Editar Variável de Sistema Path 

Novo > C:\Users\pcsan\AppData\Local\Android\Sdk\plataform-tools

5º Configurar o Android Studio:

More Actions > Sdk Manager > Na aba Sdk Platforms Marcar o Android 11

More Actions > Avd Manager > Creat Virtual Driver> Phone > Pixel 2

Clicar em download versão 11 > Next > Finish > Next Selecionando versão 11 > Finish

Na tela do AVD tem um play no device criado > Inicia o emulador (um pouco lento)

6º Exectuar projeto:

(Dentro da pasta com os arquivos)

npm install

npm install styled-components --save

npm add @types/styled-components-react-native -D

npm install react-native-datepicker --save

npm install @react-navigation/native @react-navigation/native-stack

npm install react-native-screens react-native-safe-area-context

npm install @react-native-picker/picker --save

npm install --save react-native-vector-icons

react-native link react-native-vector-icons

npm install react-native-svg

react-native link react-native-svg

npm install react-native-qrcode-svg

NOVO
npm install react-native-masked-text --save

ir para o arquivo na pasta:

planalto-front-final-main\android\app\src\main\res\values\styles.xml

e substituir o conteudo por:

<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:datePickerDialogTheme">@style/datePickerTheme</item>
    </style>

    <style name="datePickerTheme" parent="Theme.AppCompat.Light.Dialog">
        <item name="colorAccent">#088A29</item>
        <item name="colorControlActivated">#088A29</item>
        <item name="colorControlHighlight">#088A29</item>
    </style>

</resources>

ir no arquivo na pasta:

android/app/src/main/AndroidManifest.xml

e substituir

android:windowSoftInputMode="adjustResize"

por

android:windowSoftInputMode="adjustPan"

react-native run-android (demora muito a primeira vez do projeto)

Precisa estar com o emulador ativo

----

Alternativa de execução:

react-native init nomeprojeto (Novo Projeto)

Pode criar um projeto assim e depois substituir a pasta src, app.js e index.js