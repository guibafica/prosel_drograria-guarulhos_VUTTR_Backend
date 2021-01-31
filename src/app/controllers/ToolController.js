/* eslint-disable array-callback-return */
import * as Yup from 'yup';

import Tool from '../models/Tool';

class UserController {
  async index(req, res) {
    // Verifica se tem o filtro e se ta passando pelo nome 'tag'
    if (req.query && req.query.tag) {
      const tools = await Tool.findAll({
        where: {
          deleted_at: null,
        },
        order: ['title'],
        attributes: ['id', 'title', 'link', 'description', 'tags'],
      });

      let toolsArray = '';

      // Como salvei as tags em formato de string, aqui eu percorro todas as ferramentas
      // converto as tags para array usando o 'replace' e 'split', percorro essa lista,
      // verifico se alguma bate com o que passei no filtro, e por fim, salvo em uma
      // variável para no final listar exatamente como pediu no desafio.
      tools.map((tool) => {
        tool.tags
          .replace(/\s/g, '')
          .split(',')
          .map((tag) => {
            if (tag === req.query.tag) {
              toolsArray = [
                ...toolsArray,
                {
                  id: tool.id,
                  title: tool.title,
                  description: tool.description,
                  tags: tool.tags.replace(/\s/g, '').split(','),
                },
              ];
            }
          });
      });

      return res.json(toolsArray);
    }

    const tools = await Tool.findAll({
      where: {
        deleted_at: null,
      },
      order: ['title'],
      attributes: ['id', 'title', 'link', 'description', 'tags'],
    });

    let toolsArray = '';

    tools.map((tool) => {
      toolsArray = [
        ...toolsArray,
        {
          id: tool.id,
          title: tool.title,
          description: tool.description,
          tags: tool.tags.replace(/\s/g, '').split(','),
        },
      ];
    });

    return res.json(toolsArray);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const toolExists = await Tool.findOne({
      where: {
        title: req.body.title,
        link: req.body.link,
      },
    });

    if (toolExists) {
      return res.status(400).json({ error: 'Tool already exists.' });
    }

    const tagsArray = req.body.tags.toString().split(',').join(', ');

    const { id, title, link, description, tags } = await Tool.create({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      tags: tagsArray,
    });

    return res.status(201).json({ id, title, link, description, tags });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists.' });
    }

    // Verifica se o novo email que será atualizado já não está sendo usado.
    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Valida a senha antiga.
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    return res.json({ ok: 'delete' });
  }
}

export default new UserController();
