<?php

// autoload_psr4.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'Stripe\\' => array($vendorDir . '/stripe/stripe-php/lib'),
    'PaymentPlugins\\CartFlows\\Stripe\\' => array($baseDir . '/packages/cartflows/src'),
    'PaymentPlugins\\Blocks\\Stripe\\' => array($baseDir . '/packages/blocks/src'),
);
