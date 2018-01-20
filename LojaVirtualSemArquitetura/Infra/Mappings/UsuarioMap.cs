using System.Data.Entity.ModelConfiguration;
using LojaVirtualSemArquitetura.Domain;

namespace LojaVirtualSemArquitetura.Infra.Mappings
{
    public class UsuarioMap : EntityTypeConfiguration<Usuario>
    {
        public UsuarioMap()
        {
            HasKey(p => p.Id);

            Property(p => p.Nome)
                .HasColumnType("varchar")
                .HasMaxLength(100)
                .IsRequired();

            Property(p => p.Email)
                .HasColumnType("varchar")
                .HasMaxLength(100)
                .IsRequired();

            Property(p => p.Senha)
                .HasColumnType("varchar")
                .HasMaxLength(250)
                .IsRequired();

            Property(p => p.Cep)
                .HasColumnType("varchar")
                .HasMaxLength(9)
                .IsRequired();

            Property(p => p.Logradouro)
                .HasColumnType("varchar")
                .HasMaxLength(100)
                .IsRequired();

            Property(p => p.Numero)
                .HasColumnType("varchar")
                .HasMaxLength(5)
                .IsRequired();

            Property(p => p.Complemento)
                .HasColumnType("varchar")
                .HasMaxLength(50)
                .IsOptional();

            Property(p => p.Bairro)
                .HasColumnType("varchar")
                .HasMaxLength(50)
                .IsRequired();

            Property(p => p.Municipio)
                .HasColumnType("varchar")
                .HasMaxLength(50)
                .IsRequired();

            Property(p => p.Uf)
                .HasColumnType("varchar")
                .HasMaxLength(2)
                .IsRequired();

            Property(p => p.FlagAdministrador)
                .HasColumnType("bit")
                .IsRequired();

            ToTable("LV_Usuario");
        }
    }
}