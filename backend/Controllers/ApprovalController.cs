using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using backend.Services;
using backend.Dtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ApprovalController : ControllerBase
    {
        private readonly IApprovalService _approvalService;
        private readonly ILogger<ApprovalController> _logger;

        public ApprovalController(IApprovalService approvalService, ILogger<ApprovalController> logger)
        {
            _approvalService = approvalService;
            _logger = logger;
        }

        /// <summary>
        /// 결재 목록 조회 (권한별 필터링)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApprovalListResponseDto>> GetApprovals([FromQuery] ApprovalListRequestDto request)
        {
            try
            {
                var userId = GetCurrentUserId();
                var userRole = GetCurrentUserRole();

                request.UserId = userId;
                request.Role = userRole;

                var result = await _approvalService.GetApprovalsAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting approvals");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 결재 상세 조회
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApprovalDto>> GetApproval(int id)
        {
            try
            {
                var approval = await _approvalService.GetApprovalByIdAsync(id);
                if (approval == null)
                {
                    return NotFound(new { message = "Approval not found" });
                }

                // 권한 확인
                var userId = GetCurrentUserId();
                var userRole = GetCurrentUserRole();

                if (userRole != "ADMIN" &&
                    approval.RequesterId != userId &&
                    approval.ApproverId != userId)
                {
                    return Forbid();
                }

                return Ok(approval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting approval: {Id}", id);
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 결재 신청
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApprovalDto>> CreateApproval([FromBody] CreateApprovalDto createDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userId = GetCurrentUserId();
                var result = await _approvalService.CreateApprovalAsync(createDto, userId);

                return CreatedAtAction(nameof(GetApproval), new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating approval");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 결재 수정 (신청자만 가능, PENDING 상태일 때만)
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApprovalDto>> UpdateApproval(int id, [FromBody] UpdateApprovalDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != updateDto.Id)
                {
                    return BadRequest(new { message = "ID mismatch" });
                }

                var userId = GetCurrentUserId();
                var result = await _approvalService.UpdateApprovalAsync(updateDto, userId);

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating approval: {Id}", id);
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 결재 처리 (승인/반려)
        /// </summary>
        [HttpPost("{id}/process")]
        public async Task<ActionResult<ApprovalDto>> ProcessApproval(int id, [FromBody] ApprovalActionDto actionDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != actionDto.Id)
                {
                    return BadRequest(new { message = "ID mismatch" });
                }

                var userId = GetCurrentUserId();
                var result = await _approvalService.ProcessApprovalAsync(actionDto, userId);

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing approval: {Id}", id);
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 결재 삭제 (신청자만 가능, PENDING 상태일 때만)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteApproval(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                var result = await _approvalService.DeleteApprovalAsync(id, userId);

                if (!result)
                {
                    return NotFound(new { message = "Approval not found or you don't have permission to delete it" });
                }

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting approval: {Id}", id);
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 결재 통계 조회
        /// </summary>
        [HttpGet("statistics")]
        public async Task<ActionResult<ApprovalStatisticsDto>> GetApprovalStatistics([FromQuery] int? userId = null)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var userRole = GetCurrentUserRole();

                // 일반 직원은 자신의 통계만 조회 가능
                if (userRole == "EMPLOYEE")
                {
                    userId = currentUserId;
                }
                // 매니저는 자신이 관련된 결재 통계 조회 가능
                else if (userRole == "MANAGER" && userId.HasValue && userId != currentUserId)
                {
                    // 매니저가 다른 사용자 통계를 조회하려는 경우 권한 확인 로직 추가 가능
                    userId = userId ?? currentUserId;
                }
                // 관리자는 모든 통계 조회 가능

                var result = await _approvalService.GetApprovalStatisticsAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting approval statistics");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 승인 가능한 사용자 목록 조회
        /// </summary>
        [HttpGet("approvers")]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetAvailableApprovers()
        {
            try
            {
                var userId = GetCurrentUserId();
                var result = await _approvalService.GetAvailableApproversAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting available approvers");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 내가 승인해야 할 결재 목록 조회
        /// </summary>
        [HttpGet("pending-for-me")]
        public async Task<ActionResult<ApprovalListResponseDto>> GetPendingApprovalsForMe([FromQuery] ApprovalListRequestDto request)
        {
            try
            {
                var userId = GetCurrentUserId();
                var userRole = GetCurrentUserRole();

                // 매니저나 관리자만 접근 가능
                if (userRole == "EMPLOYEE")
                {
                    return Forbid();
                }

                // 내가 승인자인 PENDING 상태의 결재만 조회
                request.UserId = userId;
                request.Role = "APPROVER"; // 특별한 역할로 설정
                request.Status = "PENDING";

                var result = await _approvalService.GetApprovalsAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pending approvals for current user");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// 내가 신청한 결재 목록 조회
        /// </summary>
        [HttpGet("my-requests")]
        public async Task<ActionResult<ApprovalListResponseDto>> GetMyRequests([FromQuery] ApprovalListRequestDto request)
        {
            try
            {
                var userId = GetCurrentUserId();

                // 내가 신청한 결재만 조회
                request.UserId = userId;
                request.Role = "REQUESTER"; // 특별한 역할로 설정

                var result = await _approvalService.GetApprovalsAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user's approval requests");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        #region Private Methods

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                throw new UnauthorizedAccessException("Invalid user ID");
            }
            return userId;
        }

        private string GetCurrentUserRole()
        {
            var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
            if (string.IsNullOrEmpty(roleClaim))
            {
                throw new UnauthorizedAccessException("Invalid user role");
            }
            return roleClaim.ToUpper();
        }

        #endregion
    }
}