# jQuery vs Vanilla JavaScript

| Operation | jQuery | Vanilla JavaScript |
|---|---|---|
| Select an element | `$("#title")` | `document.querySelector("#title")` |
| Select multiple elements | `$(".item")` | `document.querySelectorAll(".item")` |
| Change text | `$("#title").text("Hello")` | `document.querySelector("#title").textContent = "Hello"` |
| Change HTML | `$("#box").html("<b>Hello</b>")` | `document.querySelector("#box").innerHTML = "<b>Hello</b>"` |
| Change CSS | `$("#box").css("color", "red")` | `document.querySelector("#box").style.color = "red"` |
| Add a class | `$("#box").addClass("active")` | `document.querySelector("#box").classList.add("active")` |
| Remove a class | `$("#box").removeClass("active")` | `document.querySelector("#box").classList.remove("active")` |
| Toggle a class | `$("#box").toggleClass("active")` | `document.querySelector("#box").classList.toggle("active")` |
| Check a class | `$("#box").hasClass("active")` | `document.querySelector("#box").classList.contains("active")` |
| Click event | `$("#btn").on("click", fn)` | `document.querySelector("#btn").addEventListener("click", fn)` |
| Remove event | `$("#btn").off("click", fn)` | `document.querySelector("#btn").removeEventListener("click", fn)` |
| Get input value | `$("#name").val()` | `document.querySelector("#name").value` |
| Set input value | `$("#name").val("Sam")` | `document.querySelector("#name").value = "Sam"` |
| Hide element | `$("#box").hide()` | `document.querySelector("#box").style.display = "none"` |
| Show element | `$("#box").show()` | `document.querySelector("#box").style.display = "block"` |
| Get parent | `$("#item").parent()` | `document.querySelector("#item").parentElement` |
| Get children | `$("#box").children()` | `document.querySelector("#box").children` |
| Get next element | `$("#item").next()` | `document.querySelector("#item").nextElementSibling` |
| Get previous element | `$("#item").prev()` | `document.querySelector("#item").previousElementSibling` |
| Remove element | `$("#box").remove()` | `document.querySelector("#box").remove()` |
| Append HTML | `$("#list").append("<li>New</li>")` | `document.querySelector("#list").insertAdjacentHTML("beforeend", "<li>New</li>")` |
| Fade out | `$("#box").fadeOut()` | Use CSS transitions or the Web Animations API |
| Animate element | `$("#box").animate({opacity: 0.5})` | `element.animate([{opacity: 1}, {opacity: 0.5}], {duration: 400})` |
| AJAX GET | `$.get("/api/data", fn)` | `fetch("/api/data").then(r => r.json()).then(fn)` |
| AJAX POST | `$.post("/api/data", data, fn)` | `fetch("/api/data", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)}).then(r => r.json()).then(fn)` |

