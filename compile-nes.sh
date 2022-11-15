output="./public/nes.js"
cat nesjs/lib/*.js > ${output} \
&& cat nesjs/nes/*.js >> ${output} \
&& cat nesjs/mappers/*.js >> ${output} \
&& cat nesjs/js/audio.js >> ${output} \
&& cat nesjs/js/main.js >> ${output}