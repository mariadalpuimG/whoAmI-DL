// // open and close rules buttons

console.log(document.getElementById('playBox'))

const btnOpenClose = document.getElementById('playBox');

openBox = () => {
    btnOpenClose.style.display = "block";
};

closeBox = () => {
    btnOpenClose.style.display = "none";
};

document.getElementById('btnPlay').addEventListener('click', openBox)
document.getElementById('btnClose').addEventListener('click', closeBox)