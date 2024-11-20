<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'vendor/autoload.php';

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

// Set the sender's email and name (you can dynamically set these values)
$senderEmail = 'mayuri123@gmail.com'; // Replace with the sender's email
$senderName = 'Mayuri'; // Replace with the sender's name
$recipientEmail = 'tejashande143143@gmail.com'; // Replace with the recipient's email
$recipientName = 'Tejas Hande'; // Replace with the recipient's name

// Set email parameters
$subject = 'Test Email with PHPMailer';
$body = 'This is a test email sent using PHPMailer.';

try {
    // Set SMTP server settings
    $mail->isSMTP();                            // Use SMTP
    $mail->Host = 'smtp.example.com';            // Set the SMTP server to send through (e.g., Gmail)
    $mail->SMTPAuth = true;                     // Enable SMTP authentication
    $mail->Username = 'your_email@example.com'; // SMTP username
    $mail->Password = 'your_password';          // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port = 587;                          // TCP port to connect to

    // Set the sender's email and name dynamically
    $mail->setFrom($senderEmail, $senderName);

    // Add recipient dynamically
    $mail->addAddress($recipientEmail, $recipientName); // Add a recipient

    // Set email subject and body
    $mail->Subject = $subject;
    $mail->Body    = $body;

    // Send the email
    $mail->send();
    echo 'Email has been sent successfully.';
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}
?>
