# Assignment #2 breakdown

TODO:

1) ##### Header with logo and Nav [Casey completed]
		 displayed across all pages [Done}
		 "Hamburger" menu for mobile size [Done]
		-Add in logo [done]
		-Add in session dependant functinality for favorites and signup / log off tabs [done]
		
	
	
	
2) #####  Home Page 
		Not Logged in view:[done]
			Similar layout as the first assignment, buttons are changed to "login" and "join"  
			same textbox for searching a movie, search leads search page with "filter" applied for movie
		Logged in view: [I work on this today -4/8/2020 - Casey]
			User info
			Favorites
			Movie recommendations (come up with algorithm to do this as per described in doc)
			
			
			
3) ##### Search / Browse [Tyler - Finished]
		Mostly the same as assignment #1 - load API and save to local storage in similar way
		If individual movie is clicked, pull up details page via php query string (id) of movie
		
		
		
4) ##### Details page [Fahim & Tyler - Finished]
		Similar to ASG01 (no speak or close buttons)
		Data is not taken from the API, instead it is take from the Database
			make this efficient by passing in PDO connection as per lecture [Done]
		Cast / crew sections should be within tabs <- less artistic license than the assignment it sounds like 
			use JS to do this (cast tab shows on default) [Done]
		Add favorites button to details page <- only show if not favorties already and use ris logged in) 
			adding favorites done one of two ways described in Doc [Done]
			
			
5) ##### Favorites [Allen]
		Show favorite movies, give option to remove single or all movies from favorite list.
		Each movie is displayed as small movie poster and title that function as links to details pages
		
		
6) ##### About page [Allen - it's easy so I will work on it]
		Exactly what randy says in the doc .... pretty short and simple
		
		
7) ##### Login / logout [Fahim - completed]
		Take in user info, use PHP session state, after login in redirect to home screen (logged in version)
		Log out - change session state - redirect to home page
				
		
		
9) ##### Registration page [Casey- completed]
		Client side JS validation for points in Doc [Done]
		Server validation (email does not already exist)[Done]
		Add user to DB if email available, with hashed password [Done] - no longern need to salt and hash
		figure out 3rd password (256) in DB. [done] - no longer needed
		Refactor and pass PDO through (elimenate redundant) [done]
		redirect back to form if email is being used with error message [done]
		if email is available, log in and redirect to home page [done]
		
		
		
		
		
		
