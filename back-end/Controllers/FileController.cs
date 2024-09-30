/**
* The controller that serves static files (e.g., index.html, CSS, JS, images) for the front-end.
* @author: Yuting Xie
* @date: 2024/09/29
*/

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("{*path}")]  // Wildcard route to capture all unmatched paths
    public class FallbackController : ControllerBase
    {
        private readonly IFileProvider _fileProvider;

        public FallbackController()
        {
            // Set the static file directory (e.g., the dist folder for your front-end)
            var staticFilesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\front-end\\dist\\front-end\\browser");
            _fileProvider = new PhysicalFileProvider(staticFilesDirectory);
        }

        [HttpGet]
        public IActionResult ServeStaticFiles(string? path)
        {
            if (string.IsNullOrEmpty(path))
            {
                path = "index.html";
            }

            // Find the file in the static files directory
            var fileInfo = _fileProvider.GetFileInfo(path);

            if (fileInfo.Exists)
            {
                // Serve the static file (index.html or other)
                var contentType = "text/html";
                if (path.EndsWith(".css"))
                {
                    contentType = "text/css";
                }
                else if (path.EndsWith(".js"))
                {
                    contentType = "application/javascript";
                }
                else if (path.EndsWith(".png"))
                {
                    contentType = "image/png";
                }
                else if (path.EndsWith(".jpg") || path.EndsWith(".jpeg"))
                {
                    contentType = "image/jpeg";
                }
                else if (path.EndsWith(".svg"))
                {
                    contentType = "image/svg+xml";
                }
                return PhysicalFile(fileInfo.PhysicalPath, contentType);
            }

            // Return a 404 if the file is not found
            return NotFound("File not found");
        }
    }
}
