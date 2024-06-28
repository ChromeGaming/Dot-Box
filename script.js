const img = document.querySelector(".images");
const drop = document.querySelector(".drop");

const img2 = document.querySelector(".images2");
const drop2 = document.querySelector(".drop2");

const img3 = document.querySelector(".images3");
const drop3 = document.querySelector(".drop3");

const img4 = document.querySelector(".images4");
const drop4 = document.querySelector(".drop4");

let toggle = true;


drop.addEventListener('click', function(){
    toggle= !toggle;
    if(toggle)
    {
        img.src="assets/images/icon-plus.svg";
    }
    else
    {
        img.src="assets/images/icon-minus.svg"
    }
})

drop2.addEventListener('click', function(){
    toggle= !toggle;
    if(toggle)
    {
        img2.src="assets/images/icon-plus.svg";
    }
    else
    {
        img2.src="assets/images/icon-minus.svg"
    }
})

drop3.addEventListener('click', function(){
    toggle= !toggle;
    if(toggle)
    {
        img3.src="assets/images/icon-plus.svg";
    }
    else
    {
        img3.src="assets/images/icon-minus.svg"
    }
})

drop4.addEventListener('click', function(){
    toggle= !toggle;
    if(toggle)
    {
        img4.src="assets/images/icon-plus.svg";
    }
    else
    {
        img4.src="assets/images/icon-minus.svg"
    }
})