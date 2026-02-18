(function renderApps() {
  const list = window.apps || [];
  const grid = document.getElementById('apps-grid');
  if (!grid) return;
  
  grid.innerHTML = '';

  list.forEach(app => {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = app.path;
    a.setAttribute('role', 'listitem');
    a.innerHTML = `
      <div class="card-accent" aria-hidden="true"></div>
      <h3>${app.name}</h3>
      <p>${app.description || ''}</p>
    `;
    grid.appendChild(a);
  });
})();
