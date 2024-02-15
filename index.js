var codeEditor = document.getElementById("input-code");
var lineNumbers = document.getElementById("line-numbers");

codeEditor.addEventListener("input", updateLineNumbers);

function updateLineNumbers() {
    var lines = codeEditor.value.split("\n");
    var lineNumbersHTML = "";
    for (var i = 1; i <= lines.length; i++) {
        lineNumbersHTML += i + "<br>";
    }
    lineNumbers.innerHTML = lineNumbersHTML;
}

updateLineNumbers();