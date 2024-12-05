namespace JetstreamService.Models
{
    public class CreateServiceOrderModel
    {
        public string CustomerName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string ServiceType { get; set; } = string.Empty;
    }
}
