var timer;

function createTable(){
    let size = document.querySelector("#sizeTable").valueAsNumber;
    let newTable = document.createElement("Table");
    let oldTable = document.querySelector("Table");
    let tableBody = document.createElement("Tbody");
    if(oldTable)
        oldTable.remove();
    
    newTable.appendChild(tableBody);
    document.querySelector("#tableGameOfLife").appendChild(newTable);
    
    for (let i = 0; i <size ; i++) {
        let tr = document.createElement('Tr');
        tableBody.appendChild(tr);
        for (let j = 0; j < size; j++) 
        {
            let td = document.createElement('Td');
            let random = Math.round(Math.random());
            td.textContent = random;
            td.setAttribute( "class", random ? "alive" : "dead" );
            td.setAttribute("onclick","toggleState(this, this.textContent)");
            tableBody.childNodes[i].appendChild(td);
        }
    }
}

function toggleState(td, currentValue){
    let className = td.className;
    let newValue = currentValue == 1 ? 0 : 1;         
    td.classList.remove(className);
    td.classList.add(newValue ? "alive" : "dead");
    td.textContent = newValue;
}        

function analyzeTable(){
    let tableBody = document.querySelector("tbody");
    let size = tableBody.childNodes.length;
    let table = [];

    console.dir(tableBody);
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            let limitDownI = (i - 1) >= 0 ? i - 1 : i;
            let limitDownJ = (j - 1) >= 0 ? j - 1 : j;
            let limitUpI = (i + 1) < size ? i + 1 : i;
            let limitUpJ = (j + 1) < size ? j + 1 : j; 
            let currentPositionValue = parseInt(tableBody.childNodes[i].childNodes[j].textContent);                    
            let sum = 0;
            for (let x = limitDownI; x <= limitUpI; x++) {                     
                for (let y = limitDownJ; y <= limitUpJ; y++) {
                    sum += parseInt(tableBody.childNodes[x].childNodes[y].textContent);                    
                }                        
            }
            row[j] = (sum -= currentPositionValue);                                      
        }
        table.push(row); 
    }
    return table;
}

function conditions(){
    let table = analyzeTable();
    let tableBody = document.querySelector("tbody");
    let size = tableBody.childNodes.length;

    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {  
            let td = tableBody.childNodes[i].childNodes[j];     
            if (table[i][j] < 2) 
                toggleState(td, 1);
            else if (table[i][j]  > 3) 
                toggleState(td, 1);                 
            else if (table[i][j] == 3) 
                toggleState(td, 0);                                        
        }
    }
}

function play(){
    timer = setInterval(() => conditions(), 500);
}

function stop(){
    clearInterval(timer);
}