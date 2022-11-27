let toggle = document.querySelector(".toggle-switch");
let mode = document.getElementById("toggle_dark");
let dark = document.querySelector("body")

toggle.onclick = function(){
    toggle.classList.toggle("active-dark-mode");
    if (toggle.classList.contains("active-dark-mode")) {
        mode.classList.remove("bi-moon-fill");
        mode.classList.add("bi-brightness-high-fill");
        dark.classList.add("dark")
    } else {
        mode.classList.remove("bi-brightness-high-fill");
        mode.classList.add("bi-moon-fill");
        dark.classList.remove("dark")
    }
}
