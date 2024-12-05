namespace JetstreamService.Models
{
    public class CreateServiceOrderModel
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Priority { get; set; }
        public string ServiceType { get; set; }
    }
}
