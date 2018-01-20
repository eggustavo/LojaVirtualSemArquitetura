using System.Data.Entity.ModelConfiguration;
using LojaVirtualSemArquitetura.Domain;

namespace LojaVirtualSemArquitetura.Infra.Mappings
{
    public class CategoriaMap : EntityTypeConfiguration<Categoria>
    {
        public CategoriaMap()
        {
            HasKey(p => p.Id);

            Property(p => p.Descricao)
                .HasColumnType("varchar")
                .HasMaxLength(100)
                .IsRequired();

            ToTable("LV_Categoria");
        }
    }
}