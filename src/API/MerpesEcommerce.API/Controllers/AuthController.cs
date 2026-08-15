using MerpesEcommerce.API.DTOs.Auth;
using MerpesEcommerce.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MerpesEcommerce.API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);

        return result.Match<IActionResult>(
           onSuccess: success => Ok(success),
           onFailure: error => StatusCode(error.StatusCode, error)
       );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        return result.Match<IActionResult>(
           onSuccess: success => Ok(success),
           onFailure: error => StatusCode(error.StatusCode, error)
       );
    }
}
