# <img src="../assets/logo.png"> Tutorial 19 – ArticleContactForm

## Preview

![alt preview](../assets/article-contact-form-preview.png)

The `ArticleContactForm` component is used for displaying a contact form that allows users to send messages or inquiries directly from the website. Unlike other articles, this one does not require any items to be defined. Instead, it relies on settings for configuration.

## EmailJS Integration

The contact form component integrates `EmailJS`. EmailJS is a free service that allows you to send emails using JavaScript - without the need for a backend.

To configure your EmailJS integration, follow these steps:

- Create a free EmailJS account (https://www.emailjs.com/)
- In your EmailJS account panel, create an email service, which configures the provider that will send the emails (e.g., a Gmail or iCloud account).
- Next, on your dashboard, create a new email template like this one:

```
You got a new message from {{from_name}} ({{from_email}}):

Subject: {{custom_subject}}

{{message}}
```

- Make sure you don't change the variable names in the template (`from_name`, `from_email`, `custom_subject`, `message`), as they are used by the component to send the email.
- Now you're all set to configure your `ArticleContactForm` component!

## Basic Working Example

Copy and paste this into a section's `articles` array and replace the `YOUR_EMAIL_JS_(...)` placeholders with your own credentials:

```json
{
    "id": 1,
    "component": "ArticleContactForm",
    "settings": {
        "email_js_public_key": "YOUR_EMAIL_JS_PUBLIC_KEY",
        "email_js_service_id": "YOUR_EMAIL_JS_PUBLIC_SERVICE_ID",
        "email_js_template_id": "YOUR_EMAIL_JS_TEMPLATE_ID"
    },
    "locales": {
        "en": {
            "contact_thank_you_title": "{{Thanks}} for the contact!",
            "contact_thank_you_body": "Your message has been received, and I'll be reaching out to you soon. I appreciate your time and look forward to connecting with you!",
            "contact_thank_you_footer": "The reply will be sent to your email address: {{$email}}",
            "title": "Send me a {{message}}"
        }
    },
    "items": null
}
```

### Required Settings

| Property                | Type    | Description                                                                         |
|-------------------------|---------|-------------------------------------------------------------------------------------|
| `email_js_public_key`   | STRING  | Your EmailJS public key. It can be found in the `Account` tab on the EmailJS panel. |
| `email_js_service_id`   | STRING  | The ID of the email service you created in EmailJS.                                 |
| `email_js_template_id`  | STRING  | The ID of the email template you created in EmailJS.                                |

### Required Locales

| Property                        | Type    | Description                                                                                                |
|---------------------------------|---------|------------------------------------------------------------------------------------------------------------|
| `contact_thank_you_title`       | STRING  | The title displayed after the form is successfully submitted.                                              |
| `contact_thank_you_body`        | STRING  | The body text displayed after the form is successfully submitted.                                          |
| `contact_thank_you_footer`      | STRING  | The footer text displayed after the form is successfully submitted, which includes the parameter `$email`. |
| `title`                         | STRING  | The title of the contact form.                                                                             |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** All fields are required and must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticleThreads](./TUTORIAL_18_ARTICLE_THREADS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: Categorizing Article Items](./TUTORIAL_20_CATEGORIZING_ARTICLE_ITEMS.md) ➡️ 
