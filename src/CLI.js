import _ from 'lodash';
import chalk from 'chalk';
import Table from 'cli-table2';
import {execSync} from 'child_process';

import {readlineSync} from './command/console';

export default class CLI {

    constructor(question) {
        this.data = [{
            name: 'Exit',
            detail: 'Press 0 to exit',
            callback: () => {
                process.exit(0);
            }
        }];
        this.question = question;
    }

    _showTable() {
        if (this.data.length > 1) {
            const table = new Table({
                head: ['Key', 'Name', 'Detail']
            });

            _.forEach(this.data, (tool, key) => {
                table.push([key, chalk.yellow.bold(tool.name), tool.detail]);
            });
            console.log(table.toString());
            console.log(`   + Press ${chalk.red.bold('T')} to show table again`);
            console.log(`   + Press ${chalk.red.bold('B')} to back`);
        }
    }

    async _getCommand() {
        const key = await readlineSync(this.question + ': ');

        if (this.data.length > 1) {
            if (key === 't' || key === 'T') {
                await this.show();
            } else if (key === 'b' || key === 'B') {
                return;
            }
        }
        if (_.keys(this.data).includes(key)) {
            await this.data[key].callback();
            await execSync('sleep 2');
            await this.show();
        } else {
            console.error('Keyword incorrect (-_-~!)');
            await this._getCommand();
        }
    }

    async show() {
        this._showTable();
        await this._getCommand();
    }

    push(item) {
        this.data.push(item);
    }
}

