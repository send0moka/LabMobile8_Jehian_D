<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$username = mysqli_real_escape_string($koneksi, trim($data['username']));
$password = trim($data['password']);

header('Content-Type: application/json');
$query = mysqli_query($koneksi, "SELECT * FROM users WHERE username='$username'");

if ($query) {
    if (mysqli_num_rows($query) > 0) {
        $user = mysqli_fetch_object($query);
        
        if (password_verify($password, $user->password)) {
            $response = [
                'status' => true,
                'message' => 'Login berhasil',
                'data' => [
                    'id' => $user->id,
                    'username' => $user->username
                ]
            ];
        } else {
            $response = [
                'status' => false,
                'message' => 'Password salah'
            ];
        }
    } else {
        $response = [
            'status' => false,
            'message' => 'Username tidak ditemukan'
        ];
    }
} else {
    $response = [
        'status' => false,
        'message' => 'Error: ' . mysqli_error($koneksi)
    ];
}

echo json_encode($response);