// 09. Проверяем поля регулярными выражениями, выводим свои сообщения.
(() => {
  const form = document.getElementById('validation-form');
  const fields = Array.from(form.querySelectorAll('[data-field]'));
  const status = form.querySelector('#validation-status');
  let checked = false;

  const rules = {
    name: {
      check: (input) => input.value.length >= 2 && input.value.length <= 50 &&
        /^[А-Яа-яЁёA-Za-z]+(?:[ -][А-Яа-яЁёA-Za-z]+)*$/.test(input.value),
      message: 'Введите имя из 2–50 символов. Используйте буквы; пробелы и дефисы допустимы между словами.'
    },
    email: {
      check: (input) => input.value.length <= 120 && !input.validity.typeMismatch &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value),
      message: 'Введите адрес вида anna@example.com.'
    },
    group: {
      check: (input) => /^[А-ЯЁA-Z]{2,6}-[0-9]{1,2}$/.test(input.value),
      message: 'Введите 2–6 заглавных букв, дефис и 1–2 цифры. Например, ИВТ-5.'
    }
  };

  function checkField(input) {
    const rule = rules[input.dataset.field];
    const error = document.getElementById(input.getAttribute('aria-describedby'));
    const valid = rule.check(input);
    error.textContent = valid ? '' : rule.message;
    error.hidden = valid;
    if (valid) input.removeAttribute('aria-invalid');
    else input.setAttribute('aria-invalid', 'true');
    return valid;
  }

  // Нативную проверку отключаем только после загрузки нашего JS.
  form.noValidate = true;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    checked = true;
    const invalid = fields.filter((input) => !checkField(input));
    const valid = invalid.length === 0;
    status.classList.toggle('is-success', valid);
    status.textContent = valid
      ? 'Проверка пройдена. Данные никуда не отправлены.'
      : 'Исправьте отмеченные поля.';
    if (!valid) invalid[0].focus();
  });

  form.addEventListener('input', (event) => {
    if (!fields.includes(event.target)) return;
    if (checked) checkField(event.target);
    status.classList.remove('is-success');
    status.textContent = 'Нажмите «Проверить», чтобы проверить все поля.';
  });
})();
