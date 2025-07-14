public class AttendanceDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? LeaveRequestId { get; set; }
    public DateTime AttendanceDate { get; set; }
    public DateTime? ClockInTime { get; set; }
    public DateTime? ClockOutTime { get; set; }
    public string AttendanceStatus { get; set; }
    public string Description { get; set; }
}