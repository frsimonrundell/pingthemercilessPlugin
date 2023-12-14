<?php

// This php script retrieves attributes from the wp_options table

// Replace 'cm-pingthemerciless' with the actual option name
$ping_attributes = get_option('cm-pingthemerciless');

// If the option exists, use its value; otherwise, provide an error entry
// The browser data captured in node should enable us to trace the
// errant site.
$attributes = $ping_attributes !== false ? $ping_attributes : array(
    'uid' => '00000000-0000-0000-0000-000000000000',
    'siteName' => 'Unconfigured Plugin',
    'siteURL' => ''
);

// Output the script with the retrieved attributes
?>
<script>
  const attributes = <?php echo json_encode($attributes); ?>;

  var jsonDataString = JSON.stringify(attributes);

  jsonDataString = jsonDataString.replace(/\\/g, '');

  console.log("Sending " + jsonDataString);

  fetch('http://localhost:3000/updateSite/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonDataString
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(' Server Error:', error));
</script>
<img height="20" alt="Ping the Merciless by @frsimon for www.codemonkey.design" src="https://pingthemerciless.codemonkey.design/mingthemerciless-logo.png">
