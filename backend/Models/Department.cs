using backend.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string DeptCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string DeptName { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // 관계: 1:N (한 부서에 여러 사용자)
        public ICollection<User>? Users { get; set; }
    }
}
