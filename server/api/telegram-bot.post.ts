import TelegramBot from 'node-telegram-bot-api'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const GROUP_ID = process.env.TELEGRAM_GROUP_CHAT_ID

// Create a new TelegramBot instance (without polling)
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
    polling: true, request: {
        agentOptions: {
            keepAlive: true,
            family: 4
        }
    }
})

export default defineEventHandler(async event => {
    try {
        // Read the incoming request body
        const body = await readBody(event)

        // Extract the message
        const { message } = body

        if (message) {
            const chatId = GROUP_ID
            const text = message.text

            // Respond to the received message
            if (text) {
                // await bot.sendMessage(chatId, text, {
                //     message_thread_id: '16014'
                // })
                await bot.sendMessage(chatId, text, { parse_mode: 'markdownv2' })
            }
        }
        return { status: 'success', message: 'Alert successfully!' }
    }

    catch (error) {
        console.error(error)
        return { status: 'error', message: 'Failed to alert!' }
    }
})