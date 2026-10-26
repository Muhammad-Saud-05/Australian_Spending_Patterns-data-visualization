var vg_1 = "chart1_total_spending_line.vg.json";
var vg_2 = "chart2_spending_shares_radial.vg.json";
var vg_3 = "chart3_category_rank_bump.vg.json";
var vg_4 = "chart4_category_stream.vg.json";
var vg_5 = "chart5_category_change_heatmap.vg.json";
var vg_6 = "chart6_growth_choropleth.vg.json";
var vg_7 = "chart7_spending_symbol_map.vg.json";
var vg_8 = "chart8_dollars_added_dorling.vg.json";
var vg_9 = "chart9_state_profiles_radar.vg.json";
var vg_10 = "chart10_share_change_butterfly.vg.json";
var vg_11 = "chart11_december_effect_lollipop.vg.json";
var vg_12 = "chart12_wants_share_waffle.vg.json";

var specs = [vg_1, vg_2, vg_3, vg_4, vg_5, vg_6, vg_7, vg_8, vg_9, vg_10, vg_11, vg_12];

var embed_options = { actions: false };

var FONT_TEXT = '"Source Sans 3", "Helvetica Neue", Arial, sans-serif';
var FONT_TITLE = '"Fraunces", Georgia, "Times New Roman", serif';


function pullTitle(spec) {
  var t = spec.title;
  if (!t) { return null; }
  if (typeof t === "string") { t = { text: t }; }
  delete spec.title;
  return {
    headline: Array.isArray(t.text) ? t.text.join(" ") : t.text,
    subtitle: t.subtitle ? [].concat(t.subtitle) : []
  };
}

function showTitle(target, info) {
  var holder = document.querySelector(target);
  if (!info || !holder) { return; }
  var row = holder.parentNode;
  var text = row.querySelector(".text");
  var h = document.createElement("h4");
  h.className = "chart-headline";
  h.textContent = info.headline;
  var label = text && text.querySelector("h3");
  if (label) { label.after(h); } else if (text) { text.prepend(h); }
  if (info.subtitle.length) {
    var note = document.createElement("p");
    note.className = "chart-note";
    note.textContent = info.subtitle.join(" ");
    row.appendChild(note);
  }
}

function applyPageFonts(spec) {
  spec.config = spec.config || {};
  spec.config.font = FONT_TEXT;
  spec.config.title = Object.assign({}, spec.config.title, {
    font: FONT_TITLE,
    fontWeight: 600,
    subtitleFont: FONT_TEXT
  });
  return spec;
}

function fontsReady() {
  if (!document.fonts || !document.fonts.load) { return Promise.resolve(); }
  var loading = Promise.all([
    document.fonts.load('400 12px "Source Sans 3"'),
    document.fonts.load('600 12px "Source Sans 3"'),
    document.fonts.load('700 12px "Source Sans 3"'),
    document.fonts.load('600 18px "Fraunces"')
  ]);
  var timeout = new Promise(function (resolve) { setTimeout(resolve, 4000); });
  return Promise.race([loading, timeout]).catch(function () {});
}

function drawChart(i) {
  var target = "#chart" + (i + 1);
  return fetch(specs[i])
    .then(function (response) {
      if (!response.ok) { throw new Error(specs[i] + " returned " + response.status); }
      return response.json();
    })
    .then(function (spec) {
      var info = pullTitle(spec);
      return vegaEmbed(target, applyPageFonts(spec), embed_options).then(function (result) { showTitle(target, info); return result; });
    })
    .then(function (result) {

    })
    .catch(function (error) {
      console.error(specs[i], error);
      var holder = document.querySelector(target);
      if (holder) {
        holder.innerHTML = '<p class="chart-error">This chart could not be loaded (' + specs[i] + '). See the browser console.</p>';
      }
    });
}

fontsReady().then(function () {
  for (var i = 0; i < specs.length; i++) { drawChart(i); }
});