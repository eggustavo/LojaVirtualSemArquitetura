using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LojaVirtualSemArquitetura.Domain;
using LojaVirtualSemArquitetura.Infra.Context;

namespace LojaVirtualSemArquitetura.Controllers
{
    public class CategoriaController : BaseController
    {
        private readonly LojaVirtualContext _context = new LojaVirtualContext();

        [HttpGet]
        [Route("api/v1/categoria")]
        public HttpResponseMessage Listar()
        {
            return CriarResposta(HttpStatusCode.OK, _context.CategoriaSet.ToList());
        }

        [HttpGet]
        [Route("api/v1/categoria/{id}")]
        public HttpResponseMessage ObterPorId(int id)
        {
            return CriarResposta(HttpStatusCode.OK, _context.CategoriaSet.Find(id));
        }

        [HttpPost]
        [Route("api/v1/categoria")]
        public HttpResponseMessage Adicionar(Categoria categoria)
        {
            if (categoria == null)
            {
                Notificacoes.Add("Categoria não Informada.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            if (string.IsNullOrEmpty(categoria.Descricao))
            {
                Notificacoes.Add("Descrição Obrigatória.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            _context.CategoriaSet.Add(categoria);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.OK, new
            {
                CategoriaId = categoria.Id,
                Mensagem = "Categoria adicionada com sucesso."
            });
        }

        [HttpPut]
        [Route("api/v1/categoria")]
        public HttpResponseMessage Atualizar(Categoria categoria)
        {
            if (categoria == null)
            {
                Notificacoes.Add("Categoria não informada.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            if (string.IsNullOrEmpty(categoria.Descricao))
            {
                Notificacoes.Add("Descrição Obrigatória.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            _context.CategoriaSet.AddOrUpdate(categoria);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.OK, new
            {
                Mensagem = "Categoria Atualizada com Sucesso."
            });
        }

        [HttpDelete]
        [Route("api/v1/categoria/{id}")]
        public HttpResponseMessage Remover(int id)
        {
            var categoria = _context.CategoriaSet.Find(id);

            if (categoria == null)
            {
                Notificacoes.Add("Categoria não localizada.");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }

            _context.CategoriaSet.Remove(categoria);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.OK, new
            {
                Mensagem = "Categoria Removida com Sucesso."
            });
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }
    }
}
