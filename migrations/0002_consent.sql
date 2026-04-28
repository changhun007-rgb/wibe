-- Add consent_at column to record when the user agreed to the privacy policy.
-- Run this once in the Cloudflare D1 Console for the `wibe-contacts` database.

ALTER TABLE contacts ADD COLUMN consent_at TEXT;
