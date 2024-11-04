const textBox = document.getElementById('text-box');
const styleCode = document.getElementById('style-code');
const htmlCode = document.getElementById('html-code');
const jsCode = document.getElementById('js-code');
const inputText = document.getElementById('input-text');
const imageContainer = document.getElementById('image-container');

// Variáveis para rastrear a posição atual do texto
let positionTop = 0;
let positionLeft = 0;

// Variáveis para rastrear as imagens adicionadas e suas posições
let images = [];

// Atualiza o código gerado ao fazer mudanças
function updateGeneratedCode() {
    const fontFamily = document.getElementById('font-family').value;
    const fontColor = document.getElementById('font-color').value;
    const fontSize = document.getElementById('font-size').value + 'px';

    // Código da importação da fonte
    const fontImportCode = fontFamily === 'Roboto' ? `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');` : '';

    // Código da fonte
    const fontCode = `body {\n    font-family: '${fontFamily}', sans-serif;\n}`;

    // Código da cor
    const colorCode = `color: ${fontColor};`;

    // Código do tamanho
    const sizeCode = `font-size: ${fontSize};`;

    // Código de movimento do texto
    const positionCode = `top: ${positionTop}px;\nleft: ${positionLeft}px;`;

    styleCode.textContent = `
${fontImportCode}
${fontCode}
${colorCode}
${sizeCode}
Texto: "${inputText.value}"
position: {
    ${positionCode}
}`;

    // Atualiza o HTML gerado
    htmlCode.textContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Personalizador de Texto e Imagens</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Personalizador de Texto e Imagens</h1>
    <div id="text-box">${textBox.textContent}</div>
    ${images.map(img => `<img src="${img.src}" style="top: ${img.top}px; left: ${img.left}px;" class="image-box" />`).join('\n')}
    <script src="script.js"></script>
</body>
</html>`;

    // Atualiza o JavaScript gerado
    jsCode.textContent = `
const textBox = document.getElementById('text-box');
textBox.style.fontFamily = '${fontFamily}';
textBox.style.color = '${fontColor}';
textBox.style.fontSize = '${fontSize}';
textBox.style.top = '${positionTop}px';
textBox.style.left = '${positionLeft}px';

const images = ${JSON.stringify(images)};
images.forEach(img => {
    const image = document.createElement('img');
    image.src = img.src;
    image.style.top = img.top + 'px';
    image.style.left = img.left + 'px';
    image.className = 'image-box';
    document.body.appendChild(image);
});`;
}

// Atualiza o texto do text-box e o código gerado
inputText.addEventListener('input', (event) => {
    textBox.textContent = event.target.value;
    updateGeneratedCode();
});

// Atualiza a fonte, cor e tamanho da fonte
document.getElementById('font-family').addEventListener('change', (event) => {
    textBox.style.fontFamily = event.target.value;
    updateGeneratedCode();
});

document.getElementById('font-color').addEventListener('input', (event) => {
    textBox.style.color = event.target.value;
    updateGeneratedCode();
});

document.getElementById('font-size').addEventListener('input', (event) => {
    textBox.style.fontSize = event.target.value + 'px';
    updateGeneratedCode();
});

// Funções para mover o texto
function moveText(direction) {
    switch (direction) {
        case 'left':
            positionLeft -= 10;
            break;
        case 'right':
            positionLeft += 10;
            break;
        case 'up':
            positionTop -= 10;
            break;
        case 'down':
            positionTop += 10;
            break;
    }
    textBox.style.top = positionTop + 'px';
    textBox.style.left = positionLeft + 'px';
    updateGeneratedCode();
}

// Funções para adicionar imagens e mover
document.getElementById('image-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'image-box';
        img.style.position = 'absolute';
        img.style.top = '0px';
        img.style.left = '0px';

        images.push({ src: img.src, top: 0, left: 0 });
        imageContainer.appendChild(img);
        updateGeneratedCode();
    };
    if (file) {
        reader.readAsDataURL(file);
    }
});

// Função para mover imagens
function moveImage(direction) {
    if (images.length === 0) return;

    const currentImage = images[images.length - 1]; // Mover a última imagem adicionada

    switch (direction) {
        case 'left':
            currentImage.left -= 10;
            break;
        case 'right':
            currentImage.left += 10;
            break;
        case 'up':
            currentImage.top -= 10;
            break;
        case 'down':
            currentImage.top += 10;
            break;
    }

    const imgElements = document.querySelectorAll('.image-box');
    imgElements[imgElements.length - 1].style.top = currentImage.top + 'px';
    imgElements[imgElements.length - 1].style.left = currentImage.left + 'px';
    updateGeneratedCode();
}

// Funções para abrir as abas do código gerado
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
    }

    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";  
    evt.currentTarget.className += " active";
}

// Inicializa a aba CSS como a padrão
document.querySelector(".tablinks").click();

// Seleciona os botões e a imagem
const btnEsquerda = document.getElementById('btnEsquerda');
const btnDireita = document.getElementById('btnDireita');
const btnCima = document.getElementById('btnCima');
const btnBaixo = document.getElementById('btnBaixo');
const imagem = document.getElementById('imagem');
const codigoGerado = document.getElementById('codigoGerado');

// Função para atualizar o código gerado
function atualizarCodigo() {
    const posicao = imagem.getBoundingClientRect();
    codigoGerado.textContent = `
        position: {
            top: ${posicao.top}px;
            left: ${posicao.left}px;
        }
    `;
}

// Adiciona eventos de clique aos botões
btnEsquerda.addEventListener('click', () => {
    imagem.style.left = `${imagem.offsetLeft - 10}px`;
    atualizarCodigo();
});

btnDireita.addEventListener('click', () => {
    imagem.style.left = `${imagem.offsetLeft + 10}px`;
    atualizarCodigo();
});

btnCima.addEventListener('click', () => {
    imagem.style.top = `${imagem.offsetTop - 10}px`;
    atualizarCodigo();
});

btnBaixo.addEventListener('click', () => {
    imagem.style.top = `${imagem.offsetTop + 10}px`;
    atualizarCodigo();
});





document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const backgroundColorInput = document.getElementById('background-color');
    const generatedCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');

    backgroundColorInput.addEventListener('input', function() {
        const color = backgroundColorInput.value;
        body.style.backgroundColor = color;
        generatedCode.textContent = `<style>\nbody {\n    background-color: ${color};\n}\n</style>`;
    });

    function atualizarCodigo() {
        const textBox = document.getElementById('text-box');
        const img = document.getElementById('image-container');
        const textPos = textBox.getBoundingClientRect();
        const imgPos = img.getBoundingClientRect();

        cssCode.textContent = `
            .image-box {
                position: absolute;
                top: ${imgPos.top}px;
                left: ${imgPos.left}px;
            }
            #text-box {
                position: absolute;
                top: ${textPos.top}px;
                left: ${textPos.left}px;
            }
        `;
        jsCode.textContent = `
            function moveText(direction) {
                const textBox = document.getElementById('text-box');
                const currentTop = parseInt(window.getComputedStyle(textBox).top) || 0;
                const currentLeft = parseInt(window.getComputedStyle(textBox).left) || 0;

                switch(direction) {
                    case 'up':
                        textBox.style.top = (currentTop - 10) + 'px';
                        break;
                    case 'down':
                        textBox.style.top = (currentTop + 10) + 'px';
                        break;
                    case 'left':
                        textBox.style.left = (currentLeft - 10) + 'px';
                        break;
                    case 'right':
                        textBox.style.left = (currentLeft + 10) + 'px';
                        break;
                }
                atualizarCodigo();
            }

            function moveImage(direction) {
                const img = document.getElementById('image-container');
                const currentTop = parseInt(window.getComputedStyle(img).top) || 0;
                const currentLeft = parseInt(window.getComputedStyle(img).left) || 0;

                switch(direction) {
                    case 'up':
                        img.style.top = (currentTop - 10) + 'px';
                        break;
                    case 'down':
                        img.style.top = (currentTop + 10) + 'px';
                        break;
                    case 'left':
                        img.style.left = (currentLeft - 10) + 'px';
                        break;
                    case 'right':
                        img.style.left = (currentLeft + 10) + 'px';
                        break;
                }
                atualizarCodigo();
            }
        `;
    }

    window.moveText = function(direction) {
        const textBox = document.getElementById('text-box');
        const currentTop = parseInt(window.getComputedStyle(textBox).top) || 0;
        const currentLeft = parseInt(window.getComputedStyle(textBox).left) || 0;

        switch(direction) {
            case 'up':
                textBox.style.top = (currentTop - 10) + 'px';
                break;
            case 'down':
                textBox.style.top = (currentTop + 10) + 'px';
                break;
            case 'left':
                textBox.style.left = (currentLeft - 10) + 'px';
                break;
            case 'right':
                textBox.style.left = (currentLeft + 10) + 'px';
                break;
        }
        atualizarCodigo();
    };

    window.moveImage = function(direction) {
        const img = document.getElementById('image-container');
        const currentTop = parseInt(window.getComputedStyle(img).top) || 0;
        const currentLeft = parseInt(window.getComputedStyle(img).left) || 0;

        switch(direction) {
            case 'up':
                img.style.top = (currentTop - 10) + 'px';
                break;
            case 'down':
                img.style.top = (currentTop + 10) + 'px';
                break;
            case 'left':
                img.style.left = (currentLeft - 10) + 'px';
                break;
            case 'right':
                img.style.left = (currentLeft + 10) + 'px';
                break;
        }
        atualizarCodigo();
    };

    atualizarCodigo();
});

// Espera o carregamento do conteúdo da página antes de adicionar o evento
document.addEventListener("DOMContentLoaded", function() {
    const backgroundColorInput = document.getElementById('background-color');
    
    // Verifica se o input existe e adiciona o evento
    if (backgroundColorInput) {
        backgroundColorInput.addEventListener('input', function () {
            document.body.style.backgroundColor = backgroundColorInput.value;
        });
    }
});

// Configura a cor de fundo
backgroundColorInput.addEventListener('input', (event) => {
    document.body.style.backgroundColor = event.target.value;
});