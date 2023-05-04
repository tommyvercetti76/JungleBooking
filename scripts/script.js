function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

function initInnerCarousels() {
  const innerCarousels = document.querySelectorAll('.carousel-item .carousel-inner');

  for (const innerCarousel of innerCarousels) {
    let currentItemIndex = 0;
    const carouselItems = innerCarousel.querySelectorAll('.carousel-item');
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
    })
    .catch((error) => console.error('Error fetching experiences:', error));
});

function createCarouselItem(carouselInner, experience, index) {
  const carouselItemId = `carousel-${index + 1}`;

  const carouselRadio = document.createElement('input');
  carouselRadio.type = 'radio';
  carouselRadio.name = 'carousel';
  carouselRadio.id = carouselItemId;
  if (index === 0) {
    carouselRadio.checked = true;
  }
  carouselInner.appendChild(carouselRadio);

  const carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');

  const subCarouselId = `sub-carousel-${index + 1}`;

  const subCarouselRadio = document.createElement('input');
  subCarouselRadio.type = 'radio';
  subCarouselRadio.name = subCarouselId;
  subCarouselRadio.id = `${subCarouselId}-1`;
  subCarouselRadio.checked = true;
  carouselItem.appendChild(subCarouselRadio);

  experience.images.slice(1).forEach((img, idx) => {
    const subCarouselRadio = document.createElement('input');
    subCarouselRadio.type = 'radio';
    subCarouselRadio.name = subCarouselId;
    subCarouselRadio.id = `${subCarouselId}-${idx + 2}`;
    carouselItem.appendChild(subCarouselRadio);
  });

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

    const subCarouselLabel = document.createElement('label');
    subCarouselLabel.classList.add('sub-carousel-control');
    subCarouselLabel.htmlFor = `${subCarouselId}-${idx === 0 ? experience.images.length : idx}`;
    carouselImageContainer.appendChild(subCarouselLabel);
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
