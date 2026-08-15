using MerpesEcommerce.API.Data;
using MerpesEcommerce.API.DTOs.ApiResponse;
using MerpesEcommerce.API.DTOs.Auth;
using MerpesEcommerce.API.Entities;
using MerpesEcommerce.API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace MerpesEcommerce.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<AuthResponse?>> LoginAsync(LoginRequest request)
    {
        var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Result<AuthResponse?>.Failure(new Error("CREDENCIALES_INVALIDAS", "Usuario o contraseña incorrectos."), HttpStatusCode.Unauthorized);
        }

        var plainTextToken = $"{user.Id}:{user.Email}";
        var simulatedToken = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(plainTextToken));
        return Result<AuthResponse?>.Success(new AuthResponse(user.Id, user.Name, user.Email, simulatedToken));
    }

    public async Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request)
    {
        var userExists = await _context.AppUsers.AnyAsync(u => u.Email == request.Email);
        if (userExists)
        {
            return Result<AuthResponse>.Failure(new Error("CORREO_EXISTENTE", "El correo ya está registrado."), HttpStatusCode.BadRequest);
        }

        var user = new AppUser
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.AppUsers.Add(user);
        await _context.SaveChangesAsync();

        var plainTextToken = $"{user.Id}:{user.Email}";
        var simulatedToken = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(plainTextToken));
        return Result<AuthResponse>.Success(new AuthResponse(user.Id, user.Name, user.Email, simulatedToken));
    }
}
