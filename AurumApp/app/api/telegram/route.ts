import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from "telegraf";
import jwt from "jsonwebtoken";
import nodeCrypto from "crypto";
import OpenAI from "openai";


// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const bot = new Telegraf(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Define messages in JSON objects
const messages = {
  en: {
    welcome: 'Welcome to Aurum! The payment experience that connects all worlds.\nPlease select an option to learn more:',
    welcome_reply: '\nPlease select an option:',
    aurum_option_01: 'What is Aurum?',
    aurum_option_01_reply: 'Aurum is a seamless international payment platform that allows you to pay with crypto while merchants receive local currency. It works on-chain, on-demand, in real-time, and in real life!',
    aurum_option_02: 'How does Aurum work?',
    aurum_option_02_reply: 'Aurum uses AI and blockchain technologies to convert crypto from your wallet into local currency. You can initiate transactions with voice commands, and the app handles the conversion and payment process.',
    aurum_option_03: 'What cryptocurrencies can I use?',
    aurum_option_03_reply: 'Aurum supports various cryptocurrencies, including USDC. The app will show you available options based on your wallet and the local currency needed.',
    aurum_option_04: 'Is Aurum secure?',
    aurum_option_04_reply: 'Yes, Aurum follows secure protocols for all transactions. You always have to approve transactions, and we implement various safety measures to protect users.',
    aurum_option_05: 'Can I use Aurum while traveling?',
    aurum_option_05_reply: 'Absolutely! Aurum is perfect for travelers, especially digital nomads. It works in any country, converting your crypto to the local currency needed.',
    aurum_option_06: 'How do I get started with Aurum?',
    aurum_option_06_reply: 'Getting started is easy! You can use social logins to create an account, connect your favorite crypto wallet, and start using Aurum for seamless international payments.',
    aurum_app: 'Aurum App',
    aurum_option_ai_chat: 'Aurum AI Assistant',
  },
};

const imagePath = `${baseUrl}/images/Aurum.png`;


// Handle '/start' command (initial interaction)
bot.start((ctx) => {

  console.log("****************");
  console.log(ctx.update);
  console.log("****************");

  const userData = {
    authDate: Math.floor(new Date().getTime()),
    firstName: ctx.update.message.from.first_name,
    lastName: "",
    username: ctx.update.message.from.username,
    id: ctx.update.message.from.id,
    photoURL: "",
  }; 

  const hash = generateTelegramHash(userData);

  // Create JWT with user data and hash
  const telegramAuthToken = jwt.sign(
    {
        ...userData,
        hash,
    },
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string, // Use the bot token to sign the JWT
    { algorithm: "HS256" }
  );

  // URL-encode the generated JWT for safe usage in a URL
  const encodedTelegramAuthToken = encodeURIComponent(telegramAuthToken);     

  const appURL = `${process.env.NEXT_PUBLIC_APP_URL}/?telegramAuthToken=${encodedTelegramAuthToken}`;

  console.log("****************");
  console.log(appURL);
  console.log("****************");

  const replyMarkup = {
    inline_keyboard: [
      [{ text: messages.en.aurum_app, web_app: { url: appURL } }],
      [{ text: messages.en.aurum_option_01, callback_data: 'aurum_option_01' }],
      [{ text: messages.en.aurum_option_02, callback_data: 'aurum_option_02' }],
      [{ text: messages.en.aurum_option_03, callback_data: 'aurum_option_03' }],
      [{ text: messages.en.aurum_option_04, callback_data: 'aurum_option_04' }],
      [{ text: messages.en.aurum_option_05, callback_data: 'aurum_option_05' }],
      [{ text: messages.en.aurum_option_06, callback_data: 'aurum_option_06' }],
      [{ text: messages.en.aurum_option_ai_chat, callback_data: 'aurum_option_ai_chat' }],
    ],
  };
  
    ctx.replyWithPhoto(imagePath, {
        caption: messages.en.welcome,
        reply_markup: replyMarkup,
    });

});

// Handle callback queries
bot.on('callback_query', async (ctx) => {

  const callbackData = ctx.callbackQuery.data;
  //const userId = ctx.from.id;

  console.log(callbackData);


if (callbackData === 'aurum_option_01') {
  await ctx.reply(messages.en.aurum_option_01 + "\n" + messages.en.aurum_option_01_reply);
} else if (callbackData === 'aurum_option_02') {
  await ctx.reply(messages.en.aurum_option_02 + "\n" + messages.en.aurum_option_02_reply);
} else if (callbackData === 'aurum_option_03') {
  await ctx.reply(messages.en.aurum_option_03 + "\n" + messages.en.aurum_option_03_reply);
} else if (callbackData === 'aurum_option_04') {
  await ctx.reply(messages.en.aurum_option_04 + "\n" + messages.en.aurum_option_04_reply);
} else if (callbackData === 'aurum_option_05') {
  await ctx.reply(messages.en.aurum_option_05 + "\n" + messages.en.aurum_option_05_reply);
} else if (callbackData === 'aurum_option_06') {
  await ctx.reply(messages.en.aurum_option_06 + "\n" + messages.en.aurum_option_06_reply);
} else if (callbackData === 'aurum_option_ai_chat') {
  await ctx.reply("How can I assist you with Aurum today?");
}
  // ... (Handle other callback queries)

  const userData = {
    authDate: Math.floor(new Date().getTime()),
    firstName: ctx.update.callback_query.from.first_name,
    lastName: "",
    username: ctx.update.callback_query.from.username,
    id: ctx.update.callback_query.from.id,
    photoURL: "",
  }; 

  const hash = generateTelegramHash(userData);

  // Create JWT with user data and hash
  const telegramAuthToken = jwt.sign(
    {
        ...userData,
        hash,
    },
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string, // Use the bot token to sign the JWT
    { algorithm: "HS256" }
  );

  // URL-encode the generated JWT for safe usage in a URL
  const encodedTelegramAuthToken = encodeURIComponent(telegramAuthToken);     

  const appURL = `${process.env.NEXT_PUBLIC_APP_URL}/?telegramAuthToken=${encodedTelegramAuthToken}`;

  console.log("****************");
  console.log(appURL);
  console.log("****************");

  const replyMarkup = {
    inline_keyboard: [
        [{ text: messages.en.aurum_app, web_app: { url: appURL } }],
        [{ text: messages.en.aurum_option_01, callback_data: 'aurum_option_01' }],
        [{ text: messages.en.aurum_option_02, callback_data: 'aurum_option_02' }],
        [{ text: messages.en.aurum_option_03, callback_data: 'aurum_option_03' }],
        [{ text: messages.en.aurum_option_04, callback_data: 'aurum_option_04' }],
        [{ text: messages.en.aurum_option_05, callback_data: 'aurum_option_05' }],
        [{ text: messages.en.aurum_option_06, callback_data: 'aurum_option_06' }],
    ],
  };

  ctx.reply(messages.en.welcome_reply, {
    reply_markup: replyMarkup,
  });

});

// Handle generic text messages
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a web3 defi expert." },
            {
                role: "user",
                content: `I'm in SFO now and I like ${userMessage}. Suggest a suitable thinks to do, and tell me what are the best places to buy with crypto.`,
            },
        ],        
    });

    console.log(response);

    const answer = response.choices[0].message?.content ?? '';
    await ctx.reply(answer);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    await ctx.reply('Sorry, I am having trouble answering your question right now.');
  }
});

// Handle other commands or messages
// ... (Implement logic to process user input, generate recommendations, etc.)
// Handle messages (integrate OpenAI)

export async function POST(request: NextRequest) {
  try {
    // Parse incoming webhook request from Telegram
    const body = await request.json();

    // Pass the update to Telegraf for processing
    await bot.handleUpdate(body);

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

/**
 * Function to generate HMAC hash for Telegram authentication
 * @param {Object} data - User data to be hashed
 * @returns {string} - Generated HMAC hash
 */
const generateTelegramHash = (data): string => {
  // Prepare the data object with required fields
  const userData = {
      auth_date: String(data.authDate),
      first_name: data.firstName,
      id: String(data.id),
      last_name: data.lastName,
      photo_url: data.photoURL,
      username: data.username,
  };

  // Filter out undefined or empty values from the data object
  const filteredUseData = Object.entries(userData).reduce(
      (acc: { [key: string]: string }, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
      },
      {} as { [key: string]: string }
  );

  // Sort the entries and create the data check string
  const dataCheckArr = Object.entries(filteredUseData)
      .map(([key, value]) => `${key}=${String(value)}`)
      .sort((a, b) => a.localeCompare(b))
      .join("\n");

  // Create SHA-256 hash from the bot token
  const TELEGRAM_SECRET = nodeCrypto
      .createHash("sha256")
      .update(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string)
      .digest();

  // Generate HMAC-SHA256 hash from the data check string
  return nodeCrypto
      .createHmac("sha256", TELEGRAM_SECRET)
      .update(dataCheckArr)
      .digest("hex");
};

