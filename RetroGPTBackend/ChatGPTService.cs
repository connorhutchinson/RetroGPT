using System.Text;
using Newtonsoft.Json;
using RetroGPTBackend.Models;

namespace RetroGPTBackend;

public class ChatGptService(IConfiguration configuration)
{
    private readonly HttpClient _httpClient = new();
    private readonly string _apiKey = configuration["OpenAI:ApiKey"] ?? 
                                      throw new ArgumentException("OpenAI API Key not found in configuration");

    public async Task<string> GetResponseAsync(string prompt)
    {
        var requestBody = new { 
            model = "gpt-4o-mini",
            temperature = 0.7,
            messages = new[] {
                new { role = "user", content = prompt }
            }
        };
        var requestJson = JsonConvert.SerializeObject(requestBody);

        var requestMessage = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        {
            Content = new StringContent(requestJson, Encoding.UTF8, "application/json")
        };

        requestMessage.Headers.Add("Authorization", $"Bearer {_apiKey}");

        var response = await _httpClient.SendAsync(requestMessage);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();

        if (responseJson is { } responseString) {
            var result = JsonConvert.DeserializeObject<OpenAiResponse>(responseString);
            if (result?.Choices?[0]?.Message?.Content is { } text) {
                return text;
            }
        }

        return "GPT is not available right now.";
    }
}