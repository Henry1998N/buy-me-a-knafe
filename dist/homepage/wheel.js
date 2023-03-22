var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20(); //category20c()

// let grantees = getGrantees();
console.log(savedGrantee);

const data = [];
for (let i = 0; i < savedGrantee.length; i++) {
  let id = savedGrantee[i].id;
  let firstName = savedGrantee[i].firstName;
  let lastName = savedGrantee[i].lastName;
  let picture = savedGrantee[i].picture;
  let obj = {
    _id: id,
    firstName: firstName,
    lastName: lastName,
    picture: picture,
  };
  data.push(obj);
}

// data.push(...grantees)
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
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
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
// add the text
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
  //all slices have been seen, all done
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
      //mark question as seen
      d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr("fill");
      //populate question
      d3.select("#question h1").text(
        ` You choose ${
          data[picked].firstName + " " + data[picked].lastName
        } to donate`
      );
      d3.select("#question img").attr("src", data[picked].picture);
      d3.select("#question img").attr("data-id", data[picked].id);
      d3.select("#question a").text("move to profile");
      d3.select("#question a i").text("arrow_forward");
      oldrotation = rotation;
      console.log(data[picked].firstName);

      /* Comment the below line for restrict spin to sngle time */
      container.on("click", spin);
    });
}
//make arrow
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
//draw spin circle
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ fill: "white", cursor: "pointer" });
//spin text
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
    //no support for crypto, get crappy random numbers
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}

// async function fetchGrantees() {
//     return $.get("/grantees");
//   }

//   async function onPageLoad() {
//     const grantees = await fetchGrantees();
//     console.log(grantees)
//     return grantees
//   }

$(".question").on("click", "img", function () {
  const id = $(this).data.id();
  console.log(id);
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
});
