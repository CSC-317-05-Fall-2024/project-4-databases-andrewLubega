/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <h1> LONDON </h1>
    `;

    const nav = document.querySelector('nav');
    nav.innerHTML = `
        <a href="/"> Home </a> 
        <a href="/attractions"> Attractions</a> 
        <a href="/restaurants"> Restuarants</a>
        <a href="/form"> New Restuarants</a>

    `;

    const footer = document.querySelector('footer');
    footer.innerHTML = `
         <p> Contact info: Mukisa@sfsu.edu </p>
    `;

    // const resNav = document.getElementById('restaruant-nav');
    // nav.innerHTML = `
    //     <a href="/public/index.html"> Home </a> 
    //     <a href="/attractions"> Attractions</a> 
    //     <a href="/restaurants"> Restuarants</a>
    // `;

});
