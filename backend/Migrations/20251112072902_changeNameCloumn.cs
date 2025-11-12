using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace student_management.Migrations
{
    /// <inheritdoc />
    public partial class changeNameCloumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "Student",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "student");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "student",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "Student");
        }
    }
}
