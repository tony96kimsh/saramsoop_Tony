using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// 사용자(직원) 모델 정의

namespace backend.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("emp_no")]
        [StringLength(20)]
        // 사원 번호 (로그인 아이디)
        public string EmpNo { get; set; } = string.Empty;

        [Required]
        [Column("email")]
        [StringLength(100)]
        // 이메일 주소
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("department_id")]
        //부서 ID (외래키)
        public int DepartmentId { get; set; }

        [Required]
        [Column("position_id")]
        //직급 ID (외래키)
        public int PositionId { get; set; }

        [Required]
        [Column("role")]
        [StringLength(30)]
        //직책명(권한)
        public string Role { get; set; } = string.Empty;

        [Required]
        [Column("name")]
        [StringLength(20)]
        //사원 이름
        public string Name { get; set; } = string.Empty;

        [Required]
        [Column("password_hash")]
        [StringLength(255)]
        // 암호화된 비밀번호
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Column("birth_date")]
        //생년월일
        public DateTime BirthDate { get; set; }

        [Required]
        [Column("phone_no")]
        [StringLength(30)]
        //연락처
        public string PhoneNo { get; set; } = string.Empty;

        [Required]
        [Column("status")]
        //재직 상태 (ACTIVE, INACTIVE)
        public string Status { get; set; } = "ACTIVE";

        [Column("address")]
        [StringLength(255)]
        //주소
        public string? Address { get; set; }

        [Column("zipcode")]
        [StringLength(30)]
        //우편번호
        public string? Zipcode { get; set; }

        [Required]
        [Column("hire_date")]
        ///입사날짜
        public DateTime HireDate { get; set; }

        [Column("resign_date")]
        //퇴사날짜
        public DateTime? ResignDate { get; set; }

        [Required]
        [Column("bank_name")]
        [StringLength(20)]
        //은행명
        public string BankName { get; set; } = string.Empty;

        [Required]
        [Column("bank_account")]
        [StringLength(30)]
        //계좌번호
        public string BankAccount { get; set; } = string.Empty;

        [Required]
        [Column("account_holder")]
        [StringLength(20)]
        //예금주명
        public string AccountHolder { get; set; } = string.Empty;

        [Column("created_at")]
        //생성 시간
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        //수정 시간
        public DateTime? UpdatedAt { get; set; }

        //부서 정보
        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }

        //직급 정보
        [ForeignKey("PositionId")]
        public virtual Position Position { get; set; }
    }
}
