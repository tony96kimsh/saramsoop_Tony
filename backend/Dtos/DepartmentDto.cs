using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    /// <summary>
    /// 부서 생성 DTO
    /// </summary>
    public class CreateDepartmentDto
    {
        [Required(ErrorMessage = "부서코드는 필수입니다.")]
        [StringLength(50, ErrorMessage = "부서코드는 50자를 초과할 수 없습니다.")]
        public string DeptCode { get; set; }

        [Required(ErrorMessage = "부서명은 필수입니다.")]
        [StringLength(50, ErrorMessage = "부서명은 50자를 초과할 수 없습니다.")]
        public string DeptName { get; set; }

        [StringLength(255, ErrorMessage = "설명은 255자를 초과할 수 없습니다.")]
        public string Description { get; set; }
    }

    /// <summary>
    /// 부서 수정 DTO
    /// </summary>
    public class UpdateDepartmentDto
    {
        [Required(ErrorMessage = "부서코드는 필수입니다.")]
        [StringLength(50, ErrorMessage = "부서코드는 50자를 초과할 수 없습니다.")]
        public string DeptCode { get; set; }

        [Required(ErrorMessage = "부서명은 필수입니다.")]
        [StringLength(50, ErrorMessage = "부서명은 50자를 초과할 수 없습니다.")]
        public string DeptName { get; set; }

        [StringLength(255, ErrorMessage = "설명은 255자를 초과할 수 없습니다.")]
        public string Description { get; set; }
    }

    /// <summary>
    /// 부서 응답 DTO
    /// </summary>
    public class DepartmentResponseDto
    {
        public int Id { get; set; }
        public string DeptCode { get; set; }
        public string DeptName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UserCount { get; set; } // 소속 직원 수
    }
}