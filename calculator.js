document.addEventListener('DOMContentLoaded', function () {
   let currentInput = '';
   let previousInput = '';
   let operation = null;
   let memoryStored = 0;

   const display = document.querySelector('.display');

   function updateDisplay(value) {
      display.textContent = value;
   }

   function clearAll() {
      currentInput = '';
      previousInput = '';
      operation = null;
      updateDisplay('0');
   }

   function deleteLast() {
      currentInput = currentInput.toString().slice(0, -1);
      updateDisplay(currentInput || '0');
   }

   function parseInput(input) {
      return parseFloat(input);
   }

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
         case '*':
            result = prev * current;
            break;
         case '/':
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
      updateDisplay(currentInput);
   }

   document.querySelector('.calculator').addEventListener('click', function (e) {
      if (e.target.matches('button')) {
         const btn = e.target;
         const value = btn.textContent;
         if (btn.classList.contains('operator-btn')) {
            if (value === '√' && currentInput !== '') {
               operation = value;
               calculate();
            } else if (value !== '=') {
               if (currentInput !== '') {
                  if (previousInput !== '') {
                     calculate();
                  } else {
                     previousInput = currentInput;
                     currentInput = '';
                  }
                  operation = value === '×' ? '*' : value === '÷' ? '/' : value;
               }
            } else {
               calculate();
            }
         } else if (value === 'C' || value === 'CE') {
            clearAll();
         } else if (value === '←') {
            deleteLast();
         } else if (value === '1/x') {
            if (currentInput !== '') {
               currentInput = (1 / parseInput(currentInput)).toString();
               updateDisplay(currentInput);
            }
         } else if (value === '+/-') {
            if (currentInput !== '') {
               currentInput = (parseInput(currentInput) * -1).toString();
               updateDisplay(currentInput);
            }
         } else if (value === 'MC') {
            memoryStored = 0;
         } else if (value === 'MR') {
            currentInput = memoryStored.toString();
            updateDisplay(currentInput);
         } else if (value === 'M+') {
            memoryStored += parseInput(currentInput);
         } else if (value === 'M-') {
            memoryStored -= parseInput(currentInput);
         } else {
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
