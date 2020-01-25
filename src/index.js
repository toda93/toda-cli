#!/usr/bin/env node

import CLI from './CLI';

const root = new CLI('Enter keyword to run tool');
const development = new CLI('Enter keyword to run tool');

root.push({
    name: 'Development',
    detail: 'Tool for developer',
    callback:
        async () => {
            await development.show();
        }
});
root.show();

