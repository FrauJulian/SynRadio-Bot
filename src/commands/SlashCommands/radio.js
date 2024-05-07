const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../CONFIGS/config.json")
const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, getVoiceConnection } = require("@discordjs/voice");
const mysql = require("mysql");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("radio")
	.setDescription("🎺 | Starte den Radio für die beste Laune!"),
    run: async (client, interaction) => {
        const AudioPlayer = createAudioPlayer();
        const voiceChannel = interaction.member.voice.channel;

        const embed_author_text = config.radio_embed_theme.embed_author_text;
        const embed_author_icon = config.radio_embed_theme.embed_author_icon;
        const embed_footer_text = config.radio_embed_theme.embed_footer_text;
        const embed_footer_icon = config.radio_embed_theme.embed_footer_icon;
        const embed_color = config.radio_embed_theme.embed_color;

        const db = mysql.createConnection({
            host: config.generell.db_host,
            port: config.generell.db_port,
            user: config.generell.db_username,
            password: config.generell.db_password,
            database: config.generell.db_name,
        });
          
        db.connect(async function (err) {
            if (err) {
                console.log(err)
    
                const embed_author_text = config.fehler_embed.embed_author_text;
                const embed_author_icon = config.fehler_embed.embed_author_icon;
                const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                const embed_footer_text = config.fehler_embed.embed_footer_text;
                const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                const embed_color = config.fehler_embed.embed_color;
        
                const ErrEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(embed_description)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({ embeds: [ErrEmbed], ephemeral: true})

                return true;
            }

            if (!voiceChannel) {
                const voiceChannelEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "SPRACHKANAL", iconURL: embed_author_icon })
                .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Du musst in einem Sprachkanal sein um das Musik System zu nutzen!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                return interaction.reply({ embeds: [voiceChannelEmbed], ephemeral: true });
            }
    
            if (interaction.guild.members.me.voice.channelId !== null) {
                if (interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
                    const alreadyActiveEmbed = new EmbedBuilder()
                    .setAuthor({ name: embed_author_text + "BEREITS AKTIV", iconURL: embed_author_icon })
                    .setDescription(`[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `+"`Support@SynRadio.de`"+`!\n## Der Bot ist auf diesen Server bereits aktiv! Du findest den Radio in <#`+interaction.guild.members.me.voice.channelId+`>!`)
                    .setTimestamp()
                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                    .setColor(embed_color)
                    return interaction.reply({ embeds: [alreadyActiveEmbed], ephemeral: true });
                }
            }
    
            try {
                function CheckTableGetData() {
                    const GuildID = interaction.guild.id;
                    const SQL1 = "SHOW TABLES;"
                    db.query(SQL1, function (err, result){
                        if (err) {
                            console.log(err)
    
                            const embed_author_text = config.fehler_embed.embed_author_text;
                            const embed_author_icon = config.fehler_embed.embed_author_icon;
                            const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                            const embed_footer_text = config.fehler_embed.embed_footer_text;
                            const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                            const embed_color = config.fehler_embed.embed_color;
                    
                            const ErrEmbed = new EmbedBuilder()
                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                            .setDescription(embed_description)
                            .setTimestamp()
                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                            .setColor(embed_color)
                            interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                            return true;
                        } else {
                            const res1 = Object.assign({}, result);
                            const resp = JSON.stringify(res1);
                            if (resp.includes(GuildID)) {
                                const imvciCD = interaction.member.voice.channel.id;
                                const igiCD = interaction.guild.id;
                                const igvCD = interaction.guild.voiceAdapterCreator;

                                myCache.set("igvCC"+interaction.guild.id, interaction.guild.voiceAdapterCreator);

                                const SQL3 = "UPDATE `"+GuildID+"` SET imvciC = "+imvciCD+" WHERE 1;";
                                const SQL4 = "UPDATE `"+GuildID+"` SET igiC = "+igiCD+" WHERE 2;";
                                const SQL5 = "UPDATE `"+GuildID+"` SET igvC = "+igvCD+" WHERE 3;";
                                const SQL6 = "UPDATE `"+GuildID+"` SET active = true WHERE 4;";
                                db.query(SQL3, function (err, result){
                                    if (err) {
                                        console.log(err)
    
                                        const embed_author_text = config.fehler_embed.embed_author_text;
                                        const embed_author_icon = config.fehler_embed.embed_author_icon;
                                        const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                        const embed_footer_text = config.fehler_embed.embed_footer_text;
                                        const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                        const embed_color = config.fehler_embed.embed_color;
                                
                                        const ErrEmbed = new EmbedBuilder()
                                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                        .setDescription(embed_description)
                                        .setTimestamp()
                                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                        .setColor(embed_color)
                                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                        return true;
                                    };
                                });
                                db.query(SQL4, function (err, result){
                                    if (err) {
                                        console.log(err)
    
                                        const embed_author_text = config.fehler_embed.embed_author_text;
                                        const embed_author_icon = config.fehler_embed.embed_author_icon;
                                        const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                        const embed_footer_text = config.fehler_embed.embed_footer_text;
                                        const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                        const embed_color = config.fehler_embed.embed_color;
                                
                                        const ErrEmbed = new EmbedBuilder()
                                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                        .setDescription(embed_description)
                                        .setTimestamp()
                                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                        .setColor(embed_color)
                                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                        return true;
                                    };
                                });
                                db.query(SQL5, function (err, result){
                                    if (err) {
                                        return false;
                                    };
                                });
                                db.query(SQL6, function (err, result){
                                    if (err) {
                                        console.log(err)
    
                                        const embed_author_text = config.fehler_embed.embed_author_text;
                                        const embed_author_icon = config.fehler_embed.embed_author_icon;
                                        const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                        const embed_footer_text = config.fehler_embed.embed_footer_text;
                                        const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                        const embed_color = config.fehler_embed.embed_color;
                                
                                        const ErrEmbed = new EmbedBuilder()
                                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                        .setDescription(embed_description)
                                        .setTimestamp()
                                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                        .setColor(embed_color)
                                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                        return true;
                                    };
                                });
                            } else {
                                const SQL2 = "CREATE TABLE `"+GuildID+"` (`imvciC` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL , `igiC` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL , `igvC` LONGTEXT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL , `active` INT(11) NULL DEFAULT '0' ) ENGINE = InnoDB;";
                                db.query(SQL2, function (err, result){
                                    if (err) {
                                        console.log(err)
    
                                        const embed_author_text = config.fehler_embed.embed_author_text;
                                        const embed_author_icon = config.fehler_embed.embed_author_icon;
                                        const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                        const embed_footer_text = config.fehler_embed.embed_footer_text;
                                        const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                        const embed_color = config.fehler_embed.embed_color;
                                
                                        const ErrEmbed = new EmbedBuilder()
                                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                        .setDescription(embed_description)
                                        .setTimestamp()
                                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                        .setColor(embed_color)
                                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                        return true;
                                    } else {
                                        const SQL3 = "INSERT INTO `"+GuildID+"` (imvciC, igiC, igvC, active) VALUES (0, 0, 0, false);";
                                        db.query(SQL3, function (err, result){
                                            if (err) {
                                                console.log(err)
    
                                                const embed_author_text = config.fehler_embed.embed_author_text;
                                                const embed_author_icon = config.fehler_embed.embed_author_icon;
                                                const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                                const embed_footer_text = config.fehler_embed.embed_footer_text;
                                                const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                                const embed_color = config.fehler_embed.embed_color;
                                        
                                                const ErrEmbed = new EmbedBuilder()
                                                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                                .setDescription(embed_description)
                                                .setTimestamp()
                                                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                                .setColor(embed_color)
                                                interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                                return true;
                                            } else {
                                                CheckTableGetData();
                                            }
                                        });
                                    }
                                })
                            }
                        } 
                    })
                }

                function MaxListeners() {
                    const GuildID = interaction.guild.id;
                    const connection = getVoiceConnection(GuildID)
                    connection.setMaxListeners(75);
                }

                function ReJoin() {
                    setTimeout(() => {
                        const GuildID = interaction.guild.id;
                        const SQL1 = "SELECT active from `"+GuildID+"`;";
                        db.query(SQL1, function(err, result) {
                            if (err) {
                                console.log(err)
                    
                                const embed_author_text = config.fehler_embed.embed_author_text;
                                const embed_author_icon = config.fehler_embed.embed_author_icon;
                                const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                const embed_footer_text = config.fehler_embed.embed_footer_text;
                                const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                const embed_color = config.fehler_embed.embed_color;
                        
                                const ErrEmbed = new EmbedBuilder()
                                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                .setDescription(embed_description)
                                .setTimestamp()
                                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                .setColor(embed_color)
                                interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                
                                return true;
                            } else {
                                const res1 = Object.assign({}, result);
                                const res2 = JSON.stringify(res1);
                                const res3 = res2.split("");
                                const resp = res3[15];
                                if (resp.includes("1")) {
                                    const SQL1 = "SELECT igiC from `"+GuildID+"`;";
                                    db.query(SQL1, function(err, result) {
                                        if (err) {
                                            console.log(err)
                
                                            const embed_author_text = config.fehler_embed.embed_author_text;
                                            const embed_author_icon = config.fehler_embed.embed_author_icon;
                                            const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                            const embed_footer_text = config.fehler_embed.embed_footer_text;
                                            const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                            const embed_color = config.fehler_embed.embed_color;
                                    
                                            const ErrEmbed = new EmbedBuilder()
                                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                            .setDescription(embed_description)
                                            .setTimestamp()
                                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                            .setColor(embed_color)
                                            interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                            return true;
                                        } else {
                                            const resp = result.values();
                                            for (const value of resp) {
                                                const igi = (value["igiC"]);
                                                const connection = getVoiceConnection(igi)
                                                AudioPlayer.stop();
                                                connection.destroy();
                                                JoinChannel();
                                                MaxListeners();
                                            }
                                        }
                                    })
                                } else {
                                    return true;
                                }
                            }})
                        }, 3600000); //3600000
                    }

                function JoinChannel() {
                    const GuildID = interaction.guild.id;
                    const SQL1 = "SELECT active from `"+GuildID+"`;";
                    db.query(SQL1, function(err, result) {
                        if (err) {
                            console.log(err)
                
                            const embed_author_text = config.fehler_embed.embed_author_text;
                            const embed_author_icon = config.fehler_embed.embed_author_icon;
                            const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                            const embed_footer_text = config.fehler_embed.embed_footer_text;
                            const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                            const embed_color = config.fehler_embed.embed_color;
                    
                            const ErrEmbed = new EmbedBuilder()
                            .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                            .setDescription(embed_description)
                            .setTimestamp()
                            .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                            .setColor(embed_color)
                            interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
            
                            return true;
                        } else {
                            const res1 = Object.assign({}, result);
                            const res2 = JSON.stringify(res1);
                            const res3 = res2.split("");
                            const resp = res3[15];
                            if (resp.includes("1")) {
                                const SQL2 = "SELECT imvciC from `"+GuildID+"`;";
                                db.query(SQL2, async function(err, result) {
                                    if (err) {
                                        console.log(err)
                            
                                        const embed_author_text = config.fehler_embed.embed_author_text;
                                        const embed_author_icon = config.fehler_embed.embed_author_icon;
                                        const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                        const embed_footer_text = config.fehler_embed.embed_footer_text;
                                        const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                        const embed_color = config.fehler_embed.embed_color;
                                
                                        const ErrEmbed = new EmbedBuilder()
                                        .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                        .setDescription(embed_description)
                                        .setTimestamp()
                                        .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                        .setColor(embed_color)
                                        interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                        
                                        return true;
                                    } else {
                                        const resp = result.values();
                                        for (const value of resp) {
                                            const imvciC = (value["imvciC"]);
                                            const SQL3 = "SELECT igiC from `"+GuildID+"`;";
                                            db.query(SQL3, async function(err, result) {
                                                if (err) {
                                                    console.log(err)
                                        
                                                    const embed_author_text = config.fehler_embed.embed_author_text;
                                                    const embed_author_icon = config.fehler_embed.embed_author_icon;
                                                    const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                                    const embed_footer_text = config.fehler_embed.embed_footer_text;
                                                    const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                                    const embed_color = config.fehler_embed.embed_color;
                                            
                                                    const ErrEmbed = new EmbedBuilder()
                                                    .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                                    .setDescription(embed_description)
                                                    .setTimestamp()
                                                    .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                                    .setColor(embed_color)
                                                    interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                    
                                                    return true;
                                                } else {
                                                    const resp = result.values();
                                                    for (const value of resp) {
                                                        const igiC = (value["igiC"]);
                                                        const SQL4 = "SELECT igvC from `"+GuildID+"`;";
                                                        db.query(SQL4, async function(err, result) {
                                                            if (err) {
                                                                console.log(err)
                                                    
                                                                const embed_author_text = config.fehler_embed.embed_author_text;
                                                                const embed_author_icon = config.fehler_embed.embed_author_icon;
                                                                const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                                                                const embed_footer_text = config.fehler_embed.embed_footer_text;
                                                                const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                                                                const embed_color = config.fehler_embed.embed_color;
                                                        
                                                                const ErrEmbed = new EmbedBuilder()
                                                                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                                                                .setDescription(embed_description)
                                                                .setTimestamp()
                                                                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                                                                .setColor(embed_color)
                                                                interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
                                                
                                                                return true;
                                                            } else {
                                                                const resp = result.values();
                                                                for (const value of resp) {
                                                                    const igvC = (value["igvC"]);
                        
                                                                    let Radio = config.generell.radio_link;
                                                                    let Audio = createAudioResource(Radio);
                                                                    AudioPlayer.play(Audio);

                                                                    const igvCCD = myCache.get("igvCC"+interaction.guild.id);

                                                                    joinVoiceChannel({
                                                                        channelId: imvciC,
                                                                        guildId: igiC,
                                                                        adapterCreator: igvCCD
                                                                    }).subscribe(AudioPlayer)

                                                                    ReJoin();
                                                                    MaxListeners();

                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
                
                setTimeout(() => {CheckTableGetData();}, 100);
                setTimeout(() => {CheckTableGetData();}, 200);
                setTimeout(() => {JoinChannel();}, 1000);

                const RadioPlay = new EmbedBuilder()
                .setAuthor({ name: embed_author_text + "GESTARTET", iconURL: embed_author_icon })
                .setDescription("[LautFM](https://laut.fm/synradiode) | [Webseite](https://synradio.de/) | [Impressum](https://synradio.de/impressum.html)\nKontaktiere uns unter `Support@SynRadio.de`!\n## Die beste Laune ist garantiert!")
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                setTimeout(() => {interaction.reply({ embeds: [RadioPlay], ephemeral: true });}, 1000);
    
            } catch (err) {
                console.log(err)
    
                const embed_author_text = config.fehler_embed.embed_author_text;
                const embed_author_icon = config.fehler_embed.embed_author_icon;
                const embed_description = config.fehler_embed.embed_description.replace("%error%", "" + err + "");
                const embed_footer_text = config.fehler_embed.embed_footer_text;
                const embed_footer_icon = config.fehler_embed.embed_footer_icon;
                const embed_color = config.fehler_embed.embed_color;
        
                const ErrEmbed = new EmbedBuilder()
                .setAuthor({ name: embed_author_text, iconURL: embed_author_icon })
                .setDescription(embed_description)
                .setTimestamp()
                .setFooter({ text: embed_footer_text, iconURL: embed_footer_icon })
                .setColor(embed_color)
                interaction.reply({ embeds: [ErrEmbed], ephemeral: true})
              }
        });
    }
}
