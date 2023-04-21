document.querySelectorAll(".checkbox").forEach(elem => {elem.addEventListener("click", elem => {
    if (!elem.target.classList.contains("checkbox")) {
        elem = elem.target.parentNode;
    } else (elem = elem.target);

    console.log(elem);

    if (elem.classList.contains("active")) {
        console.log("remove");
        elem.classList.remove("active");
    } else {
        console.log("add");
        elem.classList.add("active");
    }
})});

document.querySelectorAll(".input > input.winput").forEach(elem => {elem.addEventListener("change", elem => {elem = elem.target;
    if (elem.value !== "") {
        elem.parentNode.classList.add("active");
    } else {
        elem.parentNode.classList.remove("active");
    }
})
if (elem.value !== "") {
    elem.parentNode.classList.add("active");
} else {
    elem.parentNode.classList.remove("active");
}
});

function wpopup(action, id) {
    document.querySelector("popups").style.display = "none";
    document.querySelectorAll("popups > popup").forEach(elem => {elem.style.display = "none"});
    if (action === 0) {
        document.querySelector("popups > popup#"+id).style.display = "";
        document.querySelector("popups").style.display = "";
    }
}

document.querySelectorAll("button#hidePopup").forEach(elem => {elem.addEventListener("click", () => {wpopup()})});

document.querySelectorAll(".wdialogbutton").forEach(elem => {elem.addEventListener("click", elem => {
    if (elem.target.classList.contains(".wdialogbutton")) {
        elem = elem.target;
    } else {elem = elem.target.parentNode};

    elem.classList.add("active");
    elem.setAttribute("nounset", "");
    setTimeout(() => {elem.removeAttribute("nounset");}, 10)
})});

document.documentElement.addEventListener("click", elem => {
    noclick = true; elem = elem.target;
    while (elem.tagName !== "BODY") {
        if (elem.classList.contains("wdialogbutton")) {
            noclick = false;
        }

        elem = elem.parentNode;
    }

    if (noclick) {
        document.querySelectorAll(".wdialogbutton.active:not([nounset])").forEach(elem => {
            elem.classList.remove("active");
        });
    }
});