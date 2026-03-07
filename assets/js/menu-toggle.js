(function initDropdowns() {
  var nav = document.querySelector('.main-nav');

  // Хедер ещё не загружен include.js – подождём
  if (!nav) {
    setTimeout(initDropdowns, 300);
    return;
  }

  // Чтобы не инициализировать несколько раз
  if (nav.dataset.dropdownInit === '1') return;
  nav.dataset.dropdownInit = '1';

  // Обработка кликов по выпадающим меню на мобильных устройствах
  function attachDropdownToggles(container) {
    var triggers = container.querySelectorAll('.dropdown-trigger');
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        // На мобильных устройствах (<= 768px) перехватываем клик для открытия меню
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          var dropdown = trigger.parentElement;
          var isActive = dropdown.classList.toggle('active');
          trigger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
          
          // Закрываем другие открытые меню
          triggers.forEach(function(otherTrigger) {
            if (otherTrigger !== trigger) {
              otherTrigger.parentElement.classList.remove('active');
              otherTrigger.setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
    });
  }

  attachDropdownToggles(nav);

  // Закрытие меню при клике вне его области
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!nav.contains(e.target)) {
        var triggers = nav.querySelectorAll('.dropdown-trigger');
        triggers.forEach(function(trigger) {
          trigger.parentElement.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        });
      }
    }
  });
})();