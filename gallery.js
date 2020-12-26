import galleryItem from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const lightBoxImgRef = document.querySelector(".lightbox__image");
const modalWindowRef = document.querySelector(".js-lightbox");
const closeModalBtnRef = document.querySelector(".lightbox__button");

const openModalhandler = function () {
  modalWindowRef.classList.add("is-open");
};
const closeModalHandler = function () {
  modalWindowRef.classList.remove("is-open");
};
const srcModalCleaner = function () {
  lightBoxImgRef.src = "";
};
const galleryItemHandler = function ({ preview, original, description }) {
  const gallery_item = document.createElement("li");
  gallery_item.classList.add("gallery__item");
  const gallery_link = document.createElement("a");
  gallery_link.classList.add("gallery__link");
  const gallery_img = document.createElement("img");
  gallery_img.classList.add("gallery__image");
  gallery_img.dataset.source = original;
  gallery_img.src = preview;
  gallery_img.alt = description;
  gallery_link.href = gallery_img.dataset.source;
  gallery_link.appendChild(gallery_img);
  gallery_item.appendChild(gallery_link);
  return gallery_item;
};

const arrayAddingPicture = galleryItem.map((item) => {
  return galleryItemHandler(item);
});
galleryRef.append(...arrayAddingPicture);

closeModalBtnRef.addEventListener("click", () => {
  closeModalHandler();
  srcModalCleaner();
});

galleryRef.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    lightBoxImgRef.src = event.target.dataset.source;
    lightBoxImgRef.alt = event.target.alt;
    openModalhandler();
  }
});

modalWindowRef.addEventListener("click", (event) => {
  if (event.target.nodeName !== "IMG") {
    closeModalHandler();
    srcModalCleaner();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeModalHandler();
    srcModalCleaner();
  }
});
