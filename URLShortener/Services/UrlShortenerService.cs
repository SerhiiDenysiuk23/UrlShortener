using System.Text;

namespace URLShortener.Services
{
    public static class UrlShortenerService
    {
        private static readonly Dictionary<string, string> urlMapping = new Dictionary<string, string>();



        public static string ShortenUrl(string originalUrl)
        {
            // Генерация уникального идентификатора (можно использовать другой метод генерации)
            string uniqueId = Guid.NewGuid().ToString("N")[..8];

            // Формирование сокращенного URL
            string shortUrl = $"http://example.com/{uniqueId}";

            // Сохранение связи между сокращенным URL и оригинальным URL
            urlMapping.Add(shortUrl, originalUrl);

            return shortUrl;
        }

        public static string GetOriginalUrl(string shortUrl)
        {
            if (urlMapping.ContainsKey(shortUrl))
            {
                return urlMapping[shortUrl];
            }

            return null; // Short URL not found
        }
    }
}
