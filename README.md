# bovcontrol-checklist-app
O fazendeiro poderá gerenciar seus checklists de forma online ou offline. Aplicação deve permitir que checklists sejam criados ou atualizados independente da sua conexão de internet.

## Requirements to run the project

- Node >16
- Ruby 2.7.5
- Watchman @latest
- Xcode >10
- CocoaPods @latest
- OpenJDK Zulu >11
- Android Studio
- Android SDK >12
- Android SDK Platform >31
- Android Virtual Device 
- React Native 0.69

## Runing the project

- Clone repository
- Go to inside the project folder
- Run `yarn` to install dependencies
- Run `yarn start` to run bundle server
- Run `yarn ios` to run ios project or Run `yarn android` to run android project

## How it works

Ao executar o projeto, o arquivo `App.js` é inicializado. A partir disto o Banco de Dados é criado (`RealmConfig.js`), a conexão a API é criada (`RemoteConnection.js`) e o Stack de Navegação está devidamente construído (`Navigation.js`).

Ao rodar o applicativo, a primeira tela a carregar é a `LaunchSetupScreen.js` onde são executados as rotinas de analise de conexão com a internet, inicialização ou sincronina dos dados com a base remota.

Temos 3 bases de dados (instânncias RealmContext) que são utilizados para gerir o fluxo de sincronização do aplicativo. A base `MainSyncedContext`  é onde ficam todos os registros atualizados, que são os dados em lista exibidos na tela para o usuário. A base `TemporaryPoolContext` é onde ficam as atualizações que ocorreram no aparelho e precisam ser sincroninzadas com a base remota via API. E a base `LogProdContext` que é para registrar os eventos online e offline.

A partir disto a navegação é direcionada para tela `MainCheckListScreen.js` onde aqui são apresentados 2 boards de dados, um para exibir indicadores (`WidgetsBoard.js`) e o outro para listar os registros (`DataListBoard.js`) e seus respectivos componentes filhos. As demais telas deste mesmo (e único) stack de navegação são: `AddCheckListScreen.js` para adicionar novo registro; `DetailCheckListScreen.js` para visualizar detalhes a partir de um ID; `EditCheckListScreen.js` para editar a partir de um ID;
