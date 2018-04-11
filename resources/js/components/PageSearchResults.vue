<template>
	<div class="row">
		<div class="column large-12">
			<header class="page-header">
				<h1 class="page-title">Foram encontrados {{ qtd }} resultados para "<b>{{ keyword }}</b>"</h1>
				<div class="line"></div>
			</header>
			
			<div class="result-item" v-for="post in filteredPosts" style="margin-bottom:20px">
				<a :href="post.permalink">
					<span class="post-category">{{ post.blog.blogname }}</span>
					<h3 class="post-title" v-html="post.title.replace(keyword, '<b>'+keyword+'</b>')"></h3>	
					<p class="post-description" v-html="post.excerpt.replace(keyword, '<b>'+keyword+'</b>')"></p>
					<div class="post-name" style="color: #948f8f; font-size: 12px;">{{ formatDate(post.date) + '  ' + post.authors }}</div>
				</a>
			</div>

			<div class="row justify-center">
				<a @click="loadMore" class="btn-small load-more">Carregar Mais</a>
			</div>
		</div>
	</div>

</template>

<script>
	import moment from 'moment';
	
	export default {
		props: [ 'posts', 'keyword','qtd' ],
		data(){
			return { filteredPosts : this.posts };
		},
		methods : {
			formatDate(date){
				return moment(date).format('DD/MM/YYYY');
			},
			loadMore(){
				var self = this;

				$.ajax({
					type: 'POST',
					dataType: 'text',
					url: screenReaderText.ajaxurl,
					data: {
						'ppp': 9,
						'offset': self.filteredPosts.length,
						'q': self.keyword,
						'action': 'fpa_more_search_results_ajax'
					},
					beforeSend(){
						$('.load-more').text('Carregando...');
					},
					success(data) {
					$('.load-more').text('Carregar Mais');

					if(JSON.parse(data).length == 0 || JSON.parse(data).length < 9)
						$('.load-more').addClass('disabled').text('Não há mais posts para exibir');
					else
						$('.load-more').removeClass('disabled');

					//Por algum motivo o Array.concat não funcionou aqui, se quiser tentar fique a vontade
					JSON.parse(data).filter(p => self.filteredPosts.push(p) );

					setTimeout(highlightKeyword, 1000);
				},
			});
			}
		}
	}
</script>

<style lang="scss">
	.search-term{
		color: #DD3937;
	}

	.result-item {
		margin-bottom: 20px;

		h3{ 
			margin-bottom: 0px; 
			text-transform: uppercase;
			font-size: 27px;
		}

		p{
			margin-bottom: 5px;
		}
	}
</style>