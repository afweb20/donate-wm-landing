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
    rid: "9F63CDB6-A93C-46CB-8C47-A3AB00CF0828",
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