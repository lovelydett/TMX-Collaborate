/**
* The request logging middleware that logs the details of each HTTP request to the console.
* @author: Yuting Xie
* @date: 2024/09/29
*/

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;

    // Constructor to inject the next middleware in the pipeline
    public RequestLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // The method that handles each request
    public async Task InvokeAsync(HttpContext context)
    {
        // Log the HTTP request details to the console
        Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path} at {DateTime.UtcNow}");

        // Call the next middleware in the pipeline
        await _next(context);
    }
}
