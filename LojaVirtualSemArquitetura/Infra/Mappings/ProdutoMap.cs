using System.Data.Entity.ModelConfiguration;
using LojaVirtualSemArquitetura.Domain;

namespace LojaVirtualSemArquitetura.Infra.Mappings
{
    public class ProdutoMap : EntityTypeConfiguration<Produto>
    {
        public ProdutoMap()
        {
            HasKey(p => p.Id);

            Property(p => p.Descricao)
                .HasColumnType("varchar")
                .HasMaxLength(250)
                .IsRequired();

            Property(p => p.Preco)
                .HasPrecision(18, 2)
                .IsRequired();

            Property(p => p.Imagem)
                .HasColumnType("varchar(max)")
                .IsRequired();

            HasRequired(p => p.Categoria).WithMany().Map(m => m.MapKey("CategoriaId"));

            ToTable("LV_Produto");
        }
    }
}