import "./styles/style.scss";

import {
  LANG,
  SUPPORTED_LANGS
} from "./scripts/consts.js";

const currentLang = LANG;
const langJSON = require("./local/" + LANG + ".json");

function initTopMenu() {
  typeof WebMoneyHeader != "undefined" ? new WebMoneyHeader().init({
    rootElement: document.getElementById("webMoneyHeader"),
    view: "adaptive",
    maxWidth: "1312px",
    lang: currentLang,
    rid: "5E826DA3-CF2B-46E4-838D-AD48007C8859",
    wmid: "913109869675",
    serviceName: "Donate",
    serviceRootUrl: `/${LANG}/`,
    onLoginBlockRendered: function(data) {
      if (data.wmid) {
        // LOG
        console.log("LOG data.wmid", data.wmid);
      }
    } 
  }) : console.error("WebMoneyHeader undefined");
}

function initFooter() {
  typeof WebMoneyFooter != "undefined" ? new WebMoneyFooter().init({
    rootElement: document.getElementById("webMoneyFooter"),
    view: "adaptive",
    maxWidth: "1312px",
    lang: currentLang,
    supportedLangs: SUPPORTED_LANGS,
    onChangeLang: function(lang) {
      location.href = location.href.replace(`/${LANG}/`, `/${lang}/`);
    }
  }) : console.error("WebMoneyFooter undefined");
}

function init() {
  initTopMenu();
  initFooter();
}

init();