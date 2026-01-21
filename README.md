# API de Sorveteria – Express.js

Esta é uma API simples desenvolvida em **Node.js** com **Express** para gerenciar um sistema de sorveteria.

Ela possui **login**, **cadastro de sorvetes**, **vendas** e **consulta de produtos**, com controle básico de autenticação.

---

## Funcionalidades

- Sistema de login
    
- Proteção de rotas com autenticação
    
- Cadastro de sorvetes personalizados
    
- Cálculo automático de preço (100g = R$ 3,00)
    
- Venda de sorvetes prontos ou personalizados
    
- Consulta de produtos cadastrados
    

---

## Tecnologias Utilizadas

- Node.js
    
- Express
    
- Body-parser
    

---

## Instalação

Clone o repositório:

`git clone https://github.com/Gustav-Stack/Ice-cream-parlor.git`

Entre na pasta do projeto:

`cd Ice-cream-parlor`

Instale as dependências:

`npm install`

Inicie o servidor:

`node app.js`

O servidor irá rodar em:

`http://localhost:3000`

---

## Usuário Padrão

`{   "username": "magnum",   "password": "123" }`

---

## Login

**POST** `/login`

Autentica o usuário para liberar o acesso às rotas protegidas.

### Body (JSON)

`{   "username": "magnum",   "password": "123" }`

### Resposta de sucesso

`User logged successfully`

---

## Cadastro de Sorvetes

**POST** `/cadastrar`  
(Requer login)

Cadastro de sorvetes prontos com nome, descrição e ingredientes.

### Parâmetros via query

`/cadastrar?name=Especial&description=Sorvete premium&baunilha=2&chocolateAmargo=3`

Caso o preço não seja informado, ele será calculado automaticamente.

---

## Venda de Sorvetes

**POST** `/vendas`  
(Requer login)

### Comprar sorvete pronto

`/vendas?prontos=Especial&quantidade=2`

### Criar sorvete personalizado

`/vendas?baunilha=2&mangaMadura=3`

### Resposta

`{   "Sabores": {     "baunilha": 2,     "mangaMadura": 3   },   "Price": 7.5,   "Gramas": 250 }`

---

## Consultar Sorvetes

**GET** `/consultar`

Retorna todos os sorvetes cadastrados no sistema.

### Resposta

`[   {     "nome": "Especial",     "descrição": "Sorvete premium",     "igredientes": {       "baunilha": 2,       "chocolateAmargo": 3     },     "Price": 9,     "Gramas": 300   } ]`

---

## Observações Importantes

- A autenticação é feita por uma variável global (`userLogged`), não indicada para produção
    
- Os dados são armazenados em memória (arrays), sem banco de dados
    
- Ideal para fins acadêmicos ou aprendizado de Express.js
    

---

## Melhorias Futuras

- Autenticação com JWT
    
- Integração com banco de dados (MongoDB ou PostgreSQL)
    
- Validação de dados
    
- Sistema de múltiplos usuários
    
- Documentação com Swagger
