using MerpesEcommerce.API.DTOs.ApiResponse;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using System.Text;

namespace MerpesEcommerce.API.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class SimulatedAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var authHeader = context.HttpContext.Request.Headers.Authorization.FirstOrDefault();

        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            context.Result = new UnauthorizedObjectResult(
                Result<object>.Failure(new Error("TOKEN_FALTANTE", "Token de autorización faltante."), HttpStatusCode.Unauthorized));

            return;
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var decodedBytes = Convert.FromBase64String(token);
            var decodedToken = Encoding.UTF8.GetString(decodedBytes);
            var parts = decodedToken.Split(':');
            if (parts.Length == 2 && int.TryParse(parts[0], out int userId))
            {
                context.HttpContext.Items["UserId"] = userId;
                return;
            }
        }
        catch {}

        context.Result = new UnauthorizedObjectResult(
            Result<object>.Failure(new Error("TOKEN_INVALIDO", "Token inválido o corrupto."), HttpStatusCode.Unauthorized));
    }
}
