
```yaml
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:v0.5.3
    container_name: open-webui
    restart: no
    ports:
      - 28882:8080
    volumes:
      - /vol2/1000/Docker/open-webui/data:/app/backend/data
    environment:
      OLLAMA_BASE_URL: "http://192.168.1.130:11434"
      HF_ENDPOINT: https://hf-mirror.com
    networks:
     - trim-default
networks:
  trim-default:
    external: true
```