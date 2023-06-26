using Microsoft.EntityFrameworkCore;
using URLShortener.Data;
using URLShortener.Models;

namespace URLShortener.Services
{
    public class AuthResponse
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? Message { get; set; }

        public AuthResponse(string accessToken, string refreshToken)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public AuthResponse(string accessToken, string refreshToken, string message)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            Message = message;
        }

        public AuthResponse(string message)
        {
            Message = message;
        }
    }


    public class AuthService
    {
        private readonly UrlShortenerDBContext _context;


        public AuthService(UrlShortenerDBContext context)
        {
            _context = context;
        }

        public async Task<AuthResponse> Login(string email, string password)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null || !PassswordService.CompareWithHash(user.Password, password))
                {
                    return new AuthResponse("Wrong password!");
                }

                var accessToken = JwtTokenService.GenerateAccessToken(user);
                var refreshToken = JwtTokenService.GenerateRefreshToken(user);
                var refreshTokenDb = new AuthToken()
                {
                    UserId = user.Id,
                    Token = refreshToken
                };
                _context.AuthTokens.Add(refreshTokenDb);
                await _context.SaveChangesAsync();

                return new AuthResponse(accessToken, refreshToken, "Jwt tokens have been successfully received!");
            }
            catch (Exception exception)
            {
                return new AuthResponse(exception.Message);
            }
        }

        public async Task<AuthResponse> Logout(Guid userId)
        {
            try
            {
                var tokens = _context.AuthTokens.Where(t => t.UserId == userId);
                _context.AuthTokens.RemoveRange(tokens);
                await _context.SaveChangesAsync();

                return new AuthResponse("User has successfully been logged out!");
            }
            catch (Exception exception)
            {
                return new AuthResponse(exception.Message);
            }
        }

        public async Task<AuthResponse> Refresh(Guid userId, string refreshToken)
        {
            try
            {
                //var user = await userRepository.Get(userId);
                var user = await _context.Users.FindAsync(userId);

                var userRefreshTokenDb = await _context.AuthTokens.FirstOrDefaultAsync(x => x.UserId == userId);

                if (userRefreshTokenDb.Token == refreshToken)
                {
                    var newAccessToken = JwtTokenService.GenerateAccessToken(user);
                    var newRefreshToken = JwtTokenService.GenerateRefreshToken(user);
                    userRefreshTokenDb = new AuthToken()
                    {
                        UserId = user.Id,
                        Token = newRefreshToken,
                    };

                    var tokens = _context.AuthTokens.Where(t => t.UserId == userId);
                    _context.AuthTokens.RemoveRange(tokens);
                    await _context.SaveChangesAsync();

                    _context.AuthTokens.Add(userRefreshTokenDb);
                    await _context.SaveChangesAsync();

                    return new AuthResponse(newAccessToken, newRefreshToken, "Jwt tokens have been successfully refreshed!");
                }
                return new AuthResponse("Refresh tokens are different!");
            }
            catch (Exception exception)
            {
                return new AuthResponse(exception.Message);
            }
        }
    }
}
