const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading");

const postsContainer = document.querySelector("#posts-container");

// Get all posts

async function getAllPosts (){

    const response = await fetch(url); // Executando metodo fetch 

    console.log(response); // Aguardando os resultados

    const data = await response.json(); // Recebendo os dados que veio do response em arquivo json

    console.log(data);

    loadingElement.classList.add('hide');

    data.map((post)=> { //Irá mapear todos os elementos
        const div = document.createElement('div')
        const title = document.createElement('h2')
        const body = document.createElement('p')
        const link = document.createElement('a') 

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler"
        link.setAttribute('href',`/post.html?id=${post.id}`); // Determinando um atributo para depois extrair os dados individuais do post


        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div)
    });
         
}

getAllPosts();