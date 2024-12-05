using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration.Json;

namespace AdoNetDatabase
{
    internal class Program
    {
        private static string _connectionString = "";
        private static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile($"appsettings.json");

            var config = configuration.Build();
            _connectionString = config.GetConnectionString("Db1");

            Select();
            Insert();
            Select();
            
        }

        private static void Select()
        {
            try
            {
                using (var con = new SqlConnection(_connectionString))
                {
                    con.Open();
                    SqlCommand cmd = new("select * from Blog order by BlogId", con);
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        Console.WriteLine($"{dr["BlogId"],-5}, {dr["Url"]}");
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error {ex.Message})");
            }
        }


        private static void Insert()
        {
            try
            {
                Console.WriteLine("Bitte Url eingeben:");
                string? url = Console.ReadLine();

                using (var con = new SqlConnection(_connectionString))
                {
                    con.Open();
                    SqlCommand cmd = new($"insert into Blog (Url) values ('{url}')",con);
                    int affectedRows = cmd.ExecuteNonQuery();
                    if(affectedRows > 0)
                        Console.WriteLine( "Datensatz wurde eingefügt");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error {ex.Message}");
            }
        }
    }
}