import { createHighlighter } from 'shiki'

export default defineNuxtPlugin(async () => {
    const highlighter = await createHighlighter({
        themes: ['nord', 'min-light'],
        langs: ['javascript', 'typescript', 'vue', 'css', 'html', 'bash']
    })

    return {
        provide: {
            highlighter
        }
    }
})