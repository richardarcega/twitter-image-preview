// ==UserScript==
// @name         Twitter Image Preview
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Shows full image previews on hover allowing users to more easily view images embedded in tweets.
// @author       Richard Arcega
// @match        https://twitter.com/*
// @match        https://x.com/*
// @downloadURL  https://raw.githubusercontent.com/richardarcega/twitter-image-preview/master/twitter-image-preview.js
// ==/UserScript==
const mainSelector = 'main';
const primaryColumnSelector = '[data-testid="primaryColumn"]';
const sidebarColumnSelector = '[data-testid="sidebarColumn"]';
const imagesSelector = 'img[alt="Image"], a[href$="/header_photo"] img[alt]';

const imagePreviewContainer = document.createElement("div");
imagePreviewContainer.id = 'twitter-image-preview';
imagePreviewContainer.setAttribute('style', 'display: none; position: fixed; z-index: 9999; pointer-events: none;');
document.body.insertBefore(imagePreviewContainer, document.body.firstChild);

const imagePreview = document.createElement('img');
imagePreview.setAttribute('style', 'width: 100%; height: 100%; object-fit: contain;');
imagePreviewContainer.appendChild(imagePreview);

const mutationCallback = (mutationList) => {
  for (const mutation of mutationList) {
    for (const node of mutation.addedNodes) {
      if (node.matches(imagesSelector)) {
        // when new images are added to the DOM, add mouseenter and mouseleave handlers
        addImageHandlers(node);
      }
    }
  }
};

const observer = new MutationObserver(mutationCallback);
observer.observe(document.body, { subtree: true, childList: true });

const addImageHandlers = (image) => {
  image.addEventListener('mouseenter', mouseEnterHandler(image))
  image.addEventListener('mouseleave', mouseLeaveHandler)
}

const preloadImage = (imageUrl) => {
  const img = new Image();
  img.src = imageUrl;
}

const setImagePreviewDimensions = () => {
  const mainRect = document.querySelector(mainSelector).getBoundingClientRect();
  const primaryColumnRect = document.querySelector(primaryColumnSelector).getBoundingClientRect();

  imagePreviewContainer.style.width = `${mainRect.width - primaryColumnRect.width}px`;
  imagePreviewContainer.style.height = `${document.body.clientHeight}px`;
  imagePreviewContainer.style.left = `${primaryColumnRect.x + primaryColumnRect.width}px`;
}

const mouseEnterHandler = (image) => {
  preloadImage(image.src);

  return () => {
    // when the sidebarColumn is not shown, do not show the image preview
    if (document.querySelector(sidebarColumnSelector) === null) {
      return;
    }

    // calculate the width, height, and position of the image preview
    setImagePreviewDimensions();

    // display the image preview
    imagePreview.src = image.src;
    imagePreviewContainer.style.display = 'block';
  }
}

const mouseLeaveHandler = () => { imagePreviewContainer.style.display = 'none'; }
