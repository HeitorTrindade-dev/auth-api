import { UserService } from "../services/userService.js";

const userService = new UserService();

export class UserController {
  async register(request, response) {
    try {
      const { email, password } = request.body;
      const newUser = await userService.createUser(email, password);
      response.status(201).json({
        user: { id: newUser.id, email: newUser.email }
      });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const token = await userService.login(email, password);

      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
