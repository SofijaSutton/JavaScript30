let allPanel = document.querySelectorAll(".panel");

function onClick(e) {
	//added line for improved CSS readability
	allPanel.forEach((panel) => panel.classList.remove("open"));
	this.classList.toggle("open");
}

function transition(e) {
	if (e.propertyName.includes("flex")) {
		this.classList.toggle("open-active");
	}
}

allPanel.forEach((panel) => panel.addEventListener("click", onClick));

allPanel.forEach((panel) =>
	panel.addEventListener("transitionend", transition)
);
function onClick(e){
    allPanel.forEach(panel => panel.classList.remove("open"))
   e.target.classList.add("open")
}

allPanel.forEach((panel) => panel.addEventListener("transitionend", transition));
