const readline = require('readline');
const fs = require('fs');

const readable = fs.createReadStream('Q:/APPS/SAP/EP0/Indicadores PCP_WEN/QUADRO_SUPRIMENTOS_MATERIAIS_PENDENTES.txt');

const rl = readline.createInterface({
    input: readable,
    //output: process.stdout
});

let lineNumber = 0;
const dados = [];
let cabecalho;

rl.on('line', (line) => {
    lineNumber++;
    if (lineNumber === 4) {
        cabecalho = line;
    }
    if (lineNumber > 5 && line !== cabecalho && !line.includes('-----')) { // ignora as primeiras duas linhas
        const columns = line.split('|').map(column => column.trim());
        const ordem = columns[1];
        const material = columns[2];
        const materialShortText = columns[3];
        const plmrp = columns[4];
        const elementoPEP = columns[5];
        const act = columns[6];
        const qtdFalta = columns[7];
        const qtdNecess = columns[8];
        const umb = columns[9];
        const reqmtDate = columns[10];
        const stLc = columns[11];
        const linhaLista = {
            ordem,
            material,
            materialShortText,
            plmrp,
            elementoPEP,
            act,
            qtdFalta,
            qtdNecess,
            umb,
            reqmtDate,
            stLc
        };
        dados.push(linhaLista);
    }
});

rl.on('close', () => {
    fs.writeFileSync('dados.json', JSON.stringify(dados, null, 2));
    console.log('Dados salvos em dados.json.');
});
