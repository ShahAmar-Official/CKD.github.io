# Form Setup Instructions

## Web3Forms Integration

The contact form on this website uses [Web3Forms](https://web3forms.com/) to send form submissions to your email.

### How to Get Your API Key

1. Visit [Web3Forms](https://web3forms.com/)
2. Click "Get Started for Free"
3. Enter your email address: `itsshahamar@duck.com`
4. You'll receive an email with your Access Key
5. Copy the Access Key from the email

### How to Configure the Form

1. Open `contact.html` in a text editor
2. Find the line with `YOUR_WEB3FORMS_ACCESS_KEY`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual Access Key
4. Save the file
5. Commit and push the changes

### Example

```html
<input type="hidden" name="access_key" value="abc123def-4567-89gh-ijkl-mnopqrstuvwx">
```

### Alternative: FormSubmit.co

If you prefer to use FormSubmit.co instead of Web3Forms:

1. In `contact.html`, change the form action to:
   ```html
   <form action="https://formsubmit.co/itsshahamar@duck.com" method="POST" class="contact-form">
   ```
2. Remove the Web3Forms access_key hidden input
3. Add these FormSubmit hidden inputs:
   ```html
   <input type="hidden" name="_subject" value="New Contact Form Submission from CKD ECG Website">
   <input type="hidden" name="_captcha" value="false">
   <input type="hidden" name="_template" value="table">
   ```
4. Update the form-handler.js to not use the Web3Forms API endpoint

## Testing the Form

After setting up your API key:

1. Deploy your changes to GitHub Pages
2. Visit the contact page
3. Fill out and submit the form
4. Check your email inbox at itsshahamar@duck.com
5. You should receive the form submission

## Contact Methods

The contact page now displays:
- Email: itsshahamar@duck.com
- WhatsApp: +92 313 9424265

Both are clickable links that allow visitors to contact you directly.
