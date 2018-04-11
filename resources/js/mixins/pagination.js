export default{
	created(){
		setTimeout(this.loadMore, 1000);
	},
	methods: {
		loadMore(){
			if(typeof args == 'undefined'){
				$('.load-more').hide();
				return console.log('Não há informações suficientes para paginação nesta página');
			}

			var _this = this;
			var offset = _this.filteredPosts.length;

			if(_this.filter != ''){
				if(typeof args.tax_query != 'undefined'){
					offset = args.tax_query[0].terms != _this.filter ? 0 : _this.filteredPosts.length;
					args.tax_query[0].terms = typeof _this.filter == 'object' ? _this.filter.ID : _this.filter;
				}
				else if(typeof args.meta_query != 'undefined'){

					if(typeof _this.filter == 'object'){
						offset = args.meta_query[0].value != _this.filter.ID ? 0 : _this.filteredPosts.length;
						args.meta_query[0].value = _this.filter.ID;
					}else{
						offset = args.meta_query[0].value != _this.filter ? 0 : _this.filteredPosts.length;
						args.meta_query[0].value = _this.filter;
					}

					args.meta_query[0].compare = '=';	
				}
			}
			$.ajax({
				type: 'POST',
				dataType: 'text',
				url,
				data: {
					external,
					'ppp': 9,
					'offset': offset,
					'args': args,
					'action': 'fpa_more_posts_ajax'
				},
				beforeSend(){
					$('.load-more').text('Carregando...');
				},
				success(data) {
					//Por algum motivo o Array.concat não funcionou aqui, se quiser tentar fique a vontade
					$('.load-more').text('Carregar Mais');

					if(JSON.parse(data).length == 0 || JSON.parse(data).length < 9)
						$('.load-more').addClass('disabled').text('Não há mais posts para exibir');
					else
						$('.load-more').removeClass('disabled');

					if(offset > 0)
						JSON.parse(data).filter(p => _this.filteredPosts.push(p) );
					else
						_this.filteredPosts = JSON.parse(data);
				},
			});
		}
	}
}