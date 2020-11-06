import fs from 'fs';
import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { promisify } from 'util';

import { createController } from './main';


const access = promisify(fs.access);

async function promptChoose() {
    const answers = await inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'Please choose type generate: ',
        choices: ['Controller'],
    }]);
    return answers.type;
}

async function promptCreateController() {

    const questions = [{
            type: 'input',
            name: 'path',
            message: 'Enter a path to service: ',
            default: process.cwd(),
        },
        {
            type: 'input',
            name: 'app',
            message: 'Enter app name (camelCase): ',
            default: null,
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter controller name (PascalCase): ',
            default: null,
        }, {
            type: 'input',
            name: 'version',
            message: 'Enter version: ',
            default: 'none',
        }
    ];


    const answers = await inquirer.prompt(questions);
    return {
        path: answers.path,
        app: answers.app,
        name: answers.name,
        version: answers.version,
    };
}

export async function cli(args) {


    const type = await promptChoose();


    if (type === 'Controller') {
        const options = await promptCreateController();


        try {
            await access(options.path, fs.constants.R_OK);
        } catch (err) {
            console.error('%s Invalid path %s', chalk.red.bold('ERROR'), chalk.black.bold(options.path));
            process.exit(1);
        }

        await createController(options);

    }
}