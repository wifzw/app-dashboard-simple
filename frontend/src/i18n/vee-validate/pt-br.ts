import formatFileSize from '@/utils/formatFileSize';

const messages = {
  _default: (field: string) => `O valor do campo ${field} não é válido`,
  after: (field: string, [target]: [target: string]) => `O campo ${field} deve estar depois do campo ${target}`,
  alpha: (field: string) => `O campo ${field} deve conter somente letras`,
  alpha_dash: (field: string) => `O campo ${field} deve conter letras, números e traços`,
  alpha_num: (field: string) => `O campo ${field} deve conter somente letras e números`,
  alpha_spaces: (field: string) => `O campo ${field} só pode conter caracteres alfabéticos e espaços`,
  before: (field: string, [target]: [target: string]) => `O campo ${field} deve estar antes do campo ${target}`,
  between: (field: string, [min, max]: [min: number, max: number]) => `O campo ${field} deve estar entre ${min} e ${max}`,
  birth_date: (_: string) => 'Data de nascimento inválido ou menor de 18 anos',
  confirmed: (field: string, [confirmedField]: [confirmedField: string]) => `Os campos ${field} e ${confirmedField} devem ser iguais`,
  credit_card: (field: string) => `O campo ${field} é inválido`,
  date_between: (field: string, [min, max]: [min: number, max: number]) => `O campo ${field} deve estar entre ${min} e ${max}`,
  date_format: (field: string, [format]: [format: string]) => `O campo ${field} deve estar no formato ${format}`,
  decimal: (field: string, [decimals = '*'] = []) => `O campo ${field} deve ser numérico e deve conter ${!decimals || decimals === '*' ? '' : decimals} casas decimais`,
  digits: (field: string, [length]: [length: number]) => `O campo ${field} deve ser numérico e ter exatamente ${length} dígitos`,
  dimensions: (field: string, [width, height]: [width: number, height: number]) => `O campo ${field} deve ter ${width} pixels de largura por ${height} pixels de altura`,
  email: () => 'O campo deve ser um email válido',
  excluded: (field: string) => `O campo ${field} deve ser um valor válido`,
  ext: (field: string) => `O campo ${field} deve ser um arquivo válido`,
  image: (field: string) => `O campo ${field} deve ser uma imagem`,
  included: (field: string) => `O campo ${field} deve ter um valor válido`,
  integer: (field: string) => `O campo ${field} deve ser um número inteiro`,
  ip: (field: string) => `O campo ${field} deve ser um endereço IP válido`,
  is: (field: string) => `O valor inserido no campo ${field} não é válido`,
  length: (field: string, [length, max]: [length: number, max: number]) => {
    if (max) {
      return `O tamanho do campo ${field} está entre ${length} e ${max}`;
    }

    return `O tamanho do campo ${field} deve ser ${length}`;
  },
  max: (_: string, [length]: number[]) => `Esse campo não deve ter mais que ${length} caracteres`,
  max_value: (field: string, [max]: number[]) => `O campo ${field} precisa ser ${max} ou menor`,
  mimes: (field: string) => `O campo ${field} deve ser um tipo de arquivo válido`,
  min: (_: string, [length]: number[]) => `O campo deve conter pelo menos ${length} caracteres`,
  min_value: (field: string, [min] : number[]) => `O campo ${field} precisa ser ${min} ou maior`,
  numeric: (field: string) => `O campo ${field} deve conter apenas números`,
  regex: (field: string) => `O campo ${field} possui um formato inválido`,
  required: () => 'Esse campo é obrigatório',
  size: (field: string, [size] : number[]) => `O campo ${field} deve ser menor que ${formatFileSize(size)}`,
  url: (field: string) => `O campo ${field} não é uma URL válida`,
  password: () => 'A senha deve conter letras maiúsculas e minúsculas, números e caracteres especiais.',
  phoneBR: () => 'O celular está no formato inválido',
};

const locale = {
  name: 'pt_BR',
  messages,
  attributes: {},
};

export default locale;
