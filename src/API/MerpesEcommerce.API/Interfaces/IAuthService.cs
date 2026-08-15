using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.DTOs.Auth;

namespace MerpesEcommerce.API.Interfaces;

public interface IAuthService
{
    Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<Result<AuthResponse?>> LoginAsync(LoginRequest request);
}
