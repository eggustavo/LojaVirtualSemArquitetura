using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LojaVirtualSemArquitetura.Domain;
using LojaVirtualSemArquitetura.DTOs;
using LojaVirtualSemArquitetura.Helper;
using LojaVirtualSemArquitetura.Infra.Context;

namespace LojaVirtualSemArquitetura.Controllers
{
    public class UsuarioController : BaseController
    {
        private readonly LojaVirtualContext _context = new LojaVirtualContext();

        [HttpPost]
        [Route("api/v1/usuario")]
        public HttpResponseMessage Adicionar(UsuarioDto usuarioDto)
        {
            if (usuarioDto == null)
            {
                Notificacoes.Add("Usuário não informado.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            if (string.IsNullOrEmpty(usuarioDto.Nome))
                Notificacoes.Add("Nome Obrigatório.");

            if (string.IsNullOrEmpty(usuarioDto.Email))
                Notificacoes.Add("Email obrigatório.");

            if (string.IsNullOrEmpty(usuarioDto.Senha))
                Notificacoes.Add("Senha Obrigatória.");

            if (string.IsNullOrEmpty(usuarioDto.ConfirmarSenha))
                Notificacoes.Add("Confirmação da Senha Obrigatória.");

            if (usuarioDto.Senha != usuarioDto.ConfirmarSenha)
                Notificacoes.Add("Senhas não conferem.");

            if (string.IsNullOrEmpty(usuarioDto.Cep))
                Notificacoes.Add("Cep Obrigatório.");

            if (string.IsNullOrEmpty(usuarioDto.Logradouro))
                Notificacoes.Add("Logradouro Obrigatório.");

            if (string.IsNullOrEmpty(usuarioDto.Numero))
                Notificacoes.Add("Número obrigatório.");

            if (string.IsNullOrEmpty(usuarioDto.Bairro))
                Notificacoes.Add("Bairro obrigatório.");

            if (string.IsNullOrEmpty(usuarioDto.Municipio))
                Notificacoes.Add("Município Obrigatóiro.");

            if (string.IsNullOrEmpty(usuarioDto.Uf))
                Notificacoes.Add("UF Obrigatória.");

            if (Notificacoes.Any())
                return CriarResposta(HttpStatusCode.BadRequest, null);

            var usuarioEmail = _context.UsuarioSet.FirstOrDefault(p => p.Email == usuarioDto.Email);
            if (usuarioEmail != null)
            {
                Notificacoes.Add("Email já registrado.");
                return CriarResposta(HttpStatusCode.BadRequest, null);
            }

            var usuario = new Usuario
            {
                Nome = usuarioDto.Nome,
                Email = usuarioDto.Email,
                Senha = Encrypt.EncryptPassword(usuarioDto.Senha),
                Cep = usuarioDto.Cep,
                Logradouro = usuarioDto.Logradouro,
                Numero = usuarioDto.Numero,
                Complemento = usuarioDto.Complemento,
                Bairro = usuarioDto.Bairro,
                Municipio = usuarioDto.Municipio,
                Uf = usuarioDto.Uf,
                FlagAdministrador = false
            };

            _context.UsuarioSet.Add(usuario);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.Created, new
            {
                UsuarioId = usuario.Id,
                Mensagem = "Usuário adicionado com sucesso."
            });
        }

        [HttpPut]
        [Route("api/v1/usuario/trocar-senha")]
        public HttpResponseMessage AlterarSenha(UsuarioTrocarSenhaDto usuarioTrocarSenhaDto)
        {
            var usuario = _context.UsuarioSet.FirstOrDefault(p => p.Email == usuarioTrocarSenhaDto.Email);
            if (usuario == null)
            {
                Notificacoes.Add("Usuário não localizado.");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }

            if (usuario.Senha != Encrypt.EncryptPassword(usuarioTrocarSenhaDto.Senha))
                Notificacoes.Add("Senha atual não confere.");

            if (usuarioTrocarSenhaDto.NovaSenha != usuarioTrocarSenhaDto.ConfirmarNovaSenha)
                Notificacoes.Add("Senhas não conferem.");

            if (Notificacoes.Any())
                return CriarResposta(HttpStatusCode.BadRequest, null);

            usuario.Senha = Encrypt.EncryptPassword(usuarioTrocarSenhaDto.NovaSenha);

            _context.UsuarioSet.AddOrUpdate(usuario);
            _context.SaveChanges();

            return CriarResposta(HttpStatusCode.OK, new
            {
                Mensagem = "Senha alterada com sucesso."
            });
        }

        [HttpPost]
        [Route("api/v1/usuario/autenticar")]
        public HttpResponseMessage Autenticar(UsuarioAutenticarDto usuarioAutenticarDto)
        {
            if (usuarioAutenticarDto == null)
            {
                Notificacoes.Add("Parâmentros Inválidos");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }

            var senhaEncrypt = Encrypt.EncryptPassword(usuarioAutenticarDto.Senha);
            var usuario = _context.UsuarioSet.FirstOrDefault(p =>
                p.Email == usuarioAutenticarDto.Email &&
                p.Senha == senhaEncrypt);

            if (usuario == null)
            {
                Notificacoes.Add("Usuário ou Senha Inválidos");
                return CriarResposta(HttpStatusCode.NotFound, null);
            }

            return CriarResposta(HttpStatusCode.OK, new
            {
                usuario.Id,
                usuario.Email,
                usuario.Nome
            });
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }
    }
}
