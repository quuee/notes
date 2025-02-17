```yaml

services:
  navidrome:
    image: deluan/navidrome:0.54.2
    ports:
      - "28878:4533"
    restart: unless-stopped
    environment:
      UID: ${TRIM_UID}
      GID: ${TRIM_GID}
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info  
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - "/vol2/1000/Docker/navidrome/data:/data"
      - "/vol1/1000/音乐/常听:/music:ro"
```