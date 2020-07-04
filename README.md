# Заметки 
- Использовать vuex здесь не надо
Либы не хотят дружить с тайпскриптом
даже ручная реализация скролла через $ref или querySelector вызывает Object is possibly null
- Дополнительно для списков реализовать бесконечную прокрутку с помощью [vue-infinite-loading](https://www.npmjs.com/package/vue-infinite-loading)
### Тестовое задание 
- Используя API сервиса last.fm отобразить:
    - топ исполнителей [(chart.getTopArtists)](https://www.last.fm/api/show/chart.getTopArtists)
    - топ песен [(chart.getTopTracks)](https://www.last.fm/api/show/chart.getTopTracks)
    - топ альбомов этого исполнителя [(artist.getTopAlbums)](https://www.last.fm/api/show/artist.getTopAlbums)
    - топ песен этого исполнителя [(artist.getTopTracks)](https://www.last.fm/api/show/artist.getTopTracks)  
    - информацию об альбомах исполнителя [(album.getInfo)](https://www.last.fm/api/show/album.getInfo)
- Веб-приложение со следующими страницами:
    - Главная страница с топом исполнителей, отобразить
        - ~~название~~
        - ~~фотографию~~
        - ~~количество прослушиваний~~
        - ~~количество одновременных слушателей~~     
    - Страница с топом песен
        - ~~название~~
        - ~~обложка альбома~~
        - ~~количество прослушиваний~~
        - ~~количество одновременных слушателей~~        
    - Страница исполнителя с топом его альбомов     
        - ~~название~~
        - ~~обложка~~
        - ~~количество одновременных слушателей~~
    - Страница информации об альбоме
        - ~~название~~
        - ~~обложка~~
        - ~~дата релиза,~~ 
        - ~~количество прослушиваний~~
        - ~~количество одновременных слушателей~~
        - ~~список песен в альбоме с указанием длительности~~
- ~~Запросы к API осуществляются через [axios](https://github.com/axios/axios)в файле ``src/plugins/lastfm.js`` и доступны через ``this.$lastfm``~~
- ~~В качестве css-фреймворка используйте [vuetify](https://vuetifyjs.com/ru/)~~
- ~~Для роутинга используйте [vue-router](https://router.vuejs.org/ru/)~~            
- ~~Дополнительно реализовать [skeleton-loading](https://vuetifyjs.com/ru/components/skeleton-loaders/) при загрузке данных~~
- ~~Использовать async / await и другие возможности ES6~~
