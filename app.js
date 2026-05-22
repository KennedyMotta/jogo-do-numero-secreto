//Variáveis, básicas.
let tries = 0;
let maxNumber = 1000;
const dica = document.querySelector('.texto__paragrafo'); 
const inputField = document.querySelector('.container__input');
const reiniciarBtn = document.getElementById("reiniciar");


//Mostrar Mensagens Base.
showInitialMessage();
randomSecretNumber(maxNumber);

//Resetar o Jogo.
function resetGame(){
    randomSecretNumber(maxNumber);
    showInitialMessage();
    cleanField();
    dica.classList.remove("acertou", "erro");
   reiniciarBtn.setAttribute("disabled", true);
}

//Exibir Mensagem Inicial
function showInitialMessage(){
    const text1 = "Jogo do Número Secreto";
    const text2 = "Digite um número de 1 a " + maxNumber;
    changeText("h1", text1);
    changeText("p", text2);
    responsiveVoice.speak(text1, "Brazilian Portuguese Female", { rate: 1.3 });
    responsiveVoice.speak(text2, "Brazilian Portuguese Female", { rate: 1.3 });
}

//Retorna o input do Player.
function input(){
    inputMessage = parseInt(document.querySelector('Input').value);
    return inputMessage
}

//Altera os textos das tags conforme o desejado.
function changeText(tag,text){
    textMessage = document.querySelector(tag);
    textMessage.innerHTML = text;
}

//Retorna um número Secreto aleatório.
function randomSecretNumber(maxNumber){
    secretNumber = parseInt(Math.random() * maxNumber + 1);
    return secretNumber;
}

//Verifica a jogada para saber se o Player ganhou ou não.
function verifyTentative(){
    tries++;

    if(input() == secretNumber){
        const text3 = "Acertou!";
        const text4 = "Você descobriu o Número Secreto com: ";
        changeText("h1", text3);
        responsiveVoice.speak(text3, "Brazilian Portuguese Female", { rate: 1.3 });
        let triesMessage = tries > 1 ? " tentativas!" : " tentativa.";
        changeText("p", text4 + tries + triesMessage);
        responsiveVoice.speak(text4 + tries + triesMessage, "Brazilian Portuguese Female", { rate: 1.3 });
        dica.classList.remove("erro");
         dica.classList.add("acertou");

    } else {
        const textToHelp = secretNumber > input() ? "O Número Secreto é Maior!" : "O Número Secreto é Menor!"; 
        responsiveVoice.speak(textToHelp, "Brazilian Portuguese Female", { rate: 1.3 });
        changeText("p", textToHelp);
        cleanField();
        
   
         dica.classList.add("erro");
    }
        reiniciarBtn.removeAttribute("disabled");
}

function cleanField(){
    inputMessage = document.querySelector('Input');
    inputMessage.value = "";
}


inputField.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {  
        verifyTentative();       
    }
});