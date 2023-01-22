<?php
# CS 310
# Regex and Form Validation
# Starter PHP code for E-Pizzaria exercise. Add regex here for server-side
# form validation.

# POST parameters sent from epizzeria.js with information about customer's pizza
# customizations and order information

$crust = $_POST["crust"];
$sauce = $_POST["sauce"];
$size = $_POST["size"];
$cheeses = $_POST["cheeses"];
$toppings = $_POST["toppings"];

$tip;
if (isset($_POST["tip"])) { $tip = $_POST["tip"]; }
else { $tip = 0; }

$address;
if(isset($_POST["address"])) { $address = $_POST["address"]; }
else { output_error("Please fill in the Address field!"); }

$city;
if(isset($_POST["city"])) { $city = $_POST["city"]; }
else { output_error("Please fill in the City field!"); }

$state;
if(isset($_POST["state"])) { $state = $_POST["state"]; }
else { output_error("Please fill in the State field!"); }


// Complete the code below
// TODO: Define a variables $tips_pattern, which is a regex for "tips"
$tips_pattern = "/[0-9]+\.[0-9]{2}/";

// Tips must be a non-negative real number with two digits after the decimal
 

// TODO: Define a variables $state_pattern, which is a regex for "states"
$state_pattern = "/[A-Z]{2}/";

// TODO: Define a variables $address_pattern, which is a regex for "address"
$address_pattern = "/\d+\s([A-Z][a-z]+)(\s+([A-Z][a-z]+))*/";

// TODO: complete below if-elseif statement for the $_POST data validation

if (!preg_match($tips_pattern,$tip)) {
  output_error("Invalid tips submitted. Tips must be a non-negative real number with two digits after the decimal");
}
elseif(!preg_match($state_pattern,$state)) {
  output_error("Invalid states submitted. State must be two uppercase letters");
}
elseif(!preg_match($address_pattern,$address)) {
  output_error("Invalid address submitted. Address must begin with an integer followed by words");
}
else {
  header("Content-Type: text/plain");
  echo "You successfully submitted your order!";
}



/***************************** helper function ********************************/
/**
 * Outputs a 400 Invalid Request error with a descriptive plain text error message.
 * @param string $msg - message to output with error response.
 */
function output_error($msg) {
  // header("HTTP/1.1 400 Invalid Request");
  header("Content-type: text/plain");
  /* Otherwise we have an error, and should say so. */
  echo $msg;
}

?>
