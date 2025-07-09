import models from "../../../models/index.model.js"; // Corrigido para index.model.js
import empresaService from "./empresa.service.js";
import cloudinary from '../../utils/cloudinary.util.js';

const { Fisico, Empresa } = models;

export async function registerEmpresa(req, res) {
    try {
        const idUsuario = req.user.id;
        const dadosEmpresa = req.body;
        const novaEmpresa = await empresaService.createEmpresa(idUsuario, dadosEmpresa);
        res.status(201).json({
            mensagem: "Empresa cadastrada com sucesso!",
            empresa: novaEmpresa
        });
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'ConflictError') {
            return res.status(error.name === 'ValidationError' ? 400 : 409).json({ erro: error.message });
        }
        console.error("Erro no controller ao cadastrar empresa:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}

// ✅ ADICIONAR: Função que estava faltando
export async function getAllEmpresas(req, res) {
    try {
        const empresas = await empresaService.findAllEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ ALTERADO: Buscar por ID
export async function getEmpresaById(req, res) {
    try {
        const { id } = req.params;                                    // ✅ ALTERADO: usar 'id'
        const empresa = await empresaService.findEmpresaById(id);     // ✅ ALTERADO
        
        if (!empresa) {
            return res.status(404).json({ erro: "Empresa não encontrada." });
        }
        
        res.status(200).json(empresa);
    } catch (error) {
        console.error("Erro ao buscar empresa:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ ALTERADO: Update por ID
export async function updateEmpresa(req, res) {
    try {
        const { id } = req.params;                                    // ✅ ALTERADO: usar 'id'
        const idUsuario = req.user.id;
        const dadosUpdate = req.body;
        
        const empresaAtualizada = await empresaService.updateEmpresa(id, idUsuario, dadosUpdate); // ✅ ALTERADO
        
        res.status(200).json({
            mensagem: "Empresa atualizada com sucesso!",
            empresa: empresaAtualizada
        });
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'AuthorizationError') {
            return res.status(403).json({ erro: error.message });
        }
        if (error.name === 'ConflictError') {
            return res.status(409).json({ erro: error.message });
        }
        console.error("Erro no controller ao atualizar empresa:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ ALTERADO: Upload de foto por ID com melhor tratamento
export async function updateEmpresaPhoto(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;

        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada." });
        }

        const uploadResult = cloudinary.uploader.upload_stream(
            {
                folder: "empresas/fotos",
                public_id: `empresa_foto_${id}`,        // ✅ MELHOR NOMENCLATURA
                overwrite: true,
            },
            async (error, result) => {
                if (error) {
                    console.error("Erro no Cloudinary:", error);
                    return res.status(500).json({ erro: "Erro ao enviar imagem para Cloudinary" });
                }

                try {
                    const fotoEmpresa = result.secure_url;
                    const updateResult = await empresaService.updateEmpresa(id, idUsuario, { fotoEmpresa });
                    return res.status(200).json({ 
                        ...updateResult, 
                        fotoEmpresa,
                        mensagem: "Foto da empresa atualizada com sucesso!" 
                    });
                } catch (serviceError) {
                    console.error("Erro no serviço:", serviceError);
                    return res.status(500).json({ erro: "Erro ao atualizar foto no banco de dados" });
                }
            }
        );

        uploadResult.end(req.file.buffer);
    } catch (error) {
        console.error("Erro ao atualizar foto da empresa:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ ALTERADO: Upload de banner por ID com melhor tratamento
export async function updateEmpresaBanner(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;

        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada." });
        }

        const uploadResult = cloudinary.uploader.upload_stream(
            {
                folder: "empresas/banners",
                public_id: `empresa_banner_${id}`,      // ✅ MELHOR NOMENCLATURA
                overwrite: true,
            },
            async (error, result) => {
                if (error) {
                    console.error("Erro no Cloudinary:", error);
                    return res.status(500).json({ erro: "Erro ao enviar imagem para Cloudinary" });
                }

                try {
                    const bannerEmpresa = result.secure_url;
                    const updateResult = await empresaService.updateEmpresa(id, idUsuario, { bannerEmpresa });
                    return res.status(200).json({ 
                        ...updateResult, 
                        bannerEmpresa,
                        mensagem: "Banner da empresa atualizado com sucesso!" 
                    });
                } catch (serviceError) {
                    console.error("Erro no serviço:", serviceError);
                    return res.status(500).json({ erro: "Erro ao atualizar banner no banco de dados" });
                }
            }
        );

        uploadResult.end(req.file.buffer);
    } catch (error) {
        console.error("Erro ao atualizar banner da empresa:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// Corrigir as funções existentes e garantir que estejam implementadas corretamente

// ✅ NOVA FUNÇÃO: Restaurar foto padrão da empresa
export async function setEmpresaDefaultPhoto(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;

        console.log(`[setEmpresaDefaultPhoto] Restaurando foto padrão para empresa ${id}, usuário ${idUsuario}`);

        const result = await empresaService.setEmpresaDefaultPhoto(id, idUsuario);
        
        console.log(`[setEmpresaDefaultPhoto] Foto padrão definida com sucesso:`, result);
        
        return res.status(200).json({
            mensagem: "Foto da empresa restaurada para padrão com sucesso!",
            fotoEmpresa: result.fotoEmpresa
        });
    } catch (error) {
        console.error("[setEmpresaDefaultPhoto] Erro:", error);
        
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'AuthorizationError') {
            return res.status(403).json({ erro: error.message });
        }
        
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ NOVA FUNÇÃO: Restaurar banner padrão da empresa
export async function setEmpresaDefaultBanner(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;

        console.log(`[setEmpresaDefaultBanner] Restaurando banner padrão para empresa ${id}, usuário ${idUsuario}`);

        const result = await empresaService.setEmpresaDefaultBanner(id, idUsuario);
        
        console.log(`[setEmpresaDefaultBanner] Banner padrão definido com sucesso:`, result);
        
        return res.status(200).json({
            mensagem: "Banner da empresa restaurado para padrão com sucesso!",
            bannerEmpresa: result.bannerEmpresa
        });
    } catch (error) {
        console.error("[setEmpresaDefaultBanner] Erro:", error);
        
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'AuthorizationError') {
            return res.status(403).json({ erro: error.message });
        }
        
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ NOVO: Buscar postagens da empresa
export async function getEmpresaPostagens(req, res) {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const offset = (page - 1) * limit;
        const empresa = await empresaService.getEmpresaPostagens(id, { limit, offset });
        
        res.status(200).json(empresa);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        console.error("Erro ao buscar postagens da empresa:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ NOVO: Buscar empresa do usuário logado
export async function getMinhaEmpresa(req, res) {
    try {
        const idUsuario = req.user.id;
        const empresa = await empresaService.findEmpresaByUserId(idUsuario);
        
        if (!empresa) {
            return res.status(404).json({ erro: "Você não possui empresa cadastrada." });
        }
        
        res.status(200).json(empresa);
    } catch (error) {
        console.error("Erro ao buscar empresa do usuário:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// Adicionar este novo controller para o endpoint de usuários vinculados

// Buscar usuários vinculados a uma empresa
export async function getUsuariosVinculados(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar se a empresa existe
        const empresa = await empresaService.findEmpresaById(id);
        if (!empresa) {
            return res.status(404).json({ erro: "Empresa não encontrada." });
        }
        
        // Buscar os usuários vinculados
        const usuarios = await empresaService.getUsuariosVinculados(id);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários vinculados:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// Adicionar estas funções ao arquivo

// Seguir uma empresa
export async function followEmpresa(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;
        
        // Buscar o cpfFisico do usuário usando Sequelize
        const usuario = await Fisico.findOne({
            where: { idUsuario }
        });
        
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        
        const cpfFisico = usuario.cpfFisico;
        const result = await empresaService.followEmpresa(id, cpfFisico);
        
        if (result.already) {
            return res.status(200).json(result);
        }
        
        return res.status(201).json(result);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        console.error('Erro ao seguir empresa:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

// Deixar de seguir uma empresa
export async function unfollowEmpresa(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;
        
        // Buscar o cpfFisico do usuário usando Sequelize
        const usuario = await Fisico.findOne({
            where: { idUsuario }
        });
        
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        
        const cpfFisico = usuario.cpfFisico;
        const result = await empresaService.unfollowEmpresa(id, cpfFisico);
        
        return res.status(200).json(result);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        console.error('Erro ao deixar de seguir empresa:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

// Verificar se o usuário segue a empresa
export async function checkFollowStatus(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;
        
        // Buscar o cpfFisico do usuário usando Sequelize
        const usuario = await Fisico.findOne({
            where: { idUsuario }
        });
        
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        
        const cpfFisico = usuario.cpfFisico;
        const result = await empresaService.checkIfUserFollowsEmpresa(id, cpfFisico);
        
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao verificar status de seguidor:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

// Obter seguidores de uma empresa
export async function getEmpresaFollowers(req, res) {
    try {
        const { id } = req.params;
        const { limit = 10, offset = 0 } = req.query;
        
        const followers = await empresaService.getEmpresaFollowers(
            id, 
            parseInt(limit), 
            parseInt(offset)
        );
        
        return res.status(200).json(followers);
    } catch (error) {
        console.error('Erro ao buscar seguidores:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
;

// Correção do método updateEmpresaDescricao

// Adicione um endpoint específico para atualizar apenas a descrição
export const updateEmpresaDescricao = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricaoEmpresa } = req.body;
    const idUsuario = req.user.id;

    console.log(`[updateEmpresaDescricao] ================================`);
    console.log(`[updateEmpresaDescricao] ID da empresa: ${id}`);
    console.log(`[updateEmpresaDescricao] ID do usuário: ${idUsuario}`);
    console.log(`[updateEmpresaDescricao] Descrição recebida: "${descricaoEmpresa}"`);
    console.log(`[updateEmpresaDescricao] Tipo da descrição: ${typeof descricaoEmpresa}`);

    if (descricaoEmpresa === undefined) {
      return res.status(400).json({ mensagem: "A descrição da empresa é obrigatória" });
    }

    try {
      // Buscar a empresa
      const empresa = await empresaService.findEmpresaById(id);
      console.log(`[updateEmpresaDescricao] Empresa encontrada:`, {
        id: empresa?.idEmpresa,
        nome: empresa?.nomeComercial,
        idUsuario: empresa?.idUsuario,
        descricaoAtual: empresa?.descricaoEmpresa
      });
      
      if (!empresa) {
        return res.status(404).json({ mensagem: "Empresa não encontrada" });
      }
      
      // Verificar permissões
      if (empresa.idUsuario !== idUsuario) {
        console.log(`[updateEmpresaDescricao] ERRO: Usuário ${idUsuario} não tem permissão. Dono: ${empresa.idUsuario}`);
        return res.status(403).json({ mensagem: "Você não tem permissão para editar esta empresa" });
      }
      
      console.log(`[updateEmpresaDescricao] Permissões OK. Atualizando...`);
      
      // Tentar atualizar usando Sequelize direto
      const [numRowsUpdated] = await models.Empresa.update(
        { descricaoEmpresa: descricaoEmpresa },
        { 
          where: { idEmpresa: id },
          returning: true
        }
      );
      
      console.log(`[updateEmpresaDescricao] Linhas atualizadas: ${numRowsUpdated}`);
      
      // Buscar novamente para confirmar a atualização
      const empresaAtualizada = await empresaService.findEmpresaById(id);
      console.log(`[updateEmpresaDescricao] Empresa após atualização:`, {
        id: empresaAtualizada?.idEmpresa,
        descricaoNova: empresaAtualizada?.descricaoEmpresa
      });
      
      // Verificar se a atualização foi bem-sucedida
      if (empresaAtualizada.descricaoEmpresa !== descricaoEmpresa) {
        console.log(`[updateEmpresaDescricao] ALERTA: Descrição não foi salva corretamente!`);
        console.log(`[updateEmpresaDescricao] Esperado: "${descricaoEmpresa}"`);
        console.log(`[updateEmpresaDescricao] Obtido: "${empresaAtualizada.descricaoEmpresa}"`);
      }
      
      return res.status(200).json({
        mensagem: "Descrição atualizada com sucesso!",
        empresa: empresaAtualizada
      });
    } catch (error) {
      console.error(`[updateEmpresaDescricao] Erro interno:`, error);
      if (error.name === 'NotFoundError') {
        return res.status(404).json({ mensagem: "Empresa não encontrada" });
      }
      throw error;
    }
  } catch (error) {
    console.error("[updateEmpresaDescricao] Erro geral:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar descrição da empresa", erro: error.message });
  }
};

// Atualizar também a função getEmpresaDescricao para logs detalhados
export const getEmpresaDescricao = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[getEmpresaDescricao] Buscando descrição para empresa ID: ${id}`);
    
    const empresa = await empresaService.findEmpresaById(id);
    
    if (!empresa) {
      console.log(`[getEmpresaDescricao] Empresa ${id} não encontrada`);
      return res.status(404).json({ mensagem: "Empresa não encontrada" });
    }
    
    console.log(`[getEmpresaDescricao] Descrição encontrada: "${empresa.descricaoEmpresa}"`);
    
    return res.status(200).json({ 
      descricaoEmpresa: empresa.descricaoEmpresa || "" 
    });
  } catch (error) {
    console.error("[getEmpresaDescricao] Erro:", error);
    return res.status(500).json({ mensagem: "Erro ao buscar descrição da empresa", erro: error.message });
  }
};