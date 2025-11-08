using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using student_management.data;
using student_management.data.Models;
using student_management.Dto;
using student_management.InterFaces;

namespace student_management.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _db;
        public StudentService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _db.Students.ToListAsync();
            return students;
        }
        public async Task<Student?> GetStudent(int Id)
        {
            return await _db.Students.FindAsync(Id);


        }
        public async Task<CreateStudentDto> CreateStudent(CreateStudentDto createStudentDto)
        {
            var student = new Student()
            {
                Name = createStudentDto.Name,
                Gender = createStudentDto.Gender,
                Gpa = createStudentDto.Gpa,
                Age = createStudentDto.Age,
            };
            await _db.Students.AddAsync(student);
            await _db.SaveChangesAsync();
            var AddStudent = new CreateStudentDto
            {
                Gender = student.Gender,
                Name = student.Name,
                Age = student.Age,
                Gpa = student.Gpa,
            };
            return AddStudent;
        }

        public async Task<UpdateStudentDto?> UpdateStudent([FromBody] UpdateStudentDto updateStudentDto, int Id)
        {
            var student = await _db.Students.FindAsync(Id);
            if (student == null)
            {
                return null;
            }
            student.Name = updateStudentDto.Name;
            student.Gender = updateStudentDto.Gender;
            student.Gpa = updateStudentDto.Gpa;
            student.Age = updateStudentDto.Age;
            var NewStudent = new UpdateStudentDto
            {
                Name = student.Name,
                Gender = student.Gender,
                Gpa = student.Gpa,
                Age = student.Age,
            };

            await _db.SaveChangesAsync();
            return NewStudent;
        }
        public async Task<Student> DeleteStudent(int Id)
        {
            var student = await _db.Students.FindAsync(Id);
            if (student == null)
            {
                return null;
            }
            _db.Students.Remove(student);
            await _db.SaveChangesAsync();
            return student;
        }
    }


}
