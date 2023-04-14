document.getElementById("preview-btn").onclick = function (){
  const previwe = document.getElementById("preview-back")
  if (previwe.style.display === "none") {
    previwe.style.display = "block"
  } else {
    previwe.style.display = "none"
  }
}
document.getElementById("preview-back").onclick = function () {
  this.style.display = "none"
}
document.getElementById("source-btn").onclick = function (){
  const source = document.getElementById("source-back")
  if (source.style.display === "none") {
    source.style.display = "block"
    $(".source-divided").hide()
    sources("dense")
  } else {
    source.style.display = "none"
  }
}
document.getElementById("source-back").onclick = function () {
  this.style.display = "none"
}
document.getElementById("source-type").onchange = function() {
  sources(this.value)
  if (this.value === "dense") {
    $(".source-divided").hide()
  } else if (this.value === "divided") {
    $(".source-divided").show()
  }
}


document.getElementById("data-id").oninput = function() {
  this.value = this.value.replaceAll(" ", "")
}
document.getElementById("back-type").onchange = function() {
  const inp = document.getElementById("back")
  if (this.value == "color") {
    inp.type = "color"
    inp.value = "#ffffff"
  } else {
    inp.type = "text"
    inp.value = ""
    inp.placeholder = "Image URL..."
  }
}

function setup () {
  let css = ""
  // Data
  const tag = document.getElementById("tag").value
  const value = document.getElementById("data-value").value
  const id = document.getElementById("data-id").value
  const clas = document.getElementById("data-class").value
  
  const text_color = document.getElementById("text-color").value
  const text_size = document.getElementById("text-size").value + document.getElementById("text-size-type").value
  const text_align = document.getElementById("text-align").value
  const back = document.getElementById("back").value
  const border_type = document.getElementById("border-type").value
  const border_size = document.getElementById("border-size").value + document.getElementById("border-size-type").value
  const border_color = document.getElementById("border-color").value
  const border_round = document.getElementById("border-round").value + document.getElementById("border-round-type").value
  /* CSS */
  // Text
  if (text_color !== "#000000")
    css += `color: ${text_color};`
  if (document.getElementById("text-size").value != 15)
    css += `font-size: ${text_size};`
  if (text_align !== "none")
    css += `text-align: ${text_align};`
  // Background
  if (back !== "#ffffff" && back !== "")
    css += `background: ${back};`
  // Border
  if (border_type !== "none")
    css += `border: ${border_size} ${border_type} ${border_color};`
  if (document.getElementById("border-round").value > 0)
    css += `border-radius: ${border_round};`
  // Spacing
  if (document.getElementById("spacing-word").value != 0)
    css += `word-spacing: ${document.getElementById("spacing-word").value}${document.getElementById("spacing-word-type").value};`
  if (document.getElementById("spacing-letter").value != 0)
    css += `letter-spacing: ${document.getElementById("spacing-letter").value}${document.getElementById("spacing-letter-type").value};`
  // Box Shadow
  if (document.getElementById("bshadow-width").value != 0 || document.getElementById("bshadow-height").value != 0 || document.getElementById("bshadow-scale").value != 0)
    css += `box-shadow: ${document.getElementById("bshadow-width").value}${document.getElementById("bshadow-width-type").value} ${document.getElementById("bshadow-height").value}${document.getElementById("bshadow-height-type").value} ${document.getElementById("bshadow-scale").value}${document.getElementById("bshadow-scale-type").value} ${document.getElementById("bshadow-color").value}`
  // Out
  document.getElementById("preview").contentWindow.document.body.innerHTML = ""
  document.getElementById("preview").contentWindow.document.head.innerHTML = ""
  const element = document.createElement(tag)
  if ((["input", "textarea"]).includes(tag))
    element.value = value
  else
    element.innerHTML = value
  if (!!id)
    element.id = id
  if (!!clas)
    clas.split(" ").map((a) => element.classList.add(a))
  const style = document.createElement("style")
  style.innerHTML = `${tag} {${css}}`
  document.getElementById("preview").contentWindow.document.head.appendChild(style)
  document.getElementById("preview").contentWindow.document.body.appendChild(element)
  return css
}
function sources (type) {
  const css = setup()
  const tag = document.getElementById("tag").value
  const id = document.getElementById("data-id").value
  const clas = document.getElementById("data-class").value
  const value = document.getElementById("data-value").value
  let el1 = ""
  let el2 = ""
  if ((["input", "textarea"]).includes(tag))
    el1 = `<${tag} ${(!id) ? "" : "id='" + id + "' "}${(!clas) ? "" : "class='" + clas + "' "}${(!value) ? "" : "value='" + value + "' "}${(!css && type === "dense") ? "" : "style='" + css + "' "}/>`
  else
    el1 = `<${tag}${(!id) ? "" : " id='" + id + "'"}${(!clas) ? "" : " class='" + clas + "'"}${(!css && type === "dense") ? "" : " style='" + css + "'"}>${value}</${tag}>`
  document.getElementById("source-code").value = el1
  document.getElementById("source-css").value = el2
}


$("input, select, textarea").change(function() {setup()})
const sizeType = ["px", "%", "vm", "vh", "vw", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvh", "lvw", "dvw", "dvh", "cm", "mm", "q", "in", "pc", "pt", "em", "ex", "ch", "rem", "lh", "rlh", ""]
sizeType.map((a) => {
  const el = document.createElement("option")
  el.value = a
  el.innerHTML = a.toUpperCase()
  $("[sizeType]").append(el)
})