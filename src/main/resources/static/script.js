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
const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const usuario = await response.json();
      console.log("Login OK:", usuario);

      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      abrirTela("proprietario");
    } else {
      alert("Credenciais inválidas!");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Erro ao conectar com o servidor.");
  }
});

// ========================
// Cadastro Usuário SIMPLIFICADO
// ========================

const formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Captura dos campos
    const nome = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    try {
      // Envia os dados para o back-end
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      // Se o cadastro deu certo
      if (response.ok) {
        const usuario = await response.json();
        alert(`Usuário ${usuario.nome} cadastrado com sucesso!`);

        // Exemplo: alterna de volta para a tela de login
        abrirTela("login");
      } else {
        // Caso o e-mail já exista ou outro erro de validação
        const erro = await response.text();
        alert("Erro: " + erro);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro de conexão com o servidor. Verifique se o backend está rodando.");
    }
  });
}


// ========================
// FLUXO PROPRIETÁRIO
// ========================
// document.getElementById("btn-proprietario")?.addEventListener("click", () => {
//   abrirTela("proprietario"); // Vai para o Dashboard
// });

// // Lista de propriedades do proprietário
// const listaPropriedades = document.getElementById("lista-propriedades");

// // Cadastro de propriedade
// const formCadastroPropriedade = document.getElementById("form-cadastro-propriedade");
// formCadastroPropriedade?.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const nome = this.querySelector("input[placeholder='Nome da propriedade']").value;
//   const endereco = this.querySelector("input[placeholder='Endereço / Localização']").value;
//   const descricao = this.querySelector("textarea").value;

//   if (!nome || !endereco) {
//     alert("Preencha os campos obrigatórios!");
//     return;
//   }

//   const li = document.createElement("li");
//   li.textContent = `${nome} - ${endereco}`;
//   li.onclick = () => abrirTela("gerenciar-propriedade");
//   listaPropriedades.appendChild(li);

//   this.reset();
//   abrirTela("proprietario");
// });
// ========================
// Carregar propriedades do usuário logado
// ========================

async function carregarPropriedades() {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Você precisa estar logado!");
    abrirTela("login");
    return;
  }

  try {
    const response = await fetch(`/api/propriedades/usuario/${usuarioLogado.id}`);
    if (!response.ok) throw new Error("Erro ao buscar propriedades");
    const propriedades = await response.json();

    exibirPropriedades(propriedades);
  } catch (error) {
    console.error("Erro ao carregar propriedades:", error);
    alert("Erro ao carregar propriedades do servidor.");
  }
}

function exibirPropriedades(propriedades) {
  const lista = document.getElementById("lista-propriedades");
  lista.innerHTML = "";

  if (propriedades.length === 0) {
    lista.innerHTML = "<p>Nenhuma propriedade cadastrada ainda.</p>";
    return;
  }

  propriedades.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - ${p.endereco}`;
    li.onclick = () => carregarServicos(p.id, p.nome);
    lista.appendChild(li);
  });
}

// ========================
// Carregar serviços da propriedade
// ========================
async function carregarServicos(idPropriedade, nomePropriedade) {
  try {
    const response = await fetch(`/api/servicos/propriedade/${idPropriedade}`);
    if (!response.ok) throw new Error("Erro ao buscar serviços");
    const servicos = await response.json();

    abrirTela("servicos-propriedade");
    exibirServicos(servicos, nomePropriedade);
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
    alert("Erro ao carregar serviços.");
  }
}

function exibirServicos(servicos, nomePropriedade) {
  const lista = document.getElementById("lista-servicos");
  lista.innerHTML = `<h3>${nomePropriedade}</h3>`;

  if (servicos.length === 0) {
    lista.innerHTML += "<p>Nenhum serviço cadastrado ainda.</p>";
    return;
  }

  servicos.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.nome} - R$ ${s.preco}`;
    lista.appendChild(li);
  });
}

// ========================
// Chamar carregarPropriedades ao abrir tela de proprietário
// ========================
document.getElementById("tela-proprietario").addEventListener("click", carregarPropriedades);

// ========================
// Serviços do Proprietário
// ========================
const formServico = document.getElementById("form-servico");
const listaProprietario = document.getElementById("lista-servicos");

formServico?.addEventListener("submit", function (e) {
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

uploadFoto?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
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
formCodigo.addEventListener("submit", function (e) {
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

