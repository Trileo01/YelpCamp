$(".btn-xs").on("click", (event) => {
    event.target.style.display = "none";
    event.target.parentNode.parentNode.parentNode.childNodes[3].style.display = "none";
    event.target.parentNode.parentNode.parentNode.lastElementChild.classList.remove("d-none").add("d-block");
});