"use strict";

//Variables for save constructors code

let radiusCode;
let shadowCode;
let txtShadowCode;
let rgbaCode;
let fontFaceCode;
let columnsCode;
let resizeCode;
let sizingCode;
let outlineCode;
let transCode;
let transformCode;
let flexCode;

//Functions to get element/elements

function selectElement(selector) {
	return document.querySelector(selector);
}
function selectElements(selector) {
	return document.querySelectorAll(selector);
}


//Function to copy a css code

function copyCode(codeVariable) {
	navigator.clipboard.writeText(codeVariable);
}

function closeGenerators() {
	const generators = selectElements(".open");
	for (let generator of generators) {
		generator.classList.remove("active");
	}
}

function openMenu() {
	resetGenerator()
	closeGenerators();
	//Close support panel, change menu title and open menu
	const menu = selectElement(".menu");
	const supportPanel = selectElement(".browser-support");
	const title = selectElement("#generator-title");
	menu.classList.toggle("active");
	title.textContent = "Choose Something";
	supportPanel.classList.remove("active");
}

function resetGenerator() {
	try {
		let active = selectElement(".open.active form");
		active.reset();
	}
	catch {
		console.log("Can't find form");
	}
}

//Function to open necessary window, close all unnecessary windows and create browser support panel


(() => {
	const menu = selectElement(".menu");
	const chooseGenerator = selectElements(".menu li");
	const generators = selectElements(".open");
	const supportPanel = selectElement(".browser-support");

	let supportArr = [["Border Radius", 4, 3, 3.1, 9, 11.5, 2.1, 3.1],
	["Box Shadow", 4, 3.5, 5, 9, 11.5, 4, 3.2], ["Text Shadow", 4, 3.5, 4, 10, 10, 2.1, 3.2],
	["RGBA", 4, 3, 3.1, 9, 10, 2.1, 3.2], ["Font Face", 4, 3.5, 3.2, 9, 10, 4, 4.2],
	["Multiple Columns", 4, 2, 3.1, 10, 11.1, 2.1, 3.2], ["Box Resize", 4, 4, 4, "&times;", 15, 76, "&times;"],
	["Box Sizing", 4, 2, 3.1, 8, 10, 2.1, 3.2], ["Outline", 4, 2, 3.1, 8, 12.1, 2.1, 3.2],
	["Transition", 4, 5, 5.1, 10, 12.1, 2.1, 3.2], ["Transform", 4, 3.5, 3.1, 9, 11.5, 2.1, 3.2],
	["Flexbox", 21, 28, 6.1, 11, 12.1, 4.4, 7.1]];

	//Change support panel and title depending on the open generator
	for (let i = 0; i < generators.length; i++) {
		chooseGenerator[i].onclick = () => {
			closeGenerators();
			menu.classList.remove("active");
			supportPanel.classList.add("active");
			generators[i].classList.toggle("active");

			let supportsObj = new browsersSuppotring(...supportArr[i]);
			supportsObj.addSupport();
		}
	}
})();

selectElement(".open-menu").onclick = openMenu;

//This funtion is using to show input, range, select values for user

function showValue(val, inputs) {
	for (let i = 0; i < val.length; i++) {
		inputs[i].textContent = val[i];
	}
}


/*Border Radius*/

selectElement("#width-radius").oninput = changeRadius;
selectElement("#height-radius").oninput = changeRadius;
selectElement("#tlc-radius").oninput = changeRadius;
selectElement("#trc-radius").oninput = changeRadius;
selectElement("#blc-radius").oninput = changeRadius;
selectElement("#brc-radius").oninput = changeRadius;
selectElement("#copy-radius").onclick = () => copyCode(radiusCode);
selectElement(".radius-settings").addEventListener("reset", () => {
	setTimeout(changeRadius, 200);
});

//Function to deformation figure and create a css code;

function changeRadius() {
	const widthRadius = selectElement("#width-radius");
	const heightRadius = selectElement("#height-radius");
	const tlcRadius = selectElement("#tlc-radius");
	const trcRadius = selectElement("#trc-radius");
	const blcRadius = selectElement("#blc-radius");
	const brcRadius = selectElement("#brc-radius");

	let values = [widthRadius.value, heightRadius.value,
	tlcRadius.value, trcRadius.value, blcRadius.value,
	brcRadius.value];

	//Show range values for user

	const rangeVal = selectElements(".radius-settings span");

	showValue(values, rangeVal);
	radiusStyle(values);
	radiusCss(values);
}

//Function to change figure style

function radiusStyle(val) {
	const figure = selectElement(".radius-figure");
	figure.style.width = val[0] + "px";
	figure.style.height = val[1] + "px";
	figure.style.borderRadius = val[2] + "px " + val[3] + "px "
		+ val[5] + "px " + val[4] + "px";

	selectElement(".radius-result").style.display = "flex";
}

//Function to create radius css code for copy

function radiusCss(val) {
	const radiusRes = selectElement(".radius-result pre");
	radiusCode = `-webkit-border-radius: ${val[2]}px ${val[3]}px ${val[5]}px ${val[4]}px;
border-radius: ${val[2]}px ${val[3]}px ${val[5]}px ${val[4]}px;
width: ${val[0]}px;
height: ${val[1]}px;`;

	radiusRes.textContent = radiusCode;
}

/*Box Shadow*/

selectElement("#box-sh-hr").oninput = changeShadow;
selectElement("#box-sh-vr").oninput = changeShadow;
selectElement("#box-sh-blur").oninput = changeShadow;
selectElement("#box-sh-spread").oninput = changeShadow;
selectElement("#box-sh-inset").oninput = changeShadow;
selectElement("#box-sh-color").oninput = changeShadow;
selectElement("#copy-shadow").onclick = () => copyCode(shadowCode);
selectElement(".box-shadow-settings").addEventListener("reset", () => {
	setTimeout(changeShadow, 200);
});

// Function to change css style(box-shadow) and determine a result

function changeShadow() {
	const inset = selectElement("#box-sh-inset");
	const horLength = selectElement("#box-sh-hr");
	const verLength = selectElement("#box-sh-vr");
	const blurRadius = selectElement("#box-sh-blur");
	const spreach = selectElement("#box-sh-spread");
	const shadowColor = selectElement("#box-sh-color");

	let values = [inset.value, horLength.value, verLength.value,
	blurRadius.value, spreach.value, shadowColor.value];

	values[0] = (values[0] == "Inset") ? "inset " : "";

	//Show range values for user

	const shadowVal = selectElements(".shadow-option span");

	for (let i = 1; i < values.length - 1; i++) {
		shadowVal[i - 1].textContent = values[i];
	}

	boxShadowStyle(values);
	boxShadowCss(values);
}

//Function to add box shadow styles

function boxShadowStyle(val) {
	const container = selectElement(".box-shadow");;
	container.style.boxShadow = val[0] + val[1] + "px " + val[2] +
		"px " + val[3] + "px " + val[4] + "px" + val[5];
	selectElement(".box-shadow-result").style.display = "flex";
}

//Function to create box shadow css code for copy

function boxShadowCss(val) {
	let resContainer = selectElement(".box-shadow-result pre");
	shadowCode = `-webkit-box-shadow: ${val[0]} ${val[1]}px ${val[2]}px ${val[3]}px ${val[4]}px ${val[5]};
box-shadow: ${val[0]} ${val[1]}px ${val[2]}px ${val[3]}px ${val[4]}px ${val[5]};`;

	resContainer.textContent = shadowCode;
}

/*Text Shadow*/

selectElement("#text-shadow-hl").oninput = changeShadowText;
selectElement("#text-shadow-vl").oninput = changeShadowText;
selectElement("#text-shadow-br").oninput = changeShadowText;
selectElement("#text-shadow-copy").onclick = () => copyCode(txtShadowCode);
selectElement(".text-shadow-settings").addEventListener("reset", () => {
	setTimeout(changeShadowText, 200);
});

//Function to change text style and create css code

function changeShadowText() {
	const textHl = selectElement("#text-shadow-hl");
	const textVl = selectElement("#text-shadow-vl");
	const textBr = selectElement("#text-shadow-br");
	const textColor = selectElement("#text-color");
	const shadowColor = selectElement("#shadow-text-color");

	let values = [textHl.value, textVl.value,
	textBr.value, textColor.value, shadowColor.value];

	//Show range values for user

	const textValue = selectElements(".text-option-container span");

	for (let i = 0; i < values.length - 2; i++) {
		textValue[i].textContent = values[i];
	}
	shadowTextStyle(values);
	shadowTextCss(values);
}

//Function to add shadow-text style

function shadowTextStyle(val) {
	const shadowText = selectElement(".text-shadow-text p");
	shadowText.style.color = val[3];
	shadowText.style.textShadow = val[0] + "px " + val[1] + "px " + val[2] + "px " + val[4];

	selectElement(".text-shadow-result").style.display = "flex";
}

//Create shadow text css for copy

function shadowTextCss(val) {
	const resContainer = selectElement(".text-shadow-result pre");
	txtShadowCode = `text-shadow: ${val[0]}px ${val[1]}px ${val[2]}px ${val[4]};
color: ${val[3]};`;
	resContainer.textContent = txtShadowCode;
}

/*RGBA*/

selectElement("#rgba-r").oninput = changeRGBA;
selectElement("#rgba-g").oninput = changeRGBA;
selectElement("#rgba-b").oninput = changeRGBA;
selectElement("#rgba-a").oninput = changeRGBA;
selectElement("#rgba-copy").onclick = () => copyCode(rgbaCode);
selectElement(".rgba-setting").addEventListener("reset", () => {
	setTimeout(changeRGBA, 200);
});

//Function to change figure color and create ready css code

function changeRGBA() {
	const rgbaR = selectElement("#rgba-r");
	const rgbaG = selectElement("#rgba-g");
	const rgbaB = selectElement("#rgba-b");
	const rgbaA = selectElement("#rgba-a");

	let values = [rgbaR.value, rgbaG.value, rgbaB.value, rgbaA.value];

	//Create correct opacity
	values[3] = values[3] / 10;

	//Shaow range values for user

	const rgbaValue = selectElements(".rgba-option-container span");

	showValue(values, rgbaValue);
	rgbaStyle(values);
	rgbaCss(values);
}

//Function to change rgba cyrcle style

function rgbaStyle(val) {
	const figureRgba = selectElement(".rgba-figure");
	figureRgba.style.backgroundColor = `rgba( ${val[0]}, ${val[1]}, ${val[2]}, ${val[3]} )`;

	selectElement(".rgba-result").style.display = "flex";
}

//Function to create rgba css 

function rgbaCss(val) {
	const rgbaRes = selectElement(".rgba-result pre");

	rgbaCode = `background-color: rgba( ${val[0]}, ${val[1]}, ${val[2]}, ${val[3]} );
color: rgba( ${val[0]}, ${val[1]}, ${val[2]}, ${val[3]} );`;
	rgbaRes.textContent = rgbaCode;
}

/*Font Face*/

selectElement("#font-family").oninput = changeFont;
selectElement("#font-name").oninput = changeFont;
selectElement("#font-face-copy").onclick = () => copyCode(fontFaceCode);
selectElement(".font-face-settings").addEventListener("reset", () => {
	setTimeout(changeFont, 200);
});

//Function to read input value and create a css code

function changeFont() {
	let familyVal = selectElement("#font-family").value;
	let nameVal = selectElement("#font-name").value;

	//Show code

	selectElement(".font-face-result").style.display = "flex";
	fontFaceCss(familyVal, nameVal);
}

//Function to create font-face css code for copy

function fontFaceCss(family, name) {
	const fontRes = selectElement(".font-face-result pre");

	fontFaceCode = `@font-face {
		font-family: "${family}";
		src: url("${name}.eot?") format("eot"),
		url("${name}.woff") format("woff"),
		url("${name}.ttf") format("truetype");
  	}`;
	fontRes.textContent = fontFaceCode;
}

/*Multiple Columns*/

selectElement("#column-val").oninput = changeColumns;
selectElement("#column-gap").oninput = changeColumns;
selectElement("#column-copy").onclick = () => copyCode(columnsCode);
selectElement(".multiple-columns-settings").addEventListener("reset", () => {
	setTimeout(changeColumns, 200);
});

//Function to change columns and create css code

function changeColumns() {
	let columnVal = selectElement("#column-val").value;
	let columnGapVal = selectElement("#column-gap").value;

	columnStyle(columnVal, columnGapVal);
	columnCss(columnVal, columnGapVal);
}

//Function to add style to column element

function columnStyle(col, gap) {
	const text = selectElement(".multiple-columns-text");
	text.style.columnCount = col;
	text.style.gridColumnGap = gap + "px";

	selectElement(".multiple-columns-result").style.display = "flex";
}

//Function to create column css

function columnCss(col, gap) {
	const columnVal = selectElement(".multiple-columns-result pre");
	columnsCode = `-moz-column-count: ${col};
-moz-column-gap: ${gap}px;
-webkit-column-count: ${col};
-webkit-column-gap: ${gap}px;
column-count: ${col};
column-gap: ${gap}px;`;

	columnVal.textContent = columnsCode;
}

/*Box Resize*/

selectElement("#box-resize-val").oninput = changeResize;
selectElement("#box-resize-copy").onclick = () => copyCode(resizeCode);
selectElement(".box-resize-settings").addEventListener("reset", () => {
	setTimeout(changeResize, 200);
});

function changeResize() {
	const resize = selectElement("#box-resize-val");

	selectElement(".box-resize-result").style.display = "flex";
	resizeCss(resize.value);
}

//Function to create resize css

function resizeCss(val) {
	const resContainer = selectElement(".box-resize-result pre");

	resizeCode = `resize: ${val};
overflow: auto;
min-width: 50px; /*suggest a min-width & min-height*/
min-height: 50px;`;
	resContainer.textContent = resizeCode;
}

/*Box Sizing*/

selectElement("#box-sizing-val").oninput = changeSizing;
selectElement("#copy-sizing").onclick = () => copyCode(sizingCode);
selectElement(".box-sizing-settings").addEventListener("reset", () => {
	setTimeout(changeSizing, 200);
});

function changeSizing() {
	const boxSizing = selectElement("#box-sizing-val");

	selectElement(".box-sizing-result").style.display = "flex";
	sizingCss(boxSizing.value);
}

//Function to create sizing code

function sizingCss(val) {
	const sizingCount = selectElement(".box-sizing-result pre");

	sizingCode = `-moz-box-sizing: ${val};
-webkit-box-sizing: ${val};
box-sizing: ${val};`;
	sizingCount.textContent = sizingCode;
}

/*Outline*/

selectElement("#outline-thickness").oninput = changeOutline;
selectElement("#outline-type").oninput = changeOutline;
selectElement("#outline-color").oninput = changeOutline;
selectElement("#outline-offset").oninput = changeOutline;
selectElement("#outline-copy").onclick = () => copyCode(outlineCode);
selectElement(".outline-settings").addEventListener("reset", () => {
	setTimeout(changeOutline, 200);
});

//Function to change outline and create css code

function changeOutline() {
	const outlineThick = selectElement("#outline-thickness");
	const outlineType = selectElement("#outline-type");
	const outlineColor = selectElement("#outline-color");
	const outlineOffset = selectElement("#outline-offset");

	let values = [outlineThick.value, outlineType.value, outlineColor.value,
	outlineOffset.value];

	//Show range values for user

	const outlineVal = selectElements(".outline-option span");

	outlineVal[0].textContent = values[0];
	outlineVal[1].textContent = values[3];


	outlineStyle(values);
	outlineCss(values);
}

//Function to add outline styles

function outlineStyle(val) {
	const container = selectElement(".outline");

	container.style.outline = `${val[0]}px ${val[1]} ${val[2]}`;
	container.style.outlineOffset = val[3] + "px";
	selectElement(".outline-result").style.display = "flex";
}

//Function to create outline css code

function outlineCss(val) {
	const resContainer = selectElement(".outline-result pre");
	let offsetCode = `outline-offset: ${val[3]}px;`;
	if (val[3] == 0) offsetCode = "";

	outlineCode = `outline: ${val[0]}px ${val[1].toLowerCase()} ${val[2]};
${offsetCode}`;
	resContainer.textContent = outlineCode;
}

/*Transition*/

selectElement("#transition-property").oninput = changeTransition;
selectElement("#transition-duration").oninput = changeTransition;
selectElement("#transition-function").oninput = changeTransition;
selectElement("#transition-copy").onclick = () => copyCode(transCode);
selectElement(".transition-hover").onmouseover = transitionHover;
selectElement(".transition-setting").addEventListener("reset", () => {
	setTimeout(changeTransition, 200);
});

//Function to animate hover container

function changeTransition() {
	let propertyVal = selectElement("#transition-property").value.toLowerCase();
	let durationVal = selectElement("#transition-duration").value;
	let tFunctionVal = selectElement("#transition-function").value.toLowerCase();

	transitionStyle(propertyVal, durationVal, tFunctionVal);
	transitionCss(propertyVal, durationVal, tFunctionVal);
}

//Function to change transition style

function transitionStyle(pro, dur, fun) {
	const hover = selectElement(".transition-hover");

	hover.style.animationName = pro.toLowerCase();
	hover.style.animationDuration = dur + "s";
	hover.style.animationTimingFunction = fun;
	selectElement(".transition-result").style.display = "flex";
}


//Function to create transition css code

function transitionCss(pro, dur, fun) {
	const resContainer = selectElement(".transition-result pre");
	transCode = `-webkit-transition: ${pro} ${dur}s ${fun};
-moz-transition: ${pro} ${dur}s ${fun};
-ms-transition: ${pro} ${dur}s ${fun};
-o-transition: ${pro} ${dur}s ${fun};
transition: ${pro} ${dur}s ${fun};`;

	resContainer.textContent = transCode;
}

function transitionHover() {
	const hover = selectElement(".transition-hover");

	hover.style.display = "none";
	setTimeout(() => { hover.style.display = "flex"; }, 4);
}

/*Transform*/

selectElement("#tr_scale").oninput = changeTransform;
selectElement("#tr_rotate").oninput = changeTransform;
selectElement("#tr_translate_x").oninput = changeTransform;
selectElement("#tr_translate_y").oninput = changeTransform;
selectElement("#tr_skew_x").oninput = changeTransform;
selectElement("#tr_skew_y").oninput = changeTransform;
selectElement("#transform-copy").onclick = () => copyCode(transformCode);
selectElement(".transform-settings").addEventListener("reset", () => {
	setTimeout(changeTransform, 200);
});

//Function to change a transform style and create css code

function changeTransform() {
	const scale = selectElement("#tr_scale");
	const rotate = selectElement("#tr_rotate");
	const translateX = selectElement("#tr_translate_x");
	const translateY = selectElement("#tr_translate_y");
	const skewX = selectElement("#tr_skew_x");
	const skewY = selectElement("#tr_skew_y");

	let values = [scale.value, rotate.value, translateX.value, translateY.value,
	skewX.value, skewY.value];

	let wholeCode = transformWhole(values).join("");

	transformStyle(wholeCode);
	transformCss(wholeCode);
}

//Function to create transform code for variable whole code

function transformWhole(val) {
	let cssArr = [`scale(${val[0]})`, ` rotate(${val[1]}deg)`,
	` translateX(${val[2]}px)`, ` translateY(${val[3]}px)`,
	` skewX(${val[4]}deg)`, ` skewY(${val[5]}deg)`];
	//Chock if option value is 0 
	for (let i = 0; i < val.length; i++) {
		if (val[i] == 0) {
			cssArr[i] = "";
		}
	}
	return cssArr;
}

//Function to add transform style

function transformStyle(val) {
	const figure = selectElement(".transform-figure");
	figure.style.transform = val;
	selectElement(".transform-result").style.display = "flex";
}

//Function to create css code for copy 

function transformCss(val) {
	const transformRes = selectElement(".transform-result pre");
	transformCode = `-moz-transform: ${val};
-webkit-transform: ${val};
-o-transform: ${val};
-ms-transform: ${val};
transform: ${val};`;
	transformRes.textContent = transformCode;
}

/*Flexbox*/

selectElement("#flex-display").oninput = changeFlex;
selectElement("#flex-diraction").oninput = changeFlex;
selectElement("#flex-wrap").oninput = changeFlex;
selectElement("#justify-content").oninput = changeFlex;
selectElement("#align-items").oninput = changeFlex;
selectElement("#align-content").oninput = changeFlex;
selectElement("#flex-copy").onclick = () => copyCode(flexCode);
selectElement(".flexbox-settings").addEventListener("reset", () => {
	setTimeout(changeFlex, 200);
});

//Function to change a flex styles and create css code

function changeFlex() {
	const flexDisplay = selectElement("#flex-display");
	const flexDiraction = selectElement("#flex-diraction");
	const flexWrap = selectElement("#flex-wrap");
	const justifyContent = selectElement("#justify-content");
	const alignItems = selectElement("#align-items");
	const alignContent = selectElement("#align-content");

	let values = [flexDisplay.value, flexDiraction.value, flexWrap.value,
	justifyContent.value, alignItems.value, alignContent.value];
	values = flexFix(values);

	flexStyle(values);
	flexCss(values);
}

//Function to change flex css on correct

function flexFix(val) {
	return val.map(i => i = i.replace(" ", "-").toLowerCase());
}

//Function to add flex style

function flexStyle(val) {
	const container = selectElement(".flexbox-flex-container");
	container.style.display = val[0];
	container.style.flexDirection = val[1];
	container.style.flexWrap = val[2];
	container.style.justifyContent = val[3];
	container.style.alignItems = val[4];
	container.style.alignContent = val[5];
	selectElement(".flexbox-result").style.display = "flex";
}

//Function to create css code

function flexCss(val) {
	let flexDirCode = (val[1] == "row") ? "" : `flex-direction: ${val[1]};\n`;
	let flexWrapCode = (val[2] == "wrap") ? "" : `flex-wrap: ${val[2]};\n`;
	let justifyConCode = (val[3] == "flex-start") ? "" : `justify-content: ${val[3]};\n`;
	let alignItemsCode = (val[4] == "flex-start") ? "" : `align-items: ${val[4]};\n`;
	let alignConCode = (val[5] == "flex-start") ? "" : `align-content: ${val[5]};\n`;

	const resContainer = selectElement(".flexbox-result pre");
	flexCode = `display: ${val[0]};\n${flexDirCode}${flexWrapCode}${justifyConCode}${alignItemsCode}${alignConCode}`;
	resContainer.textContent = flexCode;
}