import cloudinary from '../../config/cloudinary.config.js';
import models from '../../../models/index.model.js';
const Documento = models.Documento;

async function createDocumento(file) {

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
  });

  return novoDocumento;
}

// NOVA FUNÇÃO DE SERVIÇO PARA BUSCAR UM DOCUMENTO
async function findDocumentoById(documentoId) {
  const documento = await Documento.findByPk(documentoId);

  if (!documento) {
    return null;
  }

  return documento;
}

// NOVA FUNÇÃO DE SERVIÇO PARA EXCLUIR UM DOCUMENTO
async function deleteDocumentoById(documentoId) {
  const documento = await Documento.findByPk(documentoId);

  if (!documento) {
    throw new Error('Documento não encontrado.');
  }
  
  // 2. Excluir do Cloudinary primeiro
  await cloudinary.uploader.destroy(documento.public_id, {
    resource_type: 'raw'
  });

  // 3. Se a exclusão no Cloudinary foi bem-sucedida, exclui do nosso banco
  await documento.destroy();

  return; // Não precisa de retornar nada
}


export default { createDocumento, findDocumentoById, deleteDocumentoById };
