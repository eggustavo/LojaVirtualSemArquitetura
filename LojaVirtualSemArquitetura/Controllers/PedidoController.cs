using System;
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
    public class PedidoController : BaseController
    {
        private readonly LojaVirtualContext _context = new LojaVirtualContext();

        [HttpGet]
        [Route("api/v1/pedido/usuario/{usuarioId}")]
        public HttpResponseMessage ListarPedidos(int usuarioId)
        {
            var pedidos = _context.PedidoSet.Include("Itens").Include("Itens.Produto").Include("Usuario").Where(p => p.Usuario.Id == usuarioId).ToList();
            return CriarResposta(HttpStatusCode.OK, pedidos);
        }

        [HttpPost]
        [Route("api/v1/pedido")]
        public HttpResponseMessage Adicionar(PedidoDto pedidoDto)
        {
            if (pedidoDto == null)
            {
                Notificacoes.Add("Pedido não informado.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            var usuario = _context.UsuarioSet.Find(pedidoDto.UsuarioId);
            if (usuario == null)
                Notificacoes.Add("Usuário não localizado.");

            foreach (var item in pedidoDto.Itens)
            {
                var produto = _context.ProdutoSet.Find(item.ProdutoId);
                if (produto == null)
                    Notificacoes.Add("Produto não localizado.");

                if (item.Quantidade <= 0)
                    Notificacoes.Add("Quantidade deve ser maior que zero.");
            }

            if (Notificacoes.Any())
                return CriarResposta(HttpStatusCode.BadRequest, null);

            var pedido = new Pedido
            {
                Usuario = usuario,
                Data = DateTime.Now.Date,
                Desconto = pedidoDto.Desconto,
                TaxaEntrega = pedidoDto.TaxaEntrega
            };

            foreach (var item in pedidoDto.Itens)
            {
                var produto = _context.ProdutoSet.Find(item.ProdutoId);
                pedido.Itens.Add(new PedidoItem
                {
                    Produto = produto,
                    Quantidade = item.Quantidade,
                    ValorUnitario = produto.Preco
                });
                produto.DiminuirQuantidadeEstoque(item.Quantidade);
                _context.ProdutoSet.AddOrUpdate(produto);
            }

            _context.PedidoSet.Add(pedido);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.Created, new
            {
                PedidoId = pedido.Id,
                Mensagem = "Pedido efetuado com sucesso."
            });
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }
    }
}