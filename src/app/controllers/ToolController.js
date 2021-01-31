/* eslint-disable array-callback-return */
import * as Yup from 'yup';

import Tool from '../models/Tool';

class ToolController {
  async index(req, res) {
    // Verifica se tem o filtro e se ta passando pelo nome 'tag'
    if (req.query && req.query.tag) {
      const tools = await Tool.findAll({
        where: {
          deleted_at: null,
        },
        // Para ficar igual ao exemplo do desafio, basta não ordenar
        // order: ['title'],
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
      // Para ficar igual ao exemplo do desafio, basta não ordenar
      // order: ['title'],
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
      title: Yup.string(),
      link: Yup.string(),
      description: Yup.string(),
      tags: Yup.array(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const toolExists = await Tool.findByPk(id);

    if (!toolExists) {
      return res.status(404).json({ error: 'Tool does not exist.' });
    }

    if (toolExists.deleted_at) {
      return res.status(401).json({ error: 'Tool deleted.' });
    }

    // Precisei 'desestruturar' o update devido a essa conversão do array para string
    // das tags.
    if (req.body.tags) {
      const tagsArray = req.body.tags.toString().split(',').join(', ');

      toolExists.tags = tagsArray;

      // await toolExists.save();
    }

    if (req.body.title) toolExists.title = req.body.title;

    if (req.body.link) toolExists.link = req.body.link;

    if (req.body.description) toolExists.description = req.body.description;

    const newToll = await toolExists.save();

    return res.json(newToll);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const toolExists = await Tool.findByPk(id);

    if (!toolExists) {
      return res.status(404).json({ error: 'Tool does not exist.' });
    }

    if (toolExists.deleted_at) {
      return res.status(401).json({ error: 'Tool already deleted.' });
    }

    // Como comentei antes, em vez de literalmente deletar os dados do banco de dados
    // eu simplesmente marco ele como deletado, assim nas filtragens ele não é usado
    // porém em alguma necessidade o dado vai continuar guardado no banco de dados
    // para alguma consulta específica. Como dizem, dados é dinheiro, então nunca é
    // bom perder dados.
    toolExists.deleted_at = new Date();

    await toolExists.save();

    return res.status(204).json();
  }
}

export default new ToolController();
