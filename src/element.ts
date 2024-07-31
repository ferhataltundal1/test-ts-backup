const rootElement = document.getElementById("root") as HTMLDivElement;
const element = (
  el: string,
  {
    attributes,
    children,
  }: {
    attributes?: string;
    children?: string | string[];
  }
) => {
  if (el === "br") {
    return `<br/>`;
  }
  return `<${el} ${attributes != null ? attributes : ""}>${
    attributes != null
      ? Array.isArray(children)
        ? children.join("")
        : children
      : ""
  }</${el}>`;
};

function createStyle(style: object) {
  let data = [];
  for (const [key, value] of Object.entries(style)) {
    let values = `${key}: ${value};`;
    data.push(values);
  }
  return data.join(" ");
}
const styles = createStyle({
  display: "flex",
  "flex-direction": "column",
  border: "1px solid red",
});

const createElement = element("div", {
  attributes: `class="all-page" style="${styles}"`,
  children: [
    element("p", {
      attributes: 'style="color:white"',
      children: "Paragraf 1",
    }),
    element("br", {}),
    element("p", {
      attributes: 'style="color:white"',
      children: "Paragraf 2",
    }),
  ],
});

rootElement.innerHTML = createElement;
