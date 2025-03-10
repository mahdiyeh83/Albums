document.addEventListener('DOMContentLoaded', function () {
  const albumsList = document.getElementById('albums-list');
  const carouselContainer = document.getElementById('carousel-container');
  const carousel = document.getElementById('carousel');
  const modal = new bootstrap.Modal(document.getElementById('imageModal'));
  fetch('https://jsonplaceholder.typicode.com/users/1/albums')
    .then(response => response.json())
    .then(albums => {
      albums.forEach(album => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = album.title;
        button.addEventListener('click', () => loadPhotos(album.id));
        albumsList.appendChild(button);
      });
    });
  
  function loadPhotos(albumId) {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then(response => response.json())
      .then(photos => {
        carouselContainer.classList.add('d-none');
        carousel.classList.remove('d-none');
        carousel.innerHTML = '';
        photos.forEach(photo => {
          const item = document.createElement('div');
          item.className = 'item';
          const img = document.createElement('img');
          img.src = photo.thumbnailUrl;
          img.alt = photo.title;
          img.addEventListener('click', () => showModal(photo.url));
          item.appendChild(img);
          carousel.appendChild(item);
        });
        $(carousel).owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 5 }
          }
        }).on('initialized.owl.carousel', () => console.log('Carousel initialized!'));          
      });
  }
  
  function showModal(imageUrl) {
    const modalImage = document.getElementById('modal-image');
    modalImage.src = imageUrl;
    modal.show();
  }
});
