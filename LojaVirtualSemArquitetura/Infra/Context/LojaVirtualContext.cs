using System.Data.Entity;
using LojaVirtualSemArquitetura.Domain;
using LojaVirtualSemArquitetura.Infra.Mappings;

namespace LojaVirtualSemArquitetura.Infra.Context
{
    public class LojaVirtualContext : DbContext
    {
        public LojaVirtualContext()
            : base("LojaVirtualConnectionSemArquitetura")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Categoria> CategoriaSet { get; set; }
        public DbSet<Produto> ProdutoSet { get; set; }
        public DbSet<Usuario> UsuarioSet { get; set; }
        public DbSet<Pedido> PedidoSet { get; set; }
        public DbSet<PedidoItem> PedidoItemSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            //modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            //modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            modelBuilder.Configurations.Add(new CategoriaMap());
            modelBuilder.Configurations.Add(new ProdutoMap());
            modelBuilder.Configurations.Add(new UsuarioMap());
            modelBuilder.Configurations.Add(new PedidoMap());
            modelBuilder.Configurations.Add(new PedidoItemMap());

            base.OnModelCreating(modelBuilder);
        }
    }
}