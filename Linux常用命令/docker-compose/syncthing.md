```yaml
version: "3"
services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    environment:
      PUID: ${TRIM_UID}
      PGID: ${TRIM_GID}
    volumes:
      - /wherever/st-sync:/var/syncthing
    restart: unless-stopped
    network_mode: host
    healthcheck:
      test: curl -fkLsS -m 2 127.0.0.1:8384/rest/noauth/health | grep -o --color=never OK || exit 1
      interval: 1m
      timeout: 10s
      retries: 3
```

```yaml
    ports:
      - 8384:8384 # Web UI
      - 22000:22000/tcp # TCP file transfers
      - 22000:22000/udp # QUIC file transfers
      - 21027:21027/udp # Receive local discovery broadcasts
      #请注意，Docker 的默认网络模式会阻止本地 IP 地址 被发现，因为 Syncthing 只能看到 容器。这将导致传输速率不佳 如果未手动配置本地设备地址。172.17.0.0/16
```