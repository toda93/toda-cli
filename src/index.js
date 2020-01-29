#!/usr/bin/env node
import GenerateTool from './generate';

function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            // long arg
            if (arg.slice(0, 2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2, longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                const flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}
const args = getArgs();
(async () => {
    if (args['api']) {
        if (args['create']) {
            await GenerateTool.createAllAPI(args['create']);
        } else if (args['create-model']) {
            await GenerateTool.createRepositoryAPI(args['create-model']);
        } else if (args['create-repository']) {
            await GenerateTool.createRepositoryAPI(args['create-repository']);
        } else if (args['create-controller']) {
            await GenerateTool.createRepositoryAPI(args['create-controller']);
        }
    } else if (args['pm2']) {
        await GenerateTool.createPM2(args['type'], args['port']);
    }

})();




