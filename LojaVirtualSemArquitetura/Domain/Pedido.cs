using System;
using System.Collections.Generic;
using System.Linq;

namespace LojaVirtualSemArquitetura.Domain
{
    public class Pedido
    {
        public Pedido()
        {
            Itens = new List<PedidoItem>();
        }

        public int Id { get; set; }
        public Usuario Usuario { get; set; }
        public DateTime Data { get; set; }
        public List<PedidoItem> Itens { get; set; }
        public decimal TaxaEntrega { get; set; }
        public decimal Desconto { get; set; }

        public decimal SubTotal
        {
            get => Itens.Sum(p => p.ValorTotal);
            private set { }
        }

        public decimal ValorTotal
        {
            get => SubTotal + TaxaEntrega - Desconto;
            private set { }
        }
    }
}