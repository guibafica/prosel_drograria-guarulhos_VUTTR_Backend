# Como rodar o projeto:

> Este é um projeto em NodeJS, então é necessário ter instalado em sua máquina para rodar esta API. Utilizei a versão 12.18.4 então acredito que versões próximas/mais atualizadas, irão rodar sem problemas.

Com o [NodeJS](https://nodejs.org/en/) devidamente instalado, basta acessar, pelo terminal, a raiz do projeto e executar o comando: 'yarn dev', caso tenha [Yarn](https://yarnpkg.com/getting-started/install) instalado, ou simplesmente executar o comando: 'npm run dev'. O [NPM](https://www.npmjs.com/) já é instalado naturalmente junto com o NodeJS.

> Após executar um dos comandos acima, deve aparecer a seguinte mensagem no terminal: '🚀 Server started'. Neste momento, a API está rodando e pronta para ser acessada na porta 3333, basta chamar alguma de suas rotas, como por exemplo: '[http://localhost:3333/](http://localhost:3333/)'.

### Banco de dados:

Para o banco de dados, usei o PostgreSQL, então bastar você ter conexão com este banco em sua máquina e rodar as migrations, caso não tenha, podemos utilizar o Docker para isolar o banco em um container.

1 - Instale o [Docker CE](https://docs.docker.com/engine/install/) de acordo com seu Sistema Operacional. Depois de instalar, verifique se ocorreu tudo bem executando o comando `docker -v` ou `docker help`;

2 - Agora crie o container com o postgreSQL, rode no terminal: `docker run --name vuttr -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`;

3 - E por fim, basta rodar as migrations pelo terminal na raiz desse projeto: `yarn sequelize db:migrate` ou `npx sequelize db:migrate`.

# Anotações Importantes:

- As rotas pedidas no desafio, estão configuradas para serem acessadas apenas após o login, passando o token JWT, fiz isso na intenção de simular uma aplicação em produção, alem de mostrar meu conhecimento. Para acessar essas rotas, basta cadastrar um usuário, logar e passar o bearer token como ta descrito na documentação. Caso queiram, podem simplesmente remover a linha 'routes.use(authMiddleware);' do arquivo routes para desabilitar esse middleware.

- Eu uso o 'deleted_at' como uma forma de 'deletar' o item das consultas usando uma estratégia para não perder esses dados, mesmo ele não estando mais acessível no código, (faço a filtragem quando o 'deleted_at' tiver null), ainda podemos visualiza-lo diretamente no BD.

- Esta é a primeira vez que tive contato com documentação de API e principalmente com o API Blueprint.

- Utilizei uma ferramenta do API Blueprint chamada [aglio](https://github.com/danielgtaylor/aglio) para converter o arquivo api.apib 'criado manualmente por mim' para gerar uma versão em html para ficar mais fácil e agradável de visualizar o resultado final da documentação. O arquivo é o 'index.html' que está localizado na raiz do projeto. Estou usando uma extensão pra vsCode chamada 'Live Server' do 'Ritwick Dey' ela me permite rodar facilmente um arquivo html. Basta apenas abrir o arquivo e no canto direito inferior da tela vai aparecer uma opção 'Go Live', clicando nela, ele cria automaticamente um server html q estará rodando localhost na porta 5500.

<img align="center" src="https://raw.githubusercontent.com/guibafica/prosel_drograria-guarulhos_VUTTR_Backend/main/images/ScreenDocAglio.png?token=ANTZSLJIJ2QWDFBAPL355KTAC5KBY" width="450"/>

- Para facilitar, coloquei na raiz do projeto meu arquivo do Insomnia, que utilizei para realizar os testes das rotas.

- Escrevi alguns comentários em partes de código que achei necessário, segue lista de arquivos que comentei:

  - ToolController / Método Index
  - ToolController / Método Update
  - ToolController / Método Delete

  - UserController / Método Update

  - auth.js

  - database.js

- Como irei citar posteriormente, o banco de dados configurado nesta aplicação, esta hospedado na aws, caso ocorra algum erro de conexão, favor ir no arquivo 'database.js', comentar credenciais da aws e descomentar as credencias localhost. Não esquecer de rodar as migrations.

# Principais Libs usadas:

- bcryptjs => Criptografia de senha;
- express => Core do servidor;
- jsonwebtoken => Gerar token de autenticação;
- PostgreSQL => Banco de dados relacional;
- sequelize => Conexão com BD;
- yup => Validação de dados de entrada;
- eslint + prettier => Indentação e Organização de código;
- sucrase => Mudar sintaxe para padrão 'import/export';

# Deploy da aplicação:

Realizei apenas o deploy do BD na AWS. Quando fui deixar a API online, percebi instabilidades no serviço EC2 AWS 'Serviço esse que utilizo para deploy do Backend', então decidi deixar a api localhost mesmo.

- Deploy do Banco de Dados => RDS

Já vou deixar o banco da AWS pré configurado aqui, para qualquer interação já ser no BD online, porém durante o desenvolvimento, utilizei um container Docker para isolar um novo banco de dados PG exclusivo para esta aplicação. Já vou deixar também algumas ferramentas pré criadas lá para enriquecer as consultas.
