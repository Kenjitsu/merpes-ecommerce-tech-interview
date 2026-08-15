using MerpesEcommerce.API.Data;
using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.DTOs.Orders;
using MerpesEcommerce.API.Entities;
using MerpesEcommerce.API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace MerpesEcommerce.API.Services;

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<OrderResponse>> CreateOrderAsync(CreateOrderRequest request)
    {
        var productIds = request.Items.Select(i => i.ProductId).ToList();

        var productsDb = await _context.Products
            .Where(p => productIds.Contains(p.Id))
            .ToListAsync();

        var orderDetails = new List<OrderDetail>();
        decimal totalAmount = 0;

        foreach (var item in request.Items)
        {
            var product = productsDb.FirstOrDefault(p => p.Id == item.ProductId);
            if (product == null) continue;

            var detail = new OrderDetail
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                UnitPrice = product.Price
            };

            orderDetails.Add(detail);
            totalAmount += detail.Quantity * detail.UnitPrice;
        }

        if (orderDetails.Count == 0)
        {
            return Result<OrderResponse>.Failure(new Error("ORDEN_INVALIDA","El pedido no contiene productos válidos."), HttpStatusCode.BadRequest);
        }

        var order = new Order
        {
            UserId = request.UserId,
            TotalAmount = totalAmount,
            OrderDetails = orderDetails
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Result<OrderResponse>.Success(new OrderResponse(order.Id, order.TotalAmount, order.CreatedAt));
    }
}
