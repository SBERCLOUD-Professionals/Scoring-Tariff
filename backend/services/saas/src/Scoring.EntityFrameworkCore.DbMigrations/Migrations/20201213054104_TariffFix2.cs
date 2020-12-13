using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scoring.Migrations
{
    public partial class TariffFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "TariffFeature",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "Tariff",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "Feature",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "TariffFeature");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Tariff");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Feature");
        }
    }
}
