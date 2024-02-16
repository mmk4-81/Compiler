import { Token, runLexer } from './lexer';
import { NonTerminal, Terminal, grammer } from './grammer';

const button = document.getElementById('submit');
button?.addEventListener('click', () => {
    const tokens = runLexer();
    parse(tokens);
});

export function parse(inputTokens: Token[]): void {
    const outputElement = document.getElementById('output-parser');
    const errorElement = document.getElementById('error-parser');

    if (!outputElement || !errorElement) {
        console.error("One or more elements are not found");
        return;
    }

    const parser = new Parser(inputTokens, outputElement, errorElement);
    parser.parse();
}

class Parser {
    private stack: (Terminal | NonTerminal)[];
    private tokens: Token[];
    private currentTokenIndex: number;
    private outputElement: HTMLElement;
    private errorElement: HTMLElement;

    private symbolTable: { [key: string]: number };
    private operations: { type: string, value?: number, variable?: string }[];

    constructor(tokens: Token[], outputElement: HTMLElement, errorElement: HTMLElement) {
        this.tokens = tokens;
        this.stack = [NonTerminal.PROG];
        this.currentTokenIndex = 0;
        this.outputElement = outputElement;
        this.errorElement = errorElement;
        this.symbolTable = {};
        this.operations = [];
    }

    private getCurrentToken(): Token {
        return this.tokens[this.currentTokenIndex];
    }

    private match(tokenType: Terminal): boolean {
        const token = this.getCurrentToken();
        if (token && tokenType === token.value) {
            this.currentTokenIndex++;
            return true;
        }
        return false;
    }

    private isNonTerminal(symbol: Terminal | NonTerminal): boolean {
        return Object.values(NonTerminal).includes(symbol as NonTerminal);
    }

    private isTerminal(symbol: Terminal | NonTerminal): boolean {
        return Object.values(Terminal).includes(symbol as Terminal);
    }

    private predict(nonTerminal: NonTerminal): (Terminal | NonTerminal)[] | undefined {

        const token = this.getCurrentToken();
        const productionRules = grammer[nonTerminal];
        console.log(productionRules);
        
        for (const rule of productionRules) {
            // if (rule.length === 0) {
            //     return rule;
            // }

            const firstSymbol = rule[0];
            console.log(firstSymbol);
            
            if (this.isTerminal(firstSymbol) && firstSymbol === token.value) {
                return rule;
            }

            if (this.isNonTerminal(firstSymbol)) {
                if (this.canDerive(firstSymbol as NonTerminal, token)) {
                    return rule;
                }
            }
        }

        for (const rule of productionRules) {
            if (rule.length === 0) {
                return rule;
            }
        }

        return undefined;
    }

    private canDerive(nonTerminal: NonTerminal, token: Token): boolean {
        const productionRules = grammer[nonTerminal];

        for (const rule of productionRules) {
            if (rule.length === 0) {
                return true;
            }

            const firstSymbol = rule[0];

            if (this.isTerminal(firstSymbol) && firstSymbol === token.value) {
                return true;
            }

            if (this.isNonTerminal(firstSymbol)) {
                if (this.canDerive(firstSymbol as NonTerminal, token)) {
                    return true;
                }
            }
        }

        return false;
    }

    public parse(): void {
        try {
            while (this.stack.length > 0) {
                const top = this.stack.pop();

                if (!top) {
                    continue;
                }

                const token = this.getCurrentToken();

                if (this.isTerminal(top)) {
                    if (this.match(top as Terminal)) {
                        console.log(`***Matched terminal: ${top}`);
                    } else {
                        throw new Error(`Syntax error: expected ${top} but found ${token.value} at line ${token.line}, column ${token.column}`);
                    }
                } else if (this.isNonTerminal(top)) {
                    const matchedRule = this.predict(top as NonTerminal);

                    if (matchedRule) {
                        console.log(`Expanding non-terminal: ${top} using rule: ${JSON.stringify(matchedRule)}`);
                        for (let i = matchedRule.length - 1; i >= 0; i--) {
                            this.stack.push(matchedRule[i]);
                        }

                        if (top === NonTerminal.STAT && matchedRule[0] === NonTerminal.ASSIGN) {
                            const identifierToken = this.tokens[this.currentTokenIndex - 3];
                            const numberToken = this.tokens[this.currentTokenIndex - 1];
                            if (typeof identifierToken.value === 'string' && typeof numberToken.value === 'string') {
                                this.operations.push({
                                    type: 'assign',
                                    variable: identifierToken.value,
                                    value: Number(numberToken.value)
                                });
                            }
                        } else if (top === NonTerminal.STAT && matchedRule[0] === NonTerminal.WRITE) {
                            const identifierToken = this.tokens[this.currentTokenIndex - 1];
                            if (typeof identifierToken.value === 'string') {
                                this.operations.push({
                                    type: 'show',
                                    variable: identifierToken.value
                                });
                            }
                        }
                    } else {
                        throw new Error(`Syntax error: no matching rule for ${top} with lookahead ${token.value} at line ${token.line}, column ${token.column}`);
                    }
                }
            }

            if (this.currentTokenIndex < this.tokens.length) {
                throw new Error(`Syntax error: unexpected token ${this.getCurrentToken().value} at line ${this.getCurrentToken().line}, column ${this.getCurrentToken().column}`);
            }

            this.evaluate();
            this.errorElement.textContent = "";
            this.errorElement.style.backgroundColor = "#444";
        } catch (error) {
            this.outputElement.innerHTML = "error";
            this.errorElement.textContent = (error instanceof Error) ? error.message : String(error);
            this.errorElement.style.backgroundColor = "red";
        }
    }

    private evaluate(): void {
        for (const op of this.operations) {
            if (op.type === 'assign') {
                this.symbolTable[op.variable!] = op.value!;
            } else if (op.type === 'show') {
                const output = this.symbolTable[op.variable!];
                this.outputElement.innerHTML = `Output: ${output}`;
            }
        }
    }
}
