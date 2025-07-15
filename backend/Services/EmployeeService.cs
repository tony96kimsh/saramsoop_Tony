// Services/EmployeeService.cs
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EmployeeService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<EmployeeService> _logger;

        public EmployeeService(ApplicationDbContext context, ILogger<EmployeeService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<EmployeeUser>> GetAllAsync()
        {
            try
            {
                _logger.LogInformation("📡 GetAllAsync 호출됨");

                var employees = await _context.Users
                    .Include(e => e.Department)  // Department 조인
                    .Include(e => e.Position)    // Position 조인
                    .OrderBy(e => e.Name)
                    .ToListAsync();

                _logger.LogInformation($"✅ {employees.Count}명의 직원 데이터 조회됨");
                return employees;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ GetAllAsync 중 오류 발생");
                throw;
            }
        }

        public async Task<EmployeeUser?> GetByIdAsync(int id)
        {
            try
            {
                _logger.LogInformation($"📡 GetByIdAsync({id}) 호출됨");

                var employee = await _context.Users
                    .Include(e => e.Department)
                    .Include(e => e.Position)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (employee != null)
                {
                    _logger.LogInformation($"✅ 직원 {employee.Name} 조회됨");
                }
                else
                {
                    _logger.LogWarning($"⚠️ 직원 ID {id} 찾을 수 없음");
                }

                return employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"❌ GetByIdAsync({id}) 중 오류 발생");
                throw;
            }
        }

        public async Task<EmployeeUser> CreateAsync(EmployeeUser employee)
        {
            try
            {
                _logger.LogInformation($"📡 CreateAsync 호출됨 - {employee.Name}");

                // 기본값 설정
                employee.CreatedAt = DateTime.UtcNow;
                employee.UpdatedAt = DateTime.UtcNow;
                employee.Status = "ACTIVE";

                // EmpNo 자동 생성 (없는 경우)
                if (string.IsNullOrEmpty(employee.EmpNo))
                {
                    employee.EmpNo = await GenerateEmpNoAsync();
                }

                _context.Users.Add(employee);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"✅ 직원 {employee.Name} 생성됨 (ID: {employee.Id})");
                return employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"❌ CreateAsync 중 오류 발생 - {employee.Name}");
                throw;
            }
        }

        public async Task<bool> UpdateAsync(EmployeeUser employee)
        {
            try
            {
                _logger.LogInformation($"📡 UpdateAsync 호출됨 - ID: {employee.Id}");

                employee.UpdatedAt = DateTime.UtcNow;

                _context.Entry(employee).State = EntityState.Modified;
                var result = await _context.SaveChangesAsync();

                _logger.LogInformation($"✅ 직원 ID {employee.Id} 수정됨");
                return result > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"❌ UpdateAsync 중 오류 발생 - ID: {employee.Id}");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                _logger.LogInformation($"📡 DeleteAsync({id}) 호출됨");

                var employee = await _context.Users.FindAsync(id);
                if (employee == null)
                {
                    _logger.LogWarning($"⚠️ 삭제할 직원 ID {id} 찾을 수 없음");
                    return false;
                }

                _context.Users.Remove(employee);
                var result = await _context.SaveChangesAsync();

                _logger.LogInformation($"✅ 직원 ID {id} 삭제됨");
                return result > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"❌ DeleteAsync({id}) 중 오류 발생");
                return false;
            }
        }

        // 직원번호 자동 생성
        private async Task<string> GenerateEmpNoAsync()
        {
            var lastEmployee = await _context.Users
                .OrderByDescending(e => e.Id)
                .FirstOrDefaultAsync();

            var nextNumber = (lastEmployee?.Id ?? 0) + 1;
            return $"EMP{nextNumber:D6}"; // EMP000001 형식
        }

        // 부서별 직원 조회
        public async Task<List<EmployeeUser>> GetByDepartmentAsync(int departmentId)
        {
            return await _context.Users
                .Include(e => e.Department)
                .Include(e => e.Position)
                .Where(e => e.DepartmentId == departmentId)
                .OrderBy(e => e.Name)
                .ToListAsync();
        }

        // 활성 직원만 조회
        public async Task<List<EmployeeUser>> GetActiveEmployeesAsync()
        {
            return await _context.Users
                .Include(e => e.Department)
                .Include(e => e.Position)
                .Where(e => e.Status == "ACTIVE")
                .OrderBy(e => e.Name)
                .ToListAsync();
        }
    }
}