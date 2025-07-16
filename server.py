
import http.server
import socketserver
import os
from pathlib import Path

PORT = 5000
DIST_DIR = os.path.join(os.path.dirname(__file__), 'dist')

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        # For SPA routing, serve index.html for routes that don't exist
        if self.path != '/' and not Path(DIST_DIR + self.path).exists():
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}/")
        print(f"Serving files from: {DIST_DIR}")
        httpd.serve_forever()
