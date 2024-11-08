<?php
require 'koneksi.php';

$username = 'admin';
$password = 'admin123';
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query = mysqli_query($koneksi, "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')");

if ($query) {
    echo "User berhasil dibuat\n";
    echo "Username: " . $username . "\n";
    echo "Password: " . $password . "\n";
    echo "Hashed Password: " . $hashed_password . "\n";
} else {
    echo "Gagal membuat user: " . mysqli_error($koneksi);
}