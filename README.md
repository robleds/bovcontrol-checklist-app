# bovcontrol-checklist-app
O fazendeiro poderá gerenciar seus checklists de forma online ou offline. A aplicação deve permitir que checklists sejam criados ou atualizados independente da sua conexão de internet.

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

## Running the project
- Clone repository
- Go to inside the project folder
- Run `yarn` to install dependencies
- Run `yarn start` to run bundle server
- Run `yarn ios` to run ios project or Run `yarn android` to run android project

## How it works
Ao executar o projeto, o arquivo `App.js` é inicializado. A partir disto o Banco de Dados é criado (`RealmConfig.js`), a conexão a API é criada (`RemoteConnection.js`) e o Stack de Navegação está devidamente construído (`Navigation.js`). Ao rodar o aplicativo, a primeira tela a carregar é a `LaunchSetupScreen.js` onde são executadas as rotinas de análise de conexão com a internet, inicialização ou sincronia dos dados com a base remota.

Temos 3 bases de dados (instâncias RealmContext) que são utilizados para gerir o fluxo de sincronização do aplicativo. A base `MainSyncedContext` é onde ficam todos os registros atualizados, que são os dados em lista exibidos na tela para o usuário. A base `TemporaryPoolContext` é onde ficam as atualizações que ocorreram no aparelho e precisam ser sincronizadas com a base remota via API. É a base `LogProdContext` que é para registrar os eventos online e offline.

A partir disto a navegação é direcionada para tela `MainCheckListScreen.js` onde aqui são apresentados 2 boards de dados, um para exibir indicadores (`WidgetsBoard.js`) e o outro para listar os registros (`DataListBoard.js`) e seus respectivos componentes filhos. As demais telas deste mesmo (e único) stack de navegação são: `AddCheckListScreen.js` para adicionar novo registro; `DetailCheckListScreen.js` para visualizar detalhes a partir de um ID; `EditCheckListScreen.js` para editar a partir de um ID;

## Troubleshooting
- Na biblioteca Realm foi identificado um bug no funcionamento do Debugger via browser, com isso só é possível debugar pelo terminal ou através de outros métodos. Para testar a aplicação não utilize o Debugger do browser.
- Na API foi encontrado algumas inconsistências na estrutura dos dados; a tipagem de dados esperado para o campo `_id` para POST é `String` mas quando devolve GET a mesma propriedade vem do tipo `Number`. O mesmo ocorre de forma inversa com as propriedades `amount_of_milk_produced` e `number_of_cows_head` onde ambas sobem como `Number` e descem como `String`. Essas diferenças de tipo impactam nas formatações dos schemes do `Realm.Object` (e também se usar TypeScript) uma vez que a tipagem é requerida.
- O id do registro em base não-relacional está com formato `Number` porém é uma boa prática nestes casos utilizar o tipo `String` no modo `UUID` para garantir segurança e impedir duplicidade.

## Synchronization Flow
O fluxo de sincronização dos dados está sendo gerido pelo componente `api/RemoteConnection.js` (que precisa ser refatorada) onde há 3 métodos principais de monitoramento. O conceito do fluxo é assim: a prioridade são os registros que estão no aparelho (dessincronizado) serem enviados para API; o próximo passo é baixar tudo que está na API para comparar com a base local; para concluir sincronizar a base local. 

- `syncUntrackedData()` Esse método é responsável por fazer upload de itens individualmente para API.
- `syncRemoteData()` Esse método é responsável por fazer download da API para atualizar na base local (create/update).
- `syncLocalData()` Esse método é responsável por sincronizar as bases local com remota e remover itens apagados (delete).

Existem alguns "ToDo" no código com dívidas técnicas que vão melhorar a performance, em fluxos e arquitetura do sistema.

## Conclusão
A primeira versão do aplicativo está sincronizada com a API remota e tem rotinas de atualização dos dados entre o aparelho e a nuvem. Dado o curto tempo de planejamento da arquitetura, existem melhorias de performance para serem feitas e há uma inconsistência no processo de atualização (update) dos dados já existentes. Pelos testes realizados acredito ter batido as metas solicitadas: Libraries and patterns, React-native 0.69, UTILIZE STYLED COMPONENTS, Hooks, ContextAPI, Banco de Dados (RealmDB). 

## Processo de Planejamento
Ao receber o desafio, me dediquei as primeiras horas para o entendimento do projeto. Fiz alguns rabiscos de fluxo no papel e peguei umas referências de outros apps. Em seguida, fui estudar a biblioteca REALM Database que nunca tinha utilizado antes. O primeiro dia foi todo voltado para testes e entendimentos das bibliotecas que seriam utilizadas. 

Dividi o projeto em etapas: planejamento, criação do aplicativo, instalação e controle do banco de dados, conexão e controle com a API remota, stack de navegação, introdução dos dados dentro das telas, introdução de componentes de interface, orquestração do sistema, melhorias de performances e otimização dos dados e por fim acabamentos visuais. Também configurei o Postman para facilitar o processo de testes na API.

Escolhi não utilizar templates em frameworks ou boilerplates neste projeto para que os códigos pudessem estar limpos e de melhor entendimento técnico para que possa ser feita análises de algoritmos, raciocínio lógico, arquitetura etc. Também não utilizei a biblioteca Redux por 2 motivos: não haver tantas telas e estados que necessitasse esse nível de compartilhamento e também por ter sido uma premissa do desafio utilizar ContextAPI nativa.

Sobre a parte visual, por ser um app ferramenta, optei por não carregar demasiado nas cores, fontes e imagens, para que o app pudesse permanecer com uma identidade de software (e não game rsrsrs). Os componentes estão de fácil identificação e o projeto está apto para evoluir e receber uma camada Theme para controlar tudo sobre as interfaces visuais.

Na etapa final fiquei às voltas dos testes, que pelo curto tempo não pude desenvolver nenhum teste unitário e/ou de integração. Mas deixei as classes e componentes preparados para essa futura etapa. Quase tudo está devidamente construído (mas pode ainda ficar melhor, com mais horas de dedicação) como StyledComponent.

Espero que gostem. Obrigado pela oportunidade.
Rodrigo Robledo, em 28 de março de 2023. 
