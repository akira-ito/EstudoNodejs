
# BookMan
É um projeto para estudo de [NodeJS] utilizando os frameworks/modulos mais conhecido.  
*Inicialmente foi desenvolvida para auxiliar no dia-a-dia do trabalho.*

#### Framewoks/Modulos
- [express]: Contem metodos de utilitarios HTTP e middleware para o desenvolvimento rapido e fácil;
- [morgan]: Middleware de log de requisições HTTP;
- [jade]: Gerador de modelo HTML;
- [validator.js]: Validador/Scapes de Strings;
- [mongoose]: Mapeamento de Dados Objeto (ODM) de banco de dados [MongoDB];
- [async]: Modulo utilitário para trabalhar com JavaScript assíncrono;
- [mocha]: Rico em recursos de execução de testes no [NodeJS] e no Navegador;
- [expect.js]/[should.js]: Bibliotecas de afirmações para testes;
- [supertest]: Testar requisições e respostar vai HTTP;
- [rewire]: Fácil injeção de dependência para test unitário.

#### Estrutura de diretório
**`addOn`**: Onde os miniprojetos projetos podem ser adicionados, com a idéia de plugins. Deve conter o arquivo de index na raiz, expondo um `Object` contendo ***nome do projeto***, ***ativo ou não*** e as ***rotas da requisição*** com o tipo de metodo e a ação. 
>   *Exemplo:*   
>   ```js
>   module.exports = function(){
>       return {
>           name: "Nome do projeto",
>           active: true, //se deseja ativar
>           router: { //definição das rotas
>               '/test': { //url: localhost:port/addOn/Nome do projeto/test
>                   method: 'get', //tipo de metodo
>                   action: function(){ ... } //ação unica
>               },
>               '/cadastrar': {
>                   method: 'post',
>                   action: [function(){ ... }, function(){ ... }, ...] //ações multiplas
>               }
>           }
>       }
>   }
>   ```  

**`middleware`**: Diretorio que contem os middlewares do projeto principal. Como o **validator** da requisição, util para validar um determinado dados dela.
> *Exemplo:*
> ```js
> req.checkBody('nome', 'Digite o nome').trim().escape().isNotNull();
> req.checkBody('nome', 'Nome inferior de 5 caracteres').isLength(5);
> req.checkBody('email', 'Digite o email').trim().isNotNull();
> req.checkBody('email', 'Email invalido').normalizeEmail().isEmail();
> req.checkBody('senha', 'Digite a senha').trim().isNotNull();
> req.checkBody('senha', 'Senha de tamanho invalido. (de 5 á 12 caracteres)').isLength(5, 12);
> if (req.validationErrors().length){
>   res.status(400).json(req.validationErrors());
> }else{
>   next();
> }
> ```

**`public`**: Todos os arquivos publicos que serão acessiveis. Tais arquivos como **javascript**, **css** e **imagens**.
> *Os modulos que tiverem no **bower_components** também serão acessiveis.*

**`routes`**: Diretorio que contem arquivos de definição das rotas do projeto principal.

**`views`**: Diretório que contem as views do projeto principal.

#### AddOns
Diretorio onde contem subprojetos que funcionam independentes do projeto principal, pode ser acresentado novos subprojetos com a idéia de plugins.   

##### Estrutura de diretório
&nbsp;&nbsp;`test`: Estrutura onde deve conter os testes de cada funcionalidade implementada, seja integrado ao serviço ou por parte de uma funcionalidade. 
>**Integrado:** é necessário subir a aplicação com a variavel de ambiente *NODE_ENV* modo *TEST*, para que o banco de dados seja trocado.

&nbsp;&nbsp;`view`: Contem todas as views do subprojetos.  
&nbsp;&nbsp;`public`: Arquivos que serão publico.

##### Alguns AddOns
- **CrudUser**: É um CRUD de usuarios, utiliza o [mongoose] em cima do banco de dados [MongoDB], framework [angularjs], motor de template [jade], validador [validator.js] e para o desenvolvimento dos testes o [mocha], [supertest], [expect.js], [should.js] e [rewire].
- **TODO**: Gerenciador de tarefas (check list), utiliza [backbonejs] para o desenvolvimento da aplicação Web e motor de template [handlebarsjs]. *Em fase de desenvolvimento...* 

#### Iniciando
> Antes, é necessário a instalação [NodeJS], [npm] e [bower] e a configuração da variavel de ambiente **NODE_ENV** como **DES**.
``` bash
git clone https://github.com/oOAkiraOo/BookMan.git BookMan
cd BookMan
bower install
npm install
node . 
```
#### Executando os testes
```bash
npm test
```

[NodeJS]: <http://nodejs.org>
[npm]: <https://www.npmjs.com/>
[bower]: <http://bower.io/>
[express]: <http://expressjs.com>
[morgan]: <https://github.com/expressjs/morgan>
[jade]: <https://github.com/jadejs/jade>
[validator.js]: <https://github.com/chriso/validator.js>
[MongoDB]: <https://www.mongodb.org/>
[mongoose]: <http://mongoosejs.com/index.html>
[async]: <https://github.com/caolan/async>
[mocha]: <http://mochajs.org/>
[expect.js]: <https://github.com/Automattic/expect.js>
[should.js]: <https://github.com/shouldjs/should.js>
[supertest]: <https://github.com/visionmedia/supertest>
[rewire]: <https://github.com/jhnns/rewire>
[angularjs]: <https://angularjs.org/>
[backbonejs]: <http://backbonejs.org/>
[handlebarsjs]: <http://handlebarsjs.com/>