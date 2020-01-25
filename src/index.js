import CLI from './CLI';
import {readlineSync} from './command/console';

const root = new CLI('Enter keyword to run tool');
const development = new CLI('Enter keyword to run tool');

development.push({
    name: 'Generate Full',
    detail: 'Auto generate simple model and CRUD controller, service with model name (capitalize name)\n' +
        '   + Enter database name, table name and model name (capitalize name)\n' +
        '   + EX: shop products Product',
    callback:
        async () => {
            // const name = await readlineSync('Enter database name, table name and model name (capitalize name) to run [Ex: shop products Product]: ');
            // const GenerateTool = require('src/tools/generate').default;
            //
            // const params = name.split(' ');
            //
            // if (params.length === 3) {
            //
            //     const generate = new GenerateTool(params[0], params[1], params[2]);
            //     await generate.all();
            // }
        }
});

development.push({
    name: 'Generate Only Model',
    detail: 'Auto generate simple model with model name (capitalize name)\n' +
        '   + Enter database name, table name and model name (capitalize name)\n' +
        '   + EX: shop products Product',
    callback:
        async () => {
            // const name = await readlineSync('Enter database name, table name and model name (capitalize name) to run [Ex: shop products Product]: ');
            // const GenerateTool = require('src/tools/generate').default;
            //
            // const params = name.split(' ');
            //
            // if (params.length === 3) {
            //
            //     const generate = new GenerateTool(params[0], params[1], params[2]);
            //     await generate.model();
            // }
        }
});


root.push({
    name: 'Development',
    detail: 'Tool for developer',
    callback:
        async () => {
            await development.show();
        }
});


root.show();

