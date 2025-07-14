using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }

        [Required] public string Name { get; set; } = string.Empty;

        [Required] public string Role { get; set; } = string.Empty; // "Admin", "Manager", "Employee"

        [Required] public string Position { get; set; } = string.Empty;

        [Required, EmailAddress] public string Email { get; set; } = string.Empty;

        [Required] public string Department { get; set; } = string.Empty;

        [Required] public string Status { get; set; } = "Active"; // "Active" | "Inactive"

        [Required] public string Birth { get; set; } = string.Empty;

        [Required] public string RegNo { get; set; } = string.Empty;

        [Required] public string Phone { get; set; } = string.Empty;

        [Required] public string Address { get; set; } = string.Empty;

        [Required] public string Postal { get; set; } = string.Empty;

        [Required] public string Career { get; set; } = string.Empty;

        [Required] public string Join { get; set; } = string.Empty;

        public string Leave { get; set; } = "N/A";

        [Required] public string Bank { get; set; } = string.Empty;

        [Required] public string Account { get; set; } = string.Empty;

        [Required] public string Holder { get; set; } = string.Empty;
    }

    // Create용 DTO (Id는 서버에서 생성)
    public class CreateEmployeeDto
    {
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string Role { get; set; } = "Employee";
        [Required] public string Position { get; set; } = string.Empty;
        [Required, EmailAddress] public string Email { get; set; } = string.Empty;
        [Required] public string Department { get; set; } = string.Empty;
        [Required] public string Status { get; set; } = "Active";
        [Required] public string Birth { get; set; } = string.Empty;
        [Required] public string RegNo { get; set; } = string.Empty;
        [Required] public string Phone { get; set; } = string.Empty;
        [Required] public string Address { get; set; } = string.Empty;
        [Required] public string Postal { get; set; } = string.Empty;
        [Required] public string Career { get; set; } = string.Empty;
        [Required] public string Join { get; set; } = string.Empty;
        public string Leave { get; set; } = "N/A";
        [Required] public string Bank { get; set; } = string.Empty;
        [Required] public string Account { get; set; } = string.Empty;
        [Required] public string Holder { get; set; } = string.Empty;
    }

    // Update용 DTO (Id 포함)
    public class UpdateEmployeeDto : CreateEmployeeDto
    {
        [Required] public int Id { get; set; }
    }
}
