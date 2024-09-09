- Run `npm i`
- Add environment variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

In your Supabase Dashboard, go to **Project Settings** > **Authentication** and set up an SMTP provider.

Next, go to **Authentication** > **Rate Limits** and set **Rate limit for sending emails** to at least **30**.

Next, go to **Authentication** > **Email Templates**, and in your **Confirm Signup** template, change

```
"{{ .ConfirmationURL }}"
```

to:

```
"{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup"
```

Next, in your **Reset Password** template, change

```
"{{ .ConfirmationURL }}"
```

to:

```
"{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/reset-password"
```
