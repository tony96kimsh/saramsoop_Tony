using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // DbContext 등록
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // EmployeeService 등록
            builder.Services.AddScoped<EmployeeService>();

            // ======= CORS 정책 추가 =======
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173", "https://localhost:5173") // 프론트엔드 개발 서버 주소
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            // ===================================

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // ======= CORS 미들웨어 활성화 =======
            app.UseCors("AllowFrontend");
            // ===================================

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
