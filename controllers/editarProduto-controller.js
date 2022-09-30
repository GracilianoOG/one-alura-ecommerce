import { produtosServices } from "../services/produtos-services.js";

const formulario = document.querySelector("[data-confirmar]");
const produtoURL = new URL(window.location);
const produtoID = produtoURL.searchParams.get("id");

const imagem = document.querySelector("[data-campo='imagem']");
const categoria = document.querySelector("[data-campo='categoria']");
const nome = document.querySelector("[data-campo='nome']");
const preco = document.querySelector("[data-campo='preco']");
const descricao = document.querySelector("[data-campo='descricao']");

async function preencheCampos() {
    const produto = await produtosServices.detalhaProduto(produtoID);

    imagem.value = produto.imagem;
    categoria.value = produto.categoria;
    nome.value = produto.nome;
    preco.value = produto.preco;
    descricao.value = produto.descricao;
}
preencheCampos();

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const botaoEditar = document.querySelector("[data-botao-editar]");
    botaoEditar.classList.add("adiciona-produtos__adicionar--disabled");
    botaoEditar.disabled = true;

    await produtosServices.editaProduto(produtoID, imagem.value, categoria.value, nome.value, preco.value, descricao.value);
    window.location.href = "../index.html";
});