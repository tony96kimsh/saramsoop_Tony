// Services/interfaces/iAttendanceService.cs

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services.Interfaces
{
    public interface IAttendanceService
    {
        Task<List<AttendanceDto>> GetAttendanceByUser(int userId);
        Task<List<AttendanceDto>> GetAttendanceByEmpNo(string empNo); // 사번으로 조회 추가
        Task CreateAttendance(AttendanceDto dto);
        Task UpdateAttendance(int id, AttendanceDto dto);
        Task DeleteAttendance(int id);
    }
}
