document.addEventListener("DOMContentLoaded", function () {
    const barsIcon = document.querySelector('#toggleChecker');
    const lateralSide = document.querySelector('.lateral_side');
    let isHidden = false;

    barsIcon.addEventListener('click', function () {
        if (isHidden) {
            // lateralSide.style.display = 'flex';
            lateralSide.style.width = "20%";
            isHidden = false;
        } else {
            lateralSide.style.width = "0";
            // lateralSide.style.display = 'none';
            isHidden = true;
        }
    });
});