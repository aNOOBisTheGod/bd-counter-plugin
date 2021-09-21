/**
 * @name SpamMessage
 * @author aNOOBis
 * @version 2.1.0
 * @description Allows you to spam @everyone messages. To start spam return /ss in text field. To stop press ctrl + R
 * @website https://anoobisthegod.github.io/web/site/
 */
 
 const config = {
    info: {
        name: 'SpamMessage',
        authors: [
            {
                name: 'aNOOBis',
                github_username: 'aNOOBisTheGod'
            }
        ],
        version: '0.0.1',
        description: 'Allows you to spam @everyone messages. To start spam return /ss in text field. To stop press ctrl + R',
        github: 'https://github.com/aNOOBisTheGod/SpamMessagePlugin',
    }
};

module.exports = class {
    constructor() {
        this._config = config;
    }

    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(', ');
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

	load() {}
	unload() {}
	start() { this.attachHandler(); }
	onSwitch() { this.attachHandler(); }
	stop() {
		let el = document.querySelectorAll('form[class^="form-');
		if (el.length == 0) return;


		el[0].removeEventListener('keydown', this.handler);
	}

	attachHandler() {
		this.handler = this.handleKeypress.bind(this);
		let el = document.querySelectorAll('form[class^="form-');
		if (el.length == 0) return;
	

		el[0].addEventListener('keydown', this.handler, false);
	}


	sendMessage() {

		let channelID = BdApi.findModuleByProps('getChannelId').getChannelId();
	

		let MessageQueue = BdApi.findModuleByProps('enqueue');
		let MessageParser = BdApi.findModuleByProps('createBotMessage');
	
		let msg = MessageParser.createBotMessage(channelID, '');
	

		MessageQueue.enqueue({
			type: 0,
			message: {
				channelId: channelID,
				content: '@everyone',
				tts: false,
				nonce: msg.id,
			}
		}, r => {
			return;
		});
	}


	handleKeypress(e) {
		var code = e.keyCode || e.which;

		if (code !== 13) {
			return;
		}

		if (e.shiftKey) {
			return;
		}


		function splitSingle(str, delimeter) {
			let part1 = str.substr(0, str.indexOf(delimeter));
			let part2 = str.substr(str.indexOf(delimeter) + 1);

			return [part1, part2]
		};


		function getDeepest(elem) {
			if(elem.firstChild == null) {
				return elem;
			} else {
				return getDeepest(elem.firstChild);
			}
		};


		let elements = Array.from(document.querySelectorAll('div[class^="textArea-')[0].children[0].children);
		let text = '';
		elements.forEach(function(l0) {
			Array.from(l0.children).forEach(function(l1) {
				Array.from(l1.children).forEach(function(elem) {
					elem = getDeepest(elem);
					if(elem.alt) {
						text += elem.alt;
					} else {
						text += elem.textContent;
					}
				});
			});
			text += '\n';
		});

		if (!text.startsWith('/ss')) {
			return;
		};

		console.log(this);
		for (var i = 0; i <= 10000; i++) {
		this.sendMessage();
	}

		this.lastKey = 0;
	}
};