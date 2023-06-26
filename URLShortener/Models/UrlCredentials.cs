namespace URLShortener.Models
{
    public class UrlCredentials
    {
        public string OriginalUrl { get; set; }
        public Guid UserCreatorId { get; set; }
    }
}
