// Services/interfaces/iAttendanceService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Dtos;

namespace backend.Services.Interfaces
{
    public interface IAttendanceService
    {
        Task<List<AttendanceDto>> GetAttendanceByUser(int userId);
        Task CreateAttendance(AttendanceDto dto);
        Task UpdateAttendance(int id, AttendanceDto dto);
        Task DeleteAttendance(int id);
    }

    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _repository;

        public AttendanceService(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<AttendanceDto>> GetAttendanceByUser(int userId)
        {
            var list = await _repository.GetByUserAsync(userId);
            return list.Select(a => new AttendanceDto
            {
                Id = a.Id,
                UserId = a.UserId,
                LeaveRequestId = a.LeaveRequestId,
                AttendanceDate = a.AttendanceDate,
                ClockInTime = a.ClockInTime,
                ClockOutTime = a.ClockOutTime,
                AttendanceStatus = a.AttendanceStatus,
                Description = a.Description
            }).ToList();
        }

        public async Task CreateAttendance(AttendanceDto dto)
        {
            var entity = new Attendance
            {
                UserId = dto.UserId,
                LeaveRequestId = dto.LeaveRequestId,
                AttendanceDate = dto.AttendanceDate,
                ClockInTime = dto.ClockInTime,
                ClockOutTime = dto.ClockOutTime,
                AttendanceStatus = dto.AttendanceStatus,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAttendance(int id, AttendanceDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) throw new Exception("Attendance not found");

            entity.LeaveRequestId = dto.LeaveRequestId;
            entity.ClockInTime = dto.ClockInTime;
            entity.ClockOutTime = dto.ClockOutTime;
            entity.AttendanceStatus = dto.AttendanceStatus;
            entity.Description = dto.Description;
            entity.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAttendance(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
