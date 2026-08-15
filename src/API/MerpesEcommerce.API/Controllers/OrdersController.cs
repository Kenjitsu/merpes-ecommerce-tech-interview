using MerpesEcommerce.API.DTOs.Orders;
using MerpesEcommerce.API.Filters;
using MerpesEcommerce.API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MerpesEcommerce.API.Controllers;

[SimulatedAuthorize]
public class OrdersController : BaseApiController
{
    private readonly IOrderService _orderService;
    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        var result = await _orderService.CreateOrderAsync(request);

        return result.Match(
            onSuccess: success => Ok(success),
            onFailure: failure => StatusCode(failure.StatusCode, failure)
        );
    }
}
