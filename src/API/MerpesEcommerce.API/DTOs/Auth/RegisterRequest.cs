using System.ComponentModel.DataAnnotations;

namespace MerpesEcommerce.API.DTOs.Auth;

public record RegisterRequest(
    [Required] string Name, 
    [EmailAddress] string Email, 
    [Required] string Password
 );
