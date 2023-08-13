
function get_documents(){
    const req = new XMLHttpRequest();
    req.open("GET", "/json/db.json",false);
    req.send();
    file = req.responseText;
    

    return JSON.parse(file);
};



// Função para criar a grade de documentos
function criarGradeDocumentos() {
    const documentosGrid = document.getElementById('livrosGrid');
    const documentosJSON = get_documents();
    console.log(documentosJSON);

    Object.values(documentosJSON).forEach(documento => {
        const newRow = documentosGrid.insertRow();
        const nomeCell = newRow.insertCell();
        const authorCell = newRow.insertCell();
        const downloadCell = newRow.insertCell();
        const imageCell = newRow.insertCell();
        
        console.log(documento);
        nomeCell.textContent = documento.name;
        authorCell.textContent = documento.autor;
        downloadCell.innerHTML = `<a href="${documento.download}">download</a>`;
        imageCell.innerHTML = `<a href="${documento.image}">image</a>`;
    });
}

// Chama a função para criar a grade de documentos ao carregar a página
window.onload = criarGradeDocumentos;