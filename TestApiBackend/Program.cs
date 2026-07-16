var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGet("/api/test", () => Results.Ok(new { message = "Hello from .NET backend! (v2 - post backup test) CI/CD pipeline test app is working.", timestamp = DateTime.UtcNow }));

app.Urls.Add("http://0.0.0.0:5000");
app.Run();
