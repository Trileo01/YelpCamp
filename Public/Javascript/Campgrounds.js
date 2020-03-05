$(".card").on('mouseover',(event) => {
    const id = event.target.parentNode.id;
    document.querySelector(`#${CSS.escape(id)} h6`).style.display = "block";
    document.querySelector(`#${CSS.escape(id)} .card-body`).style.justifyContent = "space-between";
});

$(".card").on('mouseout',(event) => {
    const id = event.target.parentNode.id;
    document.querySelector(`#${CSS.escape(id)} h6`).style.display = "none";
    document.querySelector(`#${CSS.escape(id)} .card-body`).style.justifyContent = "center";
});

$(".card").on('click',(event) => {
    window.location.href = `/campgrounds/${event.target.parentNode.id}`;
});