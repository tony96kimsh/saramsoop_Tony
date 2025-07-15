using System;

namespace backend.Dtos
{
    public class AttendanceDto
    {
        public int Id { get; set; }

        // 내부 조인용 키
        public int UserId { get; set; }
        public int? LeaveRequestId { get; set; }

        // 필수 근태 정보
        public DateTime AttendanceDate { get; set; }
        public DateTime? ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public string AttendanceStatus { get; set; } = string.Empty;
        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // 사용자 정보 (EmployeeUser 조인 결과로 출력 시 포함)
        public string? UserName { get; set; }
        public string? UserEmpNo { get; set; } // Create 시 empNo 기준 조회에 사용
        public string? DepartmentName { get; set; }
        public string? PositionName { get; set; }

        // ✅ 프론트 요약 목록용 필드 (출퇴근 간 근무시간 계산 결과)
        public string? WorkTime { get; set; }
    }
}
