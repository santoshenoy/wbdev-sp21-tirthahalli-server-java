function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001344420/users';
    let self = this;
    function createUser(user) {
        return fetch(self.url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => response.json())
    }

    function findAllUsers() {
        return fetch(self.url)
            .then((response) => response.json());
    }

    function findUserById(userId) {
        return fetch(`${self.url}/${userId}`)
            .then(response => response.json());
    }

    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => response.json())
    }
    function deleteUser(userId){
        return fetch(`${self.url}/${userId}`, {
            method: "DELETE"
        });
    }

}