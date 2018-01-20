using System.Data.Entity.ModelConfiguration;
using LojaVirtualSemArquitetura.Domain;

namespace LojaVirtualSemArquitetura.Infra.Mappings
{
    public class PedidoMap : EntityTypeConfiguration<Pedido>
    {
        public PedidoMap()
        {
            HasKey(p => p.Id);

            Property(p => p.Data)
                .IsRequired();

            Property(p => p.TaxaEntrega)
                .HasPrecision(18, 2)
                .IsRequired();

            Property(p => p.Desconto)
                .HasPrecision(18, 2)
                .IsRequired();

            Property(p => p.SubTotal)
                .HasPrecision(18, 2)
                .IsRequired();

            Property(p => p.ValorTotal)
                .HasPrecision(18,2)
                .IsRequired();

            HasMany(p => p.Itens).WithRequired().Map(p => p.MapKey("PedidoId"));
            HasRequired(p => p.Usuario).WithMany().Map(m => m.MapKey("UsuarioId"));

            ToTable("LV_Pedido");
        }
    }
}