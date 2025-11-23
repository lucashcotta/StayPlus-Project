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

      abrirTela("inicial");
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
// FLUXO "SOU PROPRIETÁRIO"
// ========================
document.getElementById("btn-proprietario")?.addEventListener("click", async () => {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  if (!usuario) {
    alert("Faça login antes de acessar esta área.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/propriedades/usuario/${usuario.id}`);
    if (!response.ok) throw new Error("Erro ao carregar propriedades");

    const propriedades = await response.json();
    const lista = document.getElementById("lista-propriedades");
    lista.innerHTML = "";

    if (propriedades.length === 0) {
      lista.innerHTML = "<p>Você ainda não possui propriedades cadastradas.</p>";
    } else {
      propriedades.forEach(prop => {
        const li = document.createElement("li");
        li.textContent = `${prop.nome} - ${prop.id}`;
        li.onclick = () => abrirGerenciamentoPropriedade(prop); // 👈 função corrigida
        lista.appendChild(li);
      });
    }

    abrirTela("proprietario");

  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor.");
  }
});

// =============================
// CADASTRAR NOVA PROPRIEDADE
// =============================
document.getElementById("btn-cadastrar-propriedade")?.addEventListener("click", () => {
  document.getElementById("form-nova-propriedade").style.display = "block";
});

document.getElementById("tela-cadastro-propriedade")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nomePropriedade").value.trim();
  const endereco = document.getElementById("localizacaoPropriedade").value.trim();
  const codigo = document.getElementById("codigopropriedade").value.trim();

  if (!nome || !endereco) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  const novaPropriedade = {
    nome,
    endereco,
    codigo,
    proprietario: { id: usuario.id }
  };

  try {
    const response = await fetch("http://localhost:8080/api/propriedades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPropriedade)
    });

    if (response.ok) {
      alert("Propriedade cadastrada com sucesso!");
      document.getElementById("form-cadastro-propriedade").reset();
      document.getElementById("form-cadastro-propriedade").style.display = "none";
      document.getElementById("lista-propriedades").innerHTML = "";
      // Recarrega a lista
      document.getElementById("btn-proprietario").click();
    } else {
      alert("Erro ao cadastrar propriedade.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor.");
  }
});



// ========================
// Função para abrir uma propriedade
// ========================

async function carregarServicos(idPropriedade) {
  try {
    const response = await fetch(`http://localhost:8080/api/servicos/propriedade/${idPropriedade}`);
    if (!response.ok) throw new Error("Erro ao buscar serviços");

    const servicos = await response.json();
    const lista = document.getElementById("lista-servicos");
    lista.innerHTML = ""; // limpa lista antes de renderizar tudo

    if (!servicos || servicos.length === 0) {
      lista.innerHTML = "<p>Nenhum serviço cadastrado ainda.</p>";
      return;
    }

    servicos.forEach(serv => {
      const li = document.createElement("li");
      li.textContent = `${serv.nome} - R$ ${serv.preco}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
    alert("Erro ao carregar serviços.");
  }
}


async function abrirGerenciamentoPropriedade(propriedade) {
  sessionStorage.setItem("propriedadeSelecionada", JSON.stringify(propriedade));
  abrirTela("gerenciar-propriedade");

  // carrega os serviços da propriedade
  await carregarServicos(propriedade.id);
}



// ========================
// Cadastrar um novo servico
// ========================

const formServico = document.getElementById("form-servico");
formServico?.addEventListener("submit", async function(e) {
  e.preventDefault();

  const nome = this.querySelector("input[placeholder='Nome do serviço']").value;
  const preco = this.querySelector("input[placeholder='Preço (R$)']").value;
  const descricao = this.querySelector("textarea")?.value || "";

  const propriedade = JSON.parse(sessionStorage.getItem("propriedadeSelecionada"));
  if (!propriedade) {
    alert("Erro: nenhuma propriedade selecionada!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/servicos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        descricao,
        preco,
        propriedade: { id: propriedade.id }
      })
    });

    if (!response.ok) throw new Error("Erro ao cadastrar serviço");

    alert("Serviço cadastrado com sucesso!");
    abrirTela("gerenciar-propriedade");
    await carregarServicos(propriedade.id);
    this.reset();
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar serviço.");
  }
});



// ======================
// HÓSPEDE – Buscar serviços pelo código da propriedade
// ======================

let carrinho = [];
let propriedadeCarregada = null; // 🔥 salvar a propriedade retornada
let usuarioId = 1; // 🔥 por enquanto fixo, até você ter login real

// Carrega serviços a partir do código digitado pelo hóspede
async function carregarServicosPorCodigo(codigoPropriedade) {
  try {
    const response = await fetch(`http://localhost:8080/api/servicos/codigo/${codigoPropriedade}`);
    if (!response.ok) throw new Error("Código inválido ou propriedade não encontrada.");

    const servicos = await response.json();

    // 🔥 Primeiro item possui a propriedade
    if (servicos.length > 0) {
      propriedadeCarregada = servicos[0].propriedade; // salva o ID da propriedade
    }

    const grid = document.getElementById("grid-servicos");
    grid.innerHTML = ""; // limpa antes

    if (!servicos.length) {
      grid.innerHTML = "<p>Nenhum serviço cadastrado para esta propriedade.</p>";
      return;
    }

    // Criar cards dinamicamente
    servicos.forEach(serv => {
      const card = document.createElement("div");
      card.classList.add("card-servico");

      card.innerHTML = `
        <h3>${serv.nome}</h3>
        <p class="descricao">${serv.descricao || ""}</p>
        <p class="preco">R$ ${parseFloat(serv.preco).toFixed(2)}</p>
        <button class="btn-carrinho">Adicionar ao Carrinho</button>
      `;

      // Evento do botão
      card.querySelector(".btn-carrinho").addEventListener("click", () => {
        adicionarCarrinho(serv);
      });

      grid.appendChild(card);
    });

    abrirTela("servicosTeste");

  } catch (error) {
    console.error(error);
    alert("Erro ao carregar serviços. Verifique o código da propriedade.");
  }
}


// ======================
// CARRINHO
// ======================

function adicionarCarrinho(servico) {
  const existente = carrinho.find(item => item.id === servico.id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      id: servico.id,
      nome: servico.nome,
      preco: servico.preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("carrinho-total");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("item-carrinho");

    li.innerHTML = `
      <span>${item.nome} (${item.quantidade}x) — R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
      <button class="btn-remover">❌</button>
    `;

    li.querySelector(".btn-remover").addEventListener("click", () => {
      removerDoCarrinho(item.id);
    });

    lista.appendChild(li);

    total += item.preco * item.quantidade;
  });

  totalSpan.textContent = total.toFixed(2).replace(".", ",");
}


// ======================
// FINALIZAR PEDIDO – AGORA ENVIA PARA O BACKEND
// ======================

document.getElementById("finalizar-btn")?.addEventListener("click", async () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  if (!propriedadeCarregada || !propriedadeCarregada.id) {
    alert("Erro: nenhuma propriedade carregada.");
    return;
  }

  // 🔥 JSON compatível com o backend
  const pedido = {
    usuario: { id: usuarioId },
    propriedade: { id: propriedadeCarregada.id },
    itens: carrinho.map(item => ({
      quantidade: item.quantidade,
      servico: { id: item.id }
    }))
  };

  console.log("Enviando pedido:", pedido);

  try {
    const response = await fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) throw new Error("Erro ao enviar pedido.");

    const data = await response.json();

    alert("Pedido realizado com sucesso!");
    console.log("Pedido salvo no banco:", data);

    carrinho = [];
    atualizarCarrinho();

  } catch (error) {
    console.error(error);
    alert("Erro ao finalizar o pedido.");
  }
});


// ======================
// Evento do formulário do código da propriedade
// ======================

document.getElementById("form-codigo-casa")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const codigo = document.getElementById("codigoCasa").value.trim().toUpperCase();
  carregarServicosPorCodigo(codigo);
});

