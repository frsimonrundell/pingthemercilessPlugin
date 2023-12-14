<?php

/*
Plugin Name: Ping the Merciless
Description: React based Wordpress Uptime Monitor 
Version: 1.0.0
Author: Simon Rundell
Author URI: https://www.codemonkey.design
License: GPLv2 or later
Text Domain: cm-ping
*/

function pingthemerciless_register_block() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'pingthemerciless_register_block' );


define( 'MING_URL_PATH', plugin_dir_url( __FILE__ ));
define( 'MING_SERVER', php_uname('a'));

if (str_contains(MING_SERVER,'Windows')) {
	// change the last slash of MING_DIR_PATH to a backslash
	$tempPath = plugin_dir_path( __FILE__ );
	$tempPath = rtrim($tempPath, '/'). chr(92); 
	define( 'MING_DIR_PATH', $tempPath);
} else {
	// works fine for Linux Server
	define( 'MING_DIR_PATH', plugin_dir_path( __FILE__ ));

};



// custom PHP Hooks and functions
function update_custom_option() {

    $option_name = 'cm-pingthemerciless';

    // Build an associative array with the provided data
    $config_data = array(
        'uid' => sanitize_text_field($_POST['option_value']['uid']),
        'siteName' => sanitize_text_field($_POST['option_value']['siteName']),
        'siteURL' => sanitize_text_field($_POST['option_value']['siteURL']),
    );

    // Convert the array to a JSON-encoded string
    $config_data_json = json_encode($config_data);

    // Update the option in the wp_options table
    update_option($option_name, $config_data_json);

	echo "Ping the Merciless Configuration has been updated";

    wp_die(); // This is required to terminate the script properly
}

add_action('wp_ajax_update_custom_option', 'update_custom_option');
add_action('wp_ajax_nopriv_update_custom_option', 'update_custom_option'); // for non-logged-in users

function enqueue_hocMessage_assets() {

	if (str_contains(MING_SERVER,'Windows')) {
		wp_enqueue_script(
		'hocMessage',
		MING_DIR_PATH . 'src\edit.js',
		array('wp-blocks', 'wp-element', 'wp-components', 'wp-editor'),
		filemtime(MING_DIR_PATH . 'src\edit.js'), 
		true
		);
	} else {
		wp_enqueue_script(
			'hocMessage',
			MING_DIR_PATH . 'src/edit.js',
			array('wp-blocks', 'wp-element', 'wp-components', 'wp-editor'),
			filemtime(MING_DIR_PATH . 'src/edit.js'), 
			true
			);
	}
  }
  
  add_action('enqueue_block_editor_assets', 'enqueue_hocMessage_assets');