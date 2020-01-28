import _ from 'lodash';
import mkdirp from 'mkdirp';
import ejs from 'ejs';
import {js as js_beautify} from 'js-beautify';
import util from 'util';
import fs from 'fs';
import path from 'path';


const templateDir = path.resolve('./templates');
const currentDir = process.cwd();

class GenerateTool {
    static createAPIPathIfExists(name) {
        if (name) {
            const path = `${currentDir}/src/app/api/services/${name}`;
            if (!fs.existsSync(path)) {
                mkdirp(path);
            }
        } else {
            throw new Error('Empty name create');
        }
    }

    static createModelAPI(name) {
        this.createAPIPathIfExists(name);
    }

    static createRepositoryAPI(name) {
        this.createAPIPathIfExists(name);
    }

    static createControllerAPI(name) {
        this.createAPIPathIfExists(name);
    }

    static createAllAPI(name) {
        this.createModelAPI(name);
        this.createRepositoryAPI(name);
        this.createControllerAPI(name);
    }

    static createPM2(type = 'monolithic', port = 4001) {

        if (['monolithic', 'microservices'].includes(type)) {
            let pm2Json = {
                apps: []
            };
            const pm2JsonPath = `${currentDir}/pm2.json`;
            if (fs.existsSync(pm2JsonPath)) {
                pm2Json = require(pm2JsonPath);
                pm2Json.apps = _.filter(pm2Json.apps, item => !item.name.startsWith('api'));
            }
            let services = [];
            if (type === 'monolithic') {
                services.push('all');
            } else if (type === 'microservices') {
                const servicePath = `${currentDir}/src/app/api/services`;
                services = fs.readdirSync(servicePath).filter(dir => fs.statSync(`${servicePath}/${dir}`).isDirectory());
            }
            port = Number(port);
            services.map(name => {
                pm2Json.apps.push({
                    'name': `api-${name}`,
                    'script': 'index.js',
                    'instances': '1',
                    'exec_mode': 'cluster_mode',
                    'ignore_watch': [
                        'node_modules',
                        'temps',
                        'test'
                    ],
                    'env': {
                        'APP': 'api',
                        'APP_PORT': port++,
                        'SERVICE': name
                    }
                });
            });
            fs.writeFileSync(pm2JsonPath, js_beautify(JSON.stringify(pm2Json)));
        } else {
            console.error(`pm2 type ${type} not exists`);
        }
    }
}

export default GenerateTool;









