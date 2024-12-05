using JetstreamService.Models;
using JetstreamService.Data;
using JetstreamService.Services;

namespace JetstreamService.Services
{
	public interface IUserService
	{
		User ValidateUser(string username, string password);
	}
}
