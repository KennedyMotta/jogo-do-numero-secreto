//Variáveis, básicas.
let tries = 0;
let maxNumber = 1000;

//Mostrar Mensagens Base.
showInitialMessage();
randomSecretNumber(maxNumber);

//Resetar o Jogo.
function resetGame(){
    tries = 0;
    randomSecretNumber(maxNumber);
    showInitialMessage();
    cleanField();
    document.getElementById("reiniciar").setAttribute("disabled",true);
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
        const text4 = "Você descobriu o Número Secreto com ";
        changeText("h1", text3);
        responsiveVoice.speak(text3, "Brazilian Portuguese Female", { rate: 1.3 });
        let triesMessage = tries > 1 ? " tentativas! " : " tentativa. "
        changeText("p", text4 + tries + triesMessage);
        responsiveVoice.speak(text4 + tries + triesMessage, "Brazilian Portuguese Female", { rate: 1.3 });
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else{
        textToHelp = secretNumber > input() ? "O Número Secreto é Maior!" : "O Número Secreto é Menor!"; 
        responsiveVoice.speak(textToHelp, "Brazilian Portuguese Female", { rate: 1.3 });
        changeText("p",textToHelp);
        cleanField();
}}

function cleanField(){
    inputMessage = document.querySelector('Input');
    inputMessage.value = "";
}