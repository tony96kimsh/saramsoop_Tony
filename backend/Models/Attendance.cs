using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.Models
{
    public class Attendance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("leave_request_id")]
        public int? LeaveRequestId { get; set; }

        [Required]
        [Column("attendance_date")]
        public DateTime AttendanceDate { get; set; }

        [Column("clock_in_time")]
        public DateTime? ClockInTime { get; set; }

        [Column("clock_out_time")]
        public DateTime? ClockOutTime { get; set; }

        [Column("attendance_status")]
        [StringLength(50)]
        public string? AttendanceStatus { get; set; }

        [Column("description")]
        [StringLength(255)]
        public string? Description { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual EmployeeUser? EmployeeUser { get; set; }

        // [ForeignKey("LeaveRequestId")]
        // public virtual LeaveRequest? LeaveRequest { get; set; }
    }
}
