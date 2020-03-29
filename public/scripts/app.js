let app = new Vue({
    el: "#app",
    data: {
        form: { 
            "purchase": 0, 
            "monAm": 0, 
            "monPm": 0, 
            "tueAm": 0, 
            "tuePm": 0, 
            "wedAm": 0, 
            "wedPm": 0, 
            "thuAm": 0, 
            "thuPm": 0, 
            "friAm": 0, 
            "friPm": 0, 
            "satAm": 0, 
            "satPm": 0
        },
        rows: [],
        alert: {
            "isEnable": false,
            "message": "",
            "label": ""
        }
    },
    computed: {
        formDayOfWeekList: function () {
            return [ 
                this.form.monAm,
                this.form.monPm, 
                this.form.tueAm, 
                this.form.tuePm, 
                this.form.wedAm, 
                this.form.wedPm, 
                this.form.thuAm, 
                this.form.thuPm, 
                this.form.friAm, 
                this.form.friPm, 
                this.form.satAm,
                this.form.satPm
            ];
        },
        filteredRows: function () {
            let values = this.formDayOfWeekList;
            return this.rows.filter(row => {
                if (!this.range(this.form.purchase, row.purchase)) {
                    return false;
                }

                let predictions = row.predictions;
                for (let i = 0; i < row.predictions.length; i++) {
                    if (!this.range(values[i], predictions[i])) {
                        return false;
                    }
                }
                return true;
            });
        }
    },
    methods: {
        save: function () {
            for (let key in this.form) {
                localStorage.setItem(key, this.form[key]);
            }
            this.showAlert("success", "저장에 성공하였습니다!");
        },
        init: function () {
            this.form = { 
                "purchase": 0, 
                "monAm": 0, 
                "monPm": 0, 
                "tueAm": 0, 
                "tuePm": 0, 
                "wedAm": 0, 
                "wedPm": 0, 
                "thuAm": 0, 
                "thuPm": 0, 
                "friAm": 0, 
                "friPm": 0, 
                "satAm": 0, 
                "satPm": 0
            };
            localStorage.clear();
            showAlert("success", "초기화에 성공하였습니다!")
        },
        range: function (value, obj) {
            if (value === 0 || value === "0") {
                return true;
            }
            return obj.min <= value && value <= obj.max;
        },
        loadPridictions: function () {
            let app = this;
            let request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open("GET", "/scripts/predictions.json");
            request.onreadystatechange = function () {
                if (request.readyState != 4) {
                    // not ready
                    return;
                }
    
                if (request.status != "200") {
                    return console.error("loads error");
                }
    
                app.rows = JSON.parse(request.responseText);
            };
            request.send();
        },
        loadFormFromLocalStorage: function () {
            for (let key in this.form) {
                let value = localStorage.getItem(key);
                this.form[key] = value === null ? 0 : value;
            }
        },
        showAlert: function (label, message) {
            this.alert.label = `alert-${label}`;
            this.alert.message = message;
            this.alert.isEnable = true;
            
            let app = this;
            setTimeout(function () {
                app.alert.isEnable = false;
            }, 3000);
        }
    },
    created: function () {
        this.loadPridictions();
        this.loadFormFromLocalStorage();
    }
});
