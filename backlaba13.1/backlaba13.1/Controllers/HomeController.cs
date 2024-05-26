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
    public class HomeController: ControllerBase
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
                id_transfer = 1, // Предполагая, что id_transfer всегда 1
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
            var db = new AppDbContext();
            int id = story.id_user;
            int sum = story.sum;
            string otkyda = story.otkyda;
            string kyda = story.kyda;

            // Получаем баланс для карты "откуда"
            int balanceOtkyda = db.Cards
                .Where(card => card.id_person == id && card.name == otkyda)
                .Select(card => card.balance)
                .FirstOrDefault();

            // Рассчитываем новый баланс для карты "откуда"
            int newBalanceOtkyda = balanceOtkyda - sum;
            var cardToUpdateOtkyda = db.Cards
                .FirstOrDefault(card => card.id_person == id && card.name == otkyda);

            if (cardToUpdateOtkyda != null)
            {
                cardToUpdateOtkyda.balance = newBalanceOtkyda;
            }

            // Получаем баланс для карты "куда"
            int balanceKyda = db.Cards
                .Where(card => card.id_person == id && card.name == kyda)
                .Select(card => card.balance)
                .FirstOrDefault();

            // Рассчитываем новый баланс для карты "куда"
            int newBalanceKyda = balanceKyda + sum;
            var cardToUpdateKyda = db.Cards
                .FirstOrDefault(card => card.id_person == id && card.name == kyda);

            if (cardToUpdateKyda != null && cardToUpdateKyda != cardToUpdateOtkyda)
            {
                cardToUpdateKyda.balance = newBalanceKyda;
            }

            db.SaveChanges();

            return Ok();

        }
    }
}