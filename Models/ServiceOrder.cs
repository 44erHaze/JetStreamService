namespace JetstreamService.Models
{ 
    public class ServiceOrder
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Priority { get; set; } // High, Medium, Low
        public string? ServiceType { get; set; } // E.g., "Small Service", "Large Service", etc.
        public string? Status { get; set; } // "Open", "InProgress", "Completed"
        public string? EmployeeComment { get; set; }
        public int? AssignedEmployeeId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}