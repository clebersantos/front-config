import Vue from 'vue';
import moment from 'moment';
import Flickity from 'flickity';

var VueResource = require('vue-resource');

//Import de componentes DIVI

//Repare que são diretórios diferentes. Este aos exclusivos do front.
import Accordion from './components/Accordion.vue';
import AuthorAbout from './components/AuthorAbout.vue';
import AuthorSignature from './components/AuthorSignature.vue';
import Share from './components/Share.vue';
import Card from './components/Card.vue';
import Gallery from './components/Gallery.vue';
import PageSearchResults from './components/PageSearchResults.vue';

/*
* Inicialize com Vue.component para componentes globais que podem ser usados dentro de outros components.
* A declaração de componentes dentro de 'new Vue' torna os componentes locais, só em relação ao #app.
*/

Vue.component('card', Card);
Vue.component('post-list', PostList);
Vue.component('post-content', PostContent);
Vue.component('page-search-results', PageSearchResults);


Vue.use(VueResource);

new Vue({
    el: '#app',
    data : {
        modules_data,
    },
    mounted(){
        if($('body').hasClass('single')){
            var h = $('.post-header').html();
            if($('.et_pb_column.et_pb_column_3_4').length > 0){
                $('.post-header').remove();
                $('.et_pb_column.et_pb_column_3_4').prepend(h);
            }
        }

        if(typeof currentMultiSite != 'undefined'){
            $('#menu-multisite-header a[href="'+currentMultiSite+'"]')
            .parent().addClass('current-menu-item')
            .siblings().removeClass('current-menu-item');
            $('#menu-multisite-header a[href="'+currentMultiSite+'/"]')
            .parent().addClass('current-menu-item')
            .siblings().removeClass('current-menu-item');
        }
        // $('#menu-menu_editorias a[href="'+currentMenu+'"]').addClass('current-menu-item');

        if($('body').hasClass('post-type-archive-event')){
            $('.controlsBarText').text($('.controlsBarText').text().split(',')[0]);
        }

        $('#search-input-check').change(function(){
            if($(this).is(':checked')){
                setTimeout(function(){
                    $('.search-input').focus();
                },500);
            }
        })

        $('.mc4wp-form-fields input[type=email]').keyup(function(e) {
            if (e.keyCode == 27) 
                $('.mc4wp-form-fields').removeClass('active') 
        });

        $('.search-input').keyup(function(e) {
            if (e.keyCode == 27) {
                $('#search-input-check').prop('checked', false);
            }
            if (e.keyCode == 13) {
                if(typeof currentMultiSite != 'undefined')
                    window.location.href = currentMultiSite+'/resultado-de-busca/?q='+$(this).val();
            }

        });

  
    }
});
