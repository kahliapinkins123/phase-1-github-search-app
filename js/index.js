document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('#github-form');
    let input = document.querySelector('#search');
    let userList = document.querySelector('#user-list');
    let reposList = document.querySelector('#repos-list');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        fetch(`https://api.github.com/search/users?q=${input.value}`)
        .then(res=> res.json())
        .then(obj => getUsers(obj))
    })

    //get user
    function getUsers(obj){
        let results = obj['items'];
        for(item of results){
            //Display username, avatar, and link to profile
            let username = item['login'];
            let avatarUrl = item['avatar_url'];
            let profileLink = item['html_url'];

            let li = document.createElement('li');
            let img = document.createElement('img');
            let a = document.createElement('a');
            let linkText = document.createTextNode('Profile');
            let h2 = document.createElement('h2');
            let btn = document.createElement('BUTTON');

            h2.textContent = username;
            btn.textContent = `${username}'s Repositories`;
            img.src = avatarUrl;
            
            //Creates Link with Text
            a.appendChild(linkText);
            a.href = profileLink;
            a.title = 'Profile Link';

            //Combines all elements (image, link, name, button) into one
            li.appendChild(h2);
            li.appendChild(img);
            li.appendChild(a);
            li.appendChild(btn);

            //Adds new combined element to the User List
            userList.appendChild(li); 

            //When you click the button, it display the user's repositories
            btn.addEventListener('click', () => {
                fetch(`https://api.github.com/users/${username}/repos`)
                .then(res=> res.json())
                .then(repos => {
                    //Creates title for the Repo List
                    let h2 = document.createElement('h2');
                    h2.textContent = `These are ${username}'s Repositories`;
                    reposList.appendChild(h2);
                    //Creates Repo List
                    for (repo of repos){
                        let repoName = repo['name'];
                        let repoUrl = repo['url'];

                        let li = document.createElement('li');
                        let repoNameText = document.createTextNode(repoName);
                        let a = document.createElement('a');

                        a.appendChild(repoNameText);
                        a.href = repoUrl;
                        a.title = 'Repository Link';

                        li.appendChild(a);
                     
                        reposList.appendChild(li);
                    }
                    
                })
            });


        }
    }

    

    
})