using JetstreamService.Data;
using JetstreamService.Models;
using System.Linq;
using BCrypt.Net;

namespace JetstreamService.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public Employee ValidateUser(string username, string password)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Username == username);

            if (employee == null || !BCrypt.Net.BCrypt.Verify(password, employee.PasswordHash))
            {
                return null;
            }

            return employee;
        }
    }
}
