using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace URLShortener.Migrations
{
    /// <inheritdoc />
    public partial class FKs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserCreator",
                table: "UrlAdresses",
                newName: "UserCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_UrlAdresses_UserCreatorId",
                table: "UrlAdresses",
                column: "UserCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AuthTokens_UserId",
                table: "AuthTokens",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuthTokens_Users_UserId",
                table: "AuthTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UrlAdresses_Users_UserCreatorId",
                table: "UrlAdresses",
                column: "UserCreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuthTokens_Users_UserId",
                table: "AuthTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_UrlAdresses_Users_UserCreatorId",
                table: "UrlAdresses");

            migrationBuilder.DropIndex(
                name: "IX_UrlAdresses_UserCreatorId",
                table: "UrlAdresses");

            migrationBuilder.DropIndex(
                name: "IX_AuthTokens_UserId",
                table: "AuthTokens");

            migrationBuilder.RenameColumn(
                name: "UserCreatorId",
                table: "UrlAdresses",
                newName: "UserCreator");
        }
    }
}
