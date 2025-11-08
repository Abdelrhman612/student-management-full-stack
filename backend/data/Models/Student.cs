using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace student_management.data.Models
{
    public class Student
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Gender { get; set; }
        public required string Gpa { get; set; }
        public required int Age { get; set; }
        public string? Role { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }

    }
}