const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let resetNext = false;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        if (btn.id === 'clear') {
            currentInput = '';
            display.value = '';
        } else if (btn.id === 'equals') {
            try {
                // Evaluate the expression
                currentInput = eval(currentInput).toString();
                display.value = currentInput;
                resetNext = true;
            } catch {
                display.value = 'Error';
                currentInput = '';
                resetNext = true;
            }
        } else {
            if (resetNext) {
                currentInput = '';
                resetNext = false;
            }
            currentInput += value;
            display.value = currentInput;
        }
    });
});
