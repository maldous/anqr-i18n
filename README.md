# ANQR Translations

This repository contains the translation files for [ANQR](https://anqr.link) - a QR code generator with advanced styling options.

## Repository Structure

- **`static` branch** - Static content translations (guides, about pages, etc.)
- **`locales` branch** - UI string translations

## Contributing Translations

We welcome community contributions to improve translations or add new languages!

### How to Contribute

1. **Fork this repository**
2. **Switch to the appropriate branch:**
   ```bash
   git checkout static   # For static content (guides, docs)
   git checkout locales  # For UI strings
   ```
3. **Edit or create translation files:**
   - Files are named by language code (e.g., `es-ES.txt`, `fr-FR.txt`, `ja-JP.txt`)
   - Use existing files as a reference for format
4. **Submit a Pull Request** with your changes

### Language Codes

We use standard language codes following the pattern `language-REGION`:
- `en-GB` - English (UK)
- `es-ES` - Spanish (Spain)
- `fr-FR` - French (France)
- `de-DE` - German (Germany)
- `ja-JP` - Japanese
- `zh-CN` - Chinese (Simplified)
- etc.

### Guidelines

- Keep the same structure/format as existing files
- Preserve any placeholder variables (e.g., `{{name}}`, `%s`)
- Test your translations if possible by running ANQR locally
- For new languages, copy an existing file and translate all strings

## Questions?

Open an issue in this repository or contact us through [anqr.link](https://anqr.link).

## License

Translations are provided under the same license as ANQR.
