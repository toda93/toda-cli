import readline from 'readline';
import stripBOM from 'strip-bom';

export function readlineSync(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, function (answer) {
            rl.close();
            return resolve(stripBOM(answer));
        });
    });
}