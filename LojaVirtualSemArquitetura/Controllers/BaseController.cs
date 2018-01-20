using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LojaVirtualSemArquitetura.Controllers
{
    public class BaseController : ApiController
    {
        protected List<string> Notificacoes;

        public BaseController()
        {
            Notificacoes = new List<string>();
        }

        protected HttpResponseMessage CriarResposta(HttpStatusCode codigoHttp, object dados)
        {
            return Request.CreateResponse(codigoHttp, new
            {
                Sucesso = !Notificacoes.Any(),
                Dados = Notificacoes.Any() ? null : dados,
                Notificacoes = Notificacoes.Any() ? Notificacoes.ToArray() : null
            });

            /*
            HttpResponseMessage mensagemReposta;

            if (Notificacoes.Any())
            {
                mensagemReposta = Request.CreateResponse(HttpStatusCode.BadRequest, new 
                {
                    Sucesso = false,
                    Dados = (string)null,
                    Notificacoes = Notificacoes.ToArray()
                });
                return mensagemReposta;
            }

            mensagemReposta = Request.CreateResponse(codigoHttp, new
            {
                Sucesso = true,
                Dados = dados,
                Notificacoes = (string)null
            });
            return mensagemReposta;
            */
        }
    }
}
