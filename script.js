(() => {
  const body = document.body;
  const button = document.querySelector('#themeToggle');
  const themeMeta = document.querySelector('#themeColorMeta');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const isDesktop = window.matchMedia('(min-width: 821px)').matches;

  const updateMeta = (isDark) => {
    if (themeMeta) themeMeta.setAttribute('content', isDark ? '#0e1315' : '#f7f7f5');
  };

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    body.classList.toggle('dark', dark);
    button?.setAttribute('aria-pressed', String(dark));
    button?.querySelector('.theme-icon')?.replaceChildren(document.createTextNode(dark ? '☀' : '◐'));
    updateMeta(dark);
  };

  const savedTheme = localStorage.getItem('cv-theme');
  applyTheme(savedTheme || (prefersDark.matches ? 'dark' : 'light'));

  button?.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('cv-theme', nextTheme);
    applyTheme(nextTheme);
  });

  prefersDark.addEventListener?.('change', (event) => {
    if (!localStorage.getItem('cv-theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !isDesktop) return;

  const tiltElements = document.querySelectorAll('.tilt-card');
  tiltElements.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
