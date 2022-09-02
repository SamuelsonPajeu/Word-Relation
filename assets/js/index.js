const searchedWordInput = document.getElementById('searchedWord');
const searchButtom = document.getElementById('searchButtom');
const searchedWordInput2 = document.getElementById('searchedWord2');
const searchButtom2 = document.getElementById('searchButtom2');
const downloadButtom = document.getElementById('downloadButtom');

const header = document.getElementById('wordnavbar');
const mainPage = document.getElementById('initialScreen');
const visualizerSection = document.getElementById('container');


searchButtom.addEventListener('click', updateView);
searchButtom2.addEventListener('click', function(){
    searchWord(searchedWordInput2);
});



let searchedWord = '';
let rawData = {};
let words_web = {};
let group = [];
let downloadData = [];

async function getData(value) {
    const response = await fetch(`https://desafio-palavra.herokuapp.com/get_data/${value}?format=json`);
    const data = await response.json();
    return data;
}

function updateView(){
    mainPage.style.display = 'none';
    visualizerSection.style.display = 'block';
    header.style.display = 'block';
    downloadButtom.style.display = 'none';

    searchWord(searchedWordInput);
}

function searchWord(input) {
    searchedWord = input.value;
    removeOldGraph();

    if(!onlySpaces(searchedWord)){
        getData(searchedWord).then(data => {
            rawData = data;
            grabWordsProperties();
        });
    }else{
        if (spacesAmmount(searchedWord) > 0) {
            alert('Digite uma palavra');
        }
    }


}

function onlySpaces(value) {
    return value.trim().length === 0;
}
function spacesAmmount(value) {
    return value.split(' ').length - 1;
}

function grabWordsProperties() {
    console.log('Grabbing words properties');
    const _temp = {
        "nodes": [
            {
                "id": searchedWord,
                normal : {
                    height : 80,
                    fill : '#6E5A83'
                }
            }
        ],
        "edges": [],
    };
    group = [];

    for (i in rawData[searchedWord]) {
        if (rawData[searchedWord][i]['words']){
            _temp.nodes.push({ "id" : i, normal : {
                height : 40,
                fill : '#5B637C'
            }});
            _temp.edges.push({ "from": searchedWord, "to":i});
            color = randomColor();
            group.push({color : color, group : i});
            
            _length = rawData[searchedWord][i]['words'].length;
            for (let j = 0; j < _length; j++) {
                const element = rawData[searchedWord][i]['words'][j];
                _temp.nodes.push({ "id" : element, normal : {
                    height : 10,
                    fill : color,
                },
                group : i});
                _temp.edges.push({ "from": i, "to":element});
            }

        }
        
    }

    words_web = _temp;
    buildWebGraph();

}

function buildWebGraph() {
    console.log('Building web graph');
    let chart = anychart.graph(words_web);

    chart.title('Palavras relacionadas a ' + searchedWord);

    chart.container('container');
    chart.nodes().labels().enabled(true);
    chart.nodes().labels().fontSize(6);
    chart.nodes().labels().fontWeight(600); 

    downloadButtom.style.display = 'block';
    chart.draw();
    
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function removeOldGraph(){
    let container = visualizerSection.getElementsByTagName('div')[0];
    downloadButtom.style.display = 'none';
    if (container) {
        container.remove();
    }
}

function download(exportType){
    const fileName = searchedWord;
    toData().then(data => {
        window.exportFromJSON({ data, fileName, exportType })
    });
    
}

async function toData(){
    downloadData = [];
    console.log(rawData[searchedWord]);
    for (i in rawData[searchedWord]) {
        if (rawData[searchedWord][i]['words']){
            _length = rawData[searchedWord][i]['words'].length;
            for (let j = 0; j < _length; j++) {
                let _push = true;
                for (let x = 0; x < downloadData.length; x++) {
                    if (!downloadData[x][i]){
                        downloadData[x][i] = rawData[searchedWord][i]['words'][j];
                        _push = false;
                        break;
                    }
                }
                if (_push) {
                    downloadData.push({
                        [i] : rawData[searchedWord][i]['words'][j]
                    })
                }
            }
        }
    }
    return downloadData;
}