# Rally Discord Bot Dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/df11b244-1c7c-40dd-85ce-8c186ec9b17a/deploy-status)](https://app.netlify.com/sites/rally-discordbot-dashboard/deploys)

Dashboard for managing rally discord bot built using `vuejs`

* [initial template](https://github.com/Murked/vue-tailwind-admin)
* [theme](https://github.com/estevanmaito/windmill-dashboard)
* [charts](https://github.com/creativetimofficial/vue-black-dashboard)

## Screenshot
![screehot](https://i.imgur.com/PexCtoM.png)

## TODO

### Setup
- [x] Project
- [x] Components
- [x] Router
- [x] Store
- [x] I18n
- [x] Fetch API utils

### Implement
- [x] Discord API intergration
- [x] Rally API intergration
- [x] Rally role bot API intergration(bot setup, commands, set role mapping, get role mappings etc)
- [x] Feature request form
- [x] Notification system
- [x] SSO
- [ ] Tests

## Development

Clone the repo

```sh
git clone https://github.com/Ju99ernaut/rally-discordbot-dashboard
```

Navigate into the repo

```sh
cd rally-discordbot-dashboard
```

Install dependencies

```sh
npm install
```

Start dev server

```sh
npm run serve
```

Production Build

```sh
npm run build
```

Lint files

```sh
npm run lint
```

## Configuration

Add `BASE_URL/` and `BASE_URL/dashboard/home` to your discord app's redirect URIs

Fill in the `config.js` file

| Setting | Description |
|---------|-------------|
| home | `Base URL of the dashboard site` |
| clientId | `discord client ID` |
| githubHome | `repo homepage` |
### `config.js` example
```js
export default {
    home: "http://localhost:8080/",
    clientId: "786246670530773023",
    botApi: "http://localhost:8000",
    rallyApi: "https://api.rally.io/v1",
    coingeckoApi: "https://api.coingecko.com/api/v3",
    discordApi: "https://discord.com/api",
    discordCdn: "https://cdn.discordapp.com",
    githubHome: "https://github.com/Ju99ernaut/rally-discordbot-dashboard",
    colors: {
        default: "#344675",
        primary: "#42b883",
        info: "#1d8cf8",
        danger: "#fd5d93",
        teal: "#00d6b4",
        primaryGradient: ['rgba(66,134,121,0.55)', 'rgba(66,134,121,0.05)', 'rgba(66,134,121,0)'],
    }
}
```

### feature request form

You will have to set it up in `src/pages/FeatureRequest.vue`

### example google forms setup

create a google form with title and description field then click get prefilled link, you will get something like:
`https://docs.google.com/forms/d/e/formID/formResponse?inputid1=""&inputid2=""`
Fill in the `submitRequest` as shown below

```js
submitRequest() {
    const obj = {
        "inputid1": this.title,
        "inputid2": this.description,
    };
    fetch(
        "https://docs.google.com/forms/d/e/" +
          "formID/formResponse" +
          queryString(obj),
        {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    this.title = "";
    this.description = "";
    this.$toast.success("Feature request recorded");
},
```