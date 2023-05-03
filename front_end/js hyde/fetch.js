const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading");

const postsContainer = document.querySelector("#posts-container");

const postPage = document.querySelector('#post');
const postContainer = document.querySelector('#post-container');
const commentsContainer = document.querySelector('#comments-container');

const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// Get id from URL = vamos pegar o parametros

const urlSearchParams = new URLSearchParams(window.location.search); // Entrega o objeto que permite acessar os parametros que estão na URL com o metodo de get
const postId = urlSearchParams.get('id');

// Get all posts

async function getAllPosts (){

    const response = await fetch(url); // Faz uma chamada para buscar os dados de uma URL, a função fetch retorna uma promessa resolvida enquanto o await é usado para aguardar a conclusão dessa promessa antes dar inicio a proxima liha. 

    console.log(response); // Imprimindo / Aguardando os resultados

    const data = await response.json(); // Recebendo os dados que veio do response em arquivo json

    console.log(data);

    loadingElement.classList.add("hide");// Classe utilzada para ocultar o elemento.

    data.map((post) => { //Irá mapear todos os elementos
        const div = document.createElement('div')// criando elemento div
        const title = document.createElement('h2')// criando elemento h2
        const body = document.createElement('p')// criando elemento p
        const link = document.createElement('a') // criando elemento a

        title.innerText = post.title;// Definindo o texto interno dos elementos h2 e p esses valores são extraiodo  deca cada objeto post no array data
        body.innerText = post.body;
        link.innerText = "Ler" // Definindo o texto que ira aparecer no link
        link.setAttribute('href',`/post.html?id=${post.id}`); //Determinando o caminho do link criado acima.

        // Anexando os elementos 
        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)
        
        postsContainer.appendChild(div); // Linha responsável por adicionar cada postagem ao elemento postsContainer permitindo que elas sejma exibidas na interface do usuário.
    });

}
    // Get individual post
    async function getPost(id) {
        const [responsePost, responseComments] = await Promise.all([
            fetch (`${url}/${id}`), 
            fetch (`${url}/${id}/comments`)
            //Salvando os arquivos da url no id
        ])

        const dataPost = await responsePost.json() //Fazendo a extração de dados individual constante responsePost

        const dataComments = await responseComments.json() // Fazendo a extração de dados individual da constante responseComments

        loadingElement.classList.add('hide')
        postPage.classList.remove('hide')

        const title = document.createElement("h1");
        const body = document.createElement("p");

        title.innerText = dataPost.title;
        body.innerText = dataPost.body;

        postContainer.appendChild(title);
        postContainer.appendChild(body);

        dataComments.map((comment) => {
            createComment(comment);
        });
        
    }
        
        function createComment(comment){
     //Montando um div com os dados do comentario
        const div = document.createElement("div")
        const email = document.createElement("h3")
        const commentBody = document.createElement("p")

        email.innerText = comment.email
        commentBody.innerText = comment.body

        div.appendChild(email);
        div.appendChild(commentBody);

        commentsContainer.appendChild(div); // Inseri a div no container de comentarios
    }

    //Post comment

    async function postComment(comment){

        const response = await fetch(`${url}/${postId}/comments`,{
            method: "POST", // Metodo utilizado
            body: comment, // Dados da requisição
            headers: {
                "Content-type":"application/json",//Padroniza tipo de dado que será trafegado
            },
        });

        const data = await response.json()

        createComment(data);
    }
             
if(!postId){
getAllPosts();
}else{
getPost(postId);

//Add envento do comentario do formulario
commentForm.addEventListener("submit", (e)=> {
    e.preventDefault();// Permite que o formulario não seja mais submetido (enviado quando carrega a página)

    let comment = {// Salvando os valores do input em uma variavel
        email:emailInput.value,
        body:bodyInput.value,      
    };
    comment = JSON.stringify(comment)// Retornando um arquivo de texto JSON

    postComment(comment); // Responsávle pela requisição async que vai inserir o comentario no sistema
});
}


