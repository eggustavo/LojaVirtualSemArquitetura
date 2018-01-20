using System.Collections.Generic;

namespace LojaVirtualSemArquitetura.DTOs
{
    public class PedidoDto
    {
        public int UsuarioId { get; set; }
        public decimal TaxaEntrega { get; set; }
        public decimal Desconto { get; set; }
        public IEnumerable<PedidoItemDto> Itens { get; set; }
    }
}