export function getHigherResolutionImage(image, size) {
    if (typeof image !== 'string') {
      console.error('Invalid image URL');
      return image;
    }
    return image.replace("SX300", `SX${size}`);
}
  
export function getStorageValue(field, defaultValue) {
    const item = window.localStorage.getItem(field);
    if (item === null) {
      return defaultValue;
    }
    return item;
}
  
export const validateStringStartsWith = (string, startsWith) => {
    if (typeof string !== 'string' || typeof startsWith !== 'string') {
      console.error('Invalid input for string validation');
      return false;
    }
    return string.startsWith(startsWith);
};
  
export function validateIsStringApplicable(string) {
    return string !== "N/A";
}