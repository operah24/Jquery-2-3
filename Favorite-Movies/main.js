$(document).ready(function(){
     

    // Movie Class: Represents a movie
    class Movie{
        constructor(title,rating){
            this.title = title;
            this.rating = rating;
            
        }
        
    }
    // UI Class: Handle UI Tasks
    class UI {
        static displayMovies(){
            
            const $movies = Store.getMovie();

            $movies.forEach((movie) => UI.addMovieToList(movie)); 
        }

        static addMovieToList(movie){
            const $list = $("#movie-list");

            const $row = $("<tr>");

            $row.html(`<td>${movie.title}</td>
            <td>${movie.rating}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete" id="delete-btn">Delete</a></td>`);

            $list.append($row);
            
        }

        static deleteMovie(el){
            if(el.classList.contains("delete")){
                $(el).parent().parent().remove();
            }
        }

        static showAlert(message, className){
            const $div = $("<div>");
            $div.addClass(`alert alert-${className}`);
            $div.append(document.createTextNode(message));
            const $container = $(".container");
            const $form = $("#form");
            $("h2").after($div);
            // Vanish in 3seconds
            setTimeout(() => $(".alert").remove(),
            3000);
        }

        static clearFields(){
            const $title = $("#title-input").val('');
            const $rating = $("#rating-input").val('');
        }
    }

        // Store Class: Handles Storage
    class Store {
        static getMovie(){
            let movies;
            if(localStorage.getItem("movies") === null){
                movies =[];
            } else{
                movies = JSON.parse(localStorage.getItem("movies")) ;
            }
            return movies;
        }

        static addMovie(movie){
            const movies = Store.getMovie();

            movies.push(movie);

            localStorage.setItem("movies",JSON.stringify(movies));
        }
 
        static removeMovie(rating){
            const movies = Store.getMovie();

            movies.forEach((movie, index)=>{
                if(movie.rating === rating){
                    movies.splice(index, 1)
                }
            });

            localStorage.setItem("movies",JSON.stringify(movies));
        }
    }
        // Event: Display Movies
    $(document).ready(function() {
        (UI.displayMovies());
    });
    


        // Event: Add a Movie
    $("#add-btn").on("click", function(){
        const $title = $("#title-input").val();
        const $rating = $("#rating-input").val();

        // Validate
        if($title === '' || $rating === ''){
            UI.showAlert('Please fill in all fields', 'danger');
        } else{
            // Instatiate movie
        const $movie =new Movie($title, $rating);
        
        // Add Movie to UI
        UI.addMovieToList($movie);

        // Add movie to store
        Store.addMovie($movie);

        // Show success message
        UI.showAlert("Favorite Movie Added", 'success');

        // Clear fields

        UI.clearFields();
        }
     });

    // Event:Remove a Movie
    const $list = $("#movie-list").on("click", (e)=>{
        UI.deleteMovie(e.target);

        // Remove movie from store
        Store.removeMovie($(e.target).parent().prev().text())
        
        // Show success message
        UI.showAlert("Favorite Movie Removed", 'success');
    })
})