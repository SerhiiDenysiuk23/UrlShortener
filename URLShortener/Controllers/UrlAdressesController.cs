using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using URLShortener.Models;
using URLShortener.Data;

namespace URLShortener.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlAdressesController : ControllerBase
    {
        private readonly UrlShortenerDBContext _context;

        public UrlAdressesController(UrlShortenerDBContext context)
        {
            _context = context;
        }

        // GET: api/UrlAdresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UrlAdress>>> GetUrlAdresses()
        {
          if (_context.UrlAdresses == null)
          {
              return NotFound();
          }
            return await _context.UrlAdresses.ToListAsync();
        }

        // GET: api/UrlAdresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UrlAdress>> GetUrlAdress(Guid id)
        {
          if (_context.UrlAdresses == null)
          {
              return NotFound();
          }
            var urlAdress = await _context.UrlAdresses.FindAsync(id);

            if (urlAdress == null)
            {
                return NotFound();
            }

            return urlAdress;
        }

        // PUT: api/UrlAdresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUrlAdress(Guid id, UrlAdress urlAdress)
        {
            if (id != urlAdress.Id)
            {
                return BadRequest();
            }

            _context.Entry(urlAdress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UrlAdressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UrlAdresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UrlAdress>> PostUrlAdress(UrlAdress urlAdress)
        {
          if (_context.UrlAdresses == null)
          {
              return Problem("Entity set 'UrlAdressDBContext.UrlAdresses'  is null.");
          }
            _context.UrlAdresses.Add(urlAdress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUrlAdress", new { id = urlAdress.Id }, urlAdress);
        }

        // DELETE: api/UrlAdresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUrlAdress(Guid id)
        {
            if (_context.UrlAdresses == null)
            {
                return NotFound();
            }
            var urlAdress = await _context.UrlAdresses.FindAsync(id);
            if (urlAdress == null)
            {
                return NotFound();
            }

            _context.UrlAdresses.Remove(urlAdress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UrlAdressExists(Guid id)
        {
            return (_context.UrlAdresses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
