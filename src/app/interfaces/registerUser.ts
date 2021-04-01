export interface RegisterUser {
    username: String,
    email: String,
    password: String,
    roles: [
        {
            role: String
        }
    ]
}