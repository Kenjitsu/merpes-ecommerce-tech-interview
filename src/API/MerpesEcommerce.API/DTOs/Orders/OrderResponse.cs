namespace MerpesEcommerce.API.DTOs.Orders;

public record OrderResponse(int Id, decimal TotalAmount, DateTime CreatedAt);
