// 03. setInterval обновляет экран; остаток считаем от времени окончания.
(() => {
  const block = document.getElementById('countdown');
  const input = block.querySelector('#timer-seconds');
  const display = block.querySelector('#timer-display');
  const progress = block.querySelector('#timer-progress');
  const toggle = block.querySelector('#timer-toggle');
  const reset = block.querySelector('#timer-reset');
  const error = block.querySelector('#timer-error');
  const status = block.querySelector('#timer-status');
  const labels = { idle: 'Старт', running: 'Пауза', paused: 'Продолжить', finished: 'Старт' };

  let state = 'idle';
  let duration = input.valueAsNumber * 1000;
  let remaining = duration;
  let deadline = 0;
  let intervalId = null;

  function renderTime() {
    const seconds = Math.ceil(remaining / 1000);
    const minutesText = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secondsText = String(seconds % 60).padStart(2, '0');
    display.textContent = minutesText + ':' + secondsText;
    progress.max = duration;
    progress.value = duration - remaining;
  }

  function setState(next, message) {
    state = next;
    toggle.textContent = labels[next];
    input.disabled = next === 'running' || next === 'paused';
    status.textContent = message;
  }

  function readDuration() {
    const value = input.valueAsNumber;
    const valid = Number.isInteger(value) && value >= 1 && value <= 3599;
    error.hidden = valid;
    error.textContent = valid ? '' : 'Введите целое число от 1 до 3599.';
    if (valid) input.removeAttribute('aria-invalid');
    else input.setAttribute('aria-invalid', 'true');
    return valid ? value * 1000 : null;
  }

  function stopInterval() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function tick() {
    if (state !== 'running') return;
    remaining = Math.max(0, deadline - performance.now());
    renderTime();
    if (remaining === 0) {
      stopInterval();
      setState('finished', 'Время вышло.');
    }
  }

  function start() {
    deadline = performance.now() + remaining;
    setState('running', 'Идёт отсчёт.');
    intervalId = setInterval(tick, 80);
    tick();
  }

  toggle.addEventListener('click', () => {
    if (state === 'running') {
      tick();
      if (state !== 'running') return;
      stopInterval();
      setState('paused', 'Таймер на паузе.');
      return;
    }

    if (state !== 'paused') {
      const value = readDuration();
      if (value === null) {
        input.focus();
        return;
      }
      duration = value;
      remaining = duration;
    }
    start();
  });

  reset.addEventListener('click', () => {
    stopInterval();
    input.value = String(duration / 1000);
    readDuration();
    remaining = duration;
    setState('idle', 'Таймер сброшен.');
    renderTime();
  });

  input.addEventListener('input', () => {
    const value = readDuration();
    if (value === null) return;
    duration = value;
    remaining = duration;
    setState('idle', 'Готов к запуску.');
    renderTime();
  });

  document.addEventListener('visibilitychange', tick);
  renderTime();
})();
