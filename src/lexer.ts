import './style.css';
import "./edit";

export enum TokenType {
    KEYWORD,
    OPERATOR,
    IDENTIFIER,
    NUMBER,
    DELIMITER
}

export interface Token {
    value: string | number;
    type: TokenType;
    line: number;
    column: number;
}

export function tokenize(sourceCode: string): Token[] {
    const tokens: Token[] = [];
    const src = sourceCode.split("");

    const keywords = ["program", "var", "begin", "end", "integer", "show"];
    const delimiters = [";", ":", ",", "(", ")", "="];
    const operators = ["+", "-", "*", "/"];
    const identifier = /^[abcde][abcde0-9]*$/i; 
    const allLetters = /^[a-z]$/; 
    const digits = /^[0-9]$/;
    const whitespace = /^\s$/;

    let line = 1;
    let column = 0;

    while (src.length > 0) {
        const char = src.shift()!;
        column++;

        if (char === '\n') {
            line++;
            column = 0;
            continue;
        }

        if (whitespace.test(char)) {
            continue;
        }

        if (allLetters.test(char)) {
            let id = char;
            let startColumn = column;
            while (src.length > 0 && (allLetters.test(src[0]) || digits.test(src[0]))) {
                id += src.shift();
                column++;
            }
            if (keywords.includes(id)) {
                tokens.push({ value: id, type: TokenType.KEYWORD, line, column: startColumn });
            } else {
                if (identifier.test(id)) {
                    tokens.push({ value: id, type: TokenType.IDENTIFIER, line, column: startColumn });
                } else {
                    throw new Error(`Invalid identifier: '${id}' at line ${line}, column ${startColumn}`);
                }
            }
            continue;
        }

        if (digits.test(char)) {
            let num = char;
            let startColumn = column;
            while (src.length > 0 && digits.test(src[0])) {
                num += src.shift();
                column++;
            }
            if (src.length > 0 && allLetters.test(src[0])) {
                throw new Error(`Unexpected character after number: '${src[0]}' at line ${line}, column ${column + 1}`);
            }
            tokens.push({ value: num, type: TokenType.NUMBER, line, column: startColumn });
            continue;
        }

        if (delimiters.includes(char)) {
            tokens.push({ value: char, type: TokenType.DELIMITER, line, column });
            continue;
        }

        if (operators.includes(char)) {
            tokens.push({ value: char, type: TokenType.OPERATOR, line, column });
            continue;
        }

        throw new Error(`Unexpected character: '${char}' at line ${line}, column ${column}`);
    }

    return tokens;
}

function formatTokens(tokens: Token[]): string {
    let table = `<table border="1" style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <th>Value</th>
                        <th>Type</th>
                        <th>Line</th>
                        <th>Column</th>
                    </tr>`;
    for (let token of tokens) {
        let typeName = TokenType[token.type];
        table += `<tr>
                    <td>${token.value}</td>
                    <td>${typeName}</td>
                    <td>${token.line}</td>
                    <td>${token.column}</td>
                  </tr>`;
    }
    table += `</table>`;
    return table;
}

export function runLexer(): Token[] {
    const inputElement = document.getElementById("input-code") as HTMLTextAreaElement;
    const outputElement = document.getElementById("output");
    const errorElement = document.getElementById("error");
    
    if (!inputElement || !outputElement || !errorElement) {
        console.error("One or more elements are not found");
        return [];
    }

    const sampleInput = inputElement.value;

    try {
        const tokens = tokenize(sampleInput);
        outputElement.innerHTML = formatTokens(tokens);
        errorElement.textContent = "";
        errorElement.style.backgroundColor = "#444"; 
        return tokens;
    }
    catch (error) {
        outputElement.innerHTML = "error";
        errorElement.textContent = (error instanceof Error) ? error.message : String(error);
        errorElement.style.backgroundColor = "red";
        return [];
    }
}
