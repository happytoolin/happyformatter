# SEO Content Generator for HappyFormatter

This SEO content generator uses Vercel AI SDK with OpenRouter to create comprehensive, SEO-optimized content for all HappyFormatter pages.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up API key**:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenRouter API key
   ```

3. **Test the structure**:
   ```bash
   pnpm test-seo
   ```

4. **Generate content**:
   ```bash
   # Dry run (no API calls)
   pnpm generate-seo:dry-run

   # Real content generation
   pnpm generate-seo
   ```

## 📁 Files Created

- `scripts/generate-seo-content.ts` - Main SEO content generator
- `scripts/dry-run.ts` - Dry run mode with mock content
- `scripts/test-seo-structure.ts` - Structure validation
- `scripts/utils/dry-run.ts` - Mock data utilities
- `src/lib/generated-seo-utils.ts` - Integration utilities
- `src/lib/example-integration.ts` - Integration examples
- `scripts/README.md` - Detailed documentation

## 🎯 What It Generates

For each language (26 languages + 4 variants = 30 pages total):

### Content Structure

- **SEO Title** (50-60 characters)
- **Meta Description** (150-160 characters)
- **Keywords Array** (10+ relevant keywords)
- **Category** (SEO-friendly category)
- **H1 Heading** (Main page heading)
- **Introduction** (Brief overview)
- **Features** (6 key tool features)
- **Benefits** (6 user benefits)
- **Use Cases** (6 common use cases)
- **FAQ Items** (5-7 relevant Q&As)

### Output Format

```json
{
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "pages": [
    {
      "pageId": "javascript",
      "language": "javascript",
      "minify": true,
      "content": {/* all SEO content */},
      "faqs": [/* FAQ items */]
    }
  ]
}
```

## 🛠 Usage

### Commands

| Command                     | Description                     |
| --------------------------- | ------------------------------- |
| `pnpm test-seo`             | Validate language configuration |
| `pnpm generate-seo:dry-run` | Generate mock content (no API)  |
| `pnpm generate-seo`         | Generate real AI content        |

### Integration Example

```astro
---
import { getPageFAQs, getSEODataForPage } from "../lib/generated-seo-utils.js";

const { language, variant } = Astro.props;
const seoData = getSEODataForPage(language, variant);
const faqs = getPageFAQs(language, variant);
---

<Layout title={seoData.title} description={seoData.description}>
  <h1>{seoData.h1}</h1>
  <p>{seoData.introduction}</p>

  <!-- Features -->
  <section>
    <h2>Features</h2>
    <ul>
      {seoData.features.map(feature => <li>{feature}</li>)}
    </ul>
  </section>

  <!-- FAQs -->
  <FAQ questions={faqs} />
</Layout>
```

## 💰 Cost Estimation

- **Pages processed**: 30 total (26 main + 4 variants)
- **API calls per page**: 2 (content + FAQs)
- **Total API calls**: 60
- **Estimated cost**: $0.50-2.00 (depending on model)

### Cost-Saving Tips

1. **Use dry run first** to test integration
2. **Test with a subset** of pages
3. **Choose appropriate model** (claude-3.5-sonnet recommended)
4. **Review content** before regenerating

## 🔧 Configuration

### Model Selection

Edit `scripts/generate-seo-content.ts`:

```typescript
const CONFIG = {
  model: "anthropic/claude-3.5-sonnet", // Change this
  // Other config...
};
```

### Available Models

- `anthropic/claude-3.5-sonnet` (recommended)
- `anthropic/claude-3-haiku` (cheaper)
- `openai/gpt-4o` (alternative)
- See all models: https://openrouter.ai/models

### Customization

1. **Adjust prompts** in the script for different tone/style
2. **Modify schema** to include additional fields
3. **Update variants** mapping for new tool variants

## 📊 Languages Supported

### Main Languages (26)

- C, C++, C#, CSS, SCSS
- Dart, Go, HTML, Java
- JavaScript, JSON, Lua, Markdown
- PHP, Python, Rust, SQL
- TypeScript, XML, YAML, Zig
- Protocol Buffers

### Variants (4)

- Python (Ruff)
- JavaScript (Biome)
- TypeScript (Biome)
- PHP (Mago)

## 🔍 Quality Assurance

### Content Guidelines

- **Privacy-focused**: Emphasize client-side processing
- **Developer-friendly**: Use technical but accessible language
- **SEO-optimized**: Include relevant keywords naturally
- **Action-oriented**: Focus on benefits and use cases

### Review Process

1. **Check title lengths** (50-60 chars)
2. **Verify meta descriptions** (150-160 chars)
3. **Validate keyword relevance**
4. **Review FAQ accuracy**
5. **Test integration** with components

## 🚨 Troubleshooting

### Common Issues

**API Key Error**:

```
❌ Error: No API key found!
```

- Check `.env` file exists
- Verify `OPENROUTER_API_KEY` is set
- Get key from https://openrouter.ai/keys

**Rate Limiting**:

- Wait 1-2 minutes between runs
- Consider using a different model
- Contact OpenRouter for higher limits

**Content Quality**:

- Review generated content
- Adjust prompts in script
- Try different models
- Report quality issues

## 🔄 Running Multiple Times

The script is designed for multiple runs:

- **Regenerates all content** each time
- **Overwrites existing files**
- **No incremental updates**
- **Version tracking** in output file

### Best Practices

1. **Backup existing content** before regenerating
2. **Test with dry run** first
3. **Review changes** before deploying
4. **Use version control** to track changes

## 📈 Performance Optimization

### API Efficiency

- **Batch processing**: Groups similar requests
- **Retry logic**: Handles temporary failures
- **Error recovery**: Continues with other languages

### File I/O

- **Single output file**: All data in one JSON
- **Structured format**: Easy to parse and use
- **Version tracking**: Know when content was generated

## 🔐 Security & Privacy

### API Keys

- **Never commit** `.env` files
- **Use environment variables** for keys
- **Rotate keys** regularly

### Content Privacy

- **No code sent** to AI services
- **Only metadata** (language names, features) processed
- **Client-side generation** keeps your data private

## 🤝 Contributing

### Adding New Languages

1. **Update `src/lib/languages.ts`**
2. **Add language to variants** (if applicable)
3. **Run dry run** to test structure
4. **Generate real content** with API

### Improving Prompts

1. **Edit system/user prompts** in script
2. **Test with different models**
3. **Validate schema changes**
4. **Update documentation**

### New Features

1. **Add schema fields** as needed
2. **Update mock generators**
3. **Test integration**
4. **Document changes**

## 📞 Support

- **Vercel AI SDK**: https://sdk.vercel.ai/
- **OpenRouter**: https://openrouter.ai/
- **Issues**: Create GitHub issue in repository
- **Documentation**: Check `scripts/README.md`

## 📝 Changelog

### v1.0.0

- Initial release
- Support for 26 languages + 4 variants
- AI-powered content generation
- Dry run mode for testing
- Integration utilities
