// 20. JavaScript включает класс, CSS плавно меняет положение фигуры.
(() => {
  const block = document.getElementById('hover');
  const stage = block.querySelector('#hover-stage');
  const toggle = block.querySelector('#hover-toggle');
  const status = block.querySelector('#hover-status');
  let hovered = false;
  let pinned = false;

  function render() {
    stage.classList.toggle('is-active', hovered || pinned);
    toggle.setAttribute('aria-pressed', String(pinned));
    toggle.textContent = pinned ? 'Выключить эффект' : 'Включить эффект';
    status.textContent = pinned ? 'Эффект закреплён кнопкой.'
      : hovered ? 'Указатель на площадке.' : 'Ожидает наведения.';
  }

  stage.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    hovered = true;
    render();
  });
  stage.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'touch') return;
    hovered = false;
    render();
  });
  stage.addEventListener('pointercancel', () => {
    hovered = false;
    render();
  });
  toggle.addEventListener('click', () => {
    pinned = !pinned;
    render();
  });
})();
