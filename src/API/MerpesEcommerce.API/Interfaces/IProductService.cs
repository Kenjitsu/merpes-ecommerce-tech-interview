using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.DTOs.Products;

namespace MerpesEcommerce.API.Interfaces;

public interface IProductService
{
    Task<Result<IEnumerable<ProductResponse>>> GetCatalogAsync();
}
