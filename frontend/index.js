async function consultarCEP() {
    const cep = document.getElementById('cepInput').value;
    const response = await fetch(`/cep/${cep}`);
    const data = await response.json();

    if (data.erro) {
        alert('CEP inválido');
    } else {
        alert(`Endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade}`);
    }
}

async function gerarNomeFalso() {
    const response = await fetch('/fake-name');
    const data = await response.json();

    document.getElementById('nomeFalso').innerText = `Nome Falso: ${data.name.first} ${data.name.last}`;
}
