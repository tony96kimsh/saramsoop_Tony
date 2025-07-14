using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<EmployeeUser> Users { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 초간단 시드 데이터 예시
            //modelBuilder.Entity<Department>().HasData(new Department { Id = 999, DeptCode = "TST", DeptName = "Test Dept" });

            // 시드 데이터 예시
            //modelBuilder.Entity<Department>().HasData(
            //    new Department
            //    {
            //        Id = 1,
            //        DeptCode = "ENG11",
            //        DeptName = "엔지니어링",
            //        Description = "기술 개발 부서",
            //        CreatedAt = DateTime.SpecifyKind(new DateTime(2024, 1, 1), DateTimeKind.Utc),
            //        UpdatedAt = DateTime.SpecifyKind(new DateTime(2024, 1, 1), DateTimeKind.Utc)
            //    }
            //);

            //modelBuilder.Entity<Position>().HasData(
            //    new Position
            //    {
            //        Id = 1,
            //        PositionName = "팀장",
            //        PositionLevel = 1,
            //        Description = "관리자 레벨",
            //        CreatedAt = DateTime.SpecifyKind(new DateTime(2024, 1, 1), DateTimeKind.Utc),
            //        UpdatedAt = DateTime.SpecifyKind(new DateTime(2024, 1, 1), DateTimeKind.Utc)
            //    }
            //);

            //modelBuilder.Entity<EmployeeUser>().HasData(
            //    new EmployeeUser
            //    {
            //        Id = 1,
            //        Name = "이선우",
            //        Role = "Manager",
            //        Email = "sunwoo.lee@example.com",
            //        EmpNo = "EMP001",
            //        DepartmentId = 1,  // 시드용 부서도 별도로 생성 필요
            //        PositionId = 1,    // 시드용 직급도 별도로 생성 필요
            //        Status = "ACTIVE",
            //        BirthDate = DateTime.SpecifyKind(new DateTime(1988, 3, 12), DateTimeKind.Utc),
            //        PhoneNo = "010-1000-0001",
            //        Address = "서울시 강남구 테헤란로 101",
            //        Zipcode = "06134",
            //        HireDate = DateTime.SpecifyKind(new DateTime(2012, 1, 5), DateTimeKind.Utc),
            //        ResignDate = null,
            //        BankName = "국민은행",
            //        BankAccount = "123-01-000001",
            //        AccountHolder = "이선우",
            //        PasswordHash = "hashed-pw", // 초기값으로 임시 hash
            //        CreatedAt = DateTime.SpecifyKind(new DateTime(2024, 1, 1), DateTimeKind.Utc),
            //        UpdatedAt = DateTime.SpecifyKind(new DateTime(2024, 1, 1), DateTimeKind.Utc)
            //    }
            //);
        }
    }
}
