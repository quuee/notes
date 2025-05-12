```yaml
services:
  ollama:
    image: ollama/ollama:0.6.6
    container_name: ollama
    tty: true
    restart: unless-stopped
    network_mode: bridge
    ports:
      - 28893:11434
    environment:
      - OLLAMA_KEEP_ALIVE=24h
    volumes:
      - /vol1/1000/DockerCompose/LLM/ollama:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  open-webui:
    image: backplane/open-webui:0.6.5-ollama
    container_name: ollama-webui
    volumes:
      - /vol1/1000/DockerCompose/LLM/webui:/app/backend/data
    depends_on:
      - ollama
    network_mode: bridge
    ports:
      - 28894:8080
    restart: unless-stopped
    environment: # https://docs.openwebui.com/getting-started/env-configuration#default_models
      # host.docker.internal 要创建同个网络才行？ 暂时使用ip地址
      - OLLAMA_BASE_URLS=http://host.docker.internal:28893 #comma separated ollama hosts
      - ENV=dev
      - WEBUI_AUTH=False
      - WEBUI_NAME=valiantlynx AI
      - WEBUI_URL=http://localhost:8080
      - WEBUI_SECRET_KEY=MyPWD_llm
      - HF_ENDPOINT=https://hf-mirror.com
```

### 创建一个 ollama 自定义超时时间（没用）

```json
{
  "timeout": "10m",
  "api_timeout": "5m"
}
```
