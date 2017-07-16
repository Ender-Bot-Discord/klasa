const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, 'cooldown', { spamProtection: true });
	}

	async run(msg, cmd) {
		if (msg.author.id === this.client.config.ownerID) return;
		if (!cmd.cooldown || cmd.cooldown <= 0) return;

		const instance = cmd.cooldowns.get(msg.author.id);

		if (!instance) return;

		const remaining = ((cmd.cooldown * 1000) - (Date.now() - instance)) / 1000;

		if (remaining < 0) {
			cmd.cooldowns.delete(msg.author.id);
			return;
		}

		throw `You have just used this command. You can use this command again in ${Math.ceil(remaining)} seconds.`;
	}

};
