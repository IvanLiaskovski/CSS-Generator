"use strict";

//Class to create browser support

class browsersSuppotring {
    constructor(title, chrome, firefox, safari, ie, opera, android, iphone) {
        this.title = title;
        this.chrome_support = chrome;
        this.firefox_support = firefox;
        this.safari_support = safari;
        this.ie_support = ie;
        this.opera_support = opera;
        this.android_support = android;
        this.iphone_support = iphone;
    }

    addSupport() {
        const title = selectElement("#generator-title");
        const browserVer = selectElements(".browser-support span");
        let arr = Object.values(this);
        title.textContent = arr[0];
        for (let i = 0; i < browserVer.length; i++) {
            browserVer[i].innerHTML = arr[i + 1];
        }

    }
}