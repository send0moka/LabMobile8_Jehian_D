CREATE DATABASE db_mhs;
USE db_mhs;

CREATE TABLE `mahasiswa` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `jurusan` varchar(255) NOT NULL
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL
);