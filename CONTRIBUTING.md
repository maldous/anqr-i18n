# Contributing to ANQR Translations

Thank you for your interest in helping translate ANQR! Community contributions make ANQR accessible to users worldwide.

## How to Contribute

### 1. Fork the Repository

Click the "Fork" button at the top right of this page to create your own copy.

### 2. Choose a Branch

This repository has two main branches with different content:

- **`static`** - Static content (guides, about pages, documentation)
- **`locales`** - UI strings (buttons, labels, messages)

Switch to the appropriate branch:
```bash
git checkout static   # For documentation translations
git checkout locales  # For UI string translations
```

### 3. Find or Create Your Language File

Files are named using standard language codes:
- `en-GB.txt` - English (UK)
- `es-ES.txt` - Spanish (Spain)
- `fr-FR.txt` - French (France)
- `ja-JP.txt` - Japanese
- `zh-CN.txt` - Chinese (Simplified)
- etc.

### 4. Translation Guidelines

#### Format
- Each file contains key-value pairs or structured text blocks
- Keep the structure and keys identical to the English version
- Only translate the values/content, not the keys

#### Quality
- Use natural, native-sounding language
- Keep translations concise (UI space is limited)
- Maintain consistent terminology throughout
- Preserve any placeholders like `{count}` or `{{name}}`

#### Tips
- Use the English (`en-GB.txt`) file as your reference
- Test your translations by viewing them in context if possible
- When in doubt, prioritize clarity over literal translation

### 5. Submit a Pull Request

1. Commit your changes with a descriptive message:
   ```bash
   git add your-language.txt
   git commit -m "Add/Update [Language] translations"
   ```

2. Push to your fork:
   ```bash
   git push origin [branch-name]
   ```

3. Open a Pull Request against the appropriate branch (`static` or `locales`)

## Adding a New Language

To add a completely new language:

1. Copy `en-GB.txt` as your template
2. Rename it using the appropriate language code
3. Translate all content
4. Submit a PR with the new file

## Language Codes

We follow the [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) standard:

| Code | Language |
|------|----------|
| `af` | Afrikaans |
| `ar` | Arabic |
| `bg` | Bulgarian |
| `bn-BD` | Bengali (Bangladesh) |
| `cs-CZ` | Czech |
| `da-DK` | Danish |
| `de-DE` | German |
| `el-GR` | Greek |
| `en-GB` | English (UK) |
| `es-ES` | Spanish (Spain) |
| `fi-FI` | Finnish |
| `fil` | Filipino |
| `fr-FR` | French |
| `hi-IN` | Hindi |
| `hu-HU` | Hungarian |
| `id` | Indonesian |
| `it-IT` | Italian |
| `ja-JP` | Japanese |
| `ko-KR` | Korean |
| `ms` | Malay |
| `nl-NL` | Dutch |
| `no-NO` | Norwegian |
| `pl-PL` | Polish |
| `pt-BR` | Portuguese (Brazil) |
| `ro` | Romanian |
| `ru-RU` | Russian |
| `sv-SE` | Swedish |
| `th` | Thai |
| `vi` | Vietnamese |
| `zh-CN` | Chinese (Simplified) |

## Questions?

If you have questions about translating or need clarification on any text, please:

1. Open an issue in this repository
2. Contact us at email@anqr.link

## Recognition

All contributors will be credited in the ANQR app. Thank you for helping make ANQR accessible to everyone!

---

**ANQR** - Advanced QR Code Generator
https://anqr.link
