(function () {
  var overlay, imgEl, captionEl, items = [], currentIndex = -1;

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous image">&larr;</button>' +
      '<figure class="lightbox-figure">' +
        '<img alt="">' +
        '<figcaption class="lightbox-caption"></figcaption>' +
      '</figure>' +
      '<button type="button" class="lightbox-next" aria-label="Next image">&rarr;</button>';

    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('img');
    captionEl = overlay.querySelector('.lightbox-caption');

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', function () { show(currentIndex - 1); });
    overlay.querySelector('.lightbox-next').addEventListener('click', function () { show(currentIndex + 1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    });
  }

  function show(index) {
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    var el = items[currentIndex];
    imgEl.src = el.getAttribute('href');
    imgEl.alt = el.querySelector('img') ? el.querySelector('img').alt : '';
    captionEl.textContent = el.getAttribute('data-caption') || '';
    overlay.hidden = false;
  }

  function close() {
    overlay.hidden = true;
    imgEl.src = '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var galleries = document.querySelectorAll('.gallery');
    if (!galleries.length) return;

    buildOverlay();

    galleries.forEach(function (gallery) {
      var galleryItems = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
      gallery.addEventListener('click', function (e) {
        var link = e.target.closest('.gallery-item');
        if (!link) return;
        e.preventDefault();
        items = galleryItems;
        show(items.indexOf(link));
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var avatar = document.querySelector('.profile-avatar');
    if (!avatar) return;

    var rotation = 0;
    var stopTimer;

    function stopSpin() {
      avatar.classList.remove('is-spinning');
      rotation = rotation % 360;
      avatar.style.transform = 'rotate(' + rotation + 'deg)';
    }

    avatar.addEventListener('click', function () {
      var from = rotation;
      // A few full spins plus a random extra amount, so it lands somewhere new each time.
      var to = rotation + 1080 + Math.floor(Math.random() * 360);

      avatar.classList.remove('is-spinning');
      void avatar.offsetWidth; // restart the animation if clicked again mid-spin
      avatar.style.setProperty('--avatar-spin-from', from + 'deg');
      avatar.style.setProperty('--avatar-spin-to', to + 'deg');
      avatar.classList.add('is-spinning');

      rotation = to;

      // Fallback in case animationend doesn't fire (e.g. reduced-motion skips the animation).
      clearTimeout(stopTimer);
      stopTimer = setTimeout(stopSpin, 2500);
    });

    avatar.addEventListener('animationend', function (e) {
      if (e.animationName === 'avatar-click-spin') stopSpin();
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('project-grid');
    var buttons = document.querySelectorAll('.view-toggle-btn');
    if (!grid || !buttons.length) return;

    var STORAGE_KEY = 'warren-view-mode';

    function setView(view) {
      grid.classList.toggle('view-list', view === 'list');
      buttons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-view') === view ? 'true' : 'false');
      });
      try { localStorage.setItem(STORAGE_KEY, view); } catch (e) {}
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setView(btn.getAttribute('data-view'));
      });
    });

    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'list') setView('list');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('project-grid');
    var filterButtons = document.querySelectorAll('.category-filter-btn');
    if (!grid || !filterButtons.length) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-category');

        filterButtons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });

        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-categories') || '').split('|');
          var show = category === 'all' || cats.indexOf(category) !== -1;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('project-grid');
    var sortSelect = document.getElementById('project-sort');
    if (!grid || !sortSelect) return;

    sortSelect.addEventListener('change', function () {
      var mode = sortSelect.value;
      var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));

      cards.sort(function (a, b) {
        if (mode === 'alpha') {
          return (a.getAttribute('data-title') || '').localeCompare(b.getAttribute('data-title') || '');
        }
        if (mode === 'active') {
          return (parseInt(a.getAttribute('data-status-rank'), 10) || 0) - (parseInt(b.getAttribute('data-status-rank'), 10) || 0);
        }
        // Project Date — newest first; undated projects keep their folder order.
        var byDate = (parseInt(b.getAttribute('data-date'), 10) || 0) - (parseInt(a.getAttribute('data-date'), 10) || 0);
        return byDate || (parseInt(a.getAttribute('data-order'), 10) || 0) - (parseInt(b.getAttribute('data-order'), 10) || 0);
      });

      cards.forEach(function (card) { grid.appendChild(card); });
    });
  });
})();
