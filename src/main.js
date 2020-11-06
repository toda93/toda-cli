import _ from 'lodash';
import fs from 'fs';
import pluralize from 'pluralize';
import Listr from 'listr';
import mkdirp from 'mkdirp';
import { js as js_beautify } from 'js-beautify';
import ejs from 'ejs';


const templateControllerDir = `${__dirname}/templates/controller`;


function generateName(pascalName) {
    const name = {
        pascal: pascalName,
        snake: _.snakeCase(pascalName),
        camel: _.camelCase(pascalName),
        constant: _.upperCase(pascalName).replace(/ /g, '_')
    }


    name.camelPlural = pluralize(name.camel);
    name.snakePlural = pluralize(name.snake);
    return name;
}


async function createControllerFile(params, copyDir) {
    const text = await ejs.renderFile(`${templateControllerDir}/controller.ejs`, params);
    fs.writeFileSync(`${copyDir}/controller.js`, js_beautify(text));

}
async function createRequestFile(params, copyDir) {
    const text = await ejs.renderFile(`${templateControllerDir}/request.ejs`, params);
    fs.writeFileSync(`${copyDir}/request.js`, js_beautify(text));

}
async function createResponseFile(params, copyDir) {
    const text = await ejs.renderFile(`${templateControllerDir}/response.ejs`, params);
    fs.writeFileSync(`${copyDir}/response.js`, js_beautify(text));

}
export async function createController(options) {
    const name = generateName(options.name);

    const params = {
        app: options.app,
        ...name
    }

    const copyDir = `${options.path}/src/apps/${options.app}/services/api/${name.camel}/${options.version}`;

    const tasks = new Listr([{
        title: `Create folder ${name.camel}`,
        task: async () => {
            if (!fs.existsSync(copyDir)) {
                await mkdirp(copyDir);
            }
        }
    }, {
        title: 'Copy controller',
        task: () => createControllerFile(params, copyDir)
    }, {
        title: 'Copy request',
        task: () => createRequestFile(params, copyDir)
    }, {
        title: 'Copy response',
        task: () => createResponseFile(params, copyDir)
    }]);


    tasks.run().catch(err => {
        process.exit(1);

    });
}