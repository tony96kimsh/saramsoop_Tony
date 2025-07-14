using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Dtos;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeesController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // GET: api/employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employees = await _employeeService.GetAllAsync();

            var dtos = employees.Select(e => new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Role = e.Role,
                Position = e.Position?.PositionName ?? "",
                Email = e.Email,
                Department = e.Department?.DeptName ?? "",
                Status = e.Status,
                Birth = e.BirthDate.ToString("yyyy-MM-dd"),
                Phone = e.PhoneNo,
                Address = e.Address ?? "",
                Postal = e.Zipcode ?? "",
                Career = (DateTime.UtcNow.Year - e.HireDate.Year).ToString(),
                Join = e.HireDate.ToString("yyyy-MM-dd"),
                Leave = e.ResignDate?.ToString("yyyy-MM-dd") ?? "N/A",
                Bank = e.BankName,
                Account = e.BankAccount,
                Holder = e.AccountHolder
            });

            return Ok(dtos);
        }

        // GET: api/employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var e = await _employeeService.GetByIdAsync(id);
            if (e == null) return NotFound();

            var dto = new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Role = e.Role,
                Position = e.Position?.PositionName ?? "",
                Email = e.Email,
                Department = e.Department?.DeptName ?? "",
                Status = e.Status,
                Birth = e.BirthDate.ToString("yyyy-MM-dd"),
                Phone = e.PhoneNo,
                Address = e.Address ?? "",
                Postal = e.Zipcode ?? "",
                Career = (DateTime.UtcNow.Year - e.HireDate.Year).ToString(),
                Join = e.HireDate.ToString("yyyy-MM-dd"),
                Leave = e.ResignDate?.ToString("yyyy-MM-dd") ?? "N/A",
                Bank = e.BankName,
                Account = e.BankAccount,
                Holder = e.AccountHolder
            };

            return Ok(dto);
        }

        // POST: api/employee
        [HttpPost]
        public async Task<ActionResult<EmployeeUser>> CreateEmployee([FromBody] CreateEmployeeDto dto)
        {
            var newUser = new EmployeeUser
            {
                Name = dto.Name,
                Role = dto.Role,
                Email = dto.Email,
                EmpNo = $"EMP{DateTime.UtcNow.Ticks % 1000000:D6}",
                DepartmentId = 1, // 일단 기본값, 추후 프론트에서 전달받는 값으로 수정 가능
                PositionId = 1,
                Status = dto.Status,
                BirthDate = DateTime.Parse(dto.Birth),
                PhoneNo = dto.Phone,
                Address = dto.Address,
                Zipcode = dto.Postal,
                HireDate = DateTime.Parse(dto.Join),
                ResignDate = dto.Leave == "N/A" ? null : DateTime.Parse(dto.Leave),
                BankName = dto.Bank,
                BankAccount = dto.Account,
                AccountHolder = dto.Holder,
                PasswordHash = "temp", // 추후 Hash 적용
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var created = await _employeeService.CreateAsync(newUser);

            return CreatedAtAction(nameof(GetEmployee), new { id = created.Id }, created);
        }

        // PUT: api/employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] UpdateEmployeeDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var existing = await _employeeService.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Name = dto.Name;
            existing.Role = dto.Role;
            existing.Email = dto.Email;
            existing.Status = dto.Status;
            existing.BirthDate = DateTime.Parse(dto.Birth);
            existing.PhoneNo = dto.Phone;
            existing.Address = dto.Address;
            existing.Zipcode = dto.Postal;
            existing.HireDate = DateTime.Parse(dto.Join);
            existing.ResignDate = dto.Leave == "N/A" ? null : DateTime.Parse(dto.Leave);
            existing.BankName = dto.Bank;
            existing.BankAccount = dto.Account;
            existing.AccountHolder = dto.Holder;
            existing.UpdatedAt = DateTime.UtcNow;

            var success = await _employeeService.UpdateAsync(existing);
            if (!success) return StatusCode(500);

            return NoContent();
        }

        // DELETE: api/employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var success = await _employeeService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
