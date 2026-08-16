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
        builder.Property(e => e.Description).HasMaxLength(300);
        builder.Property(e => e.Price).HasColumnType("decimal(18,2)");

        // Seeding de los 3 productos requeridos para el catálogo
        builder.HasData(
            new Product { Id = 1, Name = "Audífonos Inalámbricos", ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&h=200&fit=crop", Description = "Audífonos inalámbricos de alta calidad", Price = 150000m },
            new Product { Id = 2, Name = "Teclado Mecánico", ImageUrl = "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200&h=200&fit=crop", Description = "Teclado mecánico con switches de alta calidad", Price = 250000m },
            new Product { Id = 3, Name = "Mouse Gamer", ImageUrl = "https://images.unsplash.com/photo-1618247130379-980b9fe0df04?q=80&w=200&h=200&fit=crop", Description = "Mouse gamer con sensor de alta precisión", Price = 90000m }
        );
    }
}