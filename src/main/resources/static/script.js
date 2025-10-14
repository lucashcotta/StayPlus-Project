function abrirTela(id) {
  document.querySelectorAll('.tela, .tela-form').forEach(tela => 
    tela.classList.remove('ativa')
  );
  document.getElementById(`tela-${id}`).classList.add('ativa');
}

function voltar() {
  abrirTela('login');
}

// ========================
// LOGIN SIMPLIFICADO
// ========================
/*const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email && senha) {
    abrirTela("inicial");
  } else {
    alert("Preencha os campos corretamente!");
  }
});*/

const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const usuario = await response.json();

      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      abrirTela("inicial");
    } else {
      alert("Credenciais inválidas!");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
  }
});


// ========================
// FLUXO PROPRIETÁRIO
// ========================
document.getElementById("btn-proprietario")?.addEventListener("click", () => {
  abrirTela("proprietario"); // Vai para o Dashboard
});

// Lista de propriedades do proprietário
const listaPropriedades = document.getElementById("lista-propriedades");

// Cadastro de propriedade
const formCadastroPropriedade = document.getElementById("form-cadastro-propriedade");
formCadastroPropriedade?.addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = this.querySelector("input[placeholder='Nome da propriedade']").value;
  const endereco = this.querySelector("input[placeholder='Endereço / Localização']").value;
  const descricao = this.querySelector("textarea").value;

  if (!nome || !endereco) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${nome} - ${endereco}`;
  li.onclick = () => abrirTela("gerenciar-propriedade");
  listaPropriedades.appendChild(li);

  this.reset();
  abrirTela("proprietario");
});

// ========================
// Serviços do Proprietário
// ========================
const formServico = document.getElementById("form-servico");
const listaProprietario = document.getElementById("lista-servicos");

formServico?.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = this.querySelector("input[placeholder='Nome do serviço']").value;
  const preco = this.querySelector("input[placeholder='Preço (R$)']").value;

  if (!nome || !preco) {
    alert("Preencha todos os campos!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${nome} - R$ ${preco}`;
  listaProprietario.appendChild(li);

  this.reset();
});

// ========================
// Galeria de Fotos
// ========================
const uploadFoto = document.getElementById("uploadFoto");
const galeria = document.querySelector(".galeria");

uploadFoto?.addEventListener("change", function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement("img");
    img.src = e.target.result;
    galeria.appendChild(img);
  };
  reader.readAsDataURL(file);
});

// Simulação: códigos válidos
const casasCadastradas = {
  "ABC123": "recanto",
  "XYZ789": "ondas",
  "LMN456": "refugio"
};

const formCodigo = document.getElementById("form-codigo-casa");
formCodigo.addEventListener("submit", function(e) {
  e.preventDefault();
  const codigo = document.getElementById("codigoCasa").value.trim().toUpperCase();

  if (casasCadastradas[codigo]) {
    abrirServicos(casasCadastradas[codigo]); // abre os serviços da casa correspondente
  } else {
    alert("Código inválido! Verifique com o anfitrião.");
  }
});

let carrinho = [];
let total = 0;

function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;

  document.getElementById("carrinho-itens").textContent = carrinho.length;
  document.getElementById("carrinho-total").textContent = total.toFixed(2).replace(".", ",");
}

// Evento de finalizar pedido
document.getElementById("finalizar-btn")?.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let resumo = "Itens selecionados:\n";
  carrinho.forEach(item => {
    resumo += `- ${item.nome} (R$ ${item.preco})\n`;
  });
  resumo += `\nTotal: R$ ${total.toFixed(2)}`;
  alert(resumo);

  // limpar carrinho
  carrinho = [];
  total = 0;
  document.getElementById("carrinho-itens").textContent = "0";
  document.getElementById("carrinho-total").textContent = "0,00";
});

