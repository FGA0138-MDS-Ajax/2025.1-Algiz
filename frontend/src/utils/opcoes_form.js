export const estados = [
  { label: "Selecione seu estado", value: "", disabled: true },
  { label: "Acre - AC", value: "AC" },
  { label: "Alagoas - AL", value: "AL" },
  { label: "Amapá - AP", value: "AP" },
  { label: "Amazonas - AM", value: "AM" },
  { label: "Bahia - BA", value: "BA" },
  { label: "Ceará - CE", value: "CE" },
  { label: "Distrito Federal - DF", value: "DF" },
  { label: "Espírito Santo - ES", value: "ES" },
  { label: "Goiás - GO", value: "GO" },
  { label: "Maranhão - MA", value: "MA" },
  { label: "Mato Grosso - MT", value: "MT" },
  { label: "Mato Grosso do Sul - MS", value: "MS" },
  { label: "Minas Gerais - MG", value: "MG" },
  { label: "Pará - PA", value: "PA" },
  { label: "Paraíba - PB", value: "PB" },
  { label: "Paraná - PR", value: "PR" },
  { label: "Pernambuco - PE", value: "PE" },
  { label: "Piauí - PI", value: "PI" },
  { label: "Rio de Janeiro - RJ", value: "RJ" },
  { label: "Rio Grande do Norte - RN", value: "RN" },
  { label: "Rio Grande do Sul - RS", value: "RS" },
  { label: "Rondônia - RO", value: "RO" },
  { label: "Roraima - RR", value: "RR" },
  { label: "Santa Catarina - SC", value: "SC" },
  { label: "São Paulo - SP", value: "SP" },
  { label: "Sergipe - SE", value: "SE" },
  { label: "Tocantins - TO", value: "TO" },
];

export const areasAtuacao = [
  "Agroindústria",
  "Alimentação",
  "Comércio",
  "Construção Civil",
  "Educação",
  "Energia",
  "Indústria",
  "Logística e Transporte",
  "Saúde",
  "Serviços",
  "Tecnologia"
];

export const getEstadoCompleto = (sigla) => {
  const estado = estados.find((e) => e.value === sigla);
  return estado ? estado.label : "Estado inválido";
}