<?php
class ET_Builder_Module_Search_Results extends ET_Builder_Module {
	function init() {
		$this->name = esc_html__( 'Resultado de Busca', 'et_builder' );
		$this->slug = 'et_pb_search_results';
		$this->whitelisted_fields = [];
	}

	function get_fields() {
		return [];
	}

	function shortcode_callback($atts, $content = null, $function_name) {
		global $search_results_count;
		$keyword = isset($_GET['q']) ? $_GET['q'] : '';

		$results = $keyword != '' ? prepare_posts(recent_mu_posts($keyword, 20)) : [];

		return '<page-search-results :posts="'. htmlentities(json_encode($results)).'" qtd="'.$search_results_count.'" keyword="'.htmlentities($keyword).'"></page-search-results>';
	}
}

new ET_Builder_Module_Search_Results;