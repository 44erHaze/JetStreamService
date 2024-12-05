using EFCoreDbFirst.Models;
using Microsoft.EntityFrameworkCore;

namespace EFCoreDbFirst


{
   //Scaffold-DbContext "Server=.\;Database=EFCoreDbFirst;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Context BlogContext
    internal class Program
    {
        static void Main(string[] args)
        {
            var contextOptions = new DbContextOptionsBuilder<BlogContext>()
                .UseSqlServer(@"Server=.\;Database=EFCoreDbFirst;Trusted_Connection=True;TrustServerCertificate=TrueMultipleActiveResultSets=true")
                .Options;

            using (var context = new BlogContext(contextOptions))
            {
                //Create
                Console.WriteLine("Inserting a new blog");
                context.Add(new Blog { Url = "http://blogs.msdn.com/adonet" });
                context.SaveChanges();

                //Read
                Console.WriteLine("Querying for a blog");
                var blog = context.Blogs
                    .OrderBy(b => b.BlogId)
                    .First();

                //Update
                Console.WriteLine("Updating the blog and adding a post");
                blog.Url = "https://devblogs.microsoft.com/dotnet";
                blog.Posts.Add(
                    new Post { Title = "Hello World", Content = "I wrote an app using EF Core!" });
                context.SaveChanges();


                //Alle Blogs auslesen
                Console.WriteLine();
                var blogs = context.Blogs.Include(b => b.Posts).OrderBy(b => b.BlogId).ToList();
                foreach (var b in blogs)
                {
                    Console.WriteLine($"BlogId:{b.BlogId}, Url:{b.Url}");
                    foreach (var p in b.Posts)
                    {
                        Console.WriteLine($"PostId:{p.PostId}, Title:{p.Title}");
                    }
                }
                Console.WriteLine();

                //Delete
                Console.WriteLine("Delete the blog");
                context.Remove(blog);

            }
        }
    }
}