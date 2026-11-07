// 14. Сдвигаем случайное целое число из диапазона 0…(max - min) к min.
(() => {
  const block = document.getElementById('random');
  const form = block.querySelector('#random-form');
  const minInput = block.querySelector('#random-min');
  const maxInput = block.querySelector('#random-max');
  const error = block.querySelector('#random-error');
  const output = block.querySelector('#random-result');
  const historyList = block.querySelector('#random-history');
  const empty = block.querySelector('#random-history-empty');
  const history = [];
  const limit = 1_000_000;

  function isBound(value) {
    return Number.isInteger(value) && Math.abs(value) <= limit;
  }

  function clearError() {
    error.hidden = true;
    error.textContent = '';
    minInput.removeAttribute('aria-invalid');
    maxInput.removeAttribute('aria-invalid');
  }

  function showError(message, input) {
    error.hidden = false;
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  }

  form.noValidate = true;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();
    const min = minInput.valueAsNumber;
    const max = maxInput.valueAsNumber;

    if (!isBound(min) || !isBound(max)) {
      showError('Введите целые числа от −1 000 000 до 1 000 000.', !isBound(min) ? minInput : maxInput);
      return;
    }
    if (min > max) {
      showError('Максимум должен быть не меньше минимума.', maxInput);
      return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    output.textContent = result;
    history.unshift(result);
    if (history.length > 5) history.pop();

    historyList.replaceChildren();
    history.forEach((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      historyList.append(item);
    });
    empty.hidden = true;
  });

  form.addEventListener('input', clearError);
})();
