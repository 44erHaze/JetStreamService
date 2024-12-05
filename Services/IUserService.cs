using JetstreamService.Models;

namespace JetstreamService.Services
{
    public interface IUserService
    {
        Employee ValidateUser(string username, string password);
    }
}
