const heading = document.createElement("h1");
const paragraph = document.createElement("p");
const div = document.createElement("div");

heading.innerHTML = "<b>DOM Calculator</b>";
paragraph.innerHTML = "<b>This Calculator creat only using  DOM  </b>";

heading.setAttribute("id", "title");
paragraph.setAttribute("id", "description");
div.setAttribute("id", "calculator");

document.body.appendChild(heading);
document.body.appendChild(paragraph);
document.body.appendChild(div);


var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "result");
input.setAttribute("readonly", "readonly");

div.appendChild(input);


var table = document.createElement("table");


var buttons = [
    { label: 'C', id: 'clear', onclick: "clearScreen()" },
    { label: '←', id: 'backspace', onclick: "handleBackspace()"},
    { label: '.', id: 'decimal', onclick: "appendDecimal()", key: '.' },
    { label: '/', id: 'divide', onclick: "appendOperator('/')", key: '/' },
    { label: '7', id: '7', onclick: "appendNumber('7')", key: '7' },
    { label: '8', id: '8', onclick: "appendNumber('8')", key: '8' },
    { label: '9', id: '9', onclick: "appendNumber('9')", key: '9' },
    { label: 'x', id: 'multiply', onclick: "appendOperator('*')", key: '*' },
    { label: '4', id: '4', onclick: "appendNumber('4')", key: '4' },
    { label: '5', id: '5', onclick: "appendNumber('5')", key: '5' },
    { label: '6', id: '6', onclick: "appendNumber('6')", key: '6' },
    { label: '-', id: 'subtract', onclick: "appendOperator('-')", key: '-' },
    { label: '1', id: '1', onclick: "appendNumber('1')", key: '1' },
    { label: '2', id: '2', onclick: "appendNumber('2')", key: '2' },
    { label: '3', id: '3', onclick: "appendNumber('3')", key: '3' },
    { label: '+', id: 'add', onclick: "appendOperator('+')", key: '+' },
    { label: '00', id: '0', onclick: "appendNumber('00')", key: '0' },
    { label: '0', id: '0', onclick: "appendNumber('0')", key: '0' },
    { label: '=', id: 'equal', onclick: "calculate()", key: 'Enter' }
    
];


document.addEventListener('keydown', event => {
    const key = event.key;
    const validKeys = buttons.map(btn => btn.key);
    if (validKeys.includes(key)) {
        handleButtonClick(key);
    } else if (!isNaN(key)) {
        handleButtonClick(key);
    } else if (key === 'Backspace') {
        handleButtonClick('←');
    } else {
        alert('Only numbers, operators, and Enter key are allowed!');
    }
});

for (var i = 0; i < buttons.length; i++) {
    var button = document.createElement("button");
    button.textContent = buttons[i].label;
    button.setAttribute("id", buttons[i].id);
    button.setAttribute("onclick", buttons[i].onclick);

    var td = document.createElement("td");
    td.appendChild(button);

   
    if (i % 4 === 0) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
    }

    tr.appendChild(td);
}


div.appendChild(table);


function appendNumber(number) {
    document.getElementById('result').value += number;
}


function appendOperator(operator) {
    document.getElementById('result').value += operator;
}


function clearScreen() {
    document.getElementById('result').value = '';
}


function calculate() {
    var input = document.getElementById('result').value;
    var result = eval(input);
    document.getElementById('result').value = result;
}


function handleBackspace() {
    var currentValue = document.getElementById('result').value;
    document.getElementById('result').value = currentValue.slice(0, -1);
}


function appendDecimal() {
    var result = document.getElementById('result').value;
    if (result.indexOf('.') === -1) { 
        document.getElementById('result').value += '.';
    }
}


function handleButtonClick(value) {
    const result = document.getElementById('result');
    if (value === 'C') {
        result.value = '';
    } else if (value === '=') {
        try {
            result.value = eval(result.value);
        } catch (error) {
            result.value = 'Error';
        }
    } else if (value === '←') {
        handleBackspace();
    } else if (value === '.') {
        appendDecimal();
    } 
    else {
        result.value += value;
    }
}