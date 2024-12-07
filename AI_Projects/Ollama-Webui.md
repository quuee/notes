
```yaml

version: "3.8"

services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    environment:
      OLLAMA_BASE_URL: "http://192.168.1.130:11434"
      HF_ENDPOINT: https://hf-mirror.com
    ports:
      - "28883:8080"
    volumes:
      - /vol2/1000/Docker/ollama-open-webui/data:/app/backend/data
    restart: unless-stopped
    networks:
      - trim-default
networks:
  trim-default:
    external: true
```