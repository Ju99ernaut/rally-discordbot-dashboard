export default {
    home: `${window.location.origin}/`,
    clientId: process.env.CLIENT_ID || "",
    botApi: process.env.BOT_API || "",
    rallyApi: "https://api.rally.io/v1",
    coingeckoApi: "https://api.coingecko.com/api/v3",
    discordApi: "https://discord.com/api",
    discordCdn: "https://cdn.discordapp.com",
    githubHome: "https://github.com/CreatorCoinTools/rally-discordbot-dashboard",
    colors: {
        default: "#344675",
        primary: "#42b883",
        info: "#1d8cf8",
        danger: "#fd5d93",
        teal: "#00d6b4",
        primaryGradient: ['rgba(66,134,121,0.55)', 'rgba(66,134,121,0.05)', 'rgba(66,134,121,0)'],
    }
}