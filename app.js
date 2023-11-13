const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const sorvetes = [
    { sabor: 'baunilha', quantidade: 5 },
    { sabor: 'chocolateAmargo', quantidade: 10 },
    { sabor: 'morangosFrescos', quantidade: 50 },
    { sabor: 'mangaMadura', quantidade: 40 },
    { sabor: 'amendoasTorradas', quantidade: 15 },
    { sabor: 'carameloSalgado', quantidade: 20 },
    { sabor: 'marshmallowsTostados', quantidade: 30 },
    { sabor: 'pedacosbrownie', quantidade: 25 },
    { sabor: 'cookiesChocolate', quantidade: 35 },
    { sabor: 'pessegosCalda', quantidade: 45 }
];

//lista de usuarios
const users = [{ username: "magnum", password: "123" }];

//array para adicionar sorvetes
const sorvetesCadastrados = [];

//requisito Número 1 sistema de login

//boolean para verificar se o usuario está logado
var userLogged = false;


//Sistema de Login para que o usuario possa ter acesso a determinadas rotas
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    //função find para percorrer a array de usuarios ate encontrar algum que bata com as credenciais informadas
    const userFound = users.find(user => user.username === username && user.password === password);

    //caso o usuario seja encontrado ele Faz login do usuario e seta aquele boolean para true
    if (userFound) {
        userLogged = true;
        return res.status(200).send("User logged susccefully");
    }
    //caso não ele informa que há algo errado
    return res.status(404).send("Error user not found in database or credentials incorrects");
});


//função para verificar se o usuario ja está logado e liberar as rotas
function verifyLogin(req, res, next) {
    if (!userLogged) {
        //caso o usuario não esteja logado ele pede para que o usuário faça login 
        return res.status(401).send("Please make login before ascess the route");
    } 
        //para executar a proxima função
        next();
}


//requisito Número 2 Cadastrar produtos
app.post("/cadastrar", verifyLogin, (req, res) => {

    //rest operator utilizado para pegar todos os outros dados que fazem parte do array
    var { name, description, price, ...sabores } = req.query;

    console.log(req.query);
    //caso o usuario digite o preço na criação do sorvete será entendido como base caso não 
    //ele cria o peso baseado na quantidade em gramas solicitada pelo cliente
    if (!price) {
        price = calcularPrecoTotal(sabores);
    }

    //dicionando sorvete ao array de sorvetes cadastrados pelo usuario
    const novoSorvete = {
        nome: name,
        descrição: description,
        igredientes: sabores,
        Price: price ,
        Gramas: price * 100 / 3
    };

    sorvetesCadastrados.push(novoSorvete);
    res.status(200).send("Ice cream added successfully");
});


//função para calcular os preços baseado na metrica 100 gramas por 3 reais
function calcularPrecoTotal(sabores) {
    let quantidadeTotal = 0;

    for (const sabor in sabores) {
        //usando função find para encontrar sorvetes no array de sorvete pelo nome
        const sorveteEncontrado = sorvetes.find(sorvete => sorvete.sabor === sabor);

        if (sorveteEncontrado) {
            //caso o sorvete seja encontrado adicionamos a quantidade que o cliente solicitou ao total
            //ate finalizar a quantidade de sorvetes escolhidas pelo usuario
            quantidadeTotal += sorveteEncontrado.quantidade * sabores[sabor];
        }
    }
    //aqui fazemos uma regra de tres para conseguir o valor baseado na metrica 100 gramas por 3 reais
    const preco = (quantidadeTotal * 3) / 100;

    return preco;
}

//rota de vendas para que o usuario possa escolher os a quantidade de igredientes para o seu sorvete
app.post("/vendas", verifyLogin, (req, res) => {
    const sabores = req.query;
    //verificando se o sorvete ja existe
    sorvetePronto = sorvetesCadastrados.find(sorvete => sorvete.nome === sabores.prontos);
    //caso eu ja tenha o sorvete cadastrado no sistema ele simplesmente exibe o sorvete que eu tinha feito
    //com os preços já pré-estabelecidos
    if (sorvetePronto) {
        var { Price, Gramas, ...Info } = sorvetePronto;
        const quantidade = req.query.quantidade 
        console.log(req.query);

        // Multiplicando Preço e Gramas pela quantidade desejada pelo cliente
        Price = Price * quantidade;
        Gramas = Gramas * quantidade;

        // Retorna um objeto com o preço e quantidade atualizadas de acordo com a preferência da pessoa
        var resposta = {
            Info: Info,
            Price: Price,
            Gramas: Gramas,
        };

        return res.status(200).json(resposta);
    }


    const preco = calcularPrecoTotal(sabores);

    const sorveteVendido = {
        Sabores: sabores,
        Price: preco,
        Gramas: preco * 100 / 3
    };

    res.status(200).json(sorveteVendido);
});


//rota para consultar os sorvetes
app.get("/consultar", (req, res) => {
    res.json(sorvetesCadastrados);
});

app.listen(3000, function () {
    console.log("Running on port 3000");
});
