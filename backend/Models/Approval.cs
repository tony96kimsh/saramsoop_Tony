using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Approval
    {
        [Key]
        [Column("id")] 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // 자동 생성 명시
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
        [ForeignKey(nameof(RequesterId))]
        public virtual EmployeeUser Requester { get; set; } = null!;

        [ForeignKey(nameof(ApproverId))]
        public virtual EmployeeUser Approver { get; set; } = null!;
    }
    
}