server {
    listen 80;
    server_name www.anlibreeders.com anlibreeders.com;

    location / {
        return 301 https://anlibreeders.com$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name anlibreeders.com;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/anlibreeders.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/anlibreeders.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_pass http://127.0.0.1:3002;
    }

    access_log /var/log/anlibreeders.com/anlibreeders.com.nginx.access.log;
    error_log /var/log/anlibreeders.com/anlibreeders.com.nginx.error.log;
}