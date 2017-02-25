const request = require('request');
const cheerio = require('cheerio');

request(
    {
        url: 'http://www.pcgamer.com/news',
        encoding: null
    }, (error, response, html) => {
    if(!error && response.statusCode == 200){

        const $ = cheerio.load(html);
        const store = []; //Хранилище возвращаемых данных

        $('header').each(function () {

            const temp = {}; //Объект-контейнер для хранения данных
            let a = $(this); //Контекстная область

            temp.title = a.find('h3.article-name').text(); //Заголовок
            temp.timestamp = a.find('time').children().children().text();        //Время генирируется JS, фиг знает как вытащить... HELP!
            temp.synopsis = $('.synopsis').eq(store.length-2).text().substring(5); //Описание
            temp.author = a.find('span').children().text().substring(1);            //Автор
            store.push(temp); //Пушим объект в хранилище

        });

        console.log('Latest news:\n');

        for (let temp of store) { //Через цикл выводим ёлочкой (время не заработало T_T
            console.log(`\n   Date: ${temp.timestamp}\n  ` +
            `Author: ${temp.author}\n Title: ${temp.title}\n`+
            `Description: ${temp.synopsis}`);
        }
    }
    });