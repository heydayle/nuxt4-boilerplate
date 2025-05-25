// composables/useMarkdownShiki.ts
import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

const initShiki = async () => {
    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: ['nord'], // or your preferred theme
            langs: ['bash', 'shell', 'sh'] // only bash-related languages
        })
    }
    return highlighter
}

export const convertMarkdownWithShiki = async (markdown: string): Promise<string> => {
    const shiki = await initShiki()

    // Regex to match bash code blocks
    const bashCodeBlockRegex = /```(?:bash|shell|sh)\n([\s\S]*?)```/g

    // Replace bash code blocks with Shiki-highlighted HTML
    const result = markdown.replace(bashCodeBlockRegex, (match, code) => {
        const trimmedCode = code.trim()
        return shiki.codeToHtml(trimmedCode, {
            lang: 'bash',
            theme: 'nord'
        })
    })

    return result
}

// Alternative function that converts all markdown elements
export const convertFullMarkdownWithShiki = async (markdown: string): Promise<string> => {
    const shiki = await initShiki()

    let result = markdown

    // Convert bash code blocks with Shiki
    result = result.replace(/```(?:bash|shell|sh)\n([\s\S]*?)```/g, (match, code) => {
        const trimmedCode = code.trim()
        return shiki.codeToHtml(trimmedCode, {
            lang: 'bash',
            theme: 'nord'
        })
    })

    // Convert other code blocks to simple HTML (without Shiki)
    result = result.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-ts">${code.trim()}</code></pre>`
    })

    // Convert inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Convert headers
    result = result.replace(/^### (.*$)/gm, '<h3>$1</h3>')
    result = result.replace(/^## (.*$)/gm, '<h2>$1</h2>')
    result = result.replace(/^# (.*$)/gm, '<h1>$1</h1>')

    // Convert bold and italic
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Convert line breaks
    result = result.replace(/\n\n/g, '</p><p>')
    result = `<p>${result}</p>`

    return result
}

// Simple function - only converts bash code blocks
export const highlightBashInMarkdown = async (markdown: string): Promise<string> => {
    const shiki = await initShiki()

    return markdown.replace(/```(?:bash|shell|sh)\n([\s\S]*?)```/g, (match, code) => {
        return shiki.codeToHtml(code.trim(), {
            lang: 'bash',
            theme: 'nord'
        })
    })
}