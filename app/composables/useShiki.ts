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
 * Escape HTML special characters so raw markdown content cannot break out of
 * the generated markup (prevents HTML injection when rendering code/headings).
 */
const escapeHtml = (value: string): string => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/**
 * Internal: replace bash/shell/sh code blocks with Shiki-highlighted HTML.
 * Shiki's `Highlighter.codeToHtml` is synchronous (shiki >= 0.14), so no await needed.
 */
const replaceBashBlocks = (text: string, shiki: Highlighter): string => {
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
    result = replaceBashBlocks(result, shiki)

    // Convert other code blocks to simple HTML (without Shiki)
    result = result.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match: string, lang: string | undefined, code: string) =>
        `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`
    )

    // Convert inline code
    result = result.replace(/`([^`]+)`/g, (_match: string, code: string) => `<code>${escapeHtml(code)}</code>`)

    // Convert headers (single pass for h1-h3)
    result = result.replace(/^(#{1,3}) (.*)$/gm, (_match: string, hashes: string, content: string) =>
        `<h${hashes.length}>${escapeHtml(content)}</h${hashes.length}>`
    )

    // Convert bold and italic
    result = result.replace(/\*\*(.*?)\*\*/g, (_match: string, content: string) => `<strong>${escapeHtml(content)}</strong>`)
    result = result.replace(/\*(.*?)\*/g, (_match: string, content: string) => `<em>${escapeHtml(content)}</em>`)

    // Wrap in paragraph markers for line breaks
    result = result.replace(/\n\n/g, '</p><p>')
    result = `<p>${result}</p>`

    return result
}
