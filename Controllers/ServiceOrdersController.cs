using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using JetstreamService.Models;
using JetstreamService.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace JetstreamService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceOrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceOrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceOrders
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] string? priority = null)
        {
            var ordersQuery = _context.ServiceOrders.AsQueryable();

            if (!string.IsNullOrEmpty(priority))
            {
                ordersQuery = ordersQuery.Where(o => o.Priority == priority);
            }

            // Only include non-deleted orders
            ordersQuery = ordersQuery.Where(o => !o.IsDeleted);

            var orders = await ordersQuery.ToListAsync();
            return Ok(orders);
        }

        // POST: api/ServiceOrders
        [HttpPost]
        public async Task<IActionResult> CreateServiceOrder([FromBody] ServiceOrder order)
        {
            if (order == null)
            {
                return BadRequest("Invalid order data.");
            }

            // Ensure all required fields are set 
            if (string.IsNullOrEmpty(order.CustomerName) || string.IsNullOrEmpty(order.Email))
            {
                return BadRequest("Customer name and email are required.");
            }

            // Set default values for certain fields if needed
            order.Status = "Open"; // Default status when order is created
            order.CreatedAt = DateTime.UtcNow;

            try
            {
                await _context.ServiceOrders.AddAsync(order);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetServiceOrderById), new { id = order.Id }, order);
            }
            catch (Exception ex)
            {
                // Log the error 
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // PUT: api/ServiceOrders/{id}
        [HttpPut("{id}")]
        [Authorize] // Mitarbeiter muss eingeloggt sein
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] ServiceOrder updatedOrder)
        {
            var existingOrder = await _context.ServiceOrders.FindAsync(id);
            if (existingOrder == null) return NotFound();

            // Update the existing order with the new data
            existingOrder.Status = updatedOrder.Status;
            existingOrder.EmployeeComment = updatedOrder.EmployeeComment;

            _context.ServiceOrders.Update(existingOrder);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/ServiceOrders/{id}
        [HttpDelete("{id}")]
        [Authorize] // Mitarbeiter muss eingeloggt sein
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.ServiceOrders.FindAsync(id);
            if (order == null) return NotFound();

            order.IsDeleted = true; // Auftrag wird nicht vollständig gelöscht, sondern nur markiert
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET: api/ServiceOrders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceOrder>> GetServiceOrderById(int id)
        {
            var order = await _context.ServiceOrders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
    }
}
