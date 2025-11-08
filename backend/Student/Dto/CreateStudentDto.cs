using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace student_management.Dto
{
    public class CreateStudentDto
    {

        public required string Name { get; set; }
        public required string Gender { get; set; }
        public required string Gpa { get; set; }
        public required int Age { get; set; }

    }
}