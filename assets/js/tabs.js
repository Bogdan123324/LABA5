// 08. У выбранной вкладки видна её панель и обновлён aria-selected.
(() => {
  const block = document.getElementById('tabs');
  const tabList = block.querySelector('[role="tablist"]');
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  function select(activeTab, focus = false) {
    tabs.forEach((tab) => {
      const active = tab === activeTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = block.querySelector('#' + tab.getAttribute('aria-controls'));
      panel.hidden = !active;
    });
    if (focus) activeTab.focus();
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => select(tab)));

  tabList.addEventListener('keydown', (event) => {
    const index = tabs.indexOf(event.target);
    if (index === -1) return;
    let next;

    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % tabs.length; break;
      case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      default: return;
    }

    event.preventDefault();
    select(tabs[next], true);
  });
})();
