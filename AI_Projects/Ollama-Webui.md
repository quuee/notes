### webui
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
### ollama 局域网访问
安装ollama,如果webui和ollama服务不是在同台设备上,需要修改OLLAMA_HOST.
windows在环境变量 (系统|用户都行)添加 OLLAMA_HOST:0.0.0.0  
(或者只允许192.168.0.0/24网段的地址,但是这么写不行)
重启ollama