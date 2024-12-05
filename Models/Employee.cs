public class Employee
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public bool IsLocked { get; set; } = false;
}
