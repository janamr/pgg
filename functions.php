<?php
//* Code goes here so does comment

add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );

function enqueue_parent_styles() {
   wp_enqueue_style( 'storefront', get_template_directory_uri().'/style.css' );
}

//* remove product categories etc. from homepage
//* remove_action( 'storefront_product_categories', 'homepage', 20 );