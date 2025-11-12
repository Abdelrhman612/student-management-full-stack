using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using student_management.data.Models;
using student_management.Dto;
using student_management.InterFaces;

namespace student_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // require authentication for all endpoints
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // Accessible to all authenticated users
        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _studentService.GetStudents();
            return Ok(new { count = students.Count(), data = students });
        }

        // Allow only Staff and SystemUser roles
        [HttpGet("{id}")]
        [Authorize(Roles = $"{nameof(Roles.Staff)},{nameof(Roles.Student)}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _studentService.GetStudent(id);
            if (student == null)
                return NotFound("Student not found");

            return Ok(student);
        }

        // Only Staff can create
        [HttpPost]
        [Authorize(Roles = nameof(Roles.Staff))]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDto createStudentDto)
        {
            var student = await _studentService.CreateStudent(createStudentDto);
            return Ok(student);
        }

        // Only Staff or SystemUser can update
        [HttpPatch("{id}")]
        [Authorize(Roles = $"{nameof(Roles.Staff)}")]
        public async Task<IActionResult> UpdateStudent([FromBody] UpdateStudentDto updateStudentDto, int id)
        {
            var student = await _studentService.UpdateStudent(updateStudentDto, id);
            return Ok(student);
        }

        //  Only SystemUser can delete
        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(Roles.Staff))]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _studentService.DeleteStudent(id);
            if (student == null)
                return NotFound("Student not found");

            return Ok(new { message = "Deleted successfully" });
        }
    }
}
