# Contributing to ANQR Translations

Thank you for helping translate ANQR! **No coding or Git experience required** - you can contribute directly from your web browser.

## 🌐 Web-Based Contributing (Recommended)

The easiest way to contribute - no software installation needed!

### Step 1: Find the Language File

Go to the [README](README.md) and click the ✏️ **Edit** link next to your language.

Or browse directly:
- **Static content** (guides, docs): [View static branch](../../tree/static)
- **UI strings** (buttons, labels): [View locales branch](../../tree/locales)

### Step 2: Edit the File

1. Click the **pencil icon** (✏️) in the top-right corner of the file
2. Make your changes in the editor
3. Preview your changes using the "Preview" tab

### Step 3: Submit Your Changes

1. Scroll down to "Commit changes"
2. Write a brief description (e.g., "Fix Spanish translation for button label")
3. Select **"Create a new branch for this commit and start a pull request"**
4. Click **"Propose changes"**
5. On the next page, click **"Create pull request"**

That's it! We'll review your contribution and merge it.

---

## 📝 Translation Guidelines

### For Static Content (.txt files)

These files contain documentation, guides, and about pages.

**Format:**
```
## Section Title

Paragraph text goes here. Keep the same structure
as the original English file.

### Subsection

More content...
```

**Tips:**
- Keep the same heading structure (##, ###)
- Preserve any links `[text](url)`
- Don't translate code examples or technical terms
- Keep placeholders like `{name}` or `{{variable}}` unchanged

### For UI Strings (.json files)

These files contain short UI text like button labels and messages.

**Format:**
```json
{
  "button.save": "Save",
  "button.cancel": "Cancel",
  "message.success": "Your QR code is ready!"
}
```

**Tips:**
- Only translate the text after the colon (`"`)
- Keep the keys (before the colon) exactly the same
- Preserve any `{variables}` in the text
- Keep valid JSON format (watch your commas and quotes!)

---

## ➕ Adding a New Language

1. Go to the appropriate branch:
   - [Create static content file](../../new/static?filename=xx-XX.txt)
   - [Create UI strings file](../../new/locales?filename=xx-XX.json)

2. Name your file using the correct language code:
   - Format: `language-REGION` (e.g., `pt-PT.txt` for Portuguese-Portugal)
   - Common codes: [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

3. Copy content from `en-GB.txt` or `en-GB.json` as a starting template

4. Translate and submit as a pull request

---

## 💻 Advanced: Using Git (Optional)

If you prefer using Git:

```bash
# Fork and clone
git clone https://github.com/YOUR-USERNAME/anqr-i18n.git
cd anqr-i18n

# Work on static content
git checkout static
# Edit files...
git commit -am "Update Spanish translations"
git push origin static

# Or work on UI strings
git checkout locales
# Edit files...
git commit -am "Update Spanish UI strings"
git push origin locales
```

Then create a pull request on GitHub.

---

## ❓ Questions?

- **Email**: [email@anqr.link](mailto:email@anqr.link)
- **Website**: [anqr.link](https://anqr.link)
- **Issues**: [Open an issue](../../issues/new/choose)

Thank you for making ANQR accessible to more people! 🙏
