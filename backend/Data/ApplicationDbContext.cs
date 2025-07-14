using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSet 정의
        public DbSet<EmployeeUser> Users { get; set; } //사용자
        public DbSet<Department> Departments { get; set; } //부서
        public DbSet<Position> Positions { get; set; } //직급
        public DbSet<Attendance> Attendances { get; set; } //근태
        public DbSet<Approval> Approvals { get; set; } //결재

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 🔥 Users 테이블 설정
            modelBuilder.Entity<EmployeeUser>(entity =>
            {
                // 인덱스 설정
                entity.HasIndex(e => e.EmpNo).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.DepartmentId);
                entity.HasIndex(e => e.PositionId);
                entity.HasIndex(e => e.Status);

                // 관계 설정
                entity.HasOne(e => e.Department)
                    .WithMany(d => d.Employees)
                    .HasForeignKey(e => e.DepartmentId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Position)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(e => e.PositionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // 🔥 Departments 테이블 설정
            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasIndex(e => e.DeptCode).IsUnique();
            });

            // 🔥 Positions 테이블 설정
            modelBuilder.Entity<Position>(entity =>
            {
                entity.HasIndex(e => e.PositionLevel);
            });

            // 🔥 Attendance 테이블 설정
            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.HasIndex(e => new { e.UserId, e.AttendanceDate });
                entity.HasIndex(e => e.AttendanceDate);

                entity.HasOne(a => a.User)
                    .WithMany(u => u.Attendances)
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // 🔥 Approvals 테이블 설정
            modelBuilder.Entity<Approval>(entity =>
            {
                entity.HasIndex(e => new { e.RequesterId, e.ApprovalStatus });
                entity.HasIndex(e => e.ApproverId);
                entity.HasIndex(e => e.ApprovalType);
                entity.HasIndex(e => e.CreatedAt);

                // 외래키 관계 설정
                entity.HasOne(e => e.Requester)
                    .WithMany(u => u.RequestedApprovals)
                    .HasForeignKey(e => e.RequesterId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Approver)
                    .WithMany(u => u.ApprovalTasks)
                    .HasForeignKey(e => e.ApproverId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // 🔥 기본값 설정
            modelBuilder.Entity<EmployeeUser>()
                .Property(e => e.Status)
                .HasDefaultValue("ACTIVE");

            modelBuilder.Entity<EmployeeUser>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<EmployeeUser>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // 시드 데이터 (개발용)
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // 부서 시드 데이터
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, DeptCode = "DEV", DeptName = "개발팀", Description = "소프트웨어 개발", CreatedAt = DateTime.UtcNow },
                new Department { Id = 2, DeptCode = "HR", DeptName = "인사팀", Description = "인사 관리", CreatedAt = DateTime.UtcNow },
                new Department { Id = 3, DeptCode = "FIN", DeptName = "재무팀", Description = "재무 관리", CreatedAt = DateTime.UtcNow }
            );

            // 직급 시드 데이터
            modelBuilder.Entity<Position>().HasData(
                new Position { Id = 1, PositionName = "사원", PositionLevel = 1, Description = "신입 직원", CreatedAt = DateTime.UtcNow },
                new Position { Id = 2, PositionName = "주임", PositionLevel = 2, Description = "경력 직원", CreatedAt = DateTime.UtcNow },
                new Position { Id = 3, PositionName = "대리", PositionLevel = 3, Description = "중간 관리자", CreatedAt = DateTime.UtcNow },
                new Position { Id = 4, PositionName = "과장", PositionLevel = 4, Description = "팀 리더", CreatedAt = DateTime.UtcNow },
                new Position { Id = 5, PositionName = "부장", PositionLevel = 5, Description = "부서 관리자", CreatedAt = DateTime.UtcNow }
            );
        }
    }
}