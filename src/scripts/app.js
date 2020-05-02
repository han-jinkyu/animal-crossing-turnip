import Vue from "vue";
import languages from "../data/languages";
import TurnipPrices from "./TurnipPrices";
import Price from "./Price";
import DayOfWeek from "./DayOfWeek";

new Vue({
    el: "#app",
    data: {
        DayOfWeek: DayOfWeek,
        PurchasePriceRange: new Price(90, 110),
        tableRows: [],
        userPurchasePrice: 0,
        userPrices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        alert: {
            isEnable: false,
            message: "",
            label: ""
        },
        lang: "en"
    },
    computed: {
        filteredRows: function () {
            return this.tableRows
                .filter(row => row.isBetweenPrices(this.userPrices));
        },
        languageMap: function () {
            return Object.keys(languages)
                .map(lang => ({ "key": lang, "value": languages[lang].name }));
        }
    },
    methods: {
        save: function () {
            localStorage.setItem("userPurchasePrice", this.userPurchasePrice);
            localStorage.setItem("userPrices", this.userPrices);
            this.showAlert("success", this.getMessage("MSG_SAVE_SUCCESSFULLY"));
        },
        init: function () {
            this.userPurchasePrice = 0;
            this.userPrices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            localStorage.clear();
            this.showAlert("success", this.getMessage("MSG_INIT_SUCCESSFULLY"))
        },
        loadFormFromLocalStorage: function () {
            // TODO: 정리 필요
            let userPurchasePrice = localStorage.getItem("userPurchasePrice");
            this.userPurchasePrice = parseInt(userPurchasePrice) ? userPurchasePrice : 0;

            let userPrices = localStorage.getItem("userPrices");
            this.userPrices = userPrices ? userPrices.split(",").map(p => parseInt(p)) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            console.log(this.userPrices);
        },
        showAlert: function (label, message) {
            this.alert.label = `alert-${label}`;
            this.alert.message = message;
            this.alert.isEnable = true;
            
            let app = this;
            setTimeout(function () {
                app.alert.isEnable = false;
            }, 3000);
        },
        getMessage: function (key) {
            return this.lang in languages ? languages[this.lang][key] : languages["en"][key];
        },
        changeLanguage: function () {
            localStorage.setItem("lang", this.lang);
        },
        loadLanguageFromLocalStorage: function () {
            let lang = localStorage.getItem("lang");
            this.lang = lang ? lang : (navigator.language || navigator.userLanguage).substr(0, 2);
        }
    },
    created: function () {
        this.loadFormFromLocalStorage();
        this.loadLanguageFromLocalStorage();

        // rows
        let turnipPrices = new TurnipPrices();
        let exprs = turnipPrices.createExpressions(this.userPrices);
        this.tableRows = exprs.map(expr => expr.toTableRow());
    }
});
