document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('repo-list');
            repoList.innerHTML = '';
            data.forEach(res => {
                const repoItem = document.createElement('li');
                repoItem.className = 'repo list-group-item';
                repoItem.innerHTML = `
                    <h2>${res.name}</h2>
                    <p><strong>Description:</strong> ${res.description || 'No description'}</p>
                    <p><strong>URL:</strong> <a href="${res.html_url}" target="_blank">${res.html_url}</a></p>
                    <p><strong>Language:</strong> ${res.language || 'Not specified'}</p>
                    <p><strong>Stars:</strong> ${res.stargazers_count}</p>
                    <p><strong>Forks:</strong> ${res.forks_count}</p>
                `;
                repoList.appendChild(repoItem);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
});