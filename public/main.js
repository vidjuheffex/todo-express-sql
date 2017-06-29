(function () {
    let input = document.querySelector("input");
    let button = document.querySelector("#submitButton");
    let incompleteTodosTarget = document.querySelector(".incompleteTodosContainer");
    let completeTodosTarget = document.querySelector(".completeTodosContainer");

    input.addEventListener("keyup", e => {
	e.preventDefault();
	if (e.keyCode == 13 && input.value != ""){
	    button.click();
	}
    });
    
    button.addEventListener("click", e => {
	if (input.value != ""){
	    window.fetch("/add", {
		headers: {
		    'Content-Type': 'application/json'
		},		
		method: 'post',
		body: JSON.stringify({value: input.value})
	    }).then(window.location.replace("/"));
	}	
    });

    incompleteTodosTarget.addEventListener("click", e =>{
	console.log(e.target.parentElement.getAttribute("data-id"));
	if (e.target.classList.contains("completeButton")){
	    window.fetch("/update", {
		headers: {
		    'Content-Type': 'application/json'
		},
		method: 'post',
		body: JSON.stringify({id: e.target.parentElement.getAttribute("data-id")})
	    }).then(window.location.replace("/"));
	}
    });

    completeTodosTarget.addEventListener("click", e =>{
	if (e.target.classList.contains("trashButton")){
	    window.fetch("/remove", {
		headers: {
		    'Content-Type': 'application/json'
		},
		method: 'delete',
		body: JSON.stringify({id: e.target.parentElement.getAttribute("data-id")})
	    }).then(window.location.replace("/"));
	}
    });    
}());
