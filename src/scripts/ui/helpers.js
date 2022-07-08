export function clearChildElements(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

export function getSvgElement(svg) {
  const template = document.createElement("template");
  template.innerHTML = svg;
  const el = template.content.firstChild;
  return el;
}
