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
