const navLinks = Array.from(document.querySelectorAll('[data-section-nav] a'));
const navSections = navLinks.map(link => document.getElementById(link.hash.slice(1)));

if (navSections.length) {
  let framePending = false;

  function updateNavigation() {
    const readingLine = Math.min(window.innerHeight * 0.3, 230);
    let activeIndex = 0;

    navSections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) activeIndex = index;
    });

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      activeIndex = navSections.length - 1;
    }

    navLinks.forEach((link, index) => {
      if (index === activeIndex) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    framePending = false;
  }

  function scheduleNavigationUpdate() {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateNavigation);
    }
  }

  window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
  window.addEventListener('resize', scheduleNavigationUpdate);
  updateNavigation();
}

const lightbox = document.querySelector('[data-lightbox]');

if (lightbox && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('[data-lightbox-caption]');

  document.querySelectorAll('[data-enlarge]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const thumbnail = link.querySelector('img');
      image.src = link.href;
      image.alt = thumbnail.alt;
      caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
      lightbox.showModal();
    });
  });

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => image.removeAttribute('src'));
}

const showcase = document.querySelector('[data-showcase]');

if (showcase) {
  const slides = Array.from(showcase.querySelectorAll('[data-showcase-slide]'));
  const controls = showcase.querySelector('[data-showcase-controls]');
  const toggle = showcase.querySelector('[data-showcase-toggle]');
  const playbackIcon = toggle.querySelector('.system-icon');
  const position = showcase.querySelector('[data-showcase-position]');
  const announcement = showcase.querySelector('[data-showcase-live]');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeSlide = 0;
  let autoplay = !motionPreference.matches;
  let hovered = false;
  let visible = !('IntersectionObserver' in window);
  let timer;

  function scheduleSlide() {
    clearTimeout(timer);
    if (autoplay && visible && !hovered && !document.hidden) {
      timer = setTimeout(() => showSlide(1), 7200);
    }
  }

  function setAutoplay(shouldPlay) {
    autoplay = shouldPlay;
    const label = autoplay ? '暫停輪播' : '播放輪播';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    playbackIcon.textContent = autoplay ? '‖' : '▸';
    scheduleSlide();
  }

  function showSlide(step, announce = false) {
    const previous = slides[activeSlide];
    previous.hidden = true;
    previous.removeAttribute('data-enter');
    activeSlide = (activeSlide + step + slides.length) % slides.length;
    const next = slides[activeSlide];
    next.hidden = false;
    next.setAttribute('data-enter', '');
    position.textContent = `${activeSlide + 1} / ${slides.length}`;
    if (announce) announcement.textContent = next.querySelector('h2').textContent;
    scheduleSlide();
  }

  controls.hidden = false;
  setAutoplay(autoplay);

  controls.querySelectorAll('[data-showcase-step]').forEach(button => {
    button.addEventListener('click', () => {
      setAutoplay(false);
      showSlide(Number(button.dataset.showcaseStep), true);
    });
  });
  toggle.addEventListener('click', () => setAutoplay(!autoplay));

  showcase.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = true;
    scheduleSlide();
  });
  showcase.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = false;
    scheduleSlide();
  });
  showcase.addEventListener('focusin', event => {
    if (event.target.matches(':focus-visible')) setAutoplay(false);
  });
  document.addEventListener('visibilitychange', scheduleSlide);
  motionPreference.addEventListener('change', event => {
    if (event.matches) setAutoplay(false);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      scheduleSlide();
    }, { threshold: .33 }).observe(showcase);
  }
}
