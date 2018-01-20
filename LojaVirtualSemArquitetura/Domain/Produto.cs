namespace LojaVirtualSemArquitetura.Domain
{
    public class Produto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string Imagem { get; set; }
        public int QuantidadeEstoque { get; set; }
        public Categoria Categoria { get; set; }

        public void DiminuirQuantidadeEstoque(int quantidade) => QuantidadeEstoque -= quantidade;
    }
}