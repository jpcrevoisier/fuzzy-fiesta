// Fonction pour mettre à jour l'image de fond de la signature
function updateBackground() {
    const backgroundImageUrl = document.getElementById('backgroundImage').value;
    const signatureTable = document.querySelector('.signature-table');
    
    if (backgroundImageUrl) {
        // Valider l'URL avant de l'appliquer
        try {
            const url = new URL(backgroundImageUrl);
            signatureTable.style.backgroundImage = `url('${backgroundImageUrl}')`;
            console.log('Image de fond appliquée:', backgroundImageUrl);
        } catch (e) {
            alert('Veuillez entrer une URL valide pour l\'image de fond.');
        }
    } else {
        alert('Veuillez entrer une URL pour l\'image de fond.');
    }
}

// Fonction pour réinitialiser l'image de fond
function resetBackground() {
    const signatureTable = document.querySelector('.signature-table');
    signatureTable.style.backgroundImage = 'none';
    document.getElementById('backgroundImage').value = '';
    console.log('Image de fond réinitialisée');
}

// Empêcher les sauts de ligne dans les champs editables
document.addEventListener('DOMContentLoaded', function() {
    const editableFields = document.querySelectorAll('[contenteditable="true"]');
    
    editableFields.forEach(field => {
        field.addEventListener('keydown', function(e) {
            // Empêcher les retours à la ligne
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        // Empêcher le collage de contenu avec formatage qui pourrait causer des sauts de ligne
        field.addEventListener('paste', function(e) {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            document.execCommand('insertText', false, text);
        });
    });
    
    // Ajouter un gestionnaire pour copier la signature complète
    const signaturePreview = document.getElementById('signaturePreview');
    
    // Instructions pour copier la signature
    signaturePreview.addEventListener('click', function() {
        // Sélectionner tout le contenu de la signature
        const range = document.createRange();
        range.selectNodeContents(signaturePreview);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
});