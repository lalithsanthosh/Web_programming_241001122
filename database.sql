-- ============================================
-- Simple Portfolio Database Schema (MySQL)
-- ============================================

CREATE DATABASE IF NOT EXISTS `portfolio_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `portfolio_db`;

-- 1. Table for Portfolio Projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` ENUM('photo', 'video', 'edit') NOT NULL DEFAULT 'video',
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `video_url` VARCHAR(500) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for Client Inquiries / Contact Form Submissions
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `service` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Seed Sample Projects
INSERT INTO `projects` (`title`, `category`, `description`, `image_url`, `video_url`) VALUES
(
  'Recharge & Titanium College Fest',
  'photo',
  'High-energy live stage and crowd photography with dynamic concert lighting at Rajalakshmi Engineering College.',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-dj-playing-music-40898-large.mp4'
),
(
  'Arun Siddharth Workshop BTS',
  'video',
  'Polished behind-the-scenes documentary capturing filmmaking workflows, gear setups, and attendee discussions.',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-video-camera-in-his-hand-42007-large.mp4'
),
(
  'A.R. Rahman Live & Celebrity Stage',
  'photo',
  'Close-up concert and VIP artist stage captures, tuned with filmic contrast and warm color tones.',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://assets.mixkit.co/videos/preview/mixkit-dj-mixer-in-a-nightclub-with-colored-lights-40897-large.mp4'
),
(
  'High-Paced Brand Promo Reels',
  'edit',
  'Fast cuts, beat-synchronized speed ramps, sound effects, and vibrant color grading tailored for 9:16 Instagram Reels.',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
  'https://assets.mixkit.co/videos/preview/mixkit-holding-a-camera-out-of-a-moving-car-window-34484-large.mp4'
);
