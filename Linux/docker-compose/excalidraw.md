
```yaml

services:
  excalidraw:
    container_name: excalidraw
    image: excalidraw/excalidraw:latest
    network_mode: bridge
    ports:
      - "28886:80"
    restart: unless-stopped
```