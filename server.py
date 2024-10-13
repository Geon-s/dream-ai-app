Python 3.10.2 (tags/v3.10.2:a58ebcc, Jan 17 2022, 14:12:15) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
import http.server
import socketserver

# Define the port you want the server to listen on
PORT = 8000

# Define the handler to serve files from the current directory
Handler = http.server.SimpleHTTPRequestHandler

# Create the server object
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
