export interface UserData {
    id: String,
    username: String,
    email: String,
    roles: [
        {
            _id: String,
            role: String
        }
    ],
    accessToken: String
}