using Microsoft.EntityFrameworkCore;

namespace backlaba13._1.Model
{
    public class AppDbContext: DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Auth> Auth { get; set; }
        public DbSet<Cards> Cards { get; set; }
        public DbSet<Story> Story { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("server=localhost;database=kursovay1;username=postgres;password=mest1816;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Users>().HasKey(h => new {h.id_users});
            modelBuilder.Entity<Auth>().HasKey(h => new {h.id_user});
            modelBuilder.Entity<Cards>().HasKey(h => new { h.id_person });
            modelBuilder.Entity<Story>().HasKey(h => new { h.id_user });
        }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public AppDbContext()
        {
        }
    }
}