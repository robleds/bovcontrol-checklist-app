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

## Troubleshooting

- Na biblioteca Realm foi idetificado um bug no fucionamento do Debugger via browser, com isso só é possível debugar pelo termninal ou através de outros métodos. Para testar aaplicação não utilize o Debugger do browser.
- Na API foi encontrado algumas inconsistências na estrutura dos dados; a tipagem de dados esperado para o campo `_id` para POST é `String` mas quando devolve GET a mesma propriedade vem do tipo `Number`. O mesmo ocorre de forma inversa com as propriedades `amount_of_milk_produced` e `number_of_cows_head` onde ambas sobem como `Number` e descem como `String`. Essas diferenças de tipo impactam nas formatações dos schemes do `Realm.Object` (e também se usar TypeScript) uma vez que a tipagem é requerida.
- O id do registro em base não-relacional está com formato `Number` porém é uma boa prática nestes casos utilizar o tipo `String` no modo `UUID` para garantir segurança e impedir duplicidade.

## Sincronization Flow

O fluxo de sincronização dos dados está sendo gerido pelo componennte `api/RemoteConnection.js` (que precisa ser refatorada) onde há 3 métodos principais de monitoramento. O conceito do fluxo é assim: a prioridade são os registros que estão no aparelho (descincronizado) serem enviados para API; próximo passo é baixar tudo que está na API para comparar com a base local; para cocluir sincronizar a base local. 

- `syncUntrackedData()` Esse método é resposável por fazer upload itens individualmete para API.
- `syncRemoteData()` Esse método é responsável por fazer dowload da API para atualizar na base local (create/update).
- `syncLocalData()` Esse método é responsável por sincronizar as bases local com remota e remover itens apagados (delete).

Existem alguns "ToDo" no código com dívidas técnicas que vão melhorar a performace, em fluxos e arquitetura do sistema.