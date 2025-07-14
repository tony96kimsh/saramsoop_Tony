// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Attendance> Attendances { get; set; }

        // 나중에 필요하면 Users, LeaveRequests 등 추가
    }
}
