var d3;
var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20();

const api = new APIManager();
const url = window.location.href;
const id = url.slice(url.indexOf("=") + 1);
const dataP = api.getData(id);

dataP.then((data) => {
  console.log(data);

  var svg = d3
    .select("#chart")
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);
  var container = svg
    .append("g")
    .attr("class", "chartholder")
    .attr(
      "transform",
      "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
    );
  var vis = container.append("g");

  var pie = d3.layout
    .pie()
    .sort(null)
    .value(function (d) {
      return 1;
    });
  var arc = d3.svg.arc().outerRadius(r);
  var arcs = vis
    .selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

  arcs
    .append("path")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", function (d) {
      return arc(d);
    });
  arcs
    .append("text")
    .attr("transform", function (d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      d.angle = (d.startAngle + d.endAngle) / 2;
      return (
        "rotate(" +
        ((d.angle * 180) / Math.PI - 90) +
        ")translate(" +
        (d.outerRadius - 10) +
        ")"
      );
    })
    .attr("text-anchor", "end")
    .text(function (d, i) {
      return data[i].firstName + " " + data[i].lastName;
    });
  container.on("click", spin);
  function spin() {
    container.on("click", null);
    if (oldpick.length == data.length) {
      console.log("done");
      container.on("click", null);
      return;
    }
    var ps = 360 / data.length,
      rng = Math.floor(Math.random() * 1440 + 360);

    rotation = Math.round(rng / ps) * ps;

    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? picked % data.length : picked;
    if (oldpick.indexOf(picked) !== -1) {
      d3.select(this).call(spin);
      return;
    } else {
      oldpick.push(picked);
    }
    rotation += 90 - Math.round(ps / 2);
    vis
      .transition()
      .duration(3000)
      .attrTween("transform", rotTween)
      .each("end", function () {
        d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr("fill");
        d3.select("#question h1").text(
          ` You choose ${
            data[picked].firstName + " " + data[picked].lastName
          } to donate`
        );
        d3.select("#question img").attr("src", data[picked].picture);
        d3.select("#question button").attr("data-id", data[picked]._id);
        d3.select("#question button").text("move to profile");
        oldrotation = rotation;
        console.log(data[picked].firstName);
        container.on("click", spin);
      });
  }

  $("#question").on("click", "button", function () {
    let id = $(this).data().id;
    window.location.href = `/grantees/grantee-page.html?id=${id}`;
  });
  svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (w + padding.left + padding.right) +
        "," +
        (h / 2 + padding.top) +
        ")"
    )
    .append("path")
    .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
    .style({ fill: "black" });
  container
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({ fill: "white", cursor: "pointer" });
  container
    .append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({ "font-weight": "bold", "font-size": "30px" });

  function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
      return "rotate(" + i(t) + ")";
    };
  }

  function getRandomNumbers() {
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if (
      window.hasOwnProperty("crypto") &&
      typeof window.crypto.getRandomValues === "function"
    ) {
      window.crypto.getRandomValues(array);
      console.log("works");
    } else {
      for (var i = 0; i < 1000; i++) {
        array[i] = Math.floor(Math.random() * 100000) + 1;
      }
    }
    return array;
  }
});
$(".question").on("click", "img", function () {
  const id = $(this).data.id();
  console.log(id);
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
});
