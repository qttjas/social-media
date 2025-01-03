document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');


    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((posts) => {
            posts.slice(0, 5).forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
               
                const title = document.createElement('h2');
                title.textContent = post.title;
               
                const body = document.createElement('p');
                body.textContent = post.body;


                fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                    .then((response) => response.json())
                    .then((user) => {
                        const userInfo = document.createElement('p');
                        userInfo.classList.add('user-info');
                        userInfo.textContent = `Posted by: ${user.name}, ${user.email}`;
                        postDiv.appendChild(userInfo);
                    });


                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                    .then((response) => response.json())
                    .then((comments) => {
                        const commentsDiv = document.createElement('div');
                        commentsDiv.classList.add('comments');
                        comments.forEach(comment => {
                            const commentDiv = document.createElement('div');
                            commentDiv.classList.add('comment');


                            const commentName = document.createElement('h4');
                            commentName.textContent = comment.name;


                            const commentBody = document.createElement('p');
                            commentBody.textContent = comment.body;


                            commentDiv.appendChild(commentName);
                            commentDiv.appendChild(commentBody);
                            commentsDiv.appendChild(commentDiv);
                        });
                        postDiv.appendChild(commentsDiv);
                    });


                postsContainer.appendChild(postDiv);
            });
        })
        .catch((error) => console.error('Error'));
});
