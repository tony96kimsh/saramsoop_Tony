using System.ComponentModel.DataAnnotations;
namespace backend.Dtos

{
    public class ApprovalDto
    {
        public int Id { get; set; }
        public int RequesterId { get; set; }
        public int ApproverId { get; set; }
        public string? ApprovalStatus { get; set; }
        public string? ApprovalName { get; set; }
        public string ApprovalType { get; set; } = string.Empty;
        public DateTime? PendingTime { get; set; }
        public DateTime? ApprovedTime { get; set; }
        public DateTime? RejectedTime { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // 추가 정보 (조인된 데이터)
        public string? RequesterName { get; set; }
        public string? RequesterEmpNo { get; set; }
        public string? ApproverName { get; set; }
        public string? ApproverEmpNo { get; set; }
        public string? RequesterDepartment { get; set; }
        public string? RequesterPosition { get; set; }
    }

    public class CreateApprovalDto
    {
        [Required]
        public int ApproverId { get; set; }

        [Required]
        [StringLength(100)]
        public string ApprovalName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string ApprovalType { get; set; } = string.Empty;

        public string? Comments { get; set; }
    }

    public class UpdateApprovalDto
    {
        [Required]
        public int Id { get; set; }

        public int? ApproverId { get; set; }

        [StringLength(100)]
        public string? ApprovalName { get; set; }

        [StringLength(50)]
        public string? ApprovalType { get; set; }

        public string? Comments { get; set; }
    }

    public class ApprovalActionDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Action { get; set; } = string.Empty; // "APPROVE" or "REJECT"

        public string? Comments { get; set; }
    }

    public class ApprovalListRequestDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Status { get; set; }
        public string? Type { get; set; }
        public string? Role { get; set; }
        public int? UserId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? SortBy { get; set; } = "created_at";
        public string? SortOrder { get; set; } = "desc";
    }

    public class ApprovalListResponseDto
    {
        public IEnumerable<ApprovalDto> Approvals { get; set; } = new List<ApprovalDto>();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }

    public class ApprovalStatisticsDto
    {
        public int TotalApprovals { get; set; }
        public int PendingApprovals { get; set; }
        public int ApprovedApprovals { get; set; }
        public int RejectedApprovals { get; set; }
        public double ApprovalRate { get; set; }
    }

}