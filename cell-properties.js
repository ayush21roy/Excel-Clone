// Storage

let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000",
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

// selectors for cell-properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");

let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Application of 2-way binding
// Attach property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address); // destructing

    // Modification
    cellProp.bold = !cellProp.bold; // Data change
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal'; // UI change(1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
});

function activeCell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address); //way is called arr-destructuring
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
    // address-> "A1"
    let rid = Number(address.slice(1)-1); // "1" -> 0
    let cid = Number(address.charCodeAt(0))-65; //"A" -> 65-65 -> 0
    return [rid, cid];
}