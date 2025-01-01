
```yaml
services:
  redis:
    image: redis:7.4.1
    container_name: redis
    restart: always
    ports:
      - "28869:6379"
    volumes:
      - /vol2/1000/Docker/redis/data:/data
      - /vol2/1000/Docker/redis/logs:/logs
      - /etc/localtime:/etc/localtime
      - /usr/share/zoneinfo:/usr/share/zoneinfo
    command: redis-server --appendonly yes --loglevel debug --protected-mode no --requirepass redispass
```