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
  });
});
