function toggle(drop, isExpanded) {
    const img = drop.querySelector('img');
    if (isExpanded) {
        img.src="../assets/images/icon-minus.svg";
    }else {
        img.src="../assets/images/icon-plus.svg";
    }
}

//Drops and their default expansion values
const drop1 =   document.querySelector(".drop1")  ;     let drop1isExpanded = false   ;
const drop2 =   document.querySelector(".drop2")  ;     let drop2isExpanded = false   ;
const drop3 =   document.querySelector(".drop3")  ;     let drop3isExpanded = false   ;
const drop4 =   document.querySelector(".drop4")  ;     let drop4isExpanded = false   ;
const drop5 =   document.querySelector(".drop5")  ;     let drop5isExpanded = false   ;
const drop6 =   document.querySelector(".drop6")  ;     let drop6isExpanded = false   ;


drop1.addEventListener('click', function(){
drop1isExpanded = !drop1isExpanded;
toggle(drop1, drop1isExpanded);
});

drop2.addEventListener('click', function(){
drop2isExpanded = !drop2isExpanded;
toggle(drop2, drop2isExpanded);
});

drop3.addEventListener('click', function(){
drop3isExpanded = !drop3isExpanded;
toggle(drop3, drop3isExpanded);
});

drop4.addEventListener('click', function(){
drop4isExpanded = !drop4isExpanded;
toggle(drop4, drop4isExpanded);
});

drop5.addEventListener('click', function(){
drop5isExpanded = !drop5isExpanded;
toggle(drop5, drop5isExpanded);
});

drop6.addEventListener('click', function(){
drop6isExpanded = !drop6isExpanded;
toggle(drop6, drop6isExpanded);
});