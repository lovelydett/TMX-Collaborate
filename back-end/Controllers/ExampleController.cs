/**
* An example API controller
* @author: Yuting Xie
* @date: 2024/09/29
*/

using Microsoft.AspNetCore.Mvc;

namespace Example.Controllers
{
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
        [HttpGet("message/{token}")]
        public IActionResult Get(string token)
        {
            return Ok("Hello, " + token);
        }
    }
}