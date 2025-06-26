import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";

/**
 * Utilitário para recortar a imagem usando canvas.
 */
function getCroppedImg(imageSrc, crop, outputWidth, outputHeight) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        outputWidth,
        outputHeight
      );
      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = reject;
  });
}

/**
 * ModalCropImagem
 * Componente reutilizável para crop de imagens (foto de perfil ou banner).
 */
export default function ModalCropImagem({
  open,
  image,
  onClose,
  onCropSave,
  aspect = 1,
  cropShape = "round",
  outputWidth = 160,
  outputHeight = 160,
  label = "Salvar",
  tipo = "foto", // "foto" ou "banner"
  usuarioId // Passe o id do usuário como prop!
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [erro, setErro] = useState("");

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Função para enviar a imagem cortada ao backend
  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(image, croppedAreaPixels, outputWidth, outputHeight);

    try {
      const token = sessionStorage.getItem("authToken");
      if (tipo === "foto") {
        await axios.post(
          `http://localhost:3001/api/usuario/${usuarioId}/foto`,
          { fotoPerfil: croppedImg },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
        // Atualize o sessionStorage
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        sessionStorage.setItem(
          "usuarioLogado",
          JSON.stringify({ ...usuarioLogado, fotoPerfil: croppedImg })
        );
      } else if (tipo === "banner") {
        await axios.post(
          `http://localhost:3001/api/usuario/${usuarioId}/banner`,
          { bannerPerfil: croppedImg },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        sessionStorage.setItem(
          "usuarioLogado",
          JSON.stringify({ ...usuarioLogado, bannerPerfil: croppedImg })
        );
      }
      if (onCropSave) onCropSave(croppedImg); // callback opcional
      onClose();
      window.location.reload();
    } catch (err) {
      setErro(
        err.response?.data?.erro ||
        err.response?.data?.message ||
        "Erro ao atualizar imagem."
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-0 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <span className="font-semibold text-lg text-gray-700">Ajuste sua imagem</span>
          <button
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            title="Fechar"
          >
            ×
          </button>
        </div>
        {/* Cropper */}
        <div className="flex flex-col items-center py-6 px-4">
          <div
            style={{
              position: "relative",
              width: 280,
              height: 280,
              background: "#f3f4f6",
              borderRadius: cropShape === "round" ? "50%" : "1rem",
              overflow: "hidden",
              boxShadow: "0 0 0 1px #e5e7eb"
            }}
          >
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              cropShape={cropShape}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          {/* Zoom slider */}
          <div className="w-full flex items-center gap-2 mt-6 mb-2">
            <span className="text-xs text-gray-400">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-green-600"
            />
          </div>
          {/* Erro */}
          {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
          {/* Botões */}
          <div className="flex gap-3 mt-4 w-full">
            <button
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={handleSave}
            >
              {label}
            </button>
            <button
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}