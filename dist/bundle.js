(() => {
    var e = {
        948: () => {
            canvas = document.getElementById("canvas"), context = canvas.getContext("2d"), context.clearRect(0, 0, 1e3, 1e3), context.fillStyle = "rgba(91,95,201,0.58)", context.beginPath(), context.moveTo(150, 70), context.arc(150, 70, 50, -4.7, 4 * Math.PI / 2, !0), context.fillRect(150, 45, 50, 25), context.moveTo(150, 70), context.lineTo(100, 70), context.lineTo(150, 95), context.fill(), context.fillStyle = "black", context.beginPath(), context.moveTo(150, 70), context.lineTo(220, 70), context.lineTo(215, 75), context.moveTo(220, 70), context.lineTo(215, 65), context.fillText("X", 220, 65), context.moveTo(150, 70), context.lineTo(80, 70), context.moveTo(175, 75), context.lineTo(175, 65), context.fillText("R / 2", 170, 63), context.moveTo(200, 75), context.lineTo(200, 65), context.fillText("R", 197, 63), context.moveTo(125, 75), context.lineTo(125, 65), context.fillText("-R / 2", 114, 63), context.moveTo(100, 75), context.lineTo(100, 65), context.fillText("-R", 96, 63), context.moveTo(150, 70), context.lineTo(150, 140), context.moveTo(150, 70), context.lineTo(150, 5), context.lineTo(155, 10), context.moveTo(150, 5), context.lineTo(145, 10), context.fillText("Y", 155, 15), context.moveTo(145, 95), context.lineTo(155, 95), context.fillText("-R / 2", 160, 100), context.moveTo(145, 120), context.lineTo(155, 120), context.fillText("-R", 160, 123), context.moveTo(145, 45), context.lineTo(155, 45), context.fillText("R / 2", 160, 48), context.moveTo(145, 20), context.lineTo(155, 20), context.fillText("R", 160, 25), context.closePath(), context.stroke()
        }
    }, t = {};

    function o(n) {
        var c = t[n];
        if (void 0 !== c) return c.exports;
        var l = t[n] = {exports: {}};
        return e[n](l, l.exports, o), l.exports
    }

    (() => {
        "use strict";

        function e(e, t) {
            "" === e && (e = "alert_output");
            const o = document.getElementById(e);
            let n = o.innerText;
            o.innerHTML += t, setTimeout((() => {
                o.innerHTML = n
            }), 1e3)
        }

        o(948), document.addEventListener("DOMContentLoaded", (function () {
            document.querySelector("#shot-table tbody").innerHTML = sessionStorage.table ?? "";
            const t = document.querySelector(".shot-form");
            !function (e) {
                document.querySelectorAll('input[type="checkbox"]').forEach((e => {
                    e.addEventListener("change", (() => {
                        let t = JSON.parse(sessionStorage.x ?? "[]");
                        e.checked ? t.includes(e.value) || t.push(e.value) : t = t.filter((t => t !== e.value)), sessionStorage.x = JSON.stringify(t)
                    }))
                })), JSON.parse(sessionStorage.x ?? "[]").forEach((e => {
                    document.querySelector(`input[type="checkbox"][value="${e}"]`).checked = !0
                }));
                const t = e.querySelector('input[name="y"]');
                sessionStorage.y && (t.value = sessionStorage.y), t.addEventListener("change", (() => {
                    sessionStorage.y = t.value
                })), document.querySelectorAll("button").forEach((e => {
                    e.addEventListener("click", (() => {
                        sessionStorage.r = e.value
                    }))
                }))
            }(t), t.addEventListener("submit", (async function (o) {
                o.preventDefault();
                const n = new FormData(t);
                sessionStorage.r || e("input_r", "Input R.");
                let [c, l, r] = [n.getAll("x"), n.get("y"), sessionStorage.r];
                0 === c.length && e("input_x", "Input X."), 0 === l.length && e("input_y", "Input Y from -3.0 to 3.0."), c = c.map((e => parseFloat(e.replace(",", ".")))), l = parseFloat(l.replace(",", ".")), r = parseFloat(r.replace(",", ".")), c.forEach((t => {
                    fetch(`../check_shot.php?x=${t}&y=${l}&r=${r}`, {method: "GET"}).then((t => {
                        t.ok ? t.json().then((e => function (e) {
                            const t = document.querySelector("#shot-table tbody"), o = t.insertRow(0);
                            o.insertCell(0).innerHTML = t.rows.length, o.insertCell(1).innerHTML = `(${e.x}; ${e.y}; ${e.r})`, o.insertCell(2).innerHTML = `${e.timestamp} (${e.execution_time})`, o.insertCell(3).innerHTML = e.result, sessionStorage.table = t.innerHTML
                        }(e))) : 400 === t.status ? t.json().then((t => e("", t.error))) : e("", "Server error.")
                    }))
                }))
            }))
        }))
    })()
})();