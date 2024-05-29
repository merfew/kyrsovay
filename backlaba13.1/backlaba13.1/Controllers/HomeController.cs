using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data.Odbc;
using Npgsql;
using backlaba13._1.Model;
using System.Net.WebSockets;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

namespace backlaba13._1.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class HomeController : ControllerBase
    {
        AppDbContext dbb = new AppDbContext();
        [HttpGet]
        public IActionResult GetData()
        {
            var headers = HttpContext.Request.Headers;
            if (headers.TryGetValue("id", out var Id))
            {
                int.TryParse(Id, out int id);
                var data = (from users in dbb.Users where users.id_users == id select users);
                List<Users> user = new List<Users>();
                foreach (var u in data)
                {
                    user.Add(u);
                }
                return Ok(user);
            }
            return BadRequest("Ошибка");
        }

        [HttpGet]
        public IActionResult GetCard()
        {
            var headers = HttpContext.Request.Headers;
            if (headers.TryGetValue("id", out var Id))
            {
                int.TryParse(Id, out int id);
                var data = dbb.Cards.AsNoTracking().Where(c => c.id_person == id).ToList();
                return Ok(data);
            }
            return BadRequest("Ошибка");
        }

        [HttpGet]
        public IActionResult GetCardInfo()
        {
            var headers = HttpContext.Request.Headers;
            var db = new AppDbContext();
            if (headers.TryGetValue("id", out var Id))
            {
                int.TryParse(Id, out int id);
                var data = (from cards in db.Cards where cards.id_card == id select cards);
                List<Cards> card = new List<Cards>();
                foreach (var u in data)
                {
                    card.Add(u);
                }
                return Ok(data);
            }
            return BadRequest("Ошибка");
        }

        [HttpGet]
        public IActionResult CardTransfer()
        {
            var headers = HttpContext.Request.Headers;
            if (headers.TryGetValue("id", out var Id))
            {
                int.TryParse(Id, out int id);
                var data = dbb.Cards.AsNoTracking().Where(c => c.id_person == id).ToList();
                return Ok(data);
            }
            return BadRequest("Ошибка");
        }

        [HttpPost]
        public IActionResult SaveHistory([FromBody] Story story)
        {
            var db = new AppDbContext();
            db.Story.Add(new Story
            {
                id_user = 1,
                id_transfer = 1,
                otkyda = story.otkyda,
                kyda = story.kyda,
                sum = story.sum
            });
            db.SaveChanges();
            return Ok();
        }


        [HttpGet]
        public IActionResult ViewHistory()
        {
            var headers = HttpContext.Request.Headers;
            if (headers.TryGetValue("id", out var Id))
            {
                var db = new AppDbContext();
                int.TryParse(Id, out int id);
                var data = db.Story.AsNoTracking().Where(c => c.id_user == id).ToList();
                return Ok(data);
            }
            return BadRequest("Ошибка");
        }

        [HttpPost]
        public IActionResult TransferIn([FromBody] Story story)
        {
            //var db = new AppDbContext();
            Story newstory = new Story();
            newstory.id_user = story.id_user;
            newstory.sum = story.sum;
            newstory.otkyda = story.otkyda;
            newstory.kyda = story.kyda;
            Console.WriteLine($"{newstory.sum}, {newstory.otkyda}, {newstory.kyda}");

            //var card = dbb.Cards.FirstOrDefault(cards => cards.name == newstory.otkyda);
            Cards? card = (from cards in dbb.Cards where cards.name == newstory.otkyda select cards).FirstOrDefault();
            Console.WriteLine($"{card.name}, {card.balance}");
            if (card != null)
            {
                int id = card.id_card;
                int newBalance = card.balance - newstory.sum;
                card.balance = newBalance;
                Console.WriteLine($"{card.balance}");
                //dbb.Cards.Update(card).Where(card => card.id_card == id);
                dbb.SaveChangesAsync();
            }
            else
            {
                // Обработка ошибки, если карта не найдена
                Console.Write("Карта 'откуда' не найдена.");
                return NotFound("Карта 'откуда' не найдена.");
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult TransferInPlus([FromBody] Story story)
        {
            Story newstory = new Story();
            newstory.id_user = story.id_user;
            newstory.sum = story.sum;
            newstory.otkyda = story.otkyda;
            newstory.kyda = story.kyda;
            Console.WriteLine($"{newstory.sum}, {newstory.otkyda}, {newstory.kyda}");

            Cards? card1 = (from cards in dbb.Cards where cards.name == newstory.kyda select cards).FirstOrDefault();
            Console.WriteLine($"{card1.name}, {card1.balance}");
            if (card1 != null)
            {
                int newBalance1 = card1.balance + newstory.sum;
                card1.balance = newBalance1;
                Console.WriteLine($"{card1.balance}");
                //dbb.Cards.Update(card1);
                dbb.SaveChangesAsync();

            }
            else
            {
                // Обработка ошибки, если карта не найдена
                Console.Write("Карта 'куда' не найдена.");
                return NotFound("Карта 'куда' не найдена.");
            }
            //dbb.SaveChanges();
            return Ok();
        }
    }
}