using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using student_management.data.Models;
using student_management.Dto;


namespace student_management.InterFaces
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetStudents();
        Task<Student?> GetStudent(int Id);
        Task<CreateStudentDto> CreateStudent(CreateStudentDto createStudentDto);
        Task<UpdateStudentDto?> UpdateStudent(UpdateStudentDto updateStudentDto, int Id);
        Task<Student> DeleteStudent(int Id);

    }
}