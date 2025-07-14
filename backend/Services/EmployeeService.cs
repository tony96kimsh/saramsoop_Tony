using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        // 전체 직원 목록 조회
        public async Task<List<EmployeeUser>> GetAllAsync()
        {
            return await _context.Users
                .Include(e => e.Department)
                .Include(e => e.Position)
                .ToListAsync();
        }

        // ID로 직원 한 명 조회
        public async Task<EmployeeUser?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(e => e.Department)
                .Include(e => e.Position)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        // 신규 직원 등록
        public async Task<EmployeeUser> CreateAsync(EmployeeUser employee)
        {
            _context.Users.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        // 직원 정보 수정
        public async Task<bool> UpdateAsync(EmployeeUser updatedEmployee)
        {
            _context.Entry(updatedEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(updatedEmployee.Id))
                    return false;
                else
                    throw;
            }
        }

        // 직원 삭제
        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _context.Users.FindAsync(id);
            if (employee == null) return false;

            _context.Users.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }

        // 존재 여부 확인 (내부 전용)
        private bool Exists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
