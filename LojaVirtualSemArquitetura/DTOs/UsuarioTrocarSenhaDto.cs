namespace LojaVirtualSemArquitetura.DTOs
{
    public class UsuarioTrocarSenhaDto
    {
        public string Email { get; set; }
        public string Senha { get; set; }
        public string NovaSenha { get; set; }
        public string ConfirmarNovaSenha { get; set; }
    }
}