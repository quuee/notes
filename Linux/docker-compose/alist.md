```yaml
services:
    alist:
        image: 'xhofe/alist:v3.41.0-ffmpeg'
        container_name: alist
        volumes:
            - '/vol2/1000/Docker/alist/data:/opt/alist/data'
        ports:
            - '28879:5244'
        environment:
            UID: ${TRIM_UID}
            GID: ${TRIM_GID}
            TZ: Asiz/Shanghai
            UMASK: 022
        restart: unless-stopped

```