using MerpesEcommerce.API.Data;
using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.DTOs.Products;
using MerpesEcommerce.API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace MerpesEcommerce.API.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<IEnumerable<ProductResponse>>> GetCatalogAsync()
    {
        var items = await _context.Products
            .AsNoTracking()
            .Select(p => new ProductResponse(p.Id, p.Name, p.ImageUrl, p.Price))
            .ToListAsync();

        if (items == null || items.Count == 0)
        {
            return Result<IEnumerable<ProductResponse>>.Failure(new Error("SIN_PRODUCTOS", "No se encontraron productos"), HttpStatusCode.NotFound);
        }

        return Result<IEnumerable<ProductResponse>>.Success(items);
    }
}
