namespace LojaVirtualSemArquitetura.DTOs
{
    public class ProdutoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string Imagem { get; set; }
        public int QuantidadeEstoque { get; set; }
        public int CategoriaId { get; set; }
    }
}