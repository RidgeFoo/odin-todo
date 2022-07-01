export function clearChildElements(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}
