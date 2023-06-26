using Microsoft.EntityFrameworkCore;
using URLShortener.Models;

namespace URLShortener.Data
{
    public class UrlShortenerDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UrlAdress> UrlAdresses { get; set; }
        public DbSet<AuthToken> AuthTokens { get; set; }
        
        public UrlShortenerDBContext(DbContextOptions options) : base(options) 
        { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.AuthenticationTokens)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.CreatedUrls)
                .WithOne(url => url.UserCreator)
                .HasForeignKey(url => url.UserCreatorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
