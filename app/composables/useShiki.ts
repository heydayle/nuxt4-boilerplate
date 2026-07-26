// composables/useShiki.ts
import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

/** Lazy-init singleton for the Shiki highlighter instance. */
const initShiki = async (): Promise<Highlighter> => {
    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: ['nord'],
            langs: ['bash', 'shell', 'sh']
        })
    }
    return highlighter
}

/** Regex matching bash-family fenced code blocks. */
const BASH_BLOCK_RE = /```(?:bash|shell|sh)\n([\s\S]*?)```/g

/**
 * Internal: replace bash/shell/sh code blocks with Shiki-highlighted HTML.
 */
const replaceBashBlocks = async (text: string, shiki: Highlighter): Promise<string> => {
    return text.replace(BASH_BLOCK_RE, (_match: string, code: string) =>
        shiki.codeToHtml(code.trim(), { lang: 'bash', theme: 'nord' })
    )
}

/**
 * Highlight bash/shell/sh code blocks in markdown using Shiki.
 * @param markdown - Raw markdown string
 * @returns Markdown with bash code blocks replaced by highlighted HTML
 */
export const convertMarkdownWithShiki = async (markdown: string): Promise<string> => {
    const shiki = await initShiki()
    return replaceBashBlocks(markdown, shiki)
}

/**
 * Convert full markdown to basic HTML, using Shiki for bash code blocks
 * and simple transformations for everything else.
 * @param markdown - Raw markdown string
 * @returns HTML string
 */
export const convertFullMarkdownWithShiki = async (markdown: string): Promise<string> => {
    const shiki = await initShiki()

    let result = markdown

    // Convert bash code blocks with Shiki
    result = await replaceBashBlocks(result, shiki)

    // Convert other code blocks to simple HTML (without Shiki)
    result = result.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match: string, lang: string | undefined, code: string) =>
        `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`
    )

    // Convert inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Convert headers
    result = result.replace(/^### (.*$)/gm, '<h3>$1</h3>')
    result = result.replace(/^## (.*$)/gm, '<h2>$1</h2>')
    result = result.replace(/^# (.*$)/gm, '<h1>$1</h1>')

    // Convert bold and italic
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Wrap in paragraph markers for line breaks
    result = result.replace(/\n\n/g, '</p><p>')
    result = `<p>${result}</p>`

    return result
}
