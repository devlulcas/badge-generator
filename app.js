const colorPickerContainers = ["logo--color", "message--color","label--color"];

const colorPickerConfigs = colorPickerContainers.map(container => colorPickerConfig(container));

const colorPickers = colorPickerConfigs.map(config => Pickr.create(config));

const {logoColorPicker, messageColorPicker, labelColorPicker} = [...colorPickers];

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
