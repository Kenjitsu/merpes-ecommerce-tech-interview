using MerpesEcommerce.API.Data;
using MerpesEcommerce.API.Interfaces;
using MerpesEcommerce.API.Services;
using Microsoft.EntityFrameworkCore;

namespace MerpesEcommerce.API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbConfig(configuration);

        services.AddScoped<IAuthService, AuthService>();

        return services;
    }

    private static IServiceCollection AddDbConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(opt =>
        {
            opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });

        return services;
    }
}
