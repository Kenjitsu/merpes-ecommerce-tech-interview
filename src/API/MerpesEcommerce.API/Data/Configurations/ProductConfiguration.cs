using MerpesEcommerce.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MerpesEcommerce.API.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
        builder.Property(e => e.ImageUrl).IsRequired().HasMaxLength(255);
        builder.Property(e => e.Price).HasColumnType("decimal(18,2)");

        // Seeding de los 3 productos requeridos para el catálogo
        builder.HasData(
            new Product { Id = 1, Name = "Audífonos Inalámbricos", ImageUrl = "https://dummyimage.com/200x200/000/fff&text=Audifonos", Price = 150000m },
            new Product { Id = 2, Name = "Teclado Mecánico", ImageUrl = "https://dummyimage.com/200x200/000/fff&text=Teclado", Price = 250000m },
            new Product { Id = 3, Name = "Mouse Gamer", ImageUrl = "https://dummyimage.com/200x200/000/fff&text=Mouse", Price = 90000m }
        );
    }
}