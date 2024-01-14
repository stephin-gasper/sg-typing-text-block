<?php
/**
 * Plugin Name:       Typing Text Block
 * Description:       A Gutenberg block for showing typewriter animation for text.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Stephin Gasper
 * Author URI:    https://stephin-gasper.vercel.app/
 * License:       	  MIT
 * License URI:   	  https://mit-license.org/
 * Text Domain:       sg-typing-text-block
 *
 * @package           sg-block
 */

namespace SG_BLOCK;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function typing_text_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\typing_text_block_init' );
