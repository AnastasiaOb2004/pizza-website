
//Лаб2 
const navbar = document.getElementById("navbar");
const logoContainer = document.getElementById("navbar-logo-container");
const logo = document.getElementById("logo");
const navbarEls = document.querySelectorAll(".navbar-components");


function addNavStyles() {
    if (window.innerWidth > 992) {
        window.addEventListener("scroll", () => {

            navbar.style.transition = `background-color 0.3s ease-in-out, height 0.5s ease-in-out`;
            logoContainer.style.transition = `top 1s ease-in-out`;

            if (window.scrollY > 1) {
                navbar.style.backgroundColor = `rgb(26, 29, 31)`;
                navbar.style.height = `60px`;
                navbar.style.border = 'none';
                navbar.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1)`;
                logoContainer.style.top = `-200px`;

                navbarEls.forEach((text) => {
                    text.style.color = `#ffffff`;
                    text.style.top = `-7px`;
                })
            } else {
                navbar.style.boxShadow = `none`;
                navbar.style.backgroundColor = `#ffffff`;
                navbar.style.height = `70px`;
                logoContainer.style.top = `0px`;
                navbar.style.borderTop = `5px rgb(181, 13, 13) solid`;
                navbarEls.forEach((text) => {
                    text.style.color = `#5b3c1e`;
                    text.style.top = `0px`;
                })

            }
        })
    }
};

addNavStyles();

//Лаб3

const burgerMenu = document.querySelector("#burger-menu");
const hiddenMenu = document.querySelector("#hidden-menu");
if (window.innerWidth <= 992) {
    burgerMenu.style.display = "flex";
    if (navbarEls) {
        navbarEls.forEach((text) => {
            text.style.display = 'none';
        })
    }

    if (logoContainer) {
        logoContainer.style.display = 'none';
    }

    let isClicked = false;
    burgerMenu.addEventListener('click', () => {
        hiddenMenu.style.transition = `0.5s ease-in-out`;
        if (!isClicked) {
            hiddenMenu.style.right = 0;
            isClicked = true;
        } else {
            hiddenMenu.style.right = `-300px`;
            isClicked = false;
        }
    });
}

const arrowTop = document.querySelector('#footer-arrow-top-btn');
arrowTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Лаб4
const images = [
    'images/pizza1.jpg',
    'images/pizza2.jpg',
    'images/pizza3.jpg',
    'images/pizza4.jpg',
    'images/pizza1.jpg',
];

const promiseArr = [];
const loaders = document.querySelectorAll('.loaders');

images.forEach((url, index) => {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = url;

        img.addEventListener('load', () => {
            resolve(img); 
        });

        img.addEventListener('error', () => {
            reject();
        });
    });

    promise.then((img) => {
        if (index === images.length - 1) {
            img.classList.add('largeImage');
            document.querySelector('#largeImage').append(img);
        } else {
            img.classList.add('pizza-imgs');
            document.querySelector('#mini-images').append(img);
        }
    });

    promise.catch((error) => {
        console.error(error.message);
    });

    promiseArr.push(promise);
});

setTimeout(() => {
Promise.all(promiseArr)
    .then(() => {
        document.querySelectorAll('.pizza-imgs').forEach((img) => {
            img.style.display = 'flex';
        });
        document.querySelector('#largeImage').style.display = 'flex';
        loaders.forEach((loader) => {
            loader.style.display = 'none';
        });
    })
    .catch(() => {
        alert('Unable to load images');
    });

}, 4000);


//Лаб5
let slideIndex = 1;

showSlides(slideIndex);


function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("place-images");
    
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";    
}

//Лаб6

document.querySelectorAll('.animated-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        anime({
            targets: button,
            scale: [1, 1.05],
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.4)',
            rotate: '5deg',
            easing: 'easeInOutQuad',
            backgroundColor: 'rgb(107, 8, 8)',
            duration: 500,
        });
    });

    button.addEventListener('mouseleave', () => {
        anime({
            targets: button,
            scale: 1,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            rotate: '0deg',
            easing: 'easeInOutQuad',
            backgroundColor: 'rgb(255, 87, 51)',
            duration: 500,
        });
    });
});



//Лаб7

function modifyThumbNail(event, parentImgDiv) {
    const thumbnail = event.target.closest('img');
    if (!thumbnail) return;

    const newLargeImage = document.createElement('img');
    newLargeImage.src = thumbnail.src; 
    newLargeImage.classList.add('largeImage');
    parentImgDiv.innerHTML = ''; 
    parentImgDiv.append(newLargeImage);
}

const gallery = document.querySelector('#mini-images');
const largeImageDiv = document.querySelector('#largeImage');

gallery.addEventListener('click', (event) => {
    modifyThumbNail(event, largeImageDiv);
});

//Лаб8

document.getElementById('calculator-btn').addEventListener('click', function () {
    const pizzaType = document.getElementById('calculator-input-type').value;
    const numPizzas = parseInt(document.getElementById('calculator-input-num').value);
    const deliveryOption = document.getElementById('delivery-option').value;

    if (isNaN(numPizzas) || numPizzas < 1) {
        alert("Please enter a valid number of pizzas!");
        return;
    }

    const pizzaPrices = {
        margarita: 100, 
        peperoni: 120,  
        salamiMushrooms: 130, 
        royal: 150  
    };

    const basePrice = pizzaPrices[pizzaType];

    let discount = 0;
    if (numPizzas === 2) {
        discount = 5;
    } else if (numPizzas === 3) {
        discount = 10;
    } else if (numPizzas >= 5) {
        discount = 15;
    }

    let totalPrice = basePrice * numPizzas;
    const discountAmount = (totalPrice * discount) / 100;
    totalPrice -= discountAmount;

    if (deliveryOption === 'delivery') {
        totalPrice += 30;
    }

    document.getElementById('calculator-result-discount').textContent = `${discount}%`;
    document.getElementById('calculator-result-price').textContent = `${totalPrice.toFixed(2)} UAH`;
});

//Лаб9

document.getElementById("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("form-input-1").value;
    const surname = document.getElementById("form-input-2").value;
    const email = document.getElementById("form-input-3").value;
    const phone = document.getElementById("form-input-4").value;
    const comment = document.getElementById("form-input-5").value;
    const cv = document.getElementById("form-input-6").value;
    const errorMessages = document.getElementById("error-messages");
  
    errorMessages.innerHTML = "";

    let isCorrect = true;
  
    const nameSurnameRegex = /^[a-zA-Zа-яА-Я'-]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+380|0)\d{9}$/;
  
    let errors = [];
  
    if (!name) {
        errors.push("The 'Name' field is required.");
        isCorrect = false;
      } else if (!nameSurnameRegex.test(name)) {
        errors.push("The 'Name' field must contain only letters, apostrophes, or hyphens, with at least 3 characters.");
        isCorrect = false;
      }
      
      if (!surname) {
        errors.push("The 'Surname' field is required.");
        isCorrect = false;
      } else if (!nameSurnameRegex.test(surname)) {
        errors.push("The 'Surname' field must contain only letters, apostrophes, or hyphens, with at least 3 characters.");
        isCorrect = false;
      }
      
      if (!email) {
        errors.push("The 'Email' field is required.");
        isCorrect = false;
      } else if (!emailRegex.test(email)) {
        errors.push("The 'Email' field must be in the format example@mail.com.");
        isCorrect = false;
      }
      
      if (!phone) {
        errors.push("The 'Phone' field is required.");
        isCorrect = false;
      } else if (!phoneRegex.test(phone)) {
        errors.push("The 'Phone' field must be in the format +380XXXXXXXXX or 0XXXXXXXXX.");
        isCorrect = false;
      }
      
  
    if (errors.length > 0) {
      event.preventDefault();
      errorMessages.innerHTML = errors.map((err) => `<p>${err}</p>`).join("");

      const formContentHeight = document.querySelector('#form-content').offsetHeight;
      document.querySelector('#form-picture').style.height = `${formContentHeight}px`;
    }

    if(isCorrect) {
        alert('The form was succesfully sent!');
    
        document.querySelectorAll('.form-inputs').forEach((form) => {
            form.value = '';
        })
    }
  });
  