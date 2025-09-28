# 🖥 Code Editor & Simple Compiler  

This project is a **code editor** with a **Lexer** (lexical analyzer) and **Parser** (syntax analyzer) for processing and executing a simple Pascal-like language.

---

## 📌 Features  
- **Lexer**: Converts code into a list of tokens  
- **Parser**: Checks code syntax and displays errors  
- Supports **variables** and basic **mathematical operations**  
- Executes simple commands like `show()` to display variable values  
- Displays **lexical and syntax errors** in the output  
- The language syntax is **project-specific** and not a general-purpose language  

---

## 🛠 Project Structure  
- `index.html` → User interface and code editor  
- `style.css` → Editor styling  
- `lexer.ts` → Converts code into processable tokens  
- `parser.ts` → Processes tokens and checks grammar rules  
- `grammar.ts` → Defines the language grammar  

---

## 🏁 How to Use  
1️⃣ Enter your code in the editor. Example:  
```pascal
program d;
var b: integer;
begin
  b = 1 + 2;
  show(b);
end


⚠️ Note: This language is not general-purpose; its syntax is designed specifically for this project.

2️⃣ Press the Run button.
3️⃣ The Lexer converts the code into tokens and displays them.
4️⃣ The Parser checks whether the code is syntactically correct.
5️⃣ Any errors found will be displayed in the output.
