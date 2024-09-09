# README

This is a Next.js project template with [NextUI](https://nextui.org/) and [Supabase Authentication](https://supabase.com/auth) preconfigured.

This guide will help you set up the project by installing the necessary dependencies and configuring environment variables, authentication, and email templates.

## 1. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

## 2. Add Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Make sure to replace `your_supabase_url` and `your_supabase_anon_key` with the correct values from your Supabase Project Settings.

## 3. Set up SMTP for Authentication

To enable email authentication for your application:

1. Go to your **Supabase Dashboard**.
2. Navigate to Project **Project Settings > Authentication**.
3. Set up an SMTP provider by adding your email service credentials (e.g., from SendGrid, Mailgun, etc.).

## 4. Adjust Email Rate Limits

To ensure you can send enough emails, adjust the rate limits for email authentication:

1. Go to **Authentication > Rate Limits**.
2. Set **Rate limit for sending emails** to at least 30 emails per minute.

## 5. Update Email Templates

Modify the email templates to include custom URLs for signup and password recovery.

### 5.1 Confirm Signup Template

Go to **Authentication > Email Templates**. In the **Confirm Signup** template, update the URL:

`"{{ .ConfirmationURL }}"` > `"{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup"`

### 5.2 Reset Password Template

In the **Reset Password** template, update the URL:

`"{{ .ConfirmationURL }}"` > `"{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/reset-password"`

## You're all set!

Your Supabase authentication is now properly configured with custom email templates and rate limits. Make sure to test the functionality to ensure everything works as expected.
