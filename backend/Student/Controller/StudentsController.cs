using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using student_management.data.Models;
using student_management.Dto;
using student_management.InterFaces;
using student_management.Services;

namespace student_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _studentService.GetStudents();
            return Ok(new { count = students.Count(), data = students });
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetStudent(int Id)
        {
            var student = await _studentService.GetStudent(Id);
            if (student == null)
            {
                return NotFound("student is not found");
            }
            return Ok(student);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDto createStudentDto)
        {
            var student = await _studentService.CreateStudent(createStudentDto);
            return Ok(student);
        }

        [HttpPatch("id")]
        public async Task<IActionResult> UpdateStudent([FromBody] UpdateStudentDto updateStudentDto, int Id)
        {
            var student = await _studentService.UpdateStudent(updateStudentDto, Id);
            return Ok(student);
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeleteStudent(int Id)
        {
            var student = await _studentService.DeleteStudent(Id);
            if (student == null)
            {
                return NotFound("student is not found");
            }
            return Ok(new { message = "Deleted Successfully" });
        }

    }
}