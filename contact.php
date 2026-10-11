<?php

/**
 * Contact form handler for the portfolio website.
 *
 * Processes contact form submissions, validates the submitted
 * data, and sends the message as an HTML email using PHP mail().
 *
 * Expected JSON request fields:
 * - name: Name of the person submitting the form
 * - email: Email address of the sender
 * - message: Content of the message
 *
 * Returns a JSON response indicating the result of the operation.
 *
 * Note:
 * A successful call to mail() does not guarantee that the email
 * will be delivered to the recipient's inbox.
 *
 * @package Portfolio
 * @version 1.0.0
 */

header('Content-Type: application/json; charset=UTF-8');

/**
 * Allowed frontend origin.
 *
 * Must exactly match the website origin from which the contact
 * form sends requests to this PHP script.
 *
 * @var string
 */
$allowedOrigins = [
    'https://johanna-flock.de',
    'https://www.johanna-flock.de'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

/**
 * Handles CORS preflight requests.
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * Allows only POST requests for email submission.
 */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

/**
 * Sender and recipient email addresses.
 *
 * Email forwarding to the personal inbox is configured
 * separately through the netcup control panel.
 *
 * @var string $sender
 * @var string $recipient
 */
$sender = 'kontakt@johanna-flock.de';
$recipient = 'kontakt@johanna-flock.de';

/**
 * Reads and decodes the JSON request body.
 *
 * @var array<string, mixed>|null $data
 */
$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request.'
    ]);
    exit;
}

/**
 * Extracts and trims the submitted form fields.
 *
 * @var string $name
 * @var string $email
 * @var string $message
 */
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

/**
 * Validates the submitted data and enforces length limits.
 *
 * Invalid submissions receive an HTTP 400 response.
 */
if (
    $name === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $message === '' ||
    strlen($name) > 200 ||
    strlen($email) > 254 ||
    strlen($message) > 10000 ||
    preg_match('/[\r\n]/', $email)
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please check your input.'
    ]);
    exit;
}

/**
 * Defines the email subject and HTML body.
 *
 * User-provided values are escaped to prevent them from
 * being interpreted as HTML markup.
 *
 * @var string $subject
 * @var string $body
 */
$subject = 'New message from the website contact form';

$body = '
<html>
<body>
    <h2>New contact request</h2>
    <p><strong>Name:</strong> ' .
    htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') .
    '</p>
    <p><strong>Email:</strong> ' .
    htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') .
    '</p>
    <p><strong>Message:</strong><br>' .
    nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) .
    '</p>
</body>
</html>
';

/**
 * Defines the email headers.
 *
 * Reply-To allows the recipient to reply directly
 * to the person who submitted the contact form.
 *
 * @var string[] $headers
 */
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Website Contact <' . $sender . '>',
    'Reply-To: ' . $email
];

/**
 * Passes the email to the configured mail server.
 *
 * @var bool $sent True if mail() accepts the message for processing.
 */
$sent = mail(
    $recipient,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers)
);

/**
 * Returns the result as a JSON response.
 *
 * HTTP 200: The mail server accepted the message for processing.
 * HTTP 500: The message could not be accepted for processing.
 */
if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Your message could not be sent.'
    ]);
}
