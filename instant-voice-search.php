<?php
/**
 * Plugin Name: Instant Voice Search
 * Plugin URI: http://maheshbohara.com.np/
 * Description: Adds voice search functionality to WordPress search bars using the Web Speech API.
 * Version: 1.0.0
 * Author: Mahesh Bohara
 * Author URI: http://maheshbohara.com.np/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: instant-voice-search
 *
 * @package Instant_Voice_Search
 */

defined( 'ABSPATH' ) || exit;

// Define plugin constants
define( 'INSTANT_VOICE_SEARCH_VERSION', '1.0.0' );
define( 'INSTANT_VOICE_SEARCH_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * The main plugin class.
 */
class Instant_Voice_Search {
    /**
     * Initialize the plugin.
     * 
     * @return void
     */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
    }

    /**
     * Enqueue frontend assets.
     * 
     * @return void
     */
    public function enqueue_frontend_assets() {
        wp_enqueue_style(
            'instant-voice-search',
            INSTANT_VOICE_SEARCH_PLUGIN_URL . 'build/style-index.css',
            array(),
            INSTANT_VOICE_SEARCH_VERSION
        );

        wp_enqueue_script(
            'instant-voice-search',
            INSTANT_VOICE_SEARCH_PLUGIN_URL . 'build/index.js',
            array(),
            INSTANT_VOICE_SEARCH_VERSION,
            true
        );
    }
}

/**
 * Runs the Instant Voice Search plugin initialization.
 * 
 * @return void
 */
function run_instant_voice_search() {
    if ( class_exists( 'Instant_Voice_Search' ) ) {
        new Instant_Voice_Search();
    }
}
add_action( 'plugins_loaded', 'run_instant_voice_search' );
