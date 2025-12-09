App de Receitas 👨🏼‍🍳🍣 - React Native 

Assessment de Desenvolvimento Mobile (AT) - Disciplina 3 (DR3)

Este projeto é uma aplicação móvel desenvolvida em React Native (Expo) que permite aos usuários buscar, filtrar e visualizar detalhes de receitas culinárias consumindo a API pública TheMealDB.

O projeto foca em arquitetura limpa, navegação fluida e tratamento eficiente de dados assíncronos.

📌 Telas e Funcionalidades:

1. Tela Inicial (Home)

• Busca por Texto: Campo de input com Debounce (atraso de 500ms) para evitar requisições excessivas à API enquanto o usuário digita.

• Filtro por Categorias: Barra horizontal (Chips) para filtrar receitas por categorias (ex: Seafood, Beef, Chicken).

• Listagem Otimizada: FlatList performática exibindo cards com foto e nome da receita.

• Feedback Visual: Indicadores de carregamento (Loading) e mensagens de lista vazia.

2. Tela de Detalhes (Details)

• Recuperação por ID: Busca os detalhes completos da receita selecionada via navegação parametrizada.

• Tratamento de Dados: Lógica personalizada para processar a lista de ingredientes e medidas que vêm separadas na API.

• Interface Rica: Exibe foto em destaque, categoria, área de origem, lista de ingredientes formatada e instruções de preparo roláveis.

📌 Design System

O aplicativo utiliza uma identidade visual moderna e vibrante:

• Roxo (#4A148C): Usado em cabeçalhos, títulos e elementos estruturais.

• Laranja (#FF6F00): Usado para ações, destaques, loadings e bullets.

• Estilização: Todo o design foi criado utilizando StyleSheet nativo do React Native (sem frameworks de UI externos como Tailwind), garantindo performance e controle total.

📌 Tecnologias Utilizadas

• React Native (Expo SDK 52)

• JavaScript (ES6+)

• React Navigation (Native Stack)

• Axios (Requisições HTTP)

React Native Safe Area Context (Gestão de áreas seguras)

📌 Estrutura do Projeto

O projeto segue uma arquitetura organizada para facilitar a manutenção e escalabilidade:

src/
  ├── components/      # Componentes reutilizáveis (ex: RecipeCard)
  ├── screens/         # Telas da aplicação (HomeScreen, DetailScreen)
  ├── services/        # Configuração da API (Axios)
  ├── routes/          # Configuração de Navegação
  └── App.js           # Ponto de entrada


📌 Como Rodar o Projeto

Pré-requisitos: Node.js instalado e ambiente Expo configurado.

1. Clone o repositório:

git clone [https://github.com/Lucas-Calo/receitas-app-AT-DR3.git](https://github.com/Lucas-Calo/receitas-app-AT-DR3.git)

cd receitas-app-AT-DR3


2. Instale as dependências:

npm install


3. Inicie o projeto:

npx expo start


4. Teste:

• Use o aplicativo Expo Go no seu celular (escaneie o QR Code).

• Ou pressione a para rodar no Emulador Android.

• Ou pressione i para rodar no Simulador iOS.


📌 API Reference

Este projeto utiliza a TheMealDB API.

• Base URL: https://www.themealdb.com/api/json/v1/1/

• Endpoints usados: search.php, filter.php, lookup.php, categories.php.

👨‍💻 Autor

Desenvolvido por Lucas Progetti Coelho Caló, aluno de Análise e Desenvolvimento de Sistemas.