/**
* The entry point of the backend service.
* @author: Yuting Xie
* @date: 2024/09/29
*/
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);


// Register controllers to the IoC container
builder.Services.AddControllers();

var app = builder.Build();

// Use request logging middleware
app.UseMiddleware<RequestLoggingMiddleware>();

// Set up the routing system
app.UseRouting();

// Register the controllers to the routing system
app.MapControllers();

app.Run("http://localhost:5001");
