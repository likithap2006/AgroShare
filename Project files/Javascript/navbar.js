// ═══════════════════════════════════════════
//  AgroShare – Navbar (Firebase Auth aware)
// ═══════════════════════════════════════════

(function() {

  // ── Theme ──
  const saved  = localStorage.getItem('agroshare_theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme  = saved || system;
  document.documentElement.setAttribute('data-theme', theme);

  function updateThemeIcon(t) {
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = t === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
  }
  updateThemeIcon(theme);

  window.addEventListener('DOMContentLoaded', function() {

    // Theme toggle
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        const cur  = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('agroshare_theme', next);
        updateThemeIcon(next);
      });
    }

    // Sticky navbar shadow
    window.addEventListener('scroll', function() {
      const nav = document.getElementById('navbar');
      if (nav) nav.style.boxShadow = window.scrollY > 20 ? 'var(--shadow-lg)' : 'none';
    });

    // ── Firebase Auth state ──
    if (typeof auth !== 'undefined') {
      auth.onAuthStateChanged(async function(user) {
        const loginLink    = document.getElementById('navLoginLink');
        const logoutBtn    = document.getElementById('navLogoutBtn');
        const userDisplay  = document.getElementById('navUserName');
        // Links that should only be visible when logged in
        const authOnlyLinks = document.querySelectorAll('.nav-auth-only');

        if (user) {
          // Logged in: show full nav
          if (loginLink)   loginLink.style.display   = 'none';
          if (logoutBtn)   logoutBtn.style.display    = 'inline-flex';
          authOnlyLinks.forEach(el => el.style.display = 'list-item');

          if (userDisplay) {
            const profile = await getUserProfile(user.uid);
            userDisplay.textContent = profile ? profile.name.split(' ')[0] : 'Hi!';
            userDisplay.style.display = 'inline';
          }
        } else {
          // Guest: hide protected links
          if (loginLink)   loginLink.style.display   = 'inline-flex';
          if (logoutBtn)   logoutBtn.style.display    = 'none';
          if (userDisplay) userDisplay.style.display  = 'none';
          authOnlyLinks.forEach(el => el.style.display = 'none');
        }
      });
    }

    // Logout button handler
    const logoutBtn = document.getElementById('navLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async function() {
        await auth.signOut();
        window.location.href = 'index.html';
      });
    }
  });

})();
