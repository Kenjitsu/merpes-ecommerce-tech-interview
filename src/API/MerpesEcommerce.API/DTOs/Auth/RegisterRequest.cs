using System.ComponentModel.DataAnnotations;

namespace MerpesEcommerce.API.DTOs.Auth;

public record RegisterRequest(
    [Required] string Name, 
    [Required] [EmailAddress] string Email, 
    [Required] string Password
 );
