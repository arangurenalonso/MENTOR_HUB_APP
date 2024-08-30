export enum ControlledFieldEnum {
  Array = 'Array',
  Select = 'Select',
  InputTypeText = 'InputTypeText',
  RichTextEditor = 'RichTextEditor',
}
export type ControlledFieldType =
  | ControlledFieldEnum.Array
  | ControlledFieldEnum.Select
  | ControlledFieldEnum.InputTypeText
  | ControlledFieldEnum.RichTextEditor;

// DatePicker="DatePicker",
// TimePicker="TimePicker",
// Radio="Radio",
// Checkbox="Checkbox",
// Switch="Switch",
// Slider="Slider",
// Rate="Rate",
// Upload="Upload",
// Button="Button",
// Text="Text",
// Password="Password",
// TextArea="TextArea",
// AutoComplete="AutoComplete",
// Cascader="Cascader",
// InputNumber="InputNumber",
// TreeSelect="TreeSelect",
// Transfer="Transfer",
// Tag="Tag",
// Mention="Mention",
