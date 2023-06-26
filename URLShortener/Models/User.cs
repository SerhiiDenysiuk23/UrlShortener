using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLShortener.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; private set; } = false;

        public List<AuthToken> AuthenticationTokens { get; set; }
        public List<UrlAdress> CreatedUrls { get; set; }
    }
}
