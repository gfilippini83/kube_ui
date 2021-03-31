export interface UserData {
    id: String,
    username: String,
    email: String,
    roles: [
        {
            role: String
        }
    ],
    accessToken: String
}