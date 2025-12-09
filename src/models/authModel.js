
class AuthModel {
  static async verifySupabaseToken(token) {
    try {
      const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: process.env.SUPABASE_ANON_KEY
        }
      });
console.log(token)
      if (!res.ok) {
        throw new Error("Invalid or expired token");
      }

      const user = await res.json();
      console.log(user)
      return user;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = AuthModel;
