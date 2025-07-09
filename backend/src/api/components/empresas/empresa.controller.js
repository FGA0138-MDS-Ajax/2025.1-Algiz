import models from "../../../models/index.model.js"; // Corrigido para index.model.js
import empresaService from "./empresa.service.js";
import cloudinary from '../../utils/cloudinary.util.js';

const { Fisico } = models;

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

// ✅ NOVA FUNÇÃO: Restaurar foto padrão da empresa
export async function setEmpresaDefaultPhoto(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;

        const result = await empresaService.setEmpresaDefaultPhoto(id, idUsuario);
        return res.status(200).json(result);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'AuthorizationError') {
            return res.status(403).json({ erro: error.message });
        }
        console.error("Erro ao restaurar foto padrão:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}

// ✅ NOVA FUNÇÃO: Restaurar banner padrão da empresa
export async function setEmpresaDefaultBanner(req, res) {
    try {
        const { id } = req.params;
        const idUsuario = req.user.id;

        const result = await empresaService.setEmpresaDefaultBanner(id, idUsuario);
        return res.status(200).json(result);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === 'AuthorizationError') {
            return res.status(403).json({ erro: error.message });
        }
        console.error("Erro ao restaurar banner padrão:", error);
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