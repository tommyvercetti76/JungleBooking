function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

function initInnerCarousels() {
  const innerCarousels = document.querySelectorAll('.carousel-image-container');

  for (const innerCarousel of innerCarousels) {
    let currentItemIndex = 0;
    const carouselItems = innerCarousel.querySelectorAll('.carousel-image');
    const totalItems = carouselItems.length;

    setInterval(() => {
      currentItemIndex = (currentItemIndex + 1) % totalItems;
      for (let i = 0; i < totalItems; i++) {
        const translateX = i < currentItemIndex ? '-100%' : i === currentItemIndex ? '0' : '100%';
        carouselItems[i].style.transform = `translateX(${translateX})`;
      }
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', initInnerCarousels);


// Get The JSON for parsing

document.addEventListener('DOMContentLoaded', () => {
  fetch('/json/experiences.json')
    .then((response) => response.json())
    .then((experiences) => {
      const carouselInner = document.querySelector('.carousel-inner');
      experiences.forEach((experience, index) => {
        createCarouselItem(carouselInner, experience, index);
      });
      initInnerCarousels(); // Reinitialize inner carousels after creating carousel items
    })
    .catch((error) => console.error('Error fetching experiences:', error));
});

function createCarouselItem(carouselInner, experience, index) {
  const carouselItemId = `carousel-${index + 1}`;
  const carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');
  const subCarouselId = `sub-carousel-${index + 1}`;

  const carouselImageContainer = document.createElement('div');
  carouselImageContainer.classList.add('carousel-image-container');
  carouselItem.appendChild(carouselImageContainer);

  experience.images.forEach((img, idx) => {
    const carouselImage = document.createElement('img');
    carouselImage.classList.add('carousel-image');
    carouselImage.src = img;
    carouselImage.alt = experience.title;
    carouselImageContainer.appendChild(carouselImage);
    carouselImage.style.order = idx + 1;
  });

  const carouselCaption = document.createElement('div');
  carouselCaption.classList.add('carousel-caption');
  carouselItem.appendChild(carouselCaption);

  const title = document.createElement('h5');
  title.textContent = experience.title;
  carouselCaption.appendChild(title);

  const description = document.createElement('p');
  description.textContent = experience.description;
  carouselCaption.appendChild(description);

  const button = document.createElement('a');
  button.classList.add('carousel-btn');
  button.href = experience.linkedPage;
  button.textContent = experience.buttonTitle;
  carouselCaption.appendChild(button);

  carouselInner.appendChild(carouselItem);
}
