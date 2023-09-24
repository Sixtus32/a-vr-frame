
//main reducer function
const mindmap = (state = {
            color: "#b3f0ff",
            cursorPos: {
            x: 0,
            y: 0,
            z: -.6 },
            boxes: [] },
    action) => {
    // state =
    switch (action.type) {
        case "INCREMENT":
        let boxes = [...state.boxes,
        {
        position: {
            x: -.3,
            y: .05,
            z: -1 },
        rotation: "0 0 0",
        width: .1,
        height: .1,
        depth: .1,
        color: "#ccc",
        id: action.id }];
        let newState = Object.assign({}, state, {
        boxes: boxes });
      // console.log('newState',newState)
        return newState;
    case "DECREMENT":
        console.log('decremented!!!');
        state.color = action.color;
        return state;
    case "PICKUP":
        let camera = document.querySelector('#camera');
        let cameraRotation = camera.getAttribute('rotation');
        console.log('cameraRotation', cameraRotation);
        state.boxes.forEach(function (box) {
        if (action.id === box.id) {
            console.log('box.position', box.position);
            box.position = {
            x: box.position.x += .1,
            y: box.position.y,
            z: box.position.z };
        }
        });
    default:
        return state;}
};
const { Component } = React;
let nextBoxId = 0;
//main component
//
class Mindmap extends Component {
    render() {
    return /*#__PURE__*/(
        React.createElement("a-scene", null, /*#__PURE__*/
        React.createElement("a-entity", { position: "0 .7 0" }, /*#__PURE__*/
        React.createElement("a-entity", { id: "camera", camera: true, "look-controls": true, "wasd-controls": true, "universal-controls": true }, /*#__PURE__*/
        React.createElement("a-entity", { cursor: " fuse: false;  maxDistance: 1.5;  timeout: 2000",
        geometry: "primitive: ring;  radiusOuter: 0.05;  radiusInner: 0.04;",
        material: "color: white; shader: flat",
        position: store.getState().cursorPos.x + ' ' +
        store.getState().cursorPos.y + ' ' +
        store.getState().cursorPos.z }, /*#__PURE__*/
        React.createElement("a-animation", {
        begin: "click",
        easing: "ease-in",
        attribute: "scale", fill: "forwards",
        from: ".1 .1 .1", to: "1 1 1", dur: "100" })))), /*#__PURE__*/
        React.createElement("a-sky", { src: "https://c1.staticflickr.com/9/8767/28465171600_7da758529a_b.jpg", color: store.getState().color }), /*#__PURE__*/
        React.createElement("a-box", {
        position: "-.5 .1 -1",
        rotation: "0 0 0",
        width: ".2", height: ".2", depth: ".2",
        color: "#33cc33",
        onClick: () => this.props.onIncrement(nextBoxId++) }), /*#__PURE__*/
        React.createElement("a-box", { position: ".5 .1 -1",
        rotation: "0 0 0",
        width: ".2", height: ".2", depth: ".2",
        color: "#cc3333",
        onClick: this.props.onDecrement }),
        this.props.boxes.map((box) => /*#__PURE__*/
        React.createElement("a-box", { key: box.id, position:
        box.position.x + ' ' +
        box.position.y + ' ' +
        box.position.z,
        rotation: "0 0 0",
        width: ".1", height: ".1", depth: ".1",
        color: "#ccc", onClick: () => this.props.pickUp(box.id) })), "})}"));
    }}
const { createStore } = Redux;
const store = createStore(mindmap);
const render = () => {
    ReactDOM.render( /*#__PURE__*/
    React.createElement(Mindmap, {
    boxes: store.getState().boxes,
    onIncrement: (id) =>
    store.dispatch({
        type: "INCREMENT",
        color: "#33cc33",
        id: id }),
    onDecrement: () =>
    store.dispatch({
        type: "DECREMENT",
        color: "#cc3333" }),
    pickUp: (id) =>
    store.dispatch({
        type: "PICKUP",
        id: id }) }),
    document.getElementById('root'));
};
store.subscribe(render);
render();
    