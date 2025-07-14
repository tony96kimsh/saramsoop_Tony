using backend.Data;
using backend.Repositories.Interfaces;
using backend.Repositories.Implementations;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // 🔥 PostgreSQL 데이터베이스 연결 설정
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString, npgsqlOptions =>
                {
                    // PostgreSQL 특화 설정
                    npgsqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 3,
                        maxRetryDelay: TimeSpan.FromSeconds(5),
                        errorCodesToAdd: null);
                })
                .EnableSensitiveDataLogging(builder.Environment.IsDevelopment()) // 개발환경에서만 민감한 데이터 로깅
                .EnableDetailedErrors(builder.Environment.IsDevelopment()); // 개발환경에서만 자세한 에러
            });

            // ✅ 서비스 및 레포지토리 DI 등록
            builder.Services.AddScoped<EmployeeService>();
            builder.Services.AddScoped<ApprovalService>();

            builder.Services.AddScoped<IAttendanceRepository, AttendanceRepository>();
            builder.Services.AddScoped<IAttendanceService, AttendanceService>();

            // ✅ CORS 정책
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowDevelopment", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173", "http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });

                options.AddPolicy("AllowAll", policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();

                // 🔥 개발환경에서 데이터베이스 자동 생성/마이그레이션
                using (var scope = app.Services.CreateScope())
                {
                    try
                    {
                        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                        // 데이터베이스 생성 (없으면)
                        context.Database.EnsureCreated();

                        // 또는 마이그레이션 적용 (마이그레이션 파일이 있다면)
                        // context.Database.Migrate();

                        Console.WriteLine("✅ 데이터베이스 연결 및 초기화 성공");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ 데이터베이스 초기화 실패: {ex.Message}");
                    }
                }
            }

            //app.UseHttpsRedirection();

            app.UseCors("AllowAll");
            app.UseRouting();
            app.UseAuthorization();
            app.MapControllers();

            Console.WriteLine("🚀 Server starting...");
            Console.WriteLine($"🔗 Database: PostgreSQL");
            Console.WriteLine($"🌍 CORS: All origins allowed");
            Console.WriteLine($"📡 Listening on: http://localhost:5277");
            Console.WriteLine($"📊 Swagger UI: http://localhost:5277/swagger");


            app.Run();
        }
    }
}