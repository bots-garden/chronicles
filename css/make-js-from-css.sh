#!/bin/bash
css_file="./milligram.css"
js_file_name="./milligram.js"
js_name_module="milligram"
echo "import {css} from 'lit-element';" > ${js_file_name}
echo "// css style: import { ${js_name_module} as ${js_name_module} } from '${js_file_name}';" >> ${js_file_name}
echo "export const ${js_name_module} = css\`" >> ${js_file_name}
cat ${css_file} >> ${js_file_name}
echo "\`;" >> ${js_file_name}




