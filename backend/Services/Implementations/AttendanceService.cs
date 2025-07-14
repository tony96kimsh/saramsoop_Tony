// Services/Implementations/AttendanceService.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Dtos;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class AttendanceService : IAttendanceService
    {
        private readonly AppDbContext _context;

        public AttendanceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<AttendanceDto>> GetAttendanceByUser(int userId)
        {
            var list = await _context.Attendances
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return list.Select(ToDto).ToList();
        }

        public async Task<List<AttendanceDto>> GetAttendanceByEmpNo(string empNo)
        {
            var user = await _context.Users
                .OfType<EmployeeUser>() // ✅ 명시적으로 EmployeeUser로 제한
                .FirstOrDefaultAsync(u => u.EmpNo == empNo);

            if (user == null) return new List<AttendanceDto>();

            var list = await _context.Attendances
                .Where(a => a.UserId == user.Id)
                .ToListAsync();

            return list.Select(ToDto).ToList();
        }

        public async Task CreateAttendance(AttendanceDto dto)
        {
            var user = await _context.Users
                .OfType<EmployeeUser>() // ✅ 정확한 타입 지정
                .FirstOrDefaultAsync(u => u.EmpNo == dto.UserEmpNo);

            if (user == null) throw new Exception("존재하지 않는 사용자입니다.");

            var entity = new Attendance
            {
                UserId = user.Id,
                LeaveRequestId = dto.LeaveRequestId,
                AttendanceDate = dto.AttendanceDate,
                ClockInTime = dto.ClockInTime,
                ClockOutTime = dto.ClockOutTime,
                AttendanceStatus = dto.AttendanceStatus,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Attendances.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAttendance(int id, AttendanceDto dto)
        {
            var entity = await _context.Attendances.FindAsync(id);
            if (entity == null) throw new Exception("Attendance not found");

            entity.LeaveRequestId = dto.LeaveRequestId;
            entity.ClockInTime = dto.ClockInTime;
            entity.ClockOutTime = dto.ClockOutTime;
            entity.AttendanceStatus = dto.AttendanceStatus;
            entity.Description = dto.Description;
            entity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAttendance(int id)
        {
            var entity = await _context.Attendances.FindAsync(id);
            if (entity != null)
            {
                _context.Attendances.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        private AttendanceDto ToDto(Attendance a) => new AttendanceDto
        {
            Id = a.Id,
            UserId = a.UserId,
            LeaveRequestId = a.LeaveRequestId,
            AttendanceDate = a.AttendanceDate,
            ClockInTime = a.ClockInTime,
            ClockOutTime = a.ClockOutTime,
            AttendanceStatus = a.AttendanceStatus ?? string.Empty,
            Description = a.Description
        };
    }
}
