CREATE TABLE `chapters` (
	`id` integer PRIMARY KEY NOT NULL,
	`chapter_name` text NOT NULL,
	`chapter_name_normalized` text NOT NULL,
	`chapter_content` text NOT NULL,
	`novel_id` integer NOT NULL,
	`chapter_number` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `novels` (
	`id` integer PRIMARY KEY NOT NULL,
	`novel_name` text NOT NULL,
	`novel_description` text NOT NULL,
	`novel_author` text NOT NULL,
	`novel_genre` text NOT NULL,
	`novel_image_link` text
);
--> statement-breakpoint
CREATE TABLE `progress` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`novel_id` integer NOT NULL,
	`last_chapter_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`novel_id`) REFERENCES `novels`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`last_chapter_id`) REFERENCES `chapters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`user_email` text NOT NULL
);
