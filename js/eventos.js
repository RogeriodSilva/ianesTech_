//Login & Cadastro
function AddCadastro() {

    var _cadastro = {
        provas: {}
    }

    document.querySelectorAll(`form[name='cadastro'] input`).forEach((input) => {
        if (input.type != 'submit') {

            input.classList.remove('erro');

            if (input.type == 'radio' && input.checked) {
                _cadastro[input.name] = input.value;

            } else if (input.type != 'radio') {
                _cadastro[input.name] = input.value;
            }
        }
    })


    function checkCadastro() {
        for (let info in _cadastro) {
            if (typeof _cadastro[info] != 'object') {

                if (_cadastro[info] == '') {

                    console.log(`${info}:${_cadastro[info]}`)
                    var input = document.querySelector(`form[name='cadastro'] input[name='${info}']`)
                    input.style.border = '2px solid red'

                    return false;

                } else if (info == 'senhanov' && _cadastro[info] != _cadastro.senha) {


                    var input = document.querySelector(`form[name='cadastro'] input[name='${info}']`)
                    input.style.border = '2px solid red'

                    return false;

                }

            }
        }
        return true
    }

    if (!checkCadastro()) {
        return false;
    }

    var _provas = ['JavaScript', 'CSS3', 'HTML5'];

    for (let provaName of _provas) {
        _cadastro.provas[provaName] = {
            acabou: false,
            tentativas: 1,
            nota: 0,
        }
    }

    var userId = `user_${(getUsers().length += 1)}`;
    localStorage.setItem(userId, JSON.stringify(_cadastro));

    window.location.href = 'login.html#paralogin';

    return false;
}

function CheckLogin() {

    var _login = {}

    document.querySelectorAll(`form[name='login'] input`).forEach((input) => {
        if (input.type != 'submit') {
            if (input.type == 'radio' && input.checked) {
                _login[input.name] = input.value;

            } else if (input.type != 'radio') {
                _login[input.name] = input.value;
            }
        }
    })


    for (let KEY of getUsers()) {
        var DATA = JSON.parse(localStorage.getItem(KEY));

        if (_login.email == DATA.email && _login.senha == DATA.senha) {

            localStorage.setItem('userLogin', KEY);
            window.location.href = './index.html';

            return false
        }
    }

    for (let info in _login) {
        var input = document.querySelector(`form[name='login'] input[name='${info}']`)
        input.style.border = '2px solid red'
    }


    return false;
}


//Prova
var ProvaName = '';
var Provas = {
    JavaScript: [
        {
            pergunta: 'Como se "escreve" em um elemento no HTML pelo JavaScript', nota: 3, respostas: [
                ['.escreval', false],
                ['.cout', false],
                ['.innerHTML', true],
                ['.print', false],
            ]
        },
        {
            pergunta: 'Quais são os tipos que da para declarar uma variavel no JavaScript', nota: 7, respostas: [
                ['local, this, window, while', false],
                ['switch, function, return, if', false],
                ['number, string, bool, object', false],
                ['let, var, const, nada', true],
            ]
        },
        {
            pergunta: 'Quais tipo de dados que tem no JavaScript', nota: 5, respostas: [
                ['local, this, window, while', false],
                ['switch, function, return, if', false],
                ['Number, String, Object, Array', true],
                ['Nenhuma das alternativa acima', false]
            ]
        },
    ],
    CSS3: [
        {
            pergunta: 'Sobre o atributo "color", marque a alternativa correta:', nota: 2, respostas: [
                ['É usado para escolher uma cor de fundo', false],
                ['É usado para fazer degradê nas página', false],
                ['É usado pra colocar cor nas letras', true],
                ['É usado para colorir a barra de pesquisa', false],
            ]
        },
        {
            pergunta: 'No css, para colocar uma cor em um parágrafo em VERMELHO, e centralizar o texto, o código correto é.', nota: 2, respostas: [
                ['p {red; text-align:center;}', false],
                ['p{colo:red; text-align:center;}', true],
                ['pp {colo:red; text-align:center;}', false],
                ['p {colo:red; text-:center;}', false],
            ]
        },
        {
            pergunta: 'No CSS3, para colocar todos os textos existentes no HTML5 em uma cor única, o código usado é:', nota: 5, respostas: [
                ['body {color:blue;}', true],
                ['p {color: blue;}', false],
                ['h1 {color: blue;}', false],
                ['td {color: blue;}', false]
            ]
        },
        {
            pergunta: 'No CSS3 para colocar uma cor de fundo no "BODY" de livre escolha, o código correto é:', nota: 3, respostas: [
                ['body {ground-color: blue;}', false],
                ['body {color: blue;}', false],
                ['body {background-color:blue;}', true],
                ['body {text-size: 5px;}', false]
            ]
        },
    ],
    HTML5: [
        {
            pergunta: 'O que é HTML', nota: 4, respostas: [
                ['HTML é uma linguagem de programação', false], ['HTML é uma linguagem de marcação', true], ['HTML é uma linguagem back-end', false], ['HTML é uma linguagem informal', false],
            ]
        },
        {
            pergunta: 'Para inciar o HTML, começa-se usando', nota: 5, respostas: [
                ['!DOCTYPE head', true], ['!DOCTYPE html', false], ['Dcotyoe', false], ['html5', false],
            ]
        },
        {
            pergunta: 'Sobre tabelas no HTML5 e correto afirmar', nota: 6, respostas: [
                ['Cada célula e definida por uma tag "ed" e "rd"', false], ['É definida por "tr" e "td"', true], ['Não se usa nenhuma tag', false], ['Usa-se <p>', false],
            ]
        },
        {
            pergunta: 'Sobre as listas no HTML5', nota: 4, respostas: [
                ['a tag usada na lista ordenada é <dl>', true], ['a tag usada na lista não ordenada e <ol', false], ['a tag de itens dentro da lista e <td>', false], ['a tag é "li"', true],
            ]
        },
    ]
}

function VerificProva() {

    var provaSelect = Provas[ProvaName];

    var Total = getTotal();
    var Nota = 0;
    var Result = 0;

    function getTotal() {
        var result = 0;

        for (let quest of provaSelect) {
            result += quest.nota;
        }

        return result;
    }

    document.querySelectorAll(`td input[id*='quest_']`).forEach((quest) => {

        var questID = quest.id;
        var _perguntaPosition = Number(questID.substring(6, questID.length))

        if (quest.checked && quest.value == 'true') {
            Nota += provaSelect[_perguntaPosition].nota;
        }
    })

    Result = Math.floor(100 * Nota / Total);

    if (Result < 70) {
        createElements(document.querySelector('#back-prova'), false,
            {

                h1: {
                    Close: true,
                    Content: `Você teve ${Result}% de acerto, tente novamente.`,
                    Attribute: {
                        style: {
                            'text-align': 'center',
                            'font-size': '30px',
                        }
                    }
                },
                button: {
                    Close: true,
                    Content: `Refazer`,
                    Attribute: {
                        onclick: 'RefazerProva()',
                        class: ['button-p'],
                        style: {
                            'background-image': `linear-gradient(133deg, rgba(46,46,46,1) 20%, var(--cor${ProvaName}) 100%)`
                        }
                    }
                }

            })
    } else {
        UserProva.nota = Nota;
        UserProva.acabou = true;

        localStorage.setItem(UserLogin.key, JSON.stringify(UserLogin.info));
        window.location.href = 'cursos.html';
    }

    return false;
}

function RefazerProva() {

    UserProva.tentativas++;
    localStorage.setItem(UserLogin.key, JSON.stringify(UserLogin.info));

    window.location.reload();
}

function GerarProva() {

    ProvaName = MateriaName;

    //Interface
    var provaName = document.getElementById('prova-name');
    var provaIcon = document.getElementById('prova-icon');

    provaName.innerHTML = ProvaName;
    provaIcon.src = `images/aulas/${ProvaName}/icon.png`;


    //Gerando Prova
    var backProva = document.getElementById('back-prova');
    var provaSelect = Provas[ProvaName];


    if (provaSelect != null) {

        function gerarPerguntas() {
            var text = '';

            for (let num_quest in provaSelect) {

                var quest = provaSelect[num_quest];

                text +=
                    `
                    <tr>
                        <td style='background-image: linear-gradient(133deg, rgba(46,46,46,1) 20%, var(--cor${ProvaName}) 100%);'>
                            <label class='pergunta'>${Number(num_quest) + 1}) - ${quest.pergunta}?   <label>(${quest.nota} pts)</label></label>
                        
                            <table id='table-respostas' width='100%'>
                `

                for (let resposta of quest.respostas) {



                    text +=
                        `
                        <tr>
                            <td><input type="radio" name="quest_${num_quest}" id="quest_${num_quest}" value="${resposta[1]}" required> ${resposta[0]}</td>
                        </tr>
                    `
                }

                text +=
                    `
                            </table>
                        </td>
                    </tr>
                `
            }


            return text;
        }


        backProva.innerHTML =
            `
        
        <form action="#" method="post" name="prova_${ProvaName}">
            <table id='table-prova' width='100%' height='100px' cellspacing='20px'>
                ${gerarPerguntas()}
            </table>

            <input class='button-p' style='background-image: linear-gradient(133deg, rgba(46,46,46,1) 20%, var(--cor${ProvaName}) 100%);' type='submit' value='Enviar' onclick='return VerificProva()'/>
        </form>
        
    
        `
    }

}

function RecomModule() {

    var UserLogin = getUserLogin('index.html');
    var MateriaName = localStorage.getItem('prova_materia');
    var UserProva = UserLogin.info.provas[MateriaName];

    UserProva.tentativas = 1;
    localStorage.setItem(UserLogin.key, JSON.stringify(UserLogin.info));

    window.location.href = `./aulas/${MateriaName}.html`
}

// Eventos
function getUsers() {

    var list = [];

    if (localStorage.length > 0) {
        for (let _position = 0; _position < localStorage.length; _position++) {

            var KEY = localStorage.key(_position);

            if (KEY.substring(0, 5) == 'user_') {
                list.push(KEY);
            }

        }
    }

    return list;
}

function getUserLogin(home) {

    var UserLogin = localStorage.getItem('userLogin');
    var UserInfo = JSON.parse(localStorage.getItem(UserLogin));

    if (UserInfo == null && home) {
        window.location.href = home
        return
    }

    return { key: UserLogin, info: UserInfo };
}

function createElements(isParent, Manter, Elementos) {
    var elements = '';

    for (let _element in Elementos) {

        var elementName = _element;
        var elementInfo = Elementos[elementName]
        var elementConfig = elementInfo.Attribute;

        function setConfig() {
            var result = '';

            for (let _config in elementConfig) {
                var attribute = elementConfig[_config];

                switch (typeof attribute) {
                    case 'string': {
                        result += `${_config}="${attribute}"`;
                    } break;

                    case 'object': {
                        result += `${_config}="`

                        for (let info in attribute) {
                            if (Array.isArray(attribute)) {
                                result += `${attribute[info]} `

                            } else {

                                result += `${info}:${attribute[info]};`

                            }
                        }
                        result += `"`;
                    } break;
                }
            }

            return result;
        }

        var ELEMENTO = `<${elementName} ${setConfig()}> ${(elementInfo.Content != undefined ? elementInfo.Content : '')} ${(elementInfo.Close === true ? ('</' + elementName + '>') : '')}`;

        if (isParent) {
            elements += ELEMENTO;
            continue
        }

        if (Manter) {
            elementInfo.innerHTML += ELEMENTO;

        } else {
            elementInfo.innerHTML = ELEMENTO;
        }
    }

    if (isParent) {
        if (Manter) {
            isParent.innerHTML += elements;

        } else {
            isParent.innerHTML = elements;
        }

    }
}

function goPage(url) {
    window.location.href = url;
}

function dataNow() {
    const d = new Date();
    return `${d.getDate()}/${(d.getMonth() < 10 ? ('0' + d.getMonth()) : d.getMonth())}/${d.getFullYear()}`
}

function getTotal(name) {

    var provaSelect = Provas[name];

    var result = 0;

    for (let quest of provaSelect) {
        result += quest.nota;
    }

    return result;
}

function getPorce(name) {

    var Total = getTotal(name);
    var Nota = UserProva.nota;
    var Result = 0;

    Result = Math.floor(100 * Nota / Total);
}