using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Approval
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("requester_id")]
        public int RequesterId { get; set; }

        [Required]
        [Column("approver_id")]
        public int ApproverId { get; set; }

        [Column("approval_status")]
        [StringLength(20)]
        public string? ApprovalStatus { get; set; }

        [Column("approval_name")]
        [StringLength(100)]
        public string? ApprovalName { get; set; }

        [Required]
        [Column("approval_type")]
        [StringLength(50)]
        public string ApprovalType { get; set; } = string.Empty;

        [Column("pending_time")]
        public DateTime? PendingTime { get; set; }

        [Column("approved_time")]
        public DateTime? ApprovedTime { get; set; }

        [Column("rejected_time")]
        public DateTime? RejectedTime { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("RequesterId")]
        public virtual User? Requester { get; set; }

        [ForeignKey("ApproverId")]
        public virtual User? Approver { get; set; }
    }

    // User 모델 (참조용)
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("emp_no")]
        [StringLength(20)]
        public string EmpNo { get; set; } = string.Empty;

        [Required]
        [Column("email")]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("department_id")]
        public int DepartmentId { get; set; }

        [Required]
        [Column("position_id")]
        public int PositionId { get; set; }

        [Required]
        [Column("role")]
        [StringLength(30)]
        public string Role { get; set; } = string.Empty;

        [Required]
        [Column("name")]
        [StringLength(20)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Column("password_hash")]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Column("birth_date")]
        public DateTime BirthDate { get; set; }

        [Required]
        [Column("phone_no")]
        [StringLength(30)]
        public string PhoneNo { get; set; } = string.Empty;

        [Required]
        [Column("status")]
        public string Status { get; set; } = "ACTIVE";

        [Column("address")]
        [StringLength(255)]
        public string? Address { get; set; }

        [Column("zipcode")]
        [StringLength(30)]
        public string? Zipcode { get; set; }

        [Required]
        [Column("hire_date")]
        public DateTime HireDate { get; set; }

        [Column("resign_date")]
        public DateTime? ResignDate { get; set; }

        [Required]
        [Column("bank_name")]
        [StringLength(20)]
        public string BankName { get; set; } = string.Empty;

        [Required]
        [Column("bank_account")]
        [StringLength(30)]
        public string BankAccount { get; set; } = string.Empty;

        [Required]
        [Column("account_holder")]
        [StringLength(20)]
        public string AccountHolder { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Approval> RequestedApprovals { get; set; } = new List<Approval>();
        public virtual ICollection<Approval> ApprovalTasks { get; set; } = new List<Approval>();
    }
}