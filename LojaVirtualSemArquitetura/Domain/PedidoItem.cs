namespace LojaVirtualSemArquitetura.Domain
{
    public class PedidoItem
    {
        public int Id { get; set; }
        public Produto Produto { get; set; }
        public int Quantidade { get; set; }
        public decimal ValorUnitario { get; set; }
        public decimal ValorTotal
        {
            get => ValorUnitario * Quantidade;
            private set { }
        }
    }
}