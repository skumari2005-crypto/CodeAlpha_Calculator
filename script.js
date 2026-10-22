let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let currentValue = "";

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.innerText;

        // Clear display
        if (value === "AC") {
            currentValue = "";
            display.value = "";
        }

        // Delete last character
        else if (value === "DEL") {
            currentValue = currentValue.slice(0, -1);
            display.value = currentValue;
        }

        // Calculate result
        else if (value === "=") {
            try {
                let expression = currentValue
                    .replace(/x/g, "*")
                    .replace(/÷/g, "/");

                currentValue = String(eval(expression));
                display.value = currentValue;
            }
            catch {
                display.value = "Error";
                currentValue = "";
            }
        }

        // Add value to display
        else {
            currentValue += value;
            display.value = currentValue;
        }

    });

});
// Keyboard support

document.addEventListener("keydown", function(event) {

    if (event.key >= "0" && event.key <= "9") {
        currentValue += event.key;
        display.value = currentValue;
    }

    else if (event.key === "+") {
        currentValue += "+";
        display.value = currentValue;
    }

    else if (event.key === "-") {
        currentValue += "-";
        display.value = currentValue;
    }

    else if (event.key === "*") {
        currentValue += "*";
        display.value = currentValue;
    }

    else if (event.key === "/") {
        currentValue += "/";
        display.value = currentValue;
    }

    else if (event.key === "Enter") {
        try {
            currentValue = String(eval(currentValue));
            display.value = currentValue;
        }
        catch {
            display.value = "Error";
            currentValue = "";
        }
    }

    else if (event.key === "Backspace") {
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
    }

    else if (event.key === "Escape") {
        currentValue = "";
        display.value = "";
    }

});