// Services/Implementations/AttendanceService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<List<Attendance>> GetByUserAsync(int userId);
        Task<Attendance> GetByIdAsync(int id);
        Task AddAsync(Attendance attendance);
        Task UpdateAsync(Attendance attendance);
        Task DeleteAsync(int id);
    }
}
