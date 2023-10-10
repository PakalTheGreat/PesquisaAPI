function validarJSON(data) {    
    console.log(JSON.stringify(data, null, 2)); 
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('button[type="button"]');
    const tabelaClientes = document.getElementById('tabela-clientes');
    const apiUrl = 'http://localhost:3000/api/';

    button.addEventListener('click', function () {
        const searchTerm = document.getElementById('searchInput').value;
        console.log('Botão clicado. Termo de pesquisa:', searchTerm);
        
        const requestData = {
            qtype:"cliente.razao",
            query:searchTerm,
            oper:"L",
            page: "1",
            rp: "10",
            sortname: "cliente.id",
            sortorder: "desc"
        };
        const isValid = validarJSON(requestData);
        if (!isValid) {
            console.error('JSON inválido');
            return;  // Abortar se o JSON for inválido
        }
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição');
            }
        })
        .then((data) => {
            console.log('Dados da API recebidos:', data);
            preencherTabela(data);
        })
        .catch((error) => {
            console.error(error);
        });
    });

    function preencherTabela(data) {
        const tbody = tabelaClientes.querySelector('tbody');
     
        tbody.innerHTML = '';

        if (data.registros) {

            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const registrosFiltrados = data.registros.filter(cliente => {
               return cliente.razao.toLowerCase().includes(searchTerm)
            })
            registrosFiltrados.forEach((cliente) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.razao}</td>
                    <td>${cliente.cnpj_cpf}</td>
                `;
                tbody.appendChild(row);
            });
        
        }
        else alert('Nenhum registro encontrado!')
    }
});
