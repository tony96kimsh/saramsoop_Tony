using System;

namespace backend.Dtos
{
    public class AttendanceDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? LeaveRequestId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public DateTime? ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public string AttendanceStatus { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // 🔽 추가 정보 (User 테이블 조인)
        public string? UserName { get; set; }
        public string? UserEmpNo { get; set; }
        public string? DepartmentName { get; set; }
        public string? PositionName { get; set; }
    }
}