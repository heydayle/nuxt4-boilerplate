import { test, expect, describe } from 'vitest'
import { convertFullMarkdownWithShiki } from '../../composables/useShiki'

describe('convertFullMarkdownWithShiki', () => {
    test('escapes HTML in fallback fenced code blocks', async () => {
        const html = await convertFullMarkdownWithShiki('```js\nconst x = "<b>bold</b>"\n```')
        expect(html).toContain('<pre><code class="language-js">const x = &quot;&lt;b&gt;bold&lt;/b&gt;&quot;</code></pre>')
        expect(html).not.toContain('<b>bold</b>')
    })

    test('escapes HTML in inline code', async () => {
        const html = await convertFullMarkdownWithShiki('Use `a < b & c > d` inline')
        expect(html).toContain('<code>a &lt; b &amp; c &gt; d</code>')
    })

    test('escapes HTML in headings, bold and italic text', async () => {
        const html = await convertFullMarkdownWithShiki('# Title <x>\n\n**bold <b>** and *em <i>*')
        expect(html).toContain('<h1>Title &lt;x&gt;</h1>')
        expect(html).toContain('<strong>bold &lt;b&gt;</strong>')
        expect(html).toContain('<em>em &lt;i&gt;</em>')
        expect(html).not.toContain('<b>')
        expect(html).not.toContain('<i>')
    })

    test('highlighted bash blocks keep working and escape raw content', async () => {
        const html = await convertFullMarkdownWithShiki('```bash\necho "<script>alert(1)</script>"\n```')
        // Shiki escapes `<` as &#x3C; (hex entity) — no raw <script> tag may reach the DOM
        expect(html).toContain('&#x3C;script>alert(1)&#x3C;/script>')
        expect(html).not.toContain('<script>')
    })
})
