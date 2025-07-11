using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class EmployeeUser
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string EmpNo { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        public int PositionId { get; set; }

        [Required]
        [MaxLength(30)]
        public string Role { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        [MaxLength(30)]
        public string PhoneNo { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "ACTIVE";

        [MaxLength(255)]
        public string? Address { get; set; }

        [MaxLength(30)]
        public string? Zipcode { get; set; }

        [Required]
        public DateTime HireDate { get; set; }

        public DateTime? ResignDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string BankName { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string BankAccount { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string AccountHolder { get; set; } = string.Empty;

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public Department? Department { get; set; }
        public Position? Position { get; set; }
    }
}
