using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.DTOs.Orders;

namespace MerpesEcommerce.API.Interfaces;

public interface IOrderService
{
    Task<Result<OrderResponse>> CreateOrderAsync(CreateOrderRequest request);
}
