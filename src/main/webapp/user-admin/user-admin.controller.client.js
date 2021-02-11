let $userNameFld
let $passwordFld
let $firstNameFld
let $lastNameFld
let $roleFld
let $createBtn
let $updateBtn
let tBody
let userAdminService = new AdminUserServiceClient()

let users = [];

function createUser(user) {

    userAdminService.createUser(user)
        .then(function (actualUser) {
                users.push(actualUser)

                $userNameFld.val("")
                $passwordFld.val("")
                $firstNameFld.val("")
                $lastNameFld.val("")
                $roleFld.val("ADMIN")

                renderUsers(users)
            }
        )
}


let selectedUser = null
function selectUser(event) {
    let editBtn = $(event.target)
    let theId = editBtn.attr("id")
    selectedUser = users.find(user => user._id === theId)

    $userNameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
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

function renderUsers(users) {
    tBody.empty()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        tBody
            .append(`
                    <tr class= "wbdv-template wbdv-user wbdv-hidden">
                        <td class="wbdv-username">${user.username}</td>
                        <td>&nbsp;</td>
                        <td class="wbdv-first-name">${user.firstName}</td>
                        <td class="wbdv-last-name">${user.lastName}</td>
                        <td class="wbdv-role">${user.role}</td>
                        <td class="wbdv-actions">
                        <button class="btn">
                  <i id="${i}" class="fa-2x fa fa-times wbdv-remove" 
                     ></i>
                </button>
                <button class="btn">
                    <i class="fa-2x fa fa-pencil wbdv-edit" 
                       id="${user._id}"></i>
                </button>
                        </td>
                    </tr>
                `)

    }
    $removeBtn = $('.wbdv-remove')
    $removeBtn.click(deleteUser)

    $editBtn = $('.wbdv-edit')
    $editBtn.click(selectUser)

}

function updateUser() {

    selectedUser.username = $userNameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()

    userAdminService.updateUser(selectedUser._id, selectedUser)
        .then(function (status) {
                let index = users.findIndex( user => user._id === selectedUser._id)
                users[index] = selectedUser

                $userNameFld.val("")
                $passwordFld.val("")
                $firstNameFld.val("")
                $lastNameFld.val("")
                $roleFld.val("ADMIN")

                renderUsers(users)
            }
        )

}

function main() {
    $userNameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstNameFld = $(".wbdv-firstName-fld")
    $lastNameFld = $(".wbdv-lastName-fld")
    $roleFld = $(".wbdv-role-fld")
    tBody = jQuery("tbody")

    $createBtn = $(".wbdv-create")
    $createBtn.click(() => {
            createUser({
                username: $userNameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstNameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val()
            })
        }
    )

    $updateBtn = $(".wbdv-update")
    $updateBtn.click(updateUser)

    userAdminService.findAllUsers()
        .then(function (actualUsersFromServer) {
                users = actualUsersFromServer
                renderUsers(users)
            }
        )
}

jQuery(main)