import _ from 'lodash';
import mkdirp from 'mkdirp';
import ejs from 'ejs';
import {js as js_beautify} from 'js-beautify';
import util from 'util';
import fs from 'fs';
import path from 'path';


const templateDir = path.resolve('./templates');
const currentDir = process.cwd();


class GenerateAPITool {
    createPathIfExists(name) {
        if(name){
            const path = `${currentDir}/src/app/services/api/${name}`;
            if (!fs.existsSync(path)) {
                mkdirp(path);
            }
        } else {
            throw new Error('Empty name create');
        }
    }

    createService(name) {
        this.createPathIfExists(name);
    }

    createController(name) {
        this.createPathIfExists(name);
    }

    createAll(name) {
        this.createService(name);
        this.createController(name);
    }
}

export default new GenerateAPITool;









