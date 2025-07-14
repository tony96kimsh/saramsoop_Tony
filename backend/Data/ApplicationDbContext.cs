//using Microsoft.EntityFrameworkCore;
//using backend.Models;

//namespace backend.Data
//{
//    public class ApplicationDbContext : DbContext
//    {
//        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
//        {
//        }

//        public DbSet<User> Users { get; set; }
//        public DbSet<Approval> Approvals { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            base.OnModelCreating(modelBuilder);

//            // Users 테이블 설정
//            modelBuilder.Entity<User>(entity =>
//            {
//                entity.ToTable("users");
//                entity.HasKey(e => e.Id);
                
//                entity.Property(e => e.Id)
//                    .HasColumnName("id")
//                    .ValueGeneratedOnAdd();

//                entity.Property(e => e.EmpNo)
//                    .HasMaxLength(20)
//                    .IsRequired();

//                entity.Property(e => e.Email)
//                    .HasMaxLength(100)
//                    .IsRequired();

//                entity.Property(e => e.Role)
//                    .HasMaxLength(30)
//                    .IsRequired();

//                entity.Property(e => e.Name)
//                    .HasMaxLength(20)
//                    .IsRequired();

//                entity.Property(e => e.Status)
//                    .HasDefaultValue("ACTIVE")
//                    .IsRequired();

//                // 인덱스 설정
//                entity.HasIndex(e => e.EmpNo).IsUnique();
//                entity.HasIndex(e => e.Email).IsUnique();
//                entity.HasIndex(e => e.DepartmentId);
//                entity.HasIndex(e => e.Status);
//            });

//            // Approvals 테이블 설정
//            modelBuilder.Entity<Approval>(entity =>
//            {
//                entity.ToTable("approvals");
//                entity.HasKey(e => e.Id);

//                entity.Property(e => e.Id)
//                    .HasColumnName("id")
//                    .ValueGeneratedOnAdd();

//                entity.Property(e => e.ApprovalStatus)
//                    .HasMaxLength(20);

//                entity.Property(e => e.ApprovalName)
//                    .HasMaxLength(100);

//                entity.Property(e => e.ApprovalType)
//                    .HasMaxLength(50)
//                    .IsRequired();

//                // 외래키 관계 설정
//                entity.HasOne(e => e.Requester)
//                    .WithMany(u => u.RequestedApprovals)
//                    .HasForeignKey(e => e.RequesterId)
//                    .OnDelete(DeleteBehavior.Restrict);

//                entity.HasOne(e => e.Approver)
//                    .WithMany(u => u.ApprovalTasks)
//                    .HasForeignKey(e => e.ApproverId)
//                    .OnDelete(DeleteBehavior.Restrict);

//                // 인덱스 설정
//                entity.HasIndex(e => new { e.RequesterId, e.ApprovalStatus });
//            });
//        }
//    }
//}