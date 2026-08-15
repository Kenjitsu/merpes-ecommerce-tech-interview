using System.ComponentModel.DataAnnotations;

namespace MerpesEcommerce.API.DTOs.Orders;

public record CreateOrderRequest(
    [Required] int UserId,
    [Required] List<OrderItemRequest> Items
 );
