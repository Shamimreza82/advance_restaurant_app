export function generatePassword(email: string, length = 10): string {
  const seed = email + Date.now().toString(); // add timestamp for uniqueness
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const index = seed.charCodeAt(i % seed.length) % chars.length;
    password += chars[index];
  }

  return password;
}
