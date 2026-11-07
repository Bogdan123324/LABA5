// 01. Храним число в переменной, а при клике обновляем DOM.
(() => {
  const block = document.getElementById('counter');
  const output = block.querySelector('#click-count');
  const add = block.querySelector('#counter-add');
  const reset = block.querySelector('#counter-reset');
  let count = 0;

  function render() {
    output.textContent = count;
    reset.disabled = count === 0;
  }

  add.addEventListener('click', () => {
    count += 1;
    render();
  });

  reset.addEventListener('click', () => {
    count = 0;
    render();
    add.focus();
  });
})();
