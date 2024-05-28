import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

export const encryptPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  bodyParser.json()(req, res, async (err?: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (req.body.senha) {
      try {
        const isStrongEnough =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            req.body.senha
          );
        if (!isStrongEnough) {
          return res
            .status(400)
            .json({
              success: false,
              message:
                "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.senha, 10);
        req.body.senha = hashedPassword;
      } catch (error: any) {
        return res
          .status(500)
          .json({ success: false, message: "Erro interno do servidor" });
      }
    }

    next();
  });
};
