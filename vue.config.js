module.exports = {
    pwa: {
        name: 'rallybot-dashboard',
        themeColor: '#121317',
        msTileColor: '#121317',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black-translucent',
        iconPaths: {
            appleTouchIcon: 'img/icons/apple-icon-152x152.png',
            msTileImage: 'img/icons/ms-icon-144x144.png'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'public/service-worker.js'
        }
    }
}