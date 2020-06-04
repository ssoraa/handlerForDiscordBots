Star & fork ;)
## Commands handler
```js
const {readdir} = require('fs');

module.exports = async (client) => {
    readdir("./events/", (err, content) => {
        if (err) console.log(err);
        if (content.length < 1) return;
        let groups = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element);
        });
        groups.forEach(folder => {
            readdir("./events/" + folder, (e, files) => {
                let js_files = files.filter(f => f.split(".").pop() === "js");
                if (js_files.length < 1) return;
                if (e) console.log(e);
                js_files.forEach(element => {
                    let props = require('../../events/' + folder + '/' + element);
                    console.log(`Loading Event: ${element.split('.')[0]}`)
                    if (process.stdout.moveCursor) {
                        process.stdout.moveCursor(0, -1);
                    }
                    if (process.stdout.clearLine) {
                        process.stdout.clearLine();
                    }
                    client.on(element.split('.')[0], props.bind(null, client));
                });
            });
        });
    });
};

```

## Events handler
```js
const {readdir} = require('fs');

module.exports = async (client) => {
    readdir("./commands/", (err, content) => {
        if (err) console.log(err);
        let groups = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element);
        });
        groups.forEach(folder => {
            readdir("./commands/" + folder, (e, files) => {
                let js_files = files.filter(f => f.split(".").pop() === "js");
                if (js_files.length < 1) return;
                if (e) console.log(e);
                js_files.forEach(element => {
                    let props = require('./commands/' + folder + '/' + element);
                    console.log(`Loading Command: ${element.split('.')[0]}`)

                    if (process.stdout.moveCursor) {
                        process.stdout.moveCursor(0, -1);
                    }
                    if (process.stdout.clearLine) {
                        process.stdout.clearLine();
                    }

                    client.commands.set(element.split('.')[0], props);
                    if (props.conf && props.conf.aliases) {
                        props.conf.aliases.forEach(alias => {
                            client.aliases.set(alias, props)
                        });
                    }
                });
            });
        });
    });
};

```


## Use commands handler
```js
exports.run = (client, message) => {
console.log('cool test command !')
};
module.exports.conf = {
    aliases: ['test']
};
module.exports.help = {
    name: 'testing'
};
```


## Use event handler
```js
module.exports = (client, data, data) => {
console.log('cool event handler  !')
};

```