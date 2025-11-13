using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using student_management.data.Models;
using student_management.Dto;
using student_management.InterFaces;
using student_management.Repositories;

namespace student_management.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<IEnumerable<Students>> GetStudents()
        {
            return await _studentRepository.GetAllAsync();
        }

        public async Task<Students?> GetStudent(int id)
        {
            return await _studentRepository.GetByIdAsync(id);
        }

        public async Task<CreateStudentDto> CreateStudent(CreateStudentDto dto)
        {
            var student = new Students
            {
                Name = dto.Name,
                Gender = dto.Gender,
                Gpa = dto.Gpa,
                Age = dto.Age
            };

            await _studentRepository.AddAsync(student);
            await _studentRepository.SaveChangesAsync();

            return new CreateStudentDto
            {
                Name = student.Name,
                Gender = student.Gender,
                Gpa = student.Gpa,
                Age = student.Age
            };
        }

        public async Task<UpdateStudentDto?> UpdateStudent([FromBody] UpdateStudentDto dto, int id)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            if (student == null) return null;

            student.Name = dto.Name;
            student.Gender = dto.Gender;
            student.Gpa = dto.Gpa;
            student.Age = dto.Age;

            await _studentRepository.UpdateAsync(student);
            await _studentRepository.SaveChangesAsync();

            return new UpdateStudentDto
            {
                Name = student.Name,
                Gender = student.Gender,
                Gpa = student.Gpa,
                Age = student.Age
            };
        }

        public async Task<Students?> DeleteStudent(int id)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            if (student == null) return null;

            await _studentRepository.DeleteAsync(student);
            await _studentRepository.SaveChangesAsync();
            return student;
        }
    }
}
