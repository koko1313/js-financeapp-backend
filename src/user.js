export const registerUser = async (dbClient, user) => {
    const id = uuid();
    await dbClient.query(`INSERT INTO "user" (id, email, name, password) VALUES ('${id}', '${user.email}', '${user.name}', '${user.password}')`); 
}