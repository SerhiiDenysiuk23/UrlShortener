﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using URLShortener.Models;

namespace URLShortener.Services
{
    public class JwtTokenService
    {
        public static IConfiguration Configuration { get; set; }

        public static string GenerateJwtToken(IEnumerable<Claim> claims, int tokenDurationInSeconds)
        {
			var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:JWT_SECRET_KEY"]));
			var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
			var jwtSecurityToken = new JwtSecurityToken(
				issuer: Configuration["Jwt:JWT_TOKEN_ISSUER"],
				audience: Configuration["Jwt:JWT_TOKEN_AUDIENCE"],
				notBefore: DateTime.Now,
				claims: claims,
				expires: DateTime.Now.AddSeconds(tokenDurationInSeconds),
				signingCredentials: credentials
			);
			return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }

        public static IEnumerable<Claim> GetJwtTokenClaims(User user)
        {
            return new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("UserEmail", user.Email),
                new Claim("UserIsAdmin", user.IsAdmin.ToString())
            };
        }

        public static string GenerateAccessToken(User user) => GenerateJwtToken(GetJwtTokenClaims(user), 60);

        public static string GenerateRefreshToken(User user) => GenerateJwtToken(GetJwtTokenClaims(user), 2592000);
    }
}
