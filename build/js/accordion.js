window.onload = function(){

	var accordion = document.querySelector('.accordion');

	accordion.addEventListener('click', function(event){

		var target = event.target;

		if ( target.classList[0] == 'accordion__item' ){ 

			target.classList.toggle("js-visible");

		}	
		if ( target.parentElement.classList[0] == 'accordion__item' ){

			target.parentElement.classList.toggle("js-visible");
		}	

	})

}



