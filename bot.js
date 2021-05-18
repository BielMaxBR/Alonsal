const Discord = require('discord.js');
const { existsSync } = require("fs");
const bot = new Discord.Client();
const prefix = 'ã';
var usos = 86, usos_anterior = 0;

bot.login('ODMzMzQ5OTQzNTM5NTMxODA2.YHxDnQ.jCaT2TwDW2_dtnBwmVxQcQhcff8');
// Ativar o bot [ npm test ]

bot.on('ready', () => {
    console.log('Caldeiras aquecidas!\n');

    bot.user.setActivity('Vapor p/ fora!', 'COMPETING')
    let activities = [
        "ãh | ãhelp",
        "Carvão na fogueira",
        "Fumaça para o mundo",
    ]
    
    i = 0;
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`), 5000);
});

bot.on('message', message => {

    var content = message.content;

    if (!content.startsWith(prefix) || message.author.bot) return;
    
    if(content == "ãc")
        content = "ãcurio";
    else if(content == "ãb")
        content = "ãbriga";
    else if(content == "ãj")
        content = "ãjoke";
    else if(content == "ãh")
        content = "ãhelp";
    else if(content == "ãcaz")
        content = "ãcazalbe";
    else if(content.includes("ãjkp"))
        content = content.replace("ãjkp", "ãrps");
    else if(content.includes("ãga") && !content.includes("ãgado"))
        content = content.replace("ãga", "ãgado");
    else if(content == "ãp")
        content = "ãping";

    const args = content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    var canal = message.channel.name;
    if(typeof canal == "undefined")
        canal = "Chat privado";

    console.log('Comando: '+ content + ", Canal: "+ canal);

    const path = `./comandos/${command}.js`
    if (existsSync(path)) {
        usos++;

        require(path)({bot, message, args});
    }

    if(content == 'ã'){
        usos++;

        const comando = new Discord.MessageAttachment('arquivos/img/sem_comando.jpg');

        message.channel.send(`${message.author} Kd o comando fiote!`, comando);
    }

    if(content == 'ãda' || content == 'ãdado'){

        usos++;

        var dado = 1 + Math.round(5 * Math.random());

        message.channel.send('O dado caiu no [ '+ dado + ' ]');
    }

    if(content == 'ãpaz' || content == 'ãpz'){

        usos++;

        message.channel.send('https://tenor.com/view/galerito-gil-das-esfihas-meme-br-slondo-gif-15414263');
    }

    if(content == 'ãsf' || content == 'ãsfiha'){

        usos++;

        message.channel.send(`Vai uma esfiha ae? :yum: :yum: :yum:`);
        message.channel.send('https://tenor.com/view/gil-das-esfihas-galerito-esfiha-meme-brasil-gif-21194713');
    }

    if(content == 'ãpi' || content == 'ãpiao'){

        usos++;

        message.channel.send(`Roda o pião! ${message.author}`);
        message.channel.send('https://tenor.com/view/pi%C3%A3o-da-casa-propria-silvio-santos-dona-maria-slondo-loop-gif-21153780');
    }

    if(content == 'ãbaidu' || content == 'ãdu'){

        usos++;

        const baidu = new Discord.MessageAttachment('arquivos/img/baidu.png');

        message.channel.send(`${message.author} Louvado seja!!`, baidu);
    }

    if(content == 'ãho' || content == 'ãhora'){
        usos++;

        const hora = new Discord.MessageAttachment('arquivos/sng/hora_certa.mp3');

        message.channel.send(`${message.author} Hora certa!`, hora);
    }

    if(content.includes("ãrep")){

        usos++;

        content = content.replace("ãrep", "");

        message.channel.send(content, {
            tts: true
           });
    }

    if(content.includes('ãcoin') || content.includes('ãco')){
        
        usos++;

        if(typeof args[0] != "undefined"){
            var possibilidades = ["cara", "coroa"];
            var moeda = Math.round(1 * Math.random())
            var escolha = args[0].toLowerCase();
        }
        
        if(escolha == "cara" || escolha == "coroa"){
            if(escolha == possibilidades[moeda])
                message.channel.send("[ :coin: ] Deu "+ escolha +"! Hack!");
            else
                message.channel.send("[ :coin: ] Deu "+ possibilidades[moeda] +", perdeu playboy :v");
        }else
            message.channel.send("Informe cara ou coroa como `ãco cara` ou `ãco coroa` para testar sua sorte!");
    }

    if(content == 'ãinfo' || content == 'ãi'){

        usos++;

        const embed = new Discord.MessageEmbed()
        .setTitle('Alonsal')
        .setColor(0x29BB8E)
        .setDescription('> Viva a automação! :gear: :gear:\n-----------------------------\nEste bot é patrocinado por Baidu e Renato´s lanche, 40 tipos de lanche, hot dog, fastfood, a maior casa de lanches de extrema, venha comer o renatão⁴ o lanche completo!\n\nSugira comandos ou reporte bugs para o <@665002572926681128>\n\nFui invocado '+ usos +' vez(es) desde meu último ligamento');

        message.channel.send(embed);
    }

    if(usos == usos_anterior){
        message.channel.send(`${message.author} erroooouuuuuuuuuuuuuuuuu`);
    }

    usos_anterior = usos;
})