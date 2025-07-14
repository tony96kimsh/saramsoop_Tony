using backend.Data;
using backend.Repositories.Interfaces;
//using backend.Repositories.Implementations;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

            //builder.Services.AddScoped<IAttendanceRepository, AttendanceRepository>();
            //builder.Services.AddScoped<IAttendanceService, AttendanceService>();

            // 🔥 개발용 JWT 인증 설정
            var jwtKey = "dev-super-secret-key-for-development-only-123456789"; // 개발용 키
            var key = Encoding.ASCII.GetBytes(jwtKey);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // 개발환경에서는 HTTPS 불필요
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = false, // 개발환경에서는 서명 검증 스킵
                    ValidateIssuer = false,           // 발급자 검증 스킵
                    ValidateAudience = false,         // 대상 검증 스킵
                    ValidateLifetime = false,         // 만료시간 검증 스킵
                    ClockSkew = TimeSpan.Zero,

                    // 🔥 개발용: 토큰이 있기만 하면 통과
                    SignatureValidator = (token, parameters) => new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(token)
                };

                // 🔥 개발용 이벤트 핸들러
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine($"✅ 토큰 검증 성공: {context.Principal?.Identity?.Name ?? "개발자"}");
                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"❌ 토큰 검증 실패: {context.Exception.Message}");
                        return Task.CompletedTask;
                    },
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                        Console.WriteLine($"📡 받은 토큰: {token?.Substring(0,20)}...");
                        return Task.CompletedTask;
                    }
                };
            });


            // ✅ CORS 정책
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowDevelopment", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173")
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