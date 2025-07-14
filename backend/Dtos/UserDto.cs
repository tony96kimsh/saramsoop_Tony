using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    /// <summary>
    /// 사용자 생성 DTO
    /// </summary>
    public class CreateUserDto
    {
        [Required(ErrorMessage = "사원번호는 필수입니다.")]
        [StringLength(20, ErrorMessage = "사원번호는 20자를 초과할 수 없습니다.")]
        public string EmpNo { get; set; }

        [Required(ErrorMessage = "이메일은 필수입니다.")]
        [EmailAddress(ErrorMessage = "올바른 이메일 형식이 아닙니다.")]
        [StringLength(100, ErrorMessage = "이메일은 100자를 초과할 수 없습니다.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "부서는 필수입니다.")]
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "직급은 필수입니다.")]
        public int PositionId { get; set; }

        [Required(ErrorMessage = "직책명은 필수입니다.")]
        [StringLength(30, ErrorMessage = "직책명은 30자를 초과할 수 없습니다.")]
        public string Role { get; set; }

        [Required(ErrorMessage = "이름은 필수입니다.")]
        [StringLength(20, ErrorMessage = "이름은 20자를 초과할 수 없습니다.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "비밀번호는 필수입니다.")]
        [MinLength(8, ErrorMessage = "비밀번호는 최소 8자 이상이어야 합니다.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "생년월일은 필수입니다.")]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "연락처는 필수입니다.")]
        [StringLength(30, ErrorMessage = "연락처는 30자를 초과할 수 없습니다.")]
        public string PhoneNo { get; set; }

        [StringLength(255, ErrorMessage = "주소는 255자를 초과할 수 없습니다.")]
        public string Address { get; set; }

        [StringLength(30, ErrorMessage = "우편번호는 30자를 초과할 수 없습니다.")]
        public string Zipcode { get; set; }

        [Required(ErrorMessage = "입사날짜는 필수입니다.")]
        public DateTime HireDate { get; set; }

        [Required(ErrorMessage = "은행명은 필수입니다.")]
        [StringLength(20, ErrorMessage = "은행명은 20자를 초과할 수 없습니다.")]
        public string BankName { get; set; }

        [Required(ErrorMessage = "계좌번호는 필수입니다.")]
        [StringLength(30, ErrorMessage = "계좌번호는 30자를 초과할 수 없습니다.")]
        public string BankAccount { get; set; }

        [Required(ErrorMessage = "예금주명은 필수입니다.")]
        [StringLength(20, ErrorMessage = "예금주명은 20자를 초과할 수 없습니다.")]
        public string AccountHolder { get; set; }
    }

    /// <summary>
    /// 사용자 수정 DTO
    /// </summary>
    public class UpdateUserDto
    {
        [Required(ErrorMessage = "이메일은 필수입니다.")]
        [EmailAddress(ErrorMessage = "올바른 이메일 형식이 아닙니다.")]
        [StringLength(100, ErrorMessage = "이메일은 100자를 초과할 수 없습니다.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "부서는 필수입니다.")]
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "직급은 필수입니다.")]
        public int PositionId { get; set; }

        [Required(ErrorMessage = "직책명은 필수입니다.")]
        [StringLength(30, ErrorMessage = "직책명은 30자를 초과할 수 없습니다.")]
        public string Role { get; set; }

        [Required(ErrorMessage = "이름은 필수입니다.")]
        [StringLength(20, ErrorMessage = "이름은 20자를 초과할 수 없습니다.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "연락처는 필수입니다.")]
        [StringLength(30, ErrorMessage = "연락처는 30자를 초과할 수 없습니다.")]
        public string PhoneNo { get; set; }

        [StringLength(20, ErrorMessage = "상태는 20자를 초과할 수 없습니다.")]
        public string Status { get; set; }

        [StringLength(255, ErrorMessage = "주소는 255자를 초과할 수 없습니다.")]
        public string Address { get; set; }

        [StringLength(30, ErrorMessage = "우편번호는 30자를 초과할 수 없습니다.")]
        public string Zipcode { get; set; }

        public DateTime? ResignDate { get; set; }

        [Required(ErrorMessage = "은행명은 필수입니다.")]
        [StringLength(20, ErrorMessage = "은행명은 20자를 초과할 수 없습니다.")]
        public string BankName { get; set; }

        [Required(ErrorMessage = "계좌번호는 필수입니다.")]
        [StringLength(30, ErrorMessage = "계좌번호는 30자를 초과할 수 없습니다.")]
        public string BankAccount { get; set; }

        [Required(ErrorMessage = "예금주명은 필수입니다.")]
        [StringLength(20, ErrorMessage = "예금주명은 20자를 초과할 수 없습니다.")]
        public string AccountHolder { get; set; }
    }

    /// <summary>
    /// 사용자 응답 DTO
    /// </summary>
    public class UserResponseDto
    {
        public int Id { get; set; }
        public string EmpNo { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNo { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public string Zipcode { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime? ResignDate { get; set; }
        public string BankName { get; set; }
        public string BankAccount { get; set; }
        public string AccountHolder { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// 로그인 요청 DTO
    /// </summary>
    public class LoginDto
    {
        [Required(ErrorMessage = "사원번호는 필수입니다.")]
        public string EmpNo { get; set; }

        [Required(ErrorMessage = "비밀번호는 필수입니다.")]
        public string Password { get; set; }
    }

    /// <summary>
    /// 로그인 응답 DTO
    /// </summary>
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public UserResponseDto User { get; set; }
    }

    /// <summary>
    /// 비밀번호 재설정 요청 DTO
    /// </summary>
    public class PasswordResetRequestDto
    {
        [Required(ErrorMessage = "이메일은 필수입니다.")]
        [EmailAddress(ErrorMessage = "올바른 이메일 형식이 아닙니다.")]
        public string Email { get; set; }
    }

    /// <summary>
    /// 비밀번호 재설정 DTO
    /// </summary>
    public class PasswordResetDto
    {
        [Required(ErrorMessage = "토큰은 필수입니다.")]
        public string Token { get; set; }

        [Required(ErrorMessage = "새 비밀번호는 필수입니다.")]
        [MinLength(8, ErrorMessage = "비밀번호는 최소 8자 이상이어야 합니다.")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "비밀번호 확인은 필수입니다.")]
        [Compare("NewPassword", ErrorMessage = "비밀번호가 일치하지 않습니다.")]
        public string ConfirmPassword { get; set; }
    }
}