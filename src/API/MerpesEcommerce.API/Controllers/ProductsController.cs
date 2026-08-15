using MerpesEcommerce.API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MerpesEcommerce.API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var result = await _productService.GetCatalogAsync();
        return result.Match<IActionResult>(
            onSuccess: products => Ok(products),
            onFailure: error => StatusCode(error.StatusCode, error)
        );
    }

}
