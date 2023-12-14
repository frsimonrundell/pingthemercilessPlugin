<?php

// Replace 'your_option_name' with the actual option name you want to retrieve
$option_value = get_option('cm-pingthemerciless');

// Check if the option has a value
if ($option_value !== false) {
    // Option exists, use $option_value
    echo $option_value;
} else {
    // Option does not exist or has no value
    echo '';
}
