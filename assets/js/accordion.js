// 05. Один открытый раздел; существующие DOM-строки можно переставить.
(() => {
  const block = document.getElementById('accordion');
  const list = block.querySelector('#accordion-list');
  const status = block.querySelector('#accordion-status');
  const collator = new Intl.Collator('ru');

  function setExpanded(button, open) {
    const panel = block.querySelector('#' + button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }

  function updateMoveButtons() {
    const items = Array.from(list.children);
    items.forEach((item, index) => {
      item.querySelector('[data-step="-1"]').disabled = index === 0;
      item.querySelector('[data-step="1"]').disabled = index === items.length - 1;
    });
  }

  function sortItems(direction) {
    const items = Array.from(list.children);
    items.sort((a, b) => direction * collator.compare(a.dataset.title, b.dataset.title));
    list.append(...items);
    updateMoveButtons();
    status.textContent = direction === 1 ? 'Порядок: от А до Я.' : 'Порядок: от Я до А.';
  }

  block.querySelector('#sort-asc').addEventListener('click', () => sortItems(1));
  block.querySelector('#sort-desc').addEventListener('click', () => sortItems(-1));

  // Клики по заголовкам и стрелкам обрабатываем на общем списке.
  list.addEventListener('click', (event) => {
    const title = event.target.closest('.accordion-toggle');
    if (title) {
      const shouldOpen = title.getAttribute('aria-expanded') === 'false';
      list.querySelectorAll('.accordion-toggle').forEach((button) => {
        setExpanded(button, button === title && shouldOpen);
      });
      return;
    }

    const moveButton = event.target.closest('[data-step]');
    if (!moveButton) return;
    const item = moveButton.closest('.accordion-item');
    const up = moveButton.dataset.step === '-1';
    const neighbor = up ? item.previousElementSibling : item.nextElementSibling;
    if (!neighbor) return;

    if (up) neighbor.before(item);
    else neighbor.after(item);

    updateMoveButtons();
    const position = Array.from(list.children).indexOf(item) + 1;
    status.textContent = item.dataset.title + ': позиция ' + position + '.';
    (moveButton.disabled ? item.querySelector('.accordion-toggle') : moveButton).focus({ preventScroll: true });
  });
})();
