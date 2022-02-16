#!/bin/sh

echo "window.globalConfig = {
    REACT_APP_API_URL: \"${REACT_APP_API_URL}\"
}" > /usr/share/nginx/html/env.js

#main_chunk=$(ls /usr/share/nginx/html/static/js/main.*.js)
#envsubst <$main_chunk >./main_chunk_temp
#cp ./main_chunk_temp $main_chunk
#rm ./main_chunk_temp
