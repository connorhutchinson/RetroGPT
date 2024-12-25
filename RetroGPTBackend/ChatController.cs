using Microsoft.AspNetCore.Mvc;

namespace RetroGPTBackend;

[ApiController]
[Route("api/[controller]")]
public class ChatController(ChatGptService chatGptService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest("Prompt cannot be empty.");
        }

        var response = await chatGptService.GetResponseAsync(request.Prompt);
        return Ok(new { response });
    }
}

public class ChatRequest
{
    public required string Prompt { get; set; }
}