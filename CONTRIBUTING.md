# Contributing to ANQR Translations

Thank you for helping translate ANQR! **No coding or Git experience required** - you can contribute directly from your web browser.

## 🌐 Quick Start

1. Go to the [README](README.md) and find your language in the table
2. Click **✏️ edit** under either **Static** or **Locales** column
3. Make your changes in the GitHub editor
4. Click "Commit changes" and create a pull request

That's it! We'll review and merge your contribution.

## 📁 What's the Difference?

| Type | What it contains | Examples |
|------|------------------|----------|
| **Static** | Long-form page content | About page, Guide, Privacy Policy, Terms of Service |
| **Locales** | Short UI strings | Button labels, menu items, tooltips, error messages |

## 📝 Translation Guidelines

### For Static Content (.txt files)

These files use a simple `ID=text` format:

```
100=Welcome to ANQR
101=Create beautiful QR codes with custom styling
102=Get Started
```

**Tips:**
- Only translate the text after the `=` sign
- Keep the ID numbers exactly the same
- Preserve any placeholders like `{name}` or `{{variable}}`
- Don't translate URLs or technical terms

### For Locales/UI Strings (.txt files)

Same format - translate only the text after `=`:

```
button.save=Save
button.cancel=Cancel
message.success=Your QR code is ready!
```

**Tips:**
- Keep keys (before `=`) exactly the same
- Preserve any `{variables}` in the text
- Keep translations concise for UI elements

## ➕ Adding a New Language

1. Choose the correct language code (e.g., `pt-PT` for Portuguese-Portugal)
   - Reference: [ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

2. Create both files:
   - [Create static content file](../../new/static?filename=xx-XX.txt)
   - [Create locales file](../../new/locales?filename=xx-XX.txt)

3. Copy content from `en-GB.txt` as your starting template

4. Translate and submit as a pull request

## 💻 Using Git (Optional)

For advanced users who prefer Git:

```bash
git clone https://github.com/YOUR-USERNAME/anqr-i18n.git
cd anqr-i18n

# Edit static content
git checkout static
# Make changes...
git commit -am "Update Spanish static content"
git push

# Edit UI strings
git checkout locales  
# Make changes...
git commit -am "Update Spanish UI strings"
git push
```

Then create a pull request on GitHub.

## ❓ Questions?

- **Website**: [anqr.link](https://anqr.link)
- **Issues**: [Open an issue](../../issues/new)

Thank you for making ANQR accessible to more people! 🙏
