import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Faz upload de uma imagem para o Cloudinary
 * @param {Buffer|String} file - Arquivo para upload (Buffer ou caminho)
 * @param {Object} options - Opções adicionais para o upload
 * @returns {Promise<Object>} - Resultado do upload
 */
export const uploadImageToCloudinary = async (file, options = {}) => {
  try {
    // Se o arquivo for um buffer, precisamos convertê-lo para uma string base64
    let fileToUpload = file;
    
    if (Buffer.isBuffer(file)) {
      fileToUpload = `data:image/jpeg;base64,${file.toString('base64')}`;
    }
    
    // Configurações padrão
    const defaultOptions = {
      folder: 'econet_posts',
      resource_type: 'image',
      quality: 'auto:good',
    };
    
    // Mesclar opções padrão com as fornecidas
    const uploadOptions = { ...defaultOptions, ...options };
    
    // Fazer o upload
    const result = await cloudinary.uploader.upload(fileToUpload, uploadOptions);
    
    return result;
  } catch (error) {
    console.error('Erro ao fazer upload para o Cloudinary:', error);
    throw error;
  }
};

/**
 * Remove uma imagem do Cloudinary
 * @param {String} publicId - ID público da imagem no Cloudinary
 * @returns {Promise<Object>} - Resultado da remoção
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Erro ao remover imagem do Cloudinary:', error);
    throw error;
  }
};