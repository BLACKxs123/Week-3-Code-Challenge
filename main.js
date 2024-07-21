document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-menu');
    const selectedMovie = document.getElementById('selected-movie');
    const buyTicketBtn = document.getElementById('buy-ticket');
    const confirmation = document.getElementById('confirmation');
    const showtimeList = document.getElementById('showtime-list');
    const runtimeElem = document.getElementById('runtime');
    const availableTicketsElem = document.getElementById('available-tickets');
  
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => {  
        // Display all movies in the movie menu
        displayMovies(movies); 
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  
    function displayMovies(movies) {
      movies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.classList.add('movie-item');
        movieItem.textContent = movie.title;
        movieItem.addEventListener('click', () => {
          displayMovieDetails(movie);
        });
        movieList.appendChild(movieItem);
      });
    }
  
    function displayMovieDetails(movie) {
      // Selecting elements directly and ensuring they exist
      const movieTitle = selectedMovie.querySelector('h2');
      const moviePoster = selectedMovie.querySelector('.movie-poster');
      const movieDescription = selectedMovie.querySelector('p');
  
      if (movieTitle && moviePoster && movieDescription) {
        movieTitle.textContent = movie.title;
        moviePoster.src = movie.poster;
        movieDescription.textContent = movie.description;
        runtimeElem.textContent = movie.runtime;
  
        // Calculate available tickets
        const availableTickets = movie.capacity - movie.tickets_sold; 
        availableTicketsElem.textContent = availableTickets;
  
        // Clear and display showtimes
        showtimeList.innerHTML = '';
        movie.showtimes.forEach(showtime => {
          const showtimeItem = document.createElement('li');
          showtimeItem.textContent = showtime;
          showtimeList.appendChild(showtimeItem);
        });
  
        selectedMovie.style.display = 'block';
      } else {
        console.error("Could not find all necessary elements in 'selected-movie' section.");
      }
    }
  
    // Handle "Buy Ticket" button click
    buyTicketBtn.addEventListener('click', () => {
      confirmation.style.display = 'block';
      selectedMovie.style.display = 'none';
    });
  });