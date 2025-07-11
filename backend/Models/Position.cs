using backend.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Position
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string PositionName { get; set; } = string.Empty;

        [Required]
        public int PositionLevel { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // 관계: 1:N (한 직급에 여러 사용자)
        public ICollection<User>? Users { get; set; }
    }
}
