document.getElementById('csvFileInput').addEventListener('change', handleSelecaoArquivo, false);

function handleSelecaoArquivo(evento) {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function(e) {
      const conteudo = e.target.result;
      processarCSV(conteudo);
    };
    leitor.readAsText(arquivo);
  }
}

function processarCSV(csv) {
  const linhas = csv.split('\n');
  const cabecalho = linhas[0].split(';');

  const cabecalhoFiltrado = cabecalho.map(coluna => {
    const colunaTrimmed = coluna.trim();
    return `<th>${colunaTrimmed}</th>`;
  });

  document.getElementById('tableHeader').innerHTML = cabecalhoFiltrado.join('');

  const corpoTabela = linhas.slice(1).map(linha => {
    const valores = linha.split(';');

    const valoresFiltrados = valores.map(valor => {
      const valorTrimmed = valor.trim();
      return `<td>${valorTrimmed}</td>`;
    });

    return `<tr>${valoresFiltrados.join('')}</tr>`;
  }).join('');

  document.getElementById('tableBody').innerHTML = corpoTabela;

  // Adicionar evento de pesquisa
  document.getElementById('searchInput').addEventListener('input', handlePesquisa);
}

function handlePesquisa() {
  const inputPesquisa = document.getElementById('searchInput');
  const filtro = inputPesquisa.value.toLowerCase();

  const tabela = document.getElementById('csvTable');
  const linhas = tabela.getElementsByTagName('tr');

  for (let i = 1; i < linhas.length; i++) {
    const celulas = linhas[i].getElementsByTagName('td');
    let linhaCoincide = false;

    for (let j = 0; j < celulas.length; j++) {
      const valorCelula = celulas[j].textContent || celulas[j].innerText;

      if (valorCelula.toLowerCase().indexOf(filtro) > -1) {
        linhaCoincide = true;
        break;
      }
    }

    linhas[i].style.display = linhaCoincide ? '' : 'none';
  }
}
