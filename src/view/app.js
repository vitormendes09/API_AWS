document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');

    async function fetchUser() {
        const response = await fetch('/users');

        const users = await response.json();
        userList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.id} - ${user.name} - ${user.email}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deleteUser(user.id);

            li.appendChild(deleteButton);
            userList.appendChild(li);
        });

    }

    async function deleteUser(id) {
        if (confirm('Tem certeza que deseja deletar?')) {
            await fetch(`/users/${id}`, { method: 'DELETE' });

            fetchUser();
        }

    }

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
       

        await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, email})
        });

        fetchUser();
        userForm.reset();
    });

    
    fetchUser();

});

