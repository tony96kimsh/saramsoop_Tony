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

        // ✅ 전체 근태 요약 리스트 (프론트 DataGrid용)
        //[HttpGet("summary")]
        //public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetAllSummaries()
        //{
        //    //var data = await _service.GetAllAttendanceSummaries();
        //    //return Ok(data);
        //}

        // 🔍 사번으로 근태 조회 (ex: EMP001)
        [HttpGet("{empNo}")]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetByEmpNo(string empNo)
        {
            var data = await _service.GetAttendanceByEmpNo(empNo);
            if (data == null || data.Count == 0)
            {
                return NotFound(new { message = $"No attendance found for empNo '{empNo}'" });
            }

            return Ok(data);
        }

        // ➕ 근태 기록 생성
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] AttendanceDto dto)
        {
            await _service.CreateAttendance(dto);
            return Ok();
        }

        // ✏️ 근태 기록 수정
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] AttendanceDto dto)
        {
            await _service.UpdateAttendance(id, dto);
            return Ok();
        }

        // ❌ 근태 기록 삭제
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAttendance(id);
            return Ok();
        }
    }
}
