using MerpesEcommerce.API.Data;
using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.Interfaces;
using MerpesEcommerce.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace MerpesEcommerce.API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllersConfig();
        services.AddOpenApi();
        services.AddCorsConfig();

        services.AddDbConfig(configuration);

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();

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

    private static IServiceCollection AddControllersConfig(this IServiceCollection services)
    {
        services.AddControllers().ConfigureApiBehaviorOptions(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var validationErrors = context.ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .SelectMany(x => x.Value!.Errors)
                    .Select(x => x.ErrorMessage)
                    .ToList();

                var errorMessage = string.Join(", ", validationErrors);

                var result = Result<object>.Failure(new Error("ERROR_DE_VALIDACION", errorMessage), HttpStatusCode.BadRequest);

                return new BadRequestObjectResult(result);
            };
        });
        return services;
    }

    private static IServiceCollection AddCorsConfig(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowIonicOrigin",
                policy => policy.WithOrigins("https://localhost:8100")
                                               .AllowAnyMethod()
                                               .AllowAnyHeader()
                                               .AllowCredentials());
        });

        return services;
    }
    
}
