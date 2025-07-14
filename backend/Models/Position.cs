using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("positions")]
    public class Position
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("position_name")]
        public string PositionName { get; set; } = string.Empty;

        [Required]
        [Column("position_level")]
        public int PositionLevel { get; set; }

        [MaxLength(255)]
        [Column("description")]
        public string? Description { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        public ICollection<EmployeeUser>? Users { get; set; }
    }
}
