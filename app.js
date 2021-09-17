// Seleciona todas as divs onde serão criados os color pickers
// então cria os objetos para a criação dos cp com os ids dessas divs
// logo depois são criados os color pickers
// e eles são separados em constantes individuais
const colorPickerContainers = ["logo--color", "message--color", "label--color"];

const colorPickerConfigs = colorPickerContainers.map((container) =>
  colorPickerConfig(container)
);

const colorPickers = colorPickerConfigs.map((config) => Pickr.create(config));
const logoColorPicker = colorPickers[0];
const messageColorPicker = colorPickers[1];
const labelColorPicker = colorPickers[2];

// Seleciona todos os inputs de texto
const logoInput = document.querySelector("#logo");
const labelInput = document.querySelector("#label");
const messageInput = document.querySelector("#message");

// Seleciona elementos de visualização
const imagePreview = document.querySelector("#preview__img");
const spanUrl = document.querySelector("#final__url");

// Gera um objeto com basicamente a mesma config, se diferenciando apenas no id
function colorPickerConfig(elementId) {
  return {
    el: `#${elementId}`,
    theme: "nano",
    components: {
      preview: true,
      hue: true,
      interaction: {
        hex: true,
        input: true,
        clear: true,
        save: true,
      },
    },
  };
}

// Um objeto padrão de uma badge imutável
const defaultImage = {
  tech: "javascript",
  label: "js",
  message: "javascript",
  logoColor: "f1f2da",
  labelColor: "00303b",
  messageColor: "ffce96",
};
Object.freeze(defaultImage);

// O objeto image deve ser identico ao objeto defaultImage
// sua única diferença é a mutabilidade
const image = {
  tech: "javascript",
  label: "js",
  message: "javascript",
  logoColor: "f1f2da",
  labelColor: "00303b",
  messageColor: "ffce96",
};

// Utilizando o pattern: Observer
class Observable {
  // O construtor cria um array vazio de observadores
  // observadores são objetos/elementos do dom que irão realizar algo
  // quando forem notificados
  constructor() {
    this.observers = [];
  }

  // A função subscribe recebe um objeto e a adiciona na lista de observers
  subscribe(obj) {
    this.observers.push(obj);
  }

  // A função unsubscribe gera um array com todos os objetos que não são o que foi
  // passado como argumento
  unsubscribe(obj) {
    this.observers = this.observers.filter((subscriber) => subscriber !== obj);
  }

  // A função notify é chamada por um evento e passa o argumento recebido como argumento
  // para todos os outros objetos na lista de observers
  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const observer = new Observable();

//EVENTS - COLOR PICKERS
logoColorPicker.on("save", (color, source, instance) => {
  const hexaValue = color.toHEXA().toString().replace("#", "");
  image.logoColor = hexaValue;
  observer.notify(image);
});

messageColorPicker.on("save", (color, source, instance) => {
  const hexaValue = color.toHEXA().toString().replace("#", "");
  image.messageColor = hexaValue;
  observer.notify(image);
});

labelColorPicker.on("save", (color, source, instance) => {
  const hexaValue = color.toHEXA().toString().replace("#", "");
  image.labelColor = hexaValue;
  observer.notify(image);
});

//EVENTS - TEXT PICKERS
logoInput.addEventListener("change", () => {
  const tech = logoInput.value;
  image.tech = tech;
  observer.notify(image);
});

messageInput.addEventListener("change", () => {
  const message = messageInput.value;
  image.message = message;
  observer.notify(image);
});

labelInput.addEventListener("change", () => {
  const label = labelInput.value;
  image.label = label;
  observer.notify(image);
});

// Carrega a imagem a partir do objeto existente 
window.onload = () => observer.notify(image);

// Recebe um objeto e desmembra ele para que seja possível utilizar
// as props como parâmetros
function generateImageUrl({
  tech,
  label,
  message,
  logoColor,
  labelColor,
  messageColor,
}) {
  if (image !== defaultImage) {
    const baseUrl = "https://img.shields.io/static/v1?";
    const params = `label=${label}&labelColor=${labelColor}&message=${message}&color=${messageColor}&logo=${tech}&logoColor=${logoColor}&style=for-the-badge`;
    const finalUrl = `${baseUrl}${params}`;
    return finalUrl;
  }
}