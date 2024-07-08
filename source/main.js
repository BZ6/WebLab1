import "./draw";
import {alert_table} from "./alert";

document.addEventListener('DOMContentLoaded', function () {
    populate_table()

    const form = document.querySelector('.shot-form')
    configure_fields(form)

    form.addEventListener('submit', async function (event) {
        event.preventDefault()

        const formData = new FormData(form)
        if (!sessionStorage.r) alert_table("input_r", "Input R.")
        let [x, y, r] = [formData.getAll('x'), formData.get('y'), sessionStorage.r]

        if (x.length === 0) alert_table("input_x", "Input X.")
        if (y.length === 0) alert_table("input_y", "Input Y from -3.0 to 3.0.")

        x = x.map((x) => parseFloat(x.replace(',', '.')))
        y = parseFloat(y.replace(',', '.'))
        r = parseFloat(r.replace(',', '.'))

        x.forEach((x) => {
            const url = `../check_shot.php?x=${x}&y=${y}&r=${r}`;
            fetch(url, {
                method: 'GET',
            }).then((response) => {
                if (response.ok) response.json().then((data) => addToTable(data))
                else if (response.status === 400) response.json().then((data) => alert_table("", data.error))
                else alert_table("", "Server error.")
            })
        })
    })
})

function addToTable(data) {
    const table = document.querySelector('#shot-table tbody')
    const row = table.insertRow(0)
    row.insertCell(0).innerHTML = table.rows.length
    row.insertCell(1).innerHTML = `(${data.x}; ${data.y}; ${data.r})`
    row.insertCell(2).innerHTML = `${data.timestamp} (${data.execution_time})`
    row.insertCell(3).innerHTML = data.result
    sessionStorage.table = table.innerHTML
}

function populate_table() {
    document.querySelector('#shot-table tbody').innerHTML = sessionStorage.table ?? ''
}

function configure_fields(form) {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            let x_list = JSON.parse(sessionStorage.x ?? '[]')
            if (!checkbox.checked) {
                x_list = x_list.filter((val) => val !== checkbox.value)
            } else {
                if (!x_list.includes(checkbox.value)) x_list.push(checkbox.value)
            }
            sessionStorage.x = JSON.stringify(x_list)
        })
    })
    const x_list = JSON.parse(sessionStorage.x ?? '[]')
    x_list.forEach((val) => {
        document.querySelector(`input[type="checkbox"][value="${val}"]`).checked = true
    })

    const y_field = form.querySelector('input[name="y"]')
    if (sessionStorage.y) y_field.value = sessionStorage.y
    y_field.addEventListener('change', () => {
        sessionStorage.y = y_field.value
    })

    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            sessionStorage.r = button.value
        })
    })
}