document.addEventListener('DOMContentLoaded', () => {
  const importBtn = document.querySelector('.button-import');
  const importInput = document.querySelector('.input-import');
  const titleInput = document.querySelector('.input-title');
  const textArea = document.querySelector('.input-area');


  // Importer
  importBtn.addEventListener('click', () => {
    importInput.click();
  });

  importInput.addEventListener('change', () => {
    const file = importInput.files[0];
    if (!file || file.type !== 'text/plain') {
      alert('Veuillez sélectionner un fichier texte (.txt)');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const contenu = e.target.result;
      const [titreLine, ...texteLines] = contenu.split('\n');
      const titre = titreLine.replace(/^Titre:\s*/, '');
      titleInput.value = titre;
      textArea.value = texteLines.join('\n').trim();
    };
    reader.readAsText(file);
      const conf = document.getElementById('conf');
      conf.classList.add('show');

  setTimeout(() => {
  conf.classList.remove('show');
  }, 3000);
  });
});


// Exporter
document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.querySelector('.input-title');
    const textArea = document.querySelector('.input-area');
    const exportBtn = document.querySelector('.button-export');

exportBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const text = textArea.value;

    fetch('http://localhost:3030/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text })
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title || 'document'}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
      const confirmation = document.getElementById('confirmation');
      confirmation.classList.add('show');

setTimeout(() => {
  confirmation.classList.remove('show');
}, 3000);

    });
  });
})