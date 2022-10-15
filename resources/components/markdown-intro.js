import {html, LitElement} from "lit-element";
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import {milligram} from "../milligram";
import {initCss as initCss} from "../init-css";

import MarkdownIt from 'markdown-it';


class MarkdownIntro extends LitElement {
    static styles = [milligram, initCss]

    static get properties() {
        return {
            data: {type: String},
        };
    }

    constructor() {
        super();

        let md = new MarkdownIt();

        this.data = "⏳"
        fetch("/?action=header")
            .then(res => res.text())
            .then(mdtext => {
                //console.log(mdtext)
                let mdContent = md.render(mdtext);
                //console.log(mdContent)
                this.data = mdContent;
            })
            .catch(err => {
                //console.log(err)
                this.data = err
            })
    }

    render() {
        return html`${unsafeHTML(this.data)}`;
    }
}

customElements.define('markdown-intro', MarkdownIntro);
