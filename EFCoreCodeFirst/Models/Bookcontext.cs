using EFCoreCodeFirst.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;

internal class Bookcontext : DbContext
{
	public Bookcontext()
	{

	}

	public Bookcontext(DbContextOptions<Bookcontext> options)
		: base(options)
	{
	}


	public DbSet<Book> Books { get; set; }

	public DbSet<Author> Author { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseSqlServer(@"Server=.\;Database=EFCoreCodeFirst;Trusted_Connection=True;TrustServerCertificate=True;"" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Context BlogContext");
	}
}

