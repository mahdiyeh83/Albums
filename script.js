document.addEventListener('DOMContentLoaded', function () {
  const albumsList = document.getElementById('albums-list');
  const modal = new bootstrap.Modal(document.getElementById('imageModal'));
  const modalBody = document.querySelector('.modal-body');

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
        modalBody.innerHTML = '';
        photos.forEach(photo => {
          const img = document.createElement('img');
          img.src = photo.thumbnailUrl;
          img.alt = photo.title;
          img.className = 'img-thumbnail m-2';
          img.style.width = '150px'; 
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => showModalImage(photo.url));
          modalBody.appendChild(img);
        });
        modal.show(); 
      });
  }

  function showModalImage(imageUrl) {
    const modalImage = document.createElement('img');
    modalImage.src = imageUrl;
    modalImage.className = 'img-fluid';
    modalBody.innerHTML = ''; 
    modalBody.appendChild(modalImage);
  }
});
