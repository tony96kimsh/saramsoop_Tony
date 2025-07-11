using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]  // 이 클래스가 API 컨트롤러임을 나타냄 (자동 모델 바인딩, 상태 코드 반환 등 지원)
    [Route("api/[controller]")] // URL 경로 설정, 여기선 "api/users"가 기본 경로가 됨
    public class UsersController : ControllerBase // API 컨트롤러용 기본 클래스 상속
    {
        private readonly AppDbContext _context; // DB 컨텍스트를 담을 필드 선언

        public UsersController(AppDbContext context) // DI(의존성 주입)로 DB 컨텍스트 받음
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]  // HTTP GET 메서드, 전체 사용자 목록을 조회
        public async Task<ActionResult<IEnumerable<EmployeeUser>>> GetUsers()
        {
            return await _context.Users
                .Include(u => u.Department)  // Users와 연관된 Department 테이블도 함께 로드
                .Include(u => u.Position)    // Users와 연관된 Position 테이블도 함께 로드
                .ToListAsync();              // 비동기적으로 리스트로 변환 후 반환
        }

        // GET: api/users/5
        [HttpGet("{id}")] // URL 경로에 id를 받는 GET 메서드, 특정 사용자 조회
        public async Task<ActionResult<EmployeeUser>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Department)
                .Include(u => u.Position)
                .FirstOrDefaultAsync(u => u.Id == id); // id에 해당하는 사용자 조회

            if (user == null) // 사용자가 없으면 404 Not Found 반환
                return NotFound();

            return user; // 사용자 정보 반환
        }

        // POST: api/users
        [HttpPost] // HTTP POST 메서드, 새 사용자 등록
        public async Task<ActionResult<EmployeeUser>> CreateUser(EmployeeUser user)
        {
            _context.Users.Add(user);  // DB 컨텍스트에 새 사용자 추가
            await _context.SaveChangesAsync();  // 변경사항 DB에 저장

            // 생성한 사용자의 상세 조회 URL을 포함해 201 Created 응답 반환
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/5
        [HttpPut("{id}")] // HTTP PUT 메서드, 기존 사용자 정보 수정
        public async Task<IActionResult> UpdateUser(int id, EmployeeUser updatedUser)
        {
            if (id != updatedUser.Id) // URL의 id와 요청 바디의 id가 다르면 400 Bad Request
                return BadRequest();

            _context.Entry(updatedUser).State = EntityState.Modified; // 엔티티 상태를 수정으로 변경

            try
            {
                await _context.SaveChangesAsync(); // DB 저장 시도
            }
            catch (DbUpdateConcurrencyException) // 동시성 문제 발생 시 처리
            {
                if (!_context.Users.Any(u => u.Id == id))  // 해당 id 사용자 존재 여부 확인
                    return NotFound();  // 없으면 404 Not Found 반환
                else
                    throw;  // 있으면 예외를 다시 던짐
            }

            return NoContent(); // 성공적으로 수정 시 204 No Content 반환
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")] // HTTP DELETE 메서드, 사용자 삭제
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id); // id로 사용자 조회
            if (user == null) // 없으면 404 Not Found 반환
                return NotFound();

            _context.Users.Remove(user);  // 사용자 삭제
            await _context.SaveChangesAsync();  // DB에 저장

            return NoContent();  // 성공적으로 삭제 시 204 No Content 반환
        }
    }
}
