using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("users")]
    public class EmployeeUser
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("emp_no")]
        public string EmpNo { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("department_id")]
        public int DepartmentId { get; set; }

        [Required]
        [Column("position_id")]
        public int PositionId { get; set; }

        [Required]
        [MaxLength(30)]
        [Column("role")]
        public string Role { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [Column("password_hash")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Column("birth_date")]
        public DateTime BirthDate { get; set; }

        [Required]
        [MaxLength(30)]
        [Column("phone_no")]
        public string PhoneNo { get; set; } = string.Empty;

        [Required]
        [Column("status")]
        public string Status { get; set; } = "ACTIVE";

        [MaxLength(255)]
        [Column("address")]
        public string? Address { get; set; }

        [MaxLength(30)]
        [Column("zipcode")]
        public string? Zipcode { get; set; }

        [Required]
        [Column("hire_date")]
        public DateTime HireDate { get; set; }

        [Column("resign_date")]
        public DateTime? ResignDate { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("bank_name")]
        public string BankName { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("bank_account")]
        public string BankAccount { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("account_holder")]
        public string AccountHolder { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public Department? Department { get; set; }
        public Position? Position { get; set; }
    }
}
