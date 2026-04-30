function getLabel(id) {
  return document.getElementById(id)?.value || "";
}

function render() {
  const width = 450;
  const height = 380;

  d3.select("#venn").selectAll("*").remove();

  const svg = d3.select("#venn")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // 🔴 seta
  svg.append("defs")
    .append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "black");

  // 🎯 CÍRCULOS (EXATOS DO SEU SVG)
  const circles = [
    { x: 170, y: 230, r: 80, color: "#FF0000", label: getLabel("labelA") },
    { x: 280, y: 230, r: 80, color: "#ffff00", label: getLabel("labelB") },
    { x: 225, y: 140, r: 80, color: "#00FF00", label: getLabel("labelC") }
  ];

  svg.selectAll("circle")
    .data(circles)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .style("fill", d => d.color)
    .style("fill-opacity", 0.4);

  // 🔤 LABELS DOS CONJUNTOS (EXATOS)
  svg.selectAll(".set-label")
    .data(circles)
    .enter()
    .append("text")
    .attr("x", d => d.x)
    .attr("y", (d, i) => i === 2 ? 120 : 250)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text(d => d.label);

  // 🎯 FUNÇÃO DE SETA
function arrow(x1, y1, x2, y2, label, options = {}) {

  const {
    labelAtEnd = false,
    offsetX = 0,
    offsetY = 0
  } = options;

  // linha
  svg.append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrowhead)");

  // posição do texto
  const textX = labelAtEnd ? (x2 + offsetX) : x1;
  const textY = labelAtEnd ? (y2 + offsetY) : (y1 - 10);

  svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text(label);
}

arrow(100, 140, 180, 180, getLabel("labelAC"));
arrow(350, 100, 250, 180, getLabel("labelBC"));
arrow(300, 60,  225, 210, getLabel("labelABC"));

arrow(140, 310, 225, 235, getLabel("labelAB"), {
  labelAtEnd: true,
  offsetX: -100,
  offsetY: 95
});

}

// inicial
render();