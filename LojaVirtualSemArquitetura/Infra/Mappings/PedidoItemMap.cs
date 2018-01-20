using System.Data.Entity.ModelConfiguration;
using LojaVirtualSemArquitetura.Domain;

namespace LojaVirtualSemArquitetura.Infra.Mappings
{
    public class PedidoItemMap : EntityTypeConfiguration<PedidoItem>
    {
        public PedidoItemMap()
        {
            HasKey(p => p.Id);

            Property(p => p.Quantidade)
                .IsRequired();

            Property(p => p.ValorUnitario)
                .HasPrecision(18, 2)
                .IsRequired();

            Property(p => p.ValorTotal)
                .HasPrecision(18, 2)
                .IsRequired();

            HasRequired(p => p.Produto).WithMany().Map(m => m.MapKey("ProdutoId"));

            ToTable("LV_PedidoItem");
        }
    }
}