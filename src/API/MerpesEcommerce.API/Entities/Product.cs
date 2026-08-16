namespace MerpesEcommerce.API.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string ImageUrl { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
}
