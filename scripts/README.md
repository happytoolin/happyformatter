# SEO Content Generator

This directory contains scripts for generating SEO-optimized content for HappyFormatter pages.

## Overview

The SEO Content Generator uses Vercel AI SDK with OpenRouter to create:

- Page titles and meta descriptions
- SEO keywords and categories
- H1 headings and introductions
- Features, benefits, and use cases
- FAQ content for each page

## Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up your API key**:
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your OpenRouter API key
   # Get your key from https://openrouter.ai/keys
   ```

3. **Configure your model** (optional):
   - Default model: `anthropic/claude-3.5-sonnet`
   - You can change this in the script configuration
   - See available models: https://openrouter.ai/models

## Usage

### Generate SEO Content

```bash
# Run the SEO content generator
pnpm generate-seo

# Or run directly with bun
bun scripts/generate-seo-content.ts
```

### What it generates

The script creates a JSON file at `src/lib/generated-seo-data.json` with:

```json
{
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "pages": [
    {
      "pageId": "javascript",
      "language": "javascript",
      "minify": true,
      "content": {
        "title": "JavaScript Formatter - Format JS Code Online",
        "description": "Free online JavaScript formatter...",
        "keywords": ["javascript formatter", "js formatter", ...],
        "category": "Web Development, JavaScript, Programming Tools",
        "h1": "JavaScript Formatter",
        "introduction": "Format your JavaScript code...",
        "features": ["Syntax highlighting", "Error detection", ...],
        "benefits": ["Improved readability", "Better maintainability", ...],
        "useCases": ["Code reviews", "Debugging", ...]
      },
      "faqs": [
        {
          "question": "How does the JavaScript formatter work?",
          "answer": "Our JavaScript formatter..."
        },
        ...
      ]
    }
  ]
}
```

## Integration

### Using the Generated Data

1. **Import utilities**:
   ```typescript
   import {
     getPageFAQs,
     getSEODataForPage,
   } from "../lib/generated-seo-utils.js";
   ```

2. **Use in Astro pages**:
   ```astro
   ---
   const seoData = getSEODataForPage(language, variant);
   const faqs = getPageFAQs(language, variant);
   ---

   <Layout title={seoData.title} description={seoData.description}>
     <h1>{seoData.h1}</h1>
     <p>{seoData.introduction}</p>
     <FAQ questions={faqs} />
   </Layout>
   ```

3. **See example integration**:
   - Check `src/lib/example-integration.ts` for complete examples
   - Shows how to integrate with existing SEO logic
   - Includes fallback mechanisms

### Updating Existing Components

1. **Update your page components** to use generated data
2. **Modify SEO utilities** to incorporate generated content
3. **Update FAQ components** to use generated FAQs
4. **Test thoroughly** to ensure content quality

## Configuration

### Script Configuration

Edit `scripts/generate-seo-content.ts` to customize:

- **Output file location**: Change `CONFIG.outputFile`
- **Model selection**: Update `CONFIG.model`
- **Retry attempts**: Adjust `CONFIG.maxRetries`

### Content Customization

Modify the prompts in the script to:

- Adjust tone and style
- Include specific product features
- Target different user personas
- Change SEO focus

## Running Multiple Times

The script is designed to be run multiple times:

- It will regenerate all content each time
- No incremental updates (regenerates everything)
- Existing content is overwritten
- Cache is automatically refreshed

## Cost Considerations

- **API costs**: Each generation consumes tokens from your API provider
- **Pages processed**: ~25 main pages + variants
- **Estimated cost**: ~$0.50-2.00 depending on model and provider
- **Recommendation**: Test with a subset first, then generate all

## Troubleshooting

### Common Issues

1. **API Key not found**:
   ```
   Error: No API key found!
   ```
   - Check your `.env` file
   - Ensure `OPENROUTER_API_KEY` is set

2. **Rate limiting**:
   - OpenRouter has rate limits
   - Wait a few minutes and retry
   - Consider using a different model

3. **Content quality issues**:
   - Review generated content before deploying
   - Adjust prompts in the script
   - Try different models

### Debug Mode

Add console logging to see detailed generation progress:

```typescript
console.log("Generated content:", JSON.stringify(content, null, 2));
```

## Best Practices

1. **Review generated content** before deploying
2. **Test with a subset** of pages first
3. **Keep backups** of your existing SEO data
4. **Monitor API costs** when running multiple times
5. **Update prompts** based on content quality feedback
6. **Version control** your generated content file

## Contributing

When modifying the script:

1. **Test with different models**
2. **Validate schema changes**
3. **Update documentation**
4. **Consider backwards compatibility**

## Support

- **Vercel AI SDK**: https://sdk.vercel.ai/
- **OpenRouter**: https://openrouter.ai/
- **Issues**: Report bugs in the project repository
