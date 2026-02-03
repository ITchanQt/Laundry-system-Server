const BaseModel = require("./BaseModel");
const jwt = require("jsonwebtoken");

class AuthModel extends BaseModel {
  static async verifySupabaseToken(token) {
    try {
      const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: process.env.SUPABASE_ANON_KEY,
        },
      });
      if (!res.ok) {
        throw new Error("Invalid or expired token");
      }

      const user = await res.json();
      return user;
    } catch (err) {
      throw err;
    }
  }

  static generateJWT(user) {
    return jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: "super_admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
        issuer: "laundry-system",
      }
    );
  }

  static async findSuperAdminByEmail(email) {
    try {
      const sql = "SELECT * FROM super_admins WHERE sAdmin_email = ?";
      const result = await this.query(sql, [email]);
      return result[0];
    } catch (error) {
      console.log("AuthModel.selectSuperAdmin error:", error);
      throw error;
    }
  }

  static async findSuperAdmin(email, password) {
    try {
      const sql =
        "SELECT * FROM super_admins WHERE sAdmin_email = ? AND sAdmin_password = ?";
      const result = await this.query(sql, [email, password]);
      return result[0];
    } catch (error) {
      console.log("AuthModel.selectSuperAdmin error:", error);
      throw error;
    }
  }

  static async login(email, password) {
    try {
      console.log("Login attempt with:", { email, password });

      const superAdmin = await this.findSuperAdmin(email, password);
      console.log("Found super admin:", superAdmin ? "Yes" : "No");

      if (!superAdmin) {
        return { error: "Invalid credentials" };
      }

      const match = password === superAdmin.sAdmin_password;
      if (!match) {
        return { error: "Invalid credentials" };
      }

      const token = jwt.sign(
        {
          id: superAdmin.id,
          email: superAdmin.sAdmin_email,
          role: "super_admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      return {
        token,
        superAdmin: {
          id: superAdmin.id,
          email: superAdmin.sAdmin_email,
        },
      };
    } catch (error) {
      console.error("AuthModel.login error:", error);
      throw error;
    }
  }
}

module.exports = AuthModel;
