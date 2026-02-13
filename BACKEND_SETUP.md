# Backend Setup Guide

## Contact Form Backend Integration

The contact form on this website uses **Web3Forms** as the backend service for handling form submissions without requiring a custom backend server.

### Current Setup (Web3Forms)

#### Prerequisites
- Free Web3Forms account
- Email address for receiving form submissions: `itsshahamar@duck.com`

#### Setup Steps

1. **Get Your Access Key**
   - Visit [https://web3forms.com/](https://web3forms.com/)
   - Click "Get Started for Free"
   - Enter your email: `itsshahamar@duck.com`
   - Check your email for the Access Key
   - Copy the Access Key (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

2. **Configure the Form**
   - Open `contact.html`
   - Find line 45: `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">`
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual Access Key
   - Save the file

3. **Deploy**
   - Commit and push your changes to GitHub
   - GitHub Pages will automatically deploy your updated site
   - Test the form by visiting your live site and submitting a test message

#### Features Included
- ✅ Spam protection (honeypot field)
- ✅ Client-side validation
- ✅ User-friendly notifications
- ✅ Mobile responsive
- ✅ Email notifications to `itsshahamar@duck.com`
- ✅ No backend server required
- ✅ HTTPS secure

### Alternative Backend Options

#### Option 1: FormSubmit (No Registration Required)

If you prefer not to register:

1. Update `contact.html`:
```html
<form action="https://formsubmit.co/itsshahamar@duck.com" method="POST" class="contact-form">
  <input type="hidden" name="_subject" value="New Contact Form Submission">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_template" value="table">
  
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required />
  
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  
  <label for="message">Message</label>
  <textarea id="message" name="message" rows="6" required></textarea>
  
  <button type="submit" class="button">Send Message</button>
</form>
```

2. First submission will send a confirmation email
3. Click the confirmation link
4. Future submissions will be delivered directly

#### Option 2: Custom Backend Server

For a completely custom solution:

**Tech Stack Options:**

**A. Node.js + Express**
```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    await transporter.sendMail({
      from: email,
      to: 'itsshahamar@duck.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000);
```

**B. Python + Flask**
```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    msg = MIMEText(f"Name: {name}\nEmail: {email}\nMessage: {message}")
    msg['Subject'] = 'New Contact Form Submission'
    msg['From'] = email
    msg['To'] = 'itsshahamar@duck.com'
    
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(os.getenv('EMAIL_USER'), os.getenv('EMAIL_PASS'))
            server.send_message(msg)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
```

**Deployment:**
- Heroku (free tier available)
- Vercel (serverless functions)
- Netlify (serverless functions)
- Railway
- DigitalOcean App Platform

### Environment Variables

For custom backends, set these environment variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ALLOWED_ORIGIN=https://shahamar-official.github.io
```

### Security Best Practices

1. **Use App Passwords** (not your actual Gmail password)
2. **Enable CORS** only for your domain
3. **Rate Limiting** to prevent spam
4. **Input Validation** on the backend
5. **Sanitize Inputs** to prevent injection attacks
6. **Use HTTPS** for all communications
7. **Environment Variables** for sensitive data

### Testing

**Local Testing:**
1. Install dependencies
2. Set environment variables
3. Run server locally
4. Update form action to `http://localhost:3000/api/contact`
5. Test form submissions

**Production Testing:**
1. Deploy backend to hosting service
2. Update form action to production URL
3. Test with real email address
4. Check spam folder if emails don't arrive

### Troubleshooting

**Problem: Form submissions not received**
- Check spam folder
- Verify Access Key is correct
- Check browser console for errors
- Verify email service is configured correctly

**Problem: CORS errors**
- Add your domain to allowed origins
- Check CORS middleware configuration
- Verify API endpoint URL is correct

**Problem: Validation errors**
- Check all required fields are filled
- Verify email format is valid
- Check message length requirements

### Support

For Web3Forms support:
- Email: support@web3forms.com
- Documentation: https://docs.web3forms.com/

For custom backend issues:
- Check server logs
- Review error messages in browser console
- Test API endpoints with Postman or curl

## Current Status

✅ Form is configured to use Web3Forms
✅ Client-side validation is implemented
✅ Mobile responsive design
⚠️ Access Key needs to be added (see line 45 in contact.html)
