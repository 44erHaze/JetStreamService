using Microsoft.EntityFrameworkCore;
using JetstreamService.Models;
using JetstreamService.Data;


namespace JetstreamService.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<ServiceOrder> ServiceOrders { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServiceOrder>().HasKey(s => s.Id);
            modelBuilder.Entity<Employee>().HasKey(e => e.Id);

            modelBuilder.Entity<ServiceOrder>()
                .Property(s => s.Priority)
                .IsRequired();

            modelBuilder.Entity<Employee>()
                .Property(e => e.Username)
                .IsRequired();
        }
    }
}