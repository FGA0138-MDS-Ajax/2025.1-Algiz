import cloudinary from '../../../config/cloudinary.config.js';
import { Documento, Parceria } from '../../../models/index.model.js'; // Supondo um modelo 'Parceria'

async function createDocumento(file, idParceria, idUsuario) {
    // 1. Lógica de Permissão (Exemplo)
    // Verifique se o utilizador logado tem permissão para adicionar documentos a esta parceria.
    const parceria = await Parceria.findByPk(idParceria);
    if (!parceria || !parceria.envolveUsuario(idUsuario)) {
        throw new Error('Acesso não autorizado a esta parceria.');
    }

    // 2. Fazer o upload do ficheiro para o Cloudinary
    const resultadoUpload = await cloudinary.uploader.upload(file.path, {
        folder: 'contratos', // Salva numa pasta específica no Cloudinary
        resource_type: 'raw', // 'raw' é usado para ficheiros que não são imagens/vídeos, como PDFs
    });

    // 3. Salvar os metadados no nosso banco de dados
    const novoDocumento = await Documento.create({
        public_id: resultadoUpload.public_id,
        url: resultadoUpload.secure_url,
        nomeOriginal: file.originalname,
        idParceria: idParceria,
    });

    return novoDocumento;
}

export default { createDocumento };