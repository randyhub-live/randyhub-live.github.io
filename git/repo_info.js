

(async () => {
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const issueTable = document.querySelector('#issues-table > tbody');

  const contributorsTable = document.querySelector('#contributors-table > tbody');

  
  const repo = await fetch('https://api.github.com/repos/randyhub-live/randyhub-live.github.io').then(r => r.json());
  const issues = await fetch('https://api.github.com/repos/randyhub-live/randyhub-live.github.io/issues').then(r => r.json());
  const contributors = await fetch('https://api.github.com/repos/randyhub-live/randyhub-live.github.io/contributors').then(r => r.json());
  contributors.sort((a, b) => a.contributions < b.contributions);
  
  title.textContent = repo.name;
  description.textContent = repo.description;

  issues.map(issue => {
    const trRow = document.createElement('tr');
    const tdUser = document.createElement('td');
    const tdUserLink = document.createElement('a');
    const tdCreatedAt = document.createElement('td');
    const tdState = document.createElement('td');
    const tdStateLink = document.createElement('a');
    

    tdUserLink.setAttribute('href', issue.user.html_url);
    tdUserLink.setAttribute('target', '_blank');
    tdUserLink.textContent = issue.user.login;
    tdUser.append(tdUserLink);

    tdCreatedAt.textContent = new Date(issue.created_at).toLocaleDateString();
    
    tdStateLink.setAttribute('href', issue.html_url);
    tdStateLink.setAttribute('target', '_blank');
    tdStateLink.textContent = issue.state;
    tdState.appendChild(tdStateLink);

    trRow.appendChild(tdUser);
    trRow.appendChild(tdCreatedAt);
    trRow.appendChild(tdState);

    issueTable.appendChild(trRow);

  })

  contributors.map(contributor =>  {
    const trRow = document.createElement('tr');

    const tdUser = document.createElement('td');
    const tdUserLink = document.createElement('a');
    tdUserLink.setAttribute('href', contributor.html_url);
    tdUserLink.setAttribute('target', '_blank');
    tdUserLink.textContent = contributor.login;

    const tdContributors = document.createElement('td');
    tdContributors.textContent = contributor.contributions;

    const tdRemoveUser = document.createElement('td');
    const tdRemoveUserBtn = document.createElement('button');
    tdRemoveUserBtn.onclick = () => alert(`${contributor.login} has been deleted!\noops`);
    tdRemoveUserBtn.textContent = `Delete ${contributor.login}`;
    tdRemoveUser.appendChild(tdRemoveUserBtn);

    trRow.appendChild(tdUserLink);
    trRow.appendChild(tdContributors);
    trRow.appendChild(tdRemoveUser);

    trRow.appendChild(tdUser);
    contributorsTable.appendChild(trRow);
  });


})()

