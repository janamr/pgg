<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'pgg2021_db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'NOzPI<&F V1A&,{Z$Q}a]Eh,Be^(G06&Hp3To+i`:y(>;6pdt}r8(K@wje0+*Js@' );
define( 'SECURE_AUTH_KEY',  '>;-,PWA5/0,Vl:gbp|S]Pm%22hUPMXtb/>Uw 0mU %{#I.J~[ ;=+x!Wb4 MrRk)' );
define( 'LOGGED_IN_KEY',    '^;M[nw@1A}qF!p@8{|.mqEhI{]`8&[jah@FP_0G%gTzZ+EX$zgvkiO#^0Yb0,6bG' );
define( 'NONCE_KEY',        'LMyDe(2)$S,K}yH>Y>LZR1@N{a:JDkEI@#zBBHX%L?3H+6c&13[<(npjAec(rj/s' );
define( 'AUTH_SALT',        '5Pm}oP-9I$~7I5_q5b#QLXU=K(tFec8Nn~phaual~p%_9gN`-tg*fUYDucTC&c1!' );
define( 'SECURE_AUTH_SALT', ':66>`yi21W^lO:(BoXMPKcQmwVv< N{ga|)q&oOt.HQ9inH.xXHQJoiU)zD+}P|!' );
define( 'LOGGED_IN_SALT',   '`({@uJ~|[QxSg]9V6$jr$CB__d7zyP8zKGKw+6Q=u0;tUl?A@djR9`;jq*E$Lh30' );
define( 'NONCE_SALT',       'MRN#-lJqd /G[a|qNpLau`,v+JNJk+NoWmMJ3z4~{q@m# f`z8#Y!]5w-~oZW^R}' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
