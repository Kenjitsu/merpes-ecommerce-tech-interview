using MerpesEcommerce.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace MerpesEcommerce.API.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<AppUser> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name)
               .IsRequired()
               .HasMaxLength(100);

        builder.Property(e => e.Email)
               .IsRequired()
               .HasMaxLength(150);

        // Indice para evitar correos duplicados.
        builder.HasIndex(e => e.Email)
               .IsUnique();

        builder.Property(e => e.PasswordHash)
               .IsRequired();
    }
}
