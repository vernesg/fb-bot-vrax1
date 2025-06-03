module.exports = {
    name: "event",

    async execute({ api, event }) {
        if (event.logMessageType === "log:subscribe") {
            try {
                const threadInfo = await api.getThreadInfo(event.threadID);
                const totalMembers = threadInfo.participantIDs.length;
                const botID = api.getCurrentUserID();

                const newUsers = event.logMessageData.addedParticipants;
                for (const user of newUsers) {
                    const userID = user.userFbId;
                    const userName = user.fullName || "there";

                    const mentions = [
                        { tag: `@${userName}`, id: userID },
                        { tag: "@Vern", id: "100070577903608" },
                        { tag: "@BotCreator", id: "100070577903608" }
                    ];

                    const message = {
                        body: `👋 Uy welcome pala anak ni satanas@${userName} long time no see ha‚ bakit buhay kapa?👥 Total members: ${totalMembers}


🧑‍🎤[ADMIN] @Vern: mag enjoy ka lang tandaan mo akin yung isa rito, boy🖕

Bot creator:  @BotCreator`,
                        mentions
                    };

                    await api.sendMessage(message, event.threadID);

                    // Set bot nickname if it's the one added
                    if (userID === botID) {
                        const newNickname = "alagad ni vern";
                        await api.changeNickname(newNickname, event.threadID, botID);
                    }
                }
            } catch (err) {
                console.error("❌ Error in group event:", err);
            }
        }
    }
};