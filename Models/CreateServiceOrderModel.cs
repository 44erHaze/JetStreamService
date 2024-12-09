using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace JetstreamService.Models
{
    public class CreateServiceOrderModel : IValidatableObject
    {
        [Required(ErrorMessage = "Name ist erforderlich.")]
        [RegularExpression(@"^[a-zA-ZäöüÄÖÜß\s]+$", ErrorMessage = "Der Name darf nur Buchstaben enthalten.")]
        public string CustomerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "E-Mail ist erforderlich.")]
        [EmailAddress(ErrorMessage = "Ungültige E-Mail-Adresse.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Telefonnummer ist erforderlich.")]
        [RegularExpression(@"^\d+$", ErrorMessage = "Die Telefonnummer darf nur Zahlen enthalten.")]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Priorität ist erforderlich.")]
        public string Priority { get; set; } = string.Empty;

        [Required(ErrorMessage = "Service-Typ ist erforderlich.")]
        public string ServiceType { get; set; } = string.Empty;

        // Optionale zusätzliche Validierungen
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Phone.Length < 7 || Phone.Length > 15)
            {
                yield return new ValidationResult(
                    "Die Telefonnummer muss zwischen 7 und 15 Ziffern lang sein.",
                    new[] { nameof(Phone) });
            }
        }
    }
}
