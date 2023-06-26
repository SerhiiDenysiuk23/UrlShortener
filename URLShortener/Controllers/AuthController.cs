using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using URLShortener.Data;
using URLShortener.Models;
using URLShortener.Services;

namespace URLShortener.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UrlShortenerDBContext _context;
        private readonly AuthService _authService;

        public AuthController(UrlShortenerDBContext context)
        {
            _context = context;
            _authService = new AuthService(context);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginCredentials login)
        {
            try
            {
                var authenticationServiceResponse = await _authService.Login(login.Email, login.Password);
                var authenticationServiceApiResponse = new AuthResponse(authenticationServiceResponse.AccessToken, authenticationServiceResponse.RefreshToken);
                return Ok(authenticationServiceApiResponse);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult> LogOut(Guid userId)
        {
            var authenticationServiceResponse = await _authService.Logout(userId);
            var authenticationServiceApiResponse = new AuthResponse(authenticationServiceResponse.AccessToken, authenticationServiceResponse.RefreshToken);

            return Ok(authenticationServiceApiResponse);
        }

        [HttpPost("refresh/{userId}")]
        public async Task<ActionResult> Refresh(Guid userId, string refreshToken)
        {
            var authenticationServiceResponse = await _authService.Refresh(userId, refreshToken);
            var authenticationServiceApiResponse = new AuthResponse(authenticationServiceResponse.AccessToken, authenticationServiceResponse.RefreshToken);

            return Ok(authenticationServiceApiResponse);
        }
    }
}
