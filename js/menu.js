const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})


document.querySelector('.open-menu').addEventListener('click', () => {
    document.querySelector('aside').classList.add('aside-visible');
});

document.querySelector('.close-menu').addEventListener('click', () => {
    document.querySelector('aside').classList.remove('aside-visible');
});
