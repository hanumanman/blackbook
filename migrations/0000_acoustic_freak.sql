CREATE TABLE `chapters` (
	`id` integer PRIMARY KEY NOT NULL,
	`chapter_name` text NOT NULL,
	`chapter_content` text NOT NULL,
	`novel_name` text NOT NULL,
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
