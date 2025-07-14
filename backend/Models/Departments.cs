using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    /// <summary>
    /// 부서 정보 모델
    /// </summary>
    [Table("departments")]
    public class Department
    {
        /// <summary>
        /// 부서 ID (Primary Key)
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// 부서 코드
        /// </summary>
        [Required]
        [StringLength(50)]
        [Column("dept_code")]
        public string DeptCode { get; set; }

        /// <summary>
        /// 부서명
        /// </summary>
        [Required]
        [StringLength(50)]
        [Column("dept_name")]
        public string DeptName { get; set; }

        /// <summary>
        /// 부가 설명
        /// </summary>
        [StringLength(255)]
        public string Description { get; set; }

        /// <summary>
        /// 생성 시간
        /// </summary>
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// 수정 시간
        /// </summary>
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // 네비게이션 프로퍼티
        /// <summary>
        /// 해당 부서의 직원 목록
        /// </summary>
        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}