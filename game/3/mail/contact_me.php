<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
	
$to = 'playarshop_2017@labeip.epitech.eu';
$email_subject = "Website: $name";
$email_body = "Un nouveau message à été envoyé depuis le formulaire de contact du site.\n\n"."Name: $name\nEmail: $email_address\nTéléphone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@playarshop.com\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>