using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Services.Interfaces;
using backend.Dtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _service;

        public AttendanceController(IAttendanceService service)
        {
            _service = service;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetByUser(int userId)
        {
            var data = await _service.GetAttendanceByUser(userId);
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] AttendanceDto dto)
        {
            await _service.CreateAttendance(dto);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] AttendanceDto dto)
        {
            await _service.UpdateAttendance(id, dto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAttendance(id);
            return Ok();
        }
    }
}
