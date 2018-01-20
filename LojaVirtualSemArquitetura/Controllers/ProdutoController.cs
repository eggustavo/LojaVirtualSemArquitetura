using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LojaVirtualSemArquitetura.Domain;
using LojaVirtualSemArquitetura.DTOs;
using LojaVirtualSemArquitetura.Infra.Context;

namespace LojaVirtualSemArquitetura.Controllers
{
    public class ProdutoController : BaseController
    {
        private readonly LojaVirtualContext _context = new LojaVirtualContext();

        [HttpGet]
        [Route("api/v1/produto")]
        public HttpResponseMessage Listar()
        {
            var produtos = _context.ProdutoSet.Include("Categoria").ToList();
            return CriarResposta(HttpStatusCode.OK, produtos);
        }

        [HttpGet]
        [Route("api/v1/produto/categoria/{categoriaId}")]
        public HttpResponseMessage ListarPorCategoria(int categoriaId)
        {
            var produtos = _context.ProdutoSet.Include("Categoria").Where(p => p.Categoria.Id == categoriaId).ToList();
            return CriarResposta(HttpStatusCode.OK, produtos);
        }

        [HttpGet]
        [Route("api/v1/produto/{id}")]
        public HttpResponseMessage ObterPorId(int id)
        {
            var produto = _context.ProdutoSet.Include("Categoria").FirstOrDefault(p => p.Id == id);

            if (produto == null)
            {
                Notificacoes.Add("Produto não localizado.");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }


            //Converter Produto em ProdutoDto
            var produtoDto = new ProdutoDto
            {
                Id = produto.Id,
                Descricao = produto.Descricao,
                Preco = produto.Preco,
                Imagem = produto.Imagem,
                QuantidadeEstoque = produto.QuantidadeEstoque,
                CategoriaId = produto.Categoria.Id
            };

            return CriarResposta(HttpStatusCode.OK, produtoDto);
        }

        [HttpPost]
        [Route("api/v1/produto")]
        public HttpResponseMessage Adicionar(ProdutoDto produtoDto)
        {
            if (produtoDto == null)
            {
                Notificacoes.Add("Produto não informado.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            if (string.IsNullOrEmpty(produtoDto.Descricao))
                Notificacoes.Add("Descrição Obrigatória.");

            if (string.IsNullOrEmpty(produtoDto.Imagem))
                Notificacoes.Add("Imagem Obrigatória.");

            if (produtoDto.Preco <= 0)
                Notificacoes.Add("Preço deve ser maior que zero.");

            if (produtoDto.QuantidadeEstoque < 0)
                Notificacoes.Add("Quantidade em estoque deve ser igual ou maior que zero.");

            var categoria = _context.CategoriaSet.Find(produtoDto.CategoriaId);
            if (categoria == null)
                Notificacoes.Add("Categoria não localizada.");

            if (Notificacoes.Any())
                return CriarResposta(HttpStatusCode.BadRequest, null);

            //Convertendo ProdutoDto em Produto
            var produto = new Produto
            {
                Descricao = produtoDto.Descricao,
                Preco = produtoDto.Preco,
                Imagem = produtoDto.Imagem,
                QuantidadeEstoque = produtoDto.QuantidadeEstoque,
                Categoria = categoria
            };

            _context.ProdutoSet.Add(produto);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.Created, new
            {
                ProdutoId = produto.Id,
                Mensagem = "Produto adicionado com sucesso."
            });
        }

        [HttpPut]
        [Route("api/v1/produto")]
        public HttpResponseMessage Atualizar(ProdutoDto produtoDto)
        {
            if (produtoDto == null)
            {
                Notificacoes.Add("Produto não informado.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            var produto = _context.ProdutoSet.Find(produtoDto.Id);
            if (produto == null)
            {
                Notificacoes.Add("Produto não localizado.");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }

            if (string.IsNullOrEmpty(produtoDto.Descricao))
                Notificacoes.Add("Descrição Obrigatória.");

            if (string.IsNullOrEmpty(produtoDto.Imagem))
                Notificacoes.Add("Imagem Obrigatória.");

            if (produtoDto.Preco <= 0)
                Notificacoes.Add("Preço deve ser maior que zero.");

            if (produtoDto.QuantidadeEstoque < 0)
                Notificacoes.Add("Quantidade em estoque deve ser igual ou maior que zero.");

            var categoria = _context.CategoriaSet.Find(produtoDto.CategoriaId);
            if (categoria == null)
                Notificacoes.Add("Categoria não localizada.");

            if (Notificacoes.Any())
                return CriarResposta(HttpStatusCode.BadRequest, null);

            //Atualizando o Produto com base no ProdutoDto
            produto.Descricao = produtoDto.Descricao;
            produto.Preco = produtoDto.Preco;
            produto.Imagem = produtoDto.Imagem;
            produto.QuantidadeEstoque = produtoDto.QuantidadeEstoque;
            produto.Categoria = categoria;

            _context.ProdutoSet.AddOrUpdate(produto);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.OK, new
            {
                Mensagem = "Produto Atualizado com Sucesso."
            });
        }

        [HttpDelete]
        [Route("api/v1/produto/{id}")]
        public HttpResponseMessage Remover(int id)
        {
            var produto = _context.ProdutoSet.Find(id);

            if (produto == null)
            {
                Notificacoes.Add("Produto não localizado.");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }

            _context.ProdutoSet.Remove(produto);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.OK, new
            {
                Mensagem = "Produto Removido com Sucesso."
            });
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }
    }
}