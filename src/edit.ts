const codeEditor = document.getElementById("input-code") as HTMLTextAreaElement;
const lineNumbers = document.getElementById("line-numbers") as HTMLDivElement;

codeEditor.addEventListener("input", updateLineNumbers);

function updateLineNumbers(): void {
    const lines = codeEditor.value.split("\n");
    let lineNumbersHTML = "";
    for (let i = 1; i <= lines.length; i++) {
        lineNumbersHTML += i + "<br>";
    }
    lineNumbers.innerHTML = lineNumbersHTML;
}

updateLineNumbers();
