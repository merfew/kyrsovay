using backlaba13._1.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data.Odbc;
using System.Diagnostics.Eventing.Reader;

namespace backlaba13._1.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetData()
        {
            var headers = HttpContext.Request.Headers;
            var db = new AppDbContext();
            if (headers.TryGetValue("email", out var email) && headers.TryGetValue("password", out var password))
            {
                //int.TryParse(Id, out int id);
                var data = (from auth in db.Auth where (auth.email == email.ToString() && auth.password == password.ToString()) select auth);
                var Id = (from auth in db.Auth where (auth.email == email.ToString() && auth.password == password.ToString()) select auth.id_user).FirstOrDefault();
                HttpContext.Response.Cookies.Append("id_user", Id.ToString());
                List<Auth> auths = new List<Auth>();
                foreach (var u in data)
                {
                    auths.Add(u);
                }
                return Ok(auths);
            }
            return BadRequest("Ошибка");
        }
    }
}
