export function alert_table(id, message) {
    if (id === "") id = "alert_output"
    const element = document.getElementById(id)
    let saved_text = element.innerText
    element.innerHTML += message
    setTimeout(
        () => {
            element.innerHTML = saved_text
        },
        1000
    );
}