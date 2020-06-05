const {readdir} = require('fs'),
    {resolve} = require('path'),
    chalk = require('chalk')

/**
 * @author Sora
 * @param client
 * @return {Promise<void>}
 */
module.exports = async (client) => {
    readdir("./commands/", (err, content) => {
        if (err) console.log(err);
        let groups = [];
        for (let element of content){
            if (!element.includes('.')) groups.push(element);
        }

        for (const folder of groups){
            readdir("./commands/" + folder, (e, files) => {
                let commandFile = files.filter(f => f.split(".").pop() === "js");
                if (commandFile.length < 1) return;
                if (e) console.log(e);
                for (const element of commandFile) {
                    let props = require(resolve('./commands/' + folder + '/' + element));
                    console.log(`${chalk.green('[LOAD]' + ' ' + element.split('.')[0])} ${chalk.blue('OF')} ${chalk.yellow(folder)} ${chalk.blue('MDULE')}`)
                    if (process.stdout.moveCursor) {
                        process.stdout.moveCursor(0, -1);
                    }
                    if (process.stdout.clearLine) {
                        process.stdout.clearLine();
                    }

                    client.commands.set(element.split('.')[0], props);
                    if (props.conf && props.conf.aliases) {
                        for (let alias of props.conf.aliases){
                            client.aliases.set(alias, props)
                        }
                    }
                }
            });
        }
    });
};