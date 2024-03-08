document.addEventListener('DOMContentLoaded', function () {
   let currentInput = '';
   let previousInput = '';
   let operation = null;
   let memoryStored = 0;

   const display = document.querySelector('.display');

   // Update display function
   function updateDisplay(value) {
      display.textContent = value;
   }

   // Clear all inputs
   function clearAll() {
      currentInput = '';
      previousInput = '';
      operation = null;
      updateDisplay('0');
   }

   // Delete the last digit
   function deleteLast() {
      currentInput = currentInput.toString().slice(0, -1);
      updateDisplay(currentInput || '0');
   }

   // Parse float wrapper to handle dot leading zeros
   function parseInput(input) {
      return parseFloat(input);
   }

   // Calculate result
   function calculate() {
      let result;
      const prev = parseInput(previousInput);
      const current = parseInput(currentInput);
      if (isNaN(prev) || isNaN(current)) return;
      switch (operation) {
         case '+':
            result = prev + current;
            break;
         case '-':
            result = prev - current;
            break;
         case '&times;':
            result = prev * current;
            break;
         case '&div;':
            result = prev / current;
            break;
         case '√':
            result = Math.sqrt(current);
            break;
         case '%':
            result = (prev * current) / 100;
            break;
         default:
            return;
      }
      currentInput = result.toString();
      operation = null;
      previousInput = '';
   }

   // Button click handler
   document.querySelector('.calculator').addEventListener('click', function (e) {
      if (e.target.matches('button')) {
         const btn = e.target;
         if (btn.classList.contains('operator-btn')) {
            if (currentInput === '' && btn.textContent === '√') {
               operation = btn.textContent;
               calculate();
               updateDisplay(currentInput);
            } else if (currentInput !== '') {
               previousInput = currentInput;
               currentInput = '';
               operation = btn.textContent;
            }
         } else if (btn.textContent === '=') {
            calculate();
            updateDisplay(currentInput);
         } else if (btn.textContent === 'C') {
            clearAll();
         } else if (btn.textContent === 'CE') {
            clearAll(); // For now, it does the same as 'C'
         } else if (btn.textContent === '&larr;') {
            deleteLast();
         } else if (btn.textContent === '1/x') {
            if (currentInput !== '') {
               currentInput = (1 / parseInput(currentInput)).toString();
               updateDisplay(currentInput);
            }
         } else if (btn.textContent === '+/-') {
            if (currentInput !== '') {
               currentInput = (parseInput(currentInput) * -1).toString();
               updateDisplay(currentInput);
            }
         } else if (btn.textContent === 'MC') {
            memoryStored = 0;
         } else if (btn.textContent === 'MR') {
            currentInput = memoryStored.toString();
            updateDisplay(currentInput);
         } else if (btn.textContent === 'M+') {
            memoryStored += parseInput(currentInput);
         } else if (btn.textContent === 'M-') {
            memoryStored -= parseInput(currentInput);
         } else {
            const value = btn.textContent;
            if (currentInput === '0') {
               currentInput = value;
            } else {
               currentInput += value;
            }
            updateDisplay(currentInput);
         }
      }
   });
});
