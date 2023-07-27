// Button
class DCButton extends HTMLElement {
    constructor() {
        super();
        this.props = {
            type: 'default',
            size: 'medium',
            htmlType: undefined,
            disabled: false,
            loading: false,
            width: 0,
            className: undefined,
        };
        console.log(333,this.attributes);
        for (const {name, value} of this.attributes) {
            this.props[name] = value;
        }
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<!--<style></style>--><!--<html></html>-->`;
        this.setClassName();
        // this.listenEvent();
    }
    setClassName() {
        const { type, size, disabled } = this.props;
        this.shadowRoot.children[1].className = `d-btn d-btn-${type} d-btn-${size} d-btn-${disabled ? 'disabled' : 'normal'}`
    }
    listenEvent() {
        this.shadowRoot.children[1].onclick = (e) => this.props.onclick(e);
    }
}
export default DCButton;
