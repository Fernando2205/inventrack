document.addEventListener("DOMContentLoaded", function() {
    const barsIcon = document.querySelector('#toggleChecker');
    const lateralSide = document.querySelector('.lateral_side');
    let isHidden = false;

    barsIcon.addEventListener('click', function() {
        if (isHidden) {
            lateralSide.style.display = 'block';
            isHidden = false;
        } else {
            lateralSide.style.display = 'none';
            isHidden = true;
        }
    });
});
const dropdownToggle = document.querySelector('.fa-caret-down');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});
