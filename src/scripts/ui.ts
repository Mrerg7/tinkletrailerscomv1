const THEME_KEY = 'tt-theme';
const EXIT_KEY = 'tt-exit-shown';

function isLight() {
  return document.documentElement.classList.contains('light');
}

function setTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('light', theme === 'light');
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0c111c' : '#f6f3ed');
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    const toLight = theme === 'dark';
    btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    btn.setAttribute('aria-label', toLight ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

function initTheme() {
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => setTheme(isLight() ? 'dark' : 'light'));
  });
}

function initMenu() {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-menu-panel]');
  if (!btn || !panel) return;
  const close = () => {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', () => {
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

function initFilters() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-audience]');
  if (!buttons.length || !cards.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      buttons.forEach((item) => {
        const on = item === btn;
        item.classList.toggle('is-on', on);
        item.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      cards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.audience !== filter;
      });
    });
  });
}

function track(name: string) {
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: 'domain_cta',
    cta_name: name,
    domain: 'tinkletrailers.com',
    price: 95000,
    currency: 'USD',
  });
}

function initTracking() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const el = target.closest<HTMLElement>('[data-cta]');
    if (!el) return;
    track(el.dataset.cta || 'unknown');
  });
}

function mailtoFrom(fields: {
  intent: string;
  name: string;
  email: string;
  company: string;
  offer: string;
  use: string;
  note: string;
}) {
  const subject =
    fields.intent === 'buy'
      ? 'Buy Now — TinkleTrailers.com at $95,000'
      : fields.intent === 'question'
        ? 'TinkleTrailers.com — Contact the Seller'
        : 'Offer — TinkleTrailers.com';
  const lines = [
    'Hello,',
    '',
    `I am writing about acquiring TinkleTrailers.com.`,
    `Intent: ${fields.intent}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Company: ${fields.company}` : '',
    fields.offer ? `Offer (USD): ${fields.offer}` : '',
    fields.use ? `Intended use: ${fields.use}` : '',
    fields.note ? `Note: ${fields.note}` : '',
    '',
    'Thank you.',
  ].filter(Boolean);
  return `mailto:sales@desertrich.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

function initForms() {
  document.querySelectorAll<HTMLFormElement>('[data-inquiry-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const error = form.querySelector<HTMLElement>('[data-form-error]');
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (error) {
          error.hidden = false;
          error.textContent = 'Enter your name and a valid email so the seller can reply.';
        }
        return;
      }
      if (error) error.hidden = true;
      const intent = String(data.get('intent') || 'offer');
      track(form.dataset.inquiryForm || intent);
      window.location.href = mailtoFrom({
        intent,
        name,
        email,
        company: String(data.get('company') || '').trim(),
        offer: String(data.get('offer') || '').trim(),
        use: String(data.get('use') || '').trim(),
        note: String(data.get('note') || '').trim(),
      });
      const ok = form.querySelector<HTMLElement>('[data-form-ok]');
      if (ok) ok.hidden = false;
    });
  });
}

function initExit() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-exit-dialog]');
  if (!dialog) return;
  let armed = false;
  window.setTimeout(() => {
    armed = true;
  }, 8000);

  const show = () => {
    if (!armed || dialog.open) return;
    try {
      if (sessionStorage.getItem(EXIT_KEY)) return;
      sessionStorage.setItem(EXIT_KEY, '1');
    } catch {
      return;
    }
    dialog.showModal();
  };

  document.addEventListener('mouseout', (event) => {
    if (event.relatedTarget || event.clientY > 12) return;
    show();
  });

  let last = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 700 && y < last - 140 && y > max * 0.5) show();
      last = y;
    },
    { passive: true },
  );

  dialog.querySelector('[data-exit-close]')?.addEventListener('click', () => dialog.close());
}

initTheme();
initMenu();
initFilters();
initTracking();
initForms();
initExit();
