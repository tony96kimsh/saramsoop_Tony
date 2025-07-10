using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Dtos;
using backend.Data;
namespace backend.Services

{
    public interface IApprovalService
    {
        Task<ApprovalListResponseDto> GetApprovalsAsync(ApprovalListRequestDto request);
        Task<ApprovalDto?> GetApprovalByIdAsync(int id);
        Task<ApprovalDto> CreateApprovalAsync(CreateApprovalDto createDto, int requesterId);
        Task<ApprovalDto> UpdateApprovalAsync(UpdateApprovalDto updateDto, int requesterId);
        Task<ApprovalDto> ProcessApprovalAsync(ApprovalActionDto actionDto, int approverId);
        Task<bool> DeleteApprovalAsync(int id, int requesterId);
        Task<ApprovalStatisticsDto> GetApprovalStatisticsAsync(int? userId = null);
        Task<IEnumerable<UserDto>> GetAvailableApproversAsync(int requesterId);
    }

    public class ApprovalService : IApprovalService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ApprovalService> _logger;

        public ApprovalService(ApplicationDbContext context, ILogger<ApprovalService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ApprovalListResponseDto> GetApprovalsAsync(ApprovalListRequestDto request)
        {
            try
            {
                var query = _context.Approvals
                    .Include(a => a.Requester)
                    .Include(a => a.Approver)
                    .AsQueryable();

                // 역할별 필터링
                if (!string.IsNullOrEmpty(request.Role) && request.UserId.HasValue)
                {
                    switch (request.Role.ToLower())
                    {
                        case "admin":
                            // 관리자는 모든 결재 조회 가능
                            break;
                        case "manager":
                            // 매니저는 본인이 승인자인 결재와 본인이 신청한 결재 조회 가능
                            query = query.Where(a => a.ApproverId == request.UserId || a.RequesterId == request.UserId);
                            break;
                        case "employee":
                            // 직원은 본인이 신청한 결재만 조회 가능
                            query = query.Where(a => a.RequesterId == request.UserId);
                            break;
                    }
                }

                // 상태별 필터링
                if (!string.IsNullOrEmpty(request.Status))
                {
                    query = query.Where(a => a.ApprovalStatus == request.Status);
                }

                // 타입별 필터링
                if (!string.IsNullOrEmpty(request.Type))
                {
                    query = query.Where(a => a.ApprovalType == request.Type);
                }

                // 날짜 범위 필터링
                if (request.StartDate.HasValue)
                {
                    query = query.Where(a => a.CreatedAt >= request.StartDate.Value);
                }

                if (request.EndDate.HasValue)
                {
                    query = query.Where(a => a.CreatedAt <= request.EndDate.Value);
                }

                // 총 개수 계산
                var totalCount = await query.CountAsync();

                // 정렬
                query = request.SortBy?.ToLower() switch
                {
                    "approval_name" => request.SortOrder?.ToLower() == "asc" 
                        ? query.OrderBy(a => a.ApprovalName)
                        : query.OrderByDescending(a => a.ApprovalName),
                    "approval_status" => request.SortOrder?.ToLower() == "asc"
                        ? query.OrderBy(a => a.ApprovalStatus)
                        : query.OrderByDescending(a => a.ApprovalStatus),
                    "requester_name" => request.SortOrder?.ToLower() == "asc"
                        ? query.OrderBy(a => a.Requester!.Name)
                        : query.OrderByDescending(a => a.Requester!.Name),
                    _ => request.SortOrder?.ToLower() == "asc"
                        ? query.OrderBy(a => a.CreatedAt)
                        : query.OrderByDescending(a => a.CreatedAt)
                };

                // 페이징
                var approvals = await query
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(a => new ApprovalDto
                    {
                        Id = a.Id,
                        RequesterId = a.RequesterId,
                        ApproverId = a.ApproverId,
                        ApprovalStatus = a.ApprovalStatus,
                        ApprovalName = a.ApprovalName,
                        ApprovalType = a.ApprovalType,
                        PendingTime = a.PendingTime,
                        ApprovedTime = a.ApprovedTime,
                        RejectedTime = a.RejectedTime,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt,
                        RequesterName = a.Requester!.Name,
                        RequesterEmpNo = a.Requester.EmpNo,
                        ApproverName = a.Approver!.Name,
                        ApproverEmpNo = a.Approver.EmpNo
                    })
                    .ToListAsync();

                var totalPages = (int)Math.Ceiling((double)totalCount / request.PageSize);

                return new ApprovalListResponseDto
                {
                    Approvals = approvals,
                    TotalCount = totalCount,
                    Page = request.Page,
                    PageSize = request.PageSize,
                    TotalPages = totalPages,
                    HasNextPage = request.Page < totalPages,
                    HasPreviousPage = request.Page > 1
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting approvals");
                throw;
            }
        }

        public async Task<ApprovalDto?> GetApprovalByIdAsync(int id)
        {
            try
            {
                var approval = await _context.Approvals
                    .Include(a => a.Requester)
                    .Include(a => a.Approver)
                    .Where(a => a.Id == id)
                    .Select(a => new ApprovalDto
                    {
                        Id = a.Id,
                        RequesterId = a.RequesterId,
                        ApproverId = a.ApproverId,
                        ApprovalStatus = a.ApprovalStatus,
                        ApprovalName = a.ApprovalName,
                        ApprovalType = a.ApprovalType,
                        PendingTime = a.PendingTime,
                        ApprovedTime = a.ApprovedTime,
                        RejectedTime = a.RejectedTime,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt,
                        RequesterName = a.Requester!.Name,
                        RequesterEmpNo = a.Requester.EmpNo,
                        ApproverName = a.Approver!.Name,
                        ApproverEmpNo = a.Approver.EmpNo
                    })
                    .FirstOrDefaultAsync();

                return approval;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting approval by ID: {Id}", id);
                throw;
            }
        }

        public async Task<ApprovalDto> CreateApprovalAsync(CreateApprovalDto createDto, int requesterId)
        {
            try
            {
                var approval = new Approval
                {
                    RequesterId = requesterId,
                    ApproverId = createDto.ApproverId,
                    ApprovalName = createDto.ApprovalName,
                    ApprovalType = createDto.ApprovalType,
                    ApprovalStatus = "PENDING",
                    PendingTime = DateTime.UtcNow,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Approvals.Add(approval);
                await _context.SaveChangesAsync();

                return await GetApprovalByIdAsync(approval.Id) 
                    ?? throw new InvalidOperationException("Failed to retrieve created approval");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating approval");
                throw;
            }
        }

        public async Task<ApprovalDto> UpdateApprovalAsync(UpdateApprovalDto updateDto, int requesterId)
        {
            try
            {
                var approval = await _context.Approvals
                    .FirstOrDefaultAsync(a => a.Id == updateDto.Id && a.RequesterId == requesterId);

                if (approval == null)
                {
                    throw new InvalidOperationException("Approval not found or you don't have permission to update it");
                }

                if (approval.ApprovalStatus != "PENDING")
                {
                    throw new InvalidOperationException("Cannot update approval that is not pending");
                }

                // 업데이트할 필드들
                if (updateDto.ApproverId.HasValue)
                {
                    approval.ApproverId = updateDto.ApproverId.Value;
                }

                if (!string.IsNullOrEmpty(updateDto.ApprovalName))
                {
                    approval.ApprovalName = updateDto.ApprovalName;
                }

                if (!string.IsNullOrEmpty(updateDto.ApprovalType))
                {
                    approval.ApprovalType = updateDto.ApprovalType;
                }

                approval.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return await GetApprovalByIdAsync(approval.Id)
                    ?? throw new InvalidOperationException("Failed to retrieve updated approval");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating approval");
                throw;
            }
        }

        public async Task<ApprovalDto> ProcessApprovalAsync(ApprovalActionDto actionDto, int approverId)
        {
            try
            {
                var approval = await _context.Approvals
                    .FirstOrDefaultAsync(a => a.Id == actionDto.Id && a.ApproverId == approverId);

                if (approval == null)
                {
                    throw new InvalidOperationException("Approval not found or you don't have permission to process it");
                }

                if (approval.ApprovalStatus != "PENDING")
                {
                    throw new InvalidOperationException("Approval is not pending");
                }

                var now = DateTime.UtcNow;

                if (actionDto.Action.ToUpper() == "APPROVE")
                {
                    approval.ApprovalStatus = "APPROVED";
                    approval.ApprovedTime = now;
                    approval.RejectedTime = null;
                }
                else if (actionDto.Action.ToUpper() == "REJECT")
                {
                    approval.ApprovalStatus = "REJECTED";
                    approval.RejectedTime = now;
                    approval.ApprovedTime = null;
                }
                else
                {
                    throw new ArgumentException("Invalid action. Use 'APPROVE' or 'REJECT'");
                }

                approval.UpdatedAt = now;

                await _context.SaveChangesAsync();

                return await GetApprovalByIdAsync(approval.Id)
                    ?? throw new InvalidOperationException("Failed to retrieve processed approval");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing approval");
                throw;
            }
        }

        public async Task<bool> DeleteApprovalAsync(int id, int requesterId)
        {
            try
            {
                var approval = await _context.Approvals
                    .FirstOrDefaultAsync(a => a.Id == id && a.RequesterId == requesterId);

                if (approval == null)
                {
                    return false;
                }

                if (approval.ApprovalStatus != "PENDING")
                {
                    throw new InvalidOperationException("Cannot delete approval that is not pending");
                }

                _context.Approvals.Remove(approval);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting approval");
                throw;
            }
        }

        public async Task<ApprovalStatisticsDto> GetApprovalStatisticsAsync(int? userId = null)
        {
            try
            {
                var query = _context.Approvals.AsQueryable();

                if (userId.HasValue)
                {
                    query = query.Where(a => a.RequesterId == userId.Value);
                }

                var statistics = await query
                    .GroupBy(a => 1)
                    .Select(g => new ApprovalStatisticsDto
                    {
                        TotalApprovals = g.Count(),
                        PendingApprovals = g.Count(a => a.ApprovalStatus == "PENDING"),
                        ApprovedApprovals = g.Count(a => a.ApprovalStatus == "APPROVED"),
                        RejectedApprovals = g.Count(a => a.ApprovalStatus == "REJECTED"),
                        ApprovalRate = g.Count() > 0 ? (double)g.Count(a => a.ApprovalStatus == "APPROVED") / g.Count() * 100 : 0
                    })
                    .FirstOrDefaultAsync();

                return statistics ?? new ApprovalStatisticsDto();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting approval statistics");
                throw;
            }
        }

        public async Task<IEnumerable<UserDto>> GetAvailableApproversAsync(int requesterId)
        {
            try
            {
                // 매니저와 관리자만 승인자가 될 수 있도록 필터링
                var approvers = await _context.Users
                    .Where(u => u.Id != requesterId && 
                               u.Status == "ACTIVE" && 
                               (u.Role == "MANAGER" || u.Role == "ADMIN"))
                    .Select(u => new UserDto
                    {
                        Id = u.Id,
                        EmpNo = u.EmpNo,
                        Email = u.Email,
                        Name = u.Name,
                        Role = u.Role,
                        DepartmentId = u.DepartmentId,
                        PositionId = u.PositionId
                    })
                    .OrderBy(u => u.Name)
                    .ToListAsync();

                return approvers;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting available approvers");
                throw;
            }
        }
    }
}