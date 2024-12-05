using JetstreamService.Models;
using BCrypt.Net;

namespace JetstreamService.Data
{
    public static class DatabaseSeeder
    {
        public static void SeedEmployees(AppDbContext context)
        {
            if (!context.Employees.Any())
            {
                context.Employees.Add(new Employee
                {
                    Username = "admin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                    IsLocked = false
                });
                context.SaveChanges();
            }
        }
    }
}
