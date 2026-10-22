let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let currentValue = "";

function calculate() {
    try {
        let expression = currentValue
            .replace(/[xX×✕✖]/g, "*")
            .replace(/[÷/]/g, "/")
            .replace(/[−–]/g, "-");

        if (!expression || !/^[0-9+\-*/.()\s]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        let result = eval(expression);

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        currentValue = String(result);
        display.value = currentValue;
    } catch {
        display.value = "Error";
        currentValue = "";
    }
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        let value = button.innerText.trim();

        if (value === "AC") {
            currentValue = "";
            display.value = "";
        } else if (value === "DEL") {
            currentValue = currentValue.slice(0, -1);
            display.value = currentValue;
        } else if (value === "=") {
            calculate();
        } else if (/^[0-9.+\-*/xX×✕✖÷−()]$/.test(value)) {
            currentValue += value;
            display.value = currentValue;
        }
    });
});

// Keyboard support
document.addEventListener("keydown", function(event) {
    if (/^[0-9.+\-*/()]$/.test(event.key)) {
        currentValue += event.key;
        display.value = currentValue;
    } else if (event.key === "x" || event.key === "X" || event.key === "×") {
        currentValue += "*";
        display.value = currentValue;
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Backspace") {
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
    } else if (event.key === "Escape") {
        currentValue = "";
        display.value = "";
    }
});
