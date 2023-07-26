// Button
class DCButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<!--<style></style>--><!--<html></html>-->`;
    }
}
export default DCButton;
