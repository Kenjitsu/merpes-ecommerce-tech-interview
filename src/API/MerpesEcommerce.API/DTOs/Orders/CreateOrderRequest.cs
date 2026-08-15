namespace MerpesEcommerce.API.DTOs.Orders;

public record CreateOrderRequest(int UserId, List<OrderItemRequest> Items);
