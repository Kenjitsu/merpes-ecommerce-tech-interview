namespace MerpesEcommerce.API.DTOs.Products;

public record ProductResponse(int Id, string Name, string ImageUrl, string Description, decimal Price);