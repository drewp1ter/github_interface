#!/bin/sh


# start nginx
nginx -g 'daemon off;'
exec "$@"