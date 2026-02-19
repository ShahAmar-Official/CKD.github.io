# Form Setup Instructions

## FormSubmit.co Integration

The contact form on this website uses [FormSubmit.co](https://formsubmit.co/) to send form submissions to your email. This service is completely free and doesn't require API keys or registration.

### How It Works

1. The form is configured to submit to: `https://formsubmit.co/itsshahamar@duck.com`
2. When a user submits the form, FormSubmit.co sends the data to your email
3. On first submission, FormSubmit will send a confirmation email to activate the endpoint
4. After activation, all form submissions will be forwarded to your email

### First-Time Setup

The first time someone submits the contact form:

1. FormSubmit.co will send a confirmation email to `itsshahamar@duck.com`
2. Open the email and click the confirmation link
3. After confirmation, the form will work automatically for all future submissions

### Form Features

The form includes the following configurations:

- **_subject**: Sets a custom subject line for the emails
- **_captcha**: Disabled for simpler user experience (set to "false")
- **_template**: Uses "table" format for clean email presentation
- **_next**: Redirects users back to the contact page with a success message
- **_honey**: Honeypot field to prevent spam bots (hidden from users)

### Testing the Form

After the initial confirmation:

1. Visit the contact page at: https://shahamar-official.github.io/CKD.github.io/contact.html
2. Fill out and submit the form
3. You'll be redirected back to the page with a success message
4. Check your email inbox at itsshahamar@duck.com
5. You should receive the form submission

### Alternative Contact Methods

The contact page also displays:
- Email: itsshahamar@duck.com (clickable mailto link)
- WhatsApp: +92 313 9424265 (clickable link)

Both are direct contact options if the form doesn't work.

### Customization Options

To customize the form behavior, you can modify these hidden fields in `contact.html`:

```html
<input type="hidden" name="_subject" value="Your custom subject">
<input type="hidden" name="_captcha" value="true"> <!-- Enable captcha -->
<input type="hidden" name="_template" value="box"> <!-- Different template -->
```

For more options, visit: https://formsubmit.co/

### Alternative: Web3Forms

If you prefer to use Web3Forms instead:

1. Visit [Web3Forms](https://web3forms.com/)
2. Get your free API key
3. Update the form in `contact.html` to use the Web3Forms endpoint
4. Update `form-handler.js` to handle the API submission

See the previous version of this file in git history for Web3Forms implementation details.
