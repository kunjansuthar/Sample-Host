<?php
header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name = isset($_POST['name']) ? trim((string)$_POST['name']) : '';
$email = isset($_POST['email']) ? trim((string)$_POST['email']) : '';
$message = isset($_POST['message']) ? trim((string)$_POST['message']) : '';

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo 'Please fill in all required fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please enter a valid email address.';
    exit;
}

$nameSafe = str_replace(array("\r", "\n"), ' ', $name);
$emailSafe = str_replace(array("\r", "\n"), '', $email);

$to = 'info@crilof.com';
$subject = 'New message from CRILOF website';

$body = "You have received a new message from your website contact form.\n\n";
$body .= "Name: {$nameSafe}\n";
$body .= "Email: {$emailSafe}\n\n";
$body .= "Message:\n{$message}\n";

$headers = array();
$headers[] = 'From: CRILOF Website <info@crilof.com>';
$headers[] = 'Reply-To: ' . $nameSafe . ' <' . $emailSafe . '>';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';

$ok = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($ok) {
    echo 'success';
} else {
    http_response_code(500);
    echo 'Unable to send your message right now. Please try again later.';
}
