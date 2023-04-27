const btn = document.querySelector('#submit');

btn.addEventListener("click", function(e){
    e.preventDefault();

    const name = document.querySelector("nome");
    const value = nome.value;
    
    console.log(value);
})