<template>
	<article class="row post-content">
		<div class="column smaller-12 medium-9 post-header">
			<h3 class="post-title">{{ post.title }}</h3>
			<slot name="post-header"></slot>
			<p class="post-date" v-if="hasDate && typeof $slots['post-header'] == 'undefined'">
				<a href=""  v-if="post.edicao != ''">{{ post.edicao.title.toUpperCase() + ' - ' }}</a> {{ formatDate(post.date) + ' - ' + post.authors }}
				<span class="fb-like pull-right" :data-href="post.permalink" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></span>
			</p>
		</div>
		<div class="column large-12">
			<slot></slot>
		</div>
	</article>
</template>

<script>
	import moment from 'moment';

	export default {
		props: { 
			hasDate : {
				type : Boolean,
				default : true
			},
			post : Object
		},
		methods: {
			formatDate(d){
				return moment(d).format('DD/MM/YYYY');
			}
		}
	}
</script>