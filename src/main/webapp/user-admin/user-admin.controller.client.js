var $userName
var $password
var $firstName
var $lastName
var $role
var table
var selectedUser = null
var userAdminService = new AdminUserServiceClient()
var users = [];

function createUser(user) {
    userAdminService.createUser(user)
        .then(function (actualUser) {
                users.push(actualUser)
                $userName.val("")
                $password.val("")
                $firstName.val("")
                $lastName.val("")
                $role.val("ADMIN")
                renderUsers(users)
            }
        )
}

function renderUsers(users) {
    table.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        table
            .append(`
                    <tr class= "wbdv-template wbdv-user wbdv-hidden" style="background-color: lightblue">
                        <td class="wbdv-username">${user.username}</td>
                        <td>&nbsp;</td>
                        <td class="wbdv-first-name">${user.firstName}</td>
                        <td class="wbdv-last-name">${user.lastName}</td>
                        <td class="wbdv-role">${user.role}</td>
                        <td class="wbdv-actions">
                        <button class="btn">
                           <i id="${i}" class="fa-2x fa fa-times wbdv-remove" ></i>
                       </button>
                       <button class="btn">
                           <i id="${user._id}" class="fa-2x fa fa-edit wbdv-edit"></i>
                        </button>
                        </td>
                    </tr>
                `)

    }
    var $remove = $('.wbdv-remove')
    $remove.click(deleteUser)
    var $edit = $('.wbdv-edit')
    $edit.click(editUser)
}


function editUser(event) {
    let editBtn = $(event.target)
    let theId = editBtn.attr("id")
    selectedUser = users.find(user => user._id === theId)

    $userName.val(selectedUser.username)
    $password.val(selectedUser.password)
    $firstName.val(selectedUser.firstName)
    $lastName.val(selectedUser.lastName)
    $role.val(selectedUser.role)
}

function updateUser() {

    selectedUser.username = $userName.val()
    selectedUser.password = $password.val()
    selectedUser.firstName = $firstName.val()
    selectedUser.lastName = $lastName.val()
    selectedUser.role = $role.val()

    userAdminService.updateUser(selectedUser._id, selectedUser)
        .then(function (status) {
                var index = users.findIndex( user => user._id === selectedUser._id)
                users[index] = selectedUser
                $userName.val("")
                $password.val("")
                $firstName.val("")
                $lastName.val("")
                $role.val("ADMIN")
                renderUsers(users)
            }
        )
}

function deleteUser(event) {
    let removeBtn = $(event.target)
    let theIndex = removeBtn.attr("id")
    let theId = users[theIndex]._id

    userAdminService.deleteUser(theId)
        .then(function(status) {
                users.splice(theIndex, 1)
                renderUsers(users)
            }
        )
}

function main() {
    $userName = $(".wbdv-username-fld")
    $password = $(".wbdv-password-fld")
    $firstName = $(".wbdv-firstName-fld")
    $lastName = $(".wbdv-lastName-fld")
    $role = $(".wbdv-role-fld")
    table = jQuery("tbody")

    let $createBtn = $(".wbdv-create")
    $createBtn.click(() => {
            createUser({
                username: $userName.val(),
                password: $password.val(),
                firstName: $firstName.val(),
                lastName: $lastName.val(),
                role: $role.val()
            })
        }
    )

    var $update = $(".wbdv-update")
    $update.click(updateUser)

    userAdminService.findAllUsers()
        .then(function (actualUsersFromServer) {
                users = actualUsersFromServer
                renderUsers(users)
            }
        )
}

jQuery(main)