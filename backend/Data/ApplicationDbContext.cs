using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<EmployeeUser> Users { get; set; }
        public DbSet<Approval> Approvals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Users 테이블 설정
            modelBuilder.Entity<EmployeeUser>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.EmpNo)
                    .HasMaxLength(20)
                    .IsRequired();

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.Role)
                    .HasMaxLength(30)
                    .IsRequired();

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsRequired();

                entity.Property(e => e.Status)
                    .HasDefaultValue("ACTIVE")
                    .IsRequired();

                // 인덱스 설정
                entity.HasIndex(e => e.EmpNo).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.DepartmentId);
                entity.HasIndex(e => e.Status);
            });

            // Approvals 테이블 설정
            modelBuilder.Entity<Approval>(entity =>
            {
                entity.ToTable("approvals");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ApprovalStatus)
                    .HasColumnName("approval_status")
                    .HasMaxLength(20);

                entity.Property(e => e.ApprovalName)
                    .HasColumnName("approval_name")
                    .HasMaxLength(100);

                entity.Property(e => e.ApprovalType)
                    .HasColumnName("approval_type")
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.RequesterId)
                    .HasColumnName("requester_id");

                entity.Property(e => e.ApproverId)
                    .HasColumnName("approver_id");

                entity.Property(e => e.PendingTime)
                    .HasColumnName("pending_time");

                entity.Property(e => e.ApprovedTime)
                    .HasColumnName("approved_time");

                entity.Property(e => e.RejectedTime)
                    .HasColumnName("rejected_time");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at");

                // 🔥 핵심: Fluent API로 관계 설정 (EmployeeUser 수정 없이!)
                entity.HasOne(e => e.Requester)
                    .WithMany() // ⭐ WithMany()만 사용 - 네비게이션 프로퍼티 지정 안함
                    .HasForeignKey(e => e.RequesterId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Approver)
                    .WithMany() // ⭐ WithMany()만 사용 - 네비게이션 프로퍼티 지정 안함
                    .HasForeignKey(e => e.ApproverId)
                    .OnDelete(DeleteBehavior.Restrict);

                // 인덱스 설정
                entity.HasIndex(e => new { e.RequesterId, e.ApprovalStatus });
                entity.HasIndex(e => e.ApproverId);
                entity.HasIndex(e => e.ApprovalType);
                entity.HasIndex(e => e.CreatedAt);
            });
        }
    }
}