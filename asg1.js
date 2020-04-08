document.addEventListener('DOMContentLoaded', function () {
   
    //parsing the data from local storage
    const movieData = JSON.parse(window.localStorage.getItem('movieData'));
    const Movies = [];
    const updatedMovies = [];
   
    let movieList = "http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?id=ALL";
   
    
           //fetch the URL of the movie data
    fetch(movieList)
    .then(response => response.json())
    .then(data => {
       //storing the local storage for the file
        //sorting the data
        let sortedMovies = data.sort((a,b) =>{
            return a.title < b.title ? -1 : 1;
        });
       
        localStorage.setItem('movieData' , JSON.stringify(sortedMovies));
        
        for(let m of data)
            {
                Movies.push(m);
                
            }
        displayMovies(sortedMovies);
       
    })
    .catch(e => console.log(e));
   
   
    
 
    function displayMovies(data)
    {
         //displaying the movies
        for(let m of data)
            {
                //getting the movie div element
                let movieDiv = document.querySelector('.moviesDiv');

                let movieDetail = document.createElement('div');
                    movieDetail.setAttribute('id' , m.id);
                    movieDetail.setAttribute('class' , "movieDetail");
               
                let movieImg = document.createElement('img');
               
                    movieImg.setAttribute('src' , `https://image.tmdb.org/t/p/w92/${m.poster}`);
                    movieImg.setAttribute('class' , 'movieImg');
               
                let movieTitle = document.createElement('h3');
                    movieTitle.textContent = m.title;
                    movieTitle.setAttribute('class' , 'movieTitle');
               
                let movieYear = document.createElement('h3');
                    movieYear.textContent = m.release_date;
                    movieYear.setAttribute('class' , 'movieYear');
               
                let movieRating = document.createElement('h3');
                    movieRating.textContent = m.ratings.average;
                    movieRating.setAttribute('class' , 'movieRating');
               
                let movieButton = document.createElement('button');
                    movieButton.setAttribute('class' , "movieButton");
                    movieButton.setAttribute('id' , m.id);
                    movieButton.textContent = "View";
               
               
               
               
                   
               
                    movieDiv.appendChild(movieDetail);
                        movieDetail.appendChild(movieImg);
                        movieDetail.appendChild(movieTitle);
                        movieDetail.appendChild(movieYear);
                        movieDetail.appendChild(movieRating);
                        movieDetail.appendChild(movieButton);
           
            }
       
        console.log(updatedMovies);
   
    }
   
   
    //filter sections
   
    document.querySelector('.searchMovies').addEventListener('click', function(){
       
     
        while(updatedMovies.length > 0 ) {
                updatedMovies.pop();
                
            }
       
       
        var movieTitle = document.querySelector('.searchM').value;
//        console.log(movieTitle);
       //filter titles
       
        for(let m of Movies)
            {
                   clearMovies();
                   if( (m.title.toLowerCase()).includes(movieTitle.toLowerCase())){
                       updatedMovies.push(m);
                   }
            }
       
       //filter beforeyear
        if (document.querySelector('.r1').checked) {
           
             while(updatedMovies.length > 0) {
                updatedMovies.pop();
            }
           
            var beforeYear = document.querySelector('.c1').value;
                for(let m of Movies){
                    clearMovies();
                    var year = m.release_date.substring(0,4);
                    if(year < beforeYear)
                        {
                            updatedMovies.push(m);
                        }
                   
                }
            }
        //filter below rating
        if (document.querySelector('.y1').checked) {
           
             while(updatedMovies.length > 0) {
                updatedMovies.pop();
            }
           
            var belowRating = document.querySelector('.x1').value;
                for(let m of Movies){
                    clearMovies();
                    var rating = m.ratings.average;
                    if(rating < belowRating)
                        {
                            updatedMovies.push(m);
                        }
                   
                }
            }
       //filter after year
            if (document.querySelector('.r2').checked) {
           
                 while(updatedMovies.length > 0) {
                    updatedMovies.pop();
                }

                var afterYear = document.querySelector('.c2').value;
                for(let m of Movies){
                    clearMovies();
                    var year = m.release_date.substring(0,4);
                    if(year > afterYear)
                        {
                            updatedMovies.push(m);
                        }
                   
                }
            }
        //filter above rating
         if (document.querySelector('.y2').checked) {
           
             while(updatedMovies.length > 0) {
                updatedMovies.pop();
            }
           
            var aboveRating = document.querySelector('.x2').value;
                for(let m of Movies){
                    clearMovies();
                    var rating = m.ratings.average;
                    if(rating > aboveRating)
                        {
                            updatedMovies.push(m);
                        }
                   
                }
            }
       
       //filter between year
            if (document.querySelector('.r3').checked) {
           
                 while(updatedMovies.length > 0) {
                    updatedMovies.pop();
                }

                var afterYear = document.querySelector('.btn2').value;
                var beforeYear = document.querySelector('.btn1').value;
               
                console.log(afterYear + " " + beforeYear);
                for(let m of Movies){
                    clearMovies();
                    var year = m.release_date.substring(0,4);
                   
                    if(year <= afterYear && year >= beforeYear )
                        {
                            updatedMovies.push(m);
                        }
                   
                }
            }
        
        //filter between rating
        
             if (document.querySelector('.y3').checked) {
           
                 while(updatedMovies.length > 0) {
                    updatedMovies.pop();
                }

                var aboveRating = document.querySelector('.btn4').value;
                var belowRating = document.querySelector('.btn3').value;
               
                console.log(aboveRating + " " + belowRating);
                for(let m of Movies){
                    clearMovies();
                    var rating = m.ratings.average;
                   
                    if(rating <= aboveRating && rating >= belowRating )
                        {
                            updatedMovies.push(m);
                        }
                   
                }
            }
       
       //filter dont match
        if(updatedMovies.length > 0)
            {
                clearMovies();
                displayMovies(updatedMovies);
            }
        else{
            alert("No Movies");
        }
       
       
    });
   
    //clear movie
   
    document.querySelector('.clearMovies').addEventListener('click', function(){
        clearMovies();
        displayMovies(Movies);
    });
 
   
   
   
   
   
       //clicking the view button
        document.querySelector('.moviesDiv').addEventListener('click' , function(e){
            if(e.target && e.target.nodeName == "BUTTON")
                {
                   
                    displayMovieDetail(e.target.getAttribute('id'));
                    document.querySelector('.homeView').style.display = "none";
                     document.querySelector('.defaultView').style.display = "none";
                    document.querySelector('.movieDetails').style.display = "grid";
                   
                   
                }
           
       
        })
   
        //clicking the search bar
        document.querySelector('.homebtn').addEventListener('click', function(){
            document.querySelector('.homeView').style.display = "none";
            document.querySelector('.defaultView').style.display = "grid";
             document.querySelector('.movieDetails').style.display = "none";
        })
       
        //displaying the movie details
        function displayMovieDetail(id)
        {
           
           
            let movieDetailUrl = "http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies.php?id=" + id;
           
            console.log(movieDetailUrl);
           
             //fetch the specific movie data
            fetch(movieDetailUrl)
                .then(response => response.json())
                .then(data => {
               
                let imdbLink = `https://www.imdb.com/title/${data.imdb_id}`;
                let tmdbLink = `https://www.themoviedb.org/movie/${data.tmdb_id}`;
               
               
                //displaying the movie Info
                     document.querySelector('.movieDetailTitle').textContent = data.title;
               
                    document.querySelector('.rd').textContent = data.release_date;
               
                    document.querySelector('.rev').textContent = data.revenue;
               
                    document.querySelector('.rm').textContent = data.release_date;
               
                    document.querySelector('.tag').textContent = data.tagline;
                   
               
                    document.querySelector('.imdb').textContent = imdbLink;
                    document.querySelector('.tmdb').textContent = tmdbLink;
               
                    document.querySelector('.pop').textContent = data.ratings.popularity;
                    document.querySelector('.rating').textContent = data.ratings.average;
                    document.querySelector('.count').textContent = data.ratings.count;
               
               
                    document.querySelector('.overview').textContent = data.details.overview;
               
                //getting the companies
                let comp = document.querySelector('.comp');
                if(data.production.companies == null){
                    let p = document.createElement('span');
                                p.textContent = "No Companies Data";
                                p.style.padding = "10px";
                                comp.appendChild(p);
                }
                else{
                 for(let c of data.production.companies)
                    {
                       
                      let p = document.createElement('span');
                        p.textContent = "#" + c.name + " ";
                        p.style.padding = "10px";
                       
                         comp.appendChild(p);
                    }
                }
               
                 //getting the countries
                let cont = document.querySelector('.cont');
                if(data.production.countries == null){
                    let p = document.createElement('span');
                                p.textContent = "No Countries Data";
                                p.style.padding = "10px";
                                cont.appendChild(p);
                }
                else{
                 for(let c of data.production.countries)
                    {
                       
                      let p = document.createElement('span');
                        p.textContent = "#" + c.name + " ";
                        p.style.padding = "10px";
                       
                         cont.appendChild(p);
                    }
               
                }
                //getting the genera of the movies
                let genera = document.querySelector('.gen');
                if(data.details.genres == null)
                    {
                          let p = document.createElement('span');
                                p.textContent = "No Genre Data";
                                p.style.padding = "10px";
                                genera.appendChild(p);
                    }
                else{
                     for(let g of data.details.genres)
                    {
                       
                      let p = document.createElement('span');
                        p.textContent = "#" + g.name + " ";
                        p.style.padding = "10px";
                       
                         genera.appendChild(p);
                    }
                }
               
               
                //getting the keywords of the movies
                let keyword = document.querySelector('.key');
                   if(data.details.keywords == null)
                       {
                             let p = document.createElement('span');
                                p.textContent = "No Keyword Data";
                                p.style.padding = "10px";
                                keyword.appendChild(p);
                       }
                    else
                        {
                             for(let k of data.details.keywords)
                                {
                                    let p = document.createElement('span');
                                    p.textContent = "#" + k.name + " ";
                                    p.style.padding = "10px";

                                     keyword.appendChild(p);
                                }
                        }
               
               
               
               
               
               // displaying the poster Image
               
                let figureName = document.querySelector('.posterImage');
                let imageName = document.createElement('img');
               
                imageName.setAttribute('src' , `https://image.tmdb.org/t/p/w342/${data.poster}`);
               
               
                 figureName.appendChild(imageName);
               
                   //displaying the cast view
               
                let castTable = document.querySelector('.castTable');
               
                let castDetail = [];
               
                if(data.production.cast == null){
                    let castTable = document.querySelector('.castTable');
                    let tr = document.createElement('tr');
                    tr.innerHTML = "No Cast Data";
                    castTable.appendChild(tr);
                }
                else{
                    for(let c of data.production.cast)
                    {
                        let castTr = document.createElement('tr');
                        castTr.style.padding = "10px";
                       
                        let castTd = document.createElement('td');
                        castTd.style.padding = "10px";
                       
                        let castTd2 = document.createElement('td');
                        castTd2.style.padding = "10px";
                       
                         
                 

                       
                       
                        castTd.setAttribute('class' , 'castTD');
                        castTd.textContent = c.character;
                       
                       
                        castTd2.setAttribute('class' , 'castTD2');
                        castTd2.textContent = c.name;
                        castTd2.style.paddingLeft = "100px";
                       
                       
                         
                         castTable.appendChild(castTr);
                        castTr.appendChild(castTd);
                        castTr.appendChild(castTd2);
                       
                     
                    }
                }
               
               
                //displaying the crew info
             
                let crewTable = document.querySelector('.crewTable');
               
               
               
               
                for(let c of data.production.crew)
                    {
                        let crewTr = document.createElement('tr');
                            crewTr.style.padding = "10px";
                       
                        let crewTd = document.createElement('td');
                        crewTd.style.padding = "10px";
                       
                        let crewTd2 = document.createElement('td');
                        crewTd2.style.padding = "10px";
                       
                         let crewTd3 = document.createElement('td');
                        crewTd3.style.padding = "10px";
                       
                         
                 

                       
                       
                        crewTd.setAttribute('class' , 'crewTD');
                        crewTd.textContent = c.department;
                       
                       
                        crewTd2.setAttribute('class' , 'crewTD2');
                        crewTd2.textContent = c.job;
                        crewTd2.style.paddingLeft = "50px";
                       
                         crewTd3.setAttribute('class' , 'crewTD3');
                        crewTd3.textContent = c.name;
                        crewTd3.style.paddingLeft = "50px";
                       
                       
                         
                         crewTable.appendChild(crewTr);
                        crewTr.appendChild(crewTd);
                        crewTr.appendChild(crewTd2);
                        crewTr.appendChild(crewTd3);
                       
                     
                    }
               
               
               
               
               
               
                  //clicking the cast button
                let castBtn = document.querySelector('.castbtn');
                castBtn.addEventListener('click' , function(){
                    document.querySelector('.crewbox').style.display = "none";
                    document.querySelector('.castbox').style.display = "grid";
                });
               
               
                //clicking the crew button
                let crewBtn = document.querySelector('.crewbtn');
                crewBtn.addEventListener('click' , function(){
                    document.querySelector('.crewbox').style.display = "grid";
                    document.querySelector('.castbox').style.display = "none";
                });
               
                //clicking the close movie button
                let closeMovie = document.querySelector('.closeMovie');
                    closeMovie.addEventListener('click' , function(){
                        document.querySelector('.movieDetails').style.display = "none";
                        document.querySelector('.defaultView').style.display = "grid";
                        clearPic();
                        clearCastBox();
                        clearCrew();
                        clearMovieInfo();
                        
                });
                
                //clicking the speak button
                let speakbutton = document.querySelector('.speakbtn');
                speakbutton.addEventListener('click', function(){
                    
                    let voice = data.title;
                    const utterance = new SpeechSynthesisUtterance(voice);
                    speechSynthesis.speak(utterance);
                    
                    
                })
                
                
               
               
               
               
               
           
               
               
                 
               
                })
                .catch(e => console.log(e));
           
           
        }
   
   
   
        //Clear function
               
              function clearPic(){
                    const picName = document.querySelector('.posterImage');
                   
                    console.log(picName.getElementsByTagName('*').length);
                    if(picName.getElementsByTagName('*').length > 0){
                        let imageElement = document.querySelectorAll('.posterImage img');
                        for(let img of imageElement)
                            {
                                picName.removeChild(img);
                            }
                    }
                   
                }
   
                function clearMovies(){
                    const movieName = document.querySelector('.moviesDiv');
                    console.log()
                    if(movieName.getElementsByTagName('*').length > 0)
                        {
                            let movie = document.querySelectorAll('.moviesDiv div');
                            for(let m of movie)
                                {
                                    movieName.removeChild(m);
                                }
                        }
                }
   
                function clearCastBox(){
                     const castTable = document.querySelector('.castTable');
                    const castBox = document.querySelector('.castbox');
                    console.log()
                    if(castTable.getElementsByTagName('*').length > 0)
                        {
                            let cast = document.querySelectorAll('.castTable tr');
                            
                            for(let c of cast)
                                {
                                    castTable.removeChild(c);
                                }
                        }
                }
   
                function clearCrew()
                {
                     const crewTable = document.querySelector('.crewTable');
                   
                    if(crewTable.getElementsByTagName('*').length > 0)
                        {
                            let crew = document.querySelectorAll('.crewTable tr');
                            for(let c of crew)
                                {
                                    crewTable.removeChild(c);
                                }
                        }
                }
   
                function clearMovieInfo()
                {
                   clearCompanies();
                    clearCountries();
                    clearKeywords();
                    clearGenres();
                    
                   
                }
    
   
   
                 function clearCompanies()
                {
                   const comp = document.querySelector('.comp');
                    if(comp.getElementsByTagName('*').length > 0)
                        {
                            let company = document.querySelectorAll('.comp span');
                            for(let c of company)
                                {
                                    comp.removeChild(c);
                                }
                        }
                }
   
     function clearCountries()
                {
                   const comp = document.querySelector('.cont');
                    if(comp.getElementsByTagName('*').length > 0)
                        {
                            let company = document.querySelectorAll('.cont span');
                            for(let c of company)
                                {
                                    comp.removeChild(c);
                                }
                        }
                }
     function clearKeywords()
                {
                   const comp = document.querySelector('.key');
                    if(comp.getElementsByTagName('*').length > 0)
                        {
                            let company = document.querySelectorAll('.key span');
                            for(let c of company)
                                {
                                    comp.removeChild(c);
                                }
                        }
                }
   function clearGenres()
                {
                   const comp = document.querySelector('.gen');
                    if(comp.getElementsByTagName('*').length > 0)
                        {
                            let company = document.querySelectorAll('.gen span');
                            for(let c of company)
                                {
                                    comp.removeChild(c);
                                }
                        }
                }
   
   
    
   
   
   
   
});