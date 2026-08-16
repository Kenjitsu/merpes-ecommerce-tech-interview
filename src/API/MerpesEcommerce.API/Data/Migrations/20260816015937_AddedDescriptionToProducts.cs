using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MerpesEcommerce.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriptionToProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Products",
                type: "TEXT",
                maxLength: 300,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Audífonos inalámbricos de alta calidad", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&h=200&fit=crop" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Teclado mecánico con switches de alta calidad", "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200&h=200&fit=crop" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Mouse gamer con sensor de alta precisión", "https://images.unsplash.com/photo-1618247130379-980b9fe0df04?q=80&w=200&h=200&fit=crop" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "https://dummyimage.com/200x200/000/fff&text=Audifonos");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "https://dummyimage.com/200x200/000/fff&text=Teclado");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "https://dummyimage.com/200x200/000/fff&text=Mouse");
        }
    }
}
