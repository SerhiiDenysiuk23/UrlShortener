using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLShortener.Models
{
    public class UrlAdress
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string OriginalUrl { get; set; }
        public string ShortUrl { get; set; }
        public string? Desctiption { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public Guid UserCreatorId { get; set; }
        public User UserCreator { get; set; }
    }
}
